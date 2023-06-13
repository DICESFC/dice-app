import { BoardGame } from "@/interfaces/boardgame";

//================
//ボドゲをレンタルできるかどうかを判定するロジック ＆ テキスト
//================
export const checkCanBorrow = (
  game: BoardGame
): { canBorrow: boolean; canBorrowLabel: string } => {
  if (game.prohibitBorrow) {
    return { canBorrow: false, canBorrowLabel: "貸出不可" };
  } else if (game.isBorrowedNow) {
    return { canBorrow: false, canBorrowLabel: "貸出中" };
  } else {
    return { canBorrow: true, canBorrowLabel: "貸出可" };
  }
};
