import { BoardGame } from "@/interfaces/boardgame";
import { BorrowData } from "@/interfaces/borrow";
import { User } from "@/interfaces/user";
import { getFirestore, collection } from "firebase/firestore";

const db = getFirestore();
const gamesCollectionRef = collection(db, "games");

//===================
//* ボドゲを借りられるかどうかのチェック
//===================
const checkCanBorrow = async (game: BoardGame) => {};

//===================
//* ボドゲを借りる
//===================
const borrowBoardGame = async (game: BoardGame, user: User) => {
  const jstOffset = +((new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);

  // 取得できる値は必ず日本時間になる
  const jstNow = new Date(Date.now() + jstOffset);
  /*
  const borrowData: BorrowData = {
    uid: user.id,
    gameID: game.id,
    borrowedAt: jstNow.getTime(),
    dueDate: 
  }
  */
};
