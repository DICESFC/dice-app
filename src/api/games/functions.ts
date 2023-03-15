import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  QueryConstraint,
} from "firebase/firestore";
import type { BoardGame } from "../../interfaces/boardgame";

const db = getFirestore();
const gamesCollectionRef = collection(db, "games");

//===================
//* ボドゲ追加
//===================
export const createBoardGame = async (data: BoardGame) => {
  try {
    const gameData: BoardGame = {
      ...data,
      condition: "Unknown",
      isBorrowedNow: false,
      prohibitBorrow: !!data.prohibitBorrow,
      createdAt: new Date().getTime(),
    };
    const docRef = await addDoc(gamesCollectionRef, gameData);
    return { status: "success", ref: docRef };
  } catch (e) {
    throw new Error(`${e}`);
  }
};

//===================
//* ボドゲ取得
//* queryの条件, またはその配列を受け取る
//===================
export const getBoardGame = async (
  queryData: QueryConstraint[] | QueryConstraint
) => {
  try {
    //クエリを配列に変換
    const queryArray = Array.isArray(queryData) ? [...queryData] : [queryData];

    const q = query(gamesCollectionRef, ...queryArray);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as BoardGame);
  } catch (e) {
    throw new Error(`${e}`);
  }
};
