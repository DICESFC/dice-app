import { getNgram } from "@/api/games/utils";
import { BoardGameUpdateQuery } from "../../interfaces/boardgame";
import { firestore } from "../init-firebase-admin";
import type { BoardGame, BoardGameAddQuery } from "../../interfaces/boardgame";
import { uploadImage } from "../storage/functions";
import { generateBoardGameID } from "./utils";
import { Query, WhereFilterOp } from "firebase-admin/firestore";

const gamesRef = firestore.collection("games");

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
    const docRef = await gamesRef.add(gameData);
    console.log("successfully created:", data.name, data.code, data);
    return { status: "success", ref: docRef };
  } catch (e) {
    throw new Error(`${e}`);
  }
};

//===================
//* ボドゲ取得
//* where条件たちを受け取る
//===================
export const getBoardGameData = async (queryData: {
  where?: [string, WhereFilterOp, any][];
  startAt?: string;
  endAt?: string;

  //未使用
  orderBy?: string;
}) => {
  try {
    let query = gamesRef as Query;

    //where条件を連鎖させる
    if (queryData.where) {
      for (const whereQuery of queryData.where) {
        query = query.where(...whereQuery);
      }
    }

    //ここひどい書き方。。読んでる人ごめんね
    query = queryData.startAt ? query.startAt(queryData.startAt) : query;
    query = queryData.endAt ? query.endAt(queryData.endAt) : query;

    const querySnapshot = await query.get();

    //データを取得
    const data = querySnapshot.docs.map((doc) => doc.data() as BoardGame);
    return data;
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

    //IDでゲームを検索
    const querySnapshot = await gamesRef.where("id", "==", query.id).get();

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

    const docRef = gamesRef.doc(`games/${querySnapshot.docs[0].id}`);
    await docRef.update(query);

    return await docRef.get();
  } catch (e) {
    throw new Error(`${e}`);
  }
};
