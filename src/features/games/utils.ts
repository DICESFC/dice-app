import { v4 as uuidv4 } from "uuid";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
//===================
//  IDの重複確認 → undefined or 重複ならUUIDを使用
//  TODO: 分割してutils.tsを死滅させる
//===================
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

//===================
//  カタカナをひらがなに変換する
//===================
const convertToHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};

//===================
//  検索文字列をn-gramオブジェクトに変換する
//  フォーマットはFirebaseの中身見てね
//===================
export const getNgram = (name: string): { [key: string]: true } => {
  //n-gramのn, 何文字で分割するか
  //これを変更した場合検索用NGramの更新が必要
  const N = 2;

  //最大の配列長(文字数)
  const maxNgramLength = 80;

  const result: string[] = [];

  //諸々の前処理
  const normalizedName = convertToHiragana(name)
    .trim()
    .replace("　", " ")
    .toLowerCase();

  //名前をスペース区切りにする
  const nameBlocks = normalizedName.split(" ");

  //各ブロックごとにn-gramを作る
  for (const block of nameBlocks) {
    for (let i = 0; i < block.length; i++) {
      //これ以上生成できないなら止める
      if (i + N > block.length) break;
      //最大配列長を制限する
      if (result.length >= maxNgramLength) break;
      result.push(block.slice(i, i + N));
    }
  }
  //ngram配列をオブジェクトに変換
  const ngramField = result.reduce((prevVal, newVal) => {
    return { ...prevVal, [newVal]: true };
  }, {});

  return ngramField;
};
