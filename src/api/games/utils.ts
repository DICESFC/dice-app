import { BoardGame, BoardGameAddQuery } from "@/interfaces/boardgame";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

//csvのプロパティ("TRUE", "1"など)を適切な型に変換する
const convertCSVProperty = (property: string) => {
  if (!isNaN(Number(property))) {
    return Number(property);
  } else if (property == "TRUE") {
    return true;
  } else if (property == "FALSE") {
    return false;
  } else {
    return property;
  }
};

//パース済みCSVをボドゲ登録用オブジェクトの配列にする
//TODO: だいぶ型安全じゃないし雑にプロパティ初期化してるので修正したい
export const csvToGameList = (csv: string[][]) => {
  if (!csv[0].includes("name")) {
    throw new Error(
      `nameの列がありません。テンプレートを参考にcsvを修正して下さい。`
    );
  } else if (!csv[0].includes("code")) {
    throw new Error(
      `codeの列がありません。テンプレートを参考にcsvを修正して下さい。`
    );
  }

  const body = csv.slice(1);
  const list = [];

  for (let rowIndex = 0; rowIndex < body.length; rowIndex++) {
    const game = {
      name: "",
      code: "",
      isBorrowedNow: false,
      prohibitBorrow: false,
      condition: "Unknown",
      createdAt: new Date().getDate(),
    } as BoardGameAddQuery;

    //各行の情報をgameオブジェクトに登録
    for (let colIndex = 0; colIndex < body[rowIndex].length; colIndex++) {
      //対象のプロパティ
      const property = convertCSVProperty(body[rowIndex][colIndex].trim());
      const columnName: keyof BoardGame = csv[0][colIndex];

      if (columnName === "name" && property === "") {
        throw new Error(`nameが設定されていません: ${rowIndex + 1}行目.`);
      } else if (columnName === "code" && property === "") {
        throw new Error(`codeが設定されていません: ${rowIndex + 1}行目.`);
        //無事っぽいなら
      } else if (columnName !== "") {
        game[columnName] = property !== "" ? property : null;
      }
    }
    list.push(game);
  }

  return list;
};

//IDの重複確認 → undefined or 重複ならUUIDを使用
export const generateBoardGameID = async (suggestedID?: string) => {
  if (!suggestedID) return uuidv4();

  //IDの形式
  const idRegex = new RegExp(/^[-a-z0-9]+$/);

  const db = getFirestore();
  const gamesCollectionRef = collection(db, "games");

  const q = query(gamesCollectionRef, where("id", "==", `${suggestedID}`));
  const querySnapshot = await getDocs(q);

  //重複IDがある場合
  if (querySnapshot.docs.length) {
    console.error(
      `ID"${suggestedID}"は重複しています。代わりにUUIDを使用します。`
    );
    return uuidv4();

    //形式が違う場合
  } else if (!idRegex.test(suggestedID)) {
    console.error(
      `ID"${suggestedID}"は正しい形式ではありません。idには英小文字と-のみが使用可能です。代わりにUUIDを使用します。`
    );
    return uuidv4();
  } else {
    return suggestedID;
  }
};
