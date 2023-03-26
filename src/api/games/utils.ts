import { BoardGame } from "@/interfaces/boardgame";

//csvのプロパティ("TRUE", "1"など)を適切な型に変換する
const convertCSVProperty = (property: string) => {
  if (!!Number(property)) {
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
    } as BoardGame;

    //各行の情報をgameオブジェクトに登録
    for (let colIndex = 0; colIndex < body[rowIndex].length; colIndex++) {
      //対象のプロパティ
      const property = convertCSVProperty(body[rowIndex][colIndex].trim());

      // columnName にはカラム名を格納する
      const columnName: keyof BoardGame = csv[0][colIndex];

      if (columnName === "name" && !property) {
        throw new Error(`nameが設定されていません: ${rowIndex + 1}行目.`);
      } else if (columnName === "code" && !property) {
        throw new Error(`codeが設定されていません: ${rowIndex + 1}行目.`);
      } else if (columnName !== "") {
        game[columnName] = property !== "" ? property : null;
      }
    }
    list.push(game);
  }

  return list;
};
