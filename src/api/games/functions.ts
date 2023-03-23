import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  QueryConstraint,
} from "firebase/firestore";
import type { BoardGame } from "../../interfaces/boardgame";
import { uploadImage } from "../storage/functions";

const db = getFirestore();
const gamesCollectionRef = collection(db, "games");

//===================
//* ボドゲ追加
//===================

//このURLのサムネイルはダウンロードしない(主にNot Found系のやつ)
const excludeThumbnailURLs: string[] = [
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box.jpg",
];

export const createBoardGame = async (data: BoardGame) => {
  console.log("create boardgame:", data.name, data.code);
  try {
    const gameData: BoardGame = {
      ...data,
      thumbnail: "",
      condition: "Unknown",
      isBorrowedNow: false,
      prohibitBorrow: !!data.prohibitBorrow,
      createdAt: new Date().getTime(),
    };

    //サムネイルをアップロードして指定
    //atras等のサムネイルなし画像は除外
    if (data.thumbnail && !excludeThumbnailURLs.includes(data.thumbnail)) {
      const thumbnailURL = await uploadImage(
        data.thumbnail,
        //ファイル名の先頭はできるだけ英語に
        data.englishName ? data.englishName : data.name
      );
      gameData.thumbnail = thumbnailURL;
    }

    const docRef = await addDoc(gamesCollectionRef, gameData);
    console.log("successfully created:", data.name, data.code);
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
