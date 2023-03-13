import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import type { BoardGame } from "../../interfaces/boardgame";

const db = getFirestore();
const boardGamesCollectionRef = collection(db, "games");

//===================
//*
//* ボドゲ取得
//*
//===================
export const getBoardGame = async () => {
  try {
    const gameSnap = await getDocs(boardGamesCollectionRef);
    return gameSnap.docs.map((doc) => {
      return doc.data() as BoardGame;
    });
  } catch (e) {
    throw new Error(`${e}`);
  }
};

//===================
//*
//* ボドゲ追加
//*
//===================
export const createBoardGame = async (data: BoardGame) => {
  const docRef = await addDoc(boardGamesCollectionRef, data);
  return { status: "success", ref: docRef };
};
