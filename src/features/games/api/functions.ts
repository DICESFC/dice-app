import { getNgram } from "@/features/games/utils";
import { BoardGameUpdateQuery } from "../../../interfaces/boardgame";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  QueryConstraint,
  QuerySnapshot,
  updateDoc,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import type {
  BoardGame,
  BoardGameAddQuery,
} from "../../../interfaces/boardgame";
import { uploadImage } from "../../storage/api/functions";
import { generateBoardGameID } from "../utils";

const db = getFirestore();
const gamesCollectionRef = collection(db, "games");

//このURLのサムネイルはダウンロードしない(主にNot Found系のやつ)
const excludeThumbnailURLs: string[] = [
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box.jpg",
];

//===================
//* ボドゲ追加
//===================
export const createBoardGame = async (data: BoardGameAddQuery) => {
  console.log("create boardgame:", data.name, data.code);
  try {
    const gameData: BoardGame = {
      ...data,
      id: await generateBoardGameID(data.id),
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

    //検索用nGramを生成して適用する
    //日本語, 英語のそれぞれでngramを獲得した後合成
    const jpNgram = getNgram(data.name);
    const enNgram = data.englishName ? getNgram(data.englishName) : {};
    gameData.ngramField = { ...jpNgram, ...enNgram };

    //データを登録する
    const docRef = await addDoc(gamesCollectionRef, gameData);
    console.log("successfully created:", data.name, data.code, data);
    return { status: "success", ref: docRef };
  } catch (e) {
    throw new Error(`${e}`);
  }
};

//===================
//* ボドゲのSnapshotを取得。ボドゲブラウザーとかで使う
//* queryの条件, またはその配列を受け取る
//===================
export const getBoardGameSnapshot = async (
  queryData: QueryConstraint[] | QueryConstraint
): Promise<QuerySnapshot> => {
  try {
    //クエリを配列に変換
    const queryArray = Array.isArray(queryData) ? queryData : [queryData];

    const q = query(gamesCollectionRef, ...queryArray);
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

//===================
//* ボドゲ取得
//* queryの条件, またはその配列を受け取る
//===================
export const getBoardGameData = async (
  queryData: QueryConstraint[] | QueryConstraint
) => {
  try {
    const querySnapshot = await getBoardGameSnapshot(queryData);
    return querySnapshot.docs.map((doc) => doc.data() as BoardGame);
  } catch (e) {
    throw new Error(`${e}`);
  }
};

//===================
//* ボドゲ更新
//* idでSnapShotを特定し、それを対象に更新する
//===================
export const updateBoardGameDataByID = async (query: BoardGameUpdateQuery) => {
  try {
    console.log("update game: ", query);

    const querySnapshot = await getBoardGameSnapshot(
      where("id", "==", query.id)
    );

    //更新対象のエラー処理
    if (!querySnapshot.docs.length) {
      throw new Error(
        `ID"${query.id}"のゲームが存在しません。データベースの修正が必要です。`
      );
    } else if (querySnapshot.docs.length > 1) {
      throw new Error(
        `ID"${query.id}"のゲームが複数あります。データベースの修正が必要です。`
      );
    }

    const docRef = doc(db, "games", querySnapshot.docs[0].id);
    await updateDoc(docRef, query);

    return await getDoc(docRef);
  } catch (e) {
    throw new Error(`${e}`);
  }
};
