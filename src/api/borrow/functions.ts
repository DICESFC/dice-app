import { MAX_BORROW_DAYS } from "@/constants/constants";
import {
  getBoardGameData,
  updateBoardGameDataByID,
} from "./../games/api/functions";
import { BoardGame } from "@/interfaces/boardgame";
import { BorrowData, ConbinedBorrowData } from "@/interfaces/borrow";
import { User } from "@/interfaces/user";
import { getCurrentTime } from "@/utils/borrow/borrowDue";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();
const gamesCollectionRef = collection(db, "games");
const borrowCollectionRef = collection(db, "borrow");

//===================
//* ボドゲを借りられるかどうかのチェック
//===================
export const checkCanBorrow = async (game: BoardGame) => {
  //isBorrowedNowフラグが立ってるなら話が早い
  if (game.isBorrowedNow) {
    console.log("isBorrowedNowフラグが立っています: ", game);
    return false;
  }
  if (game.prohibitBorrow) {
    console.log("prohibitBorrowフラグが立っています: ", game);
    return false;
  }

  const q = query(
    borrowCollectionRef,
    where("gameID", "==", game.id),
    where("active", "==", true)
  );
  const activeBorrowData = await getDocs(q);

  //中間テーブルにアクティブな貸し出しデータがある場合
  if (activeBorrowData.docs.length) {
    console.log(
      "found borrow data:",
      activeBorrowData.docs.map((doc) => doc.data())
    );
    return false;
  }

  //すべての条件をクリアした場合
  return true;
};

//===================
//* ボドゲを借りる
//===================
export const borrowBoardGame = async (
  game: BoardGame,
  user: User | undefined
) => {
  try {
    if (!user) throw new Error("ユーザーデータが存在しません");

    const canBorrow = await checkCanBorrow(game);
    if (!canBorrow) {
      return {
        status: "fail",
        message: "このボードゲームは現在レンタルされています",
      };
    }

    const jstNow = getCurrentTime();
    // 7日後
    const dueDate = new Date(jstNow.getTime() + MAX_BORROW_DAYS);

    const borrowData: BorrowData = {
      uid: user.id,
      gameID: game.id,
      borrowedAt: jstNow.getTime(),
      dueDate: dueDate.getTime(),
      active: true,
      gameName: game.name,
      userName: user.name,
    };

    //borrowコレクション上で借入データを追加
    console.log("new borrow: ", borrowData);
    const docRef = await addDoc(borrowCollectionRef, borrowData);

    //gamesコレクション上でisBorrowedNowフラグを立てる
    await updateBoardGameDataByID({
      id: game.id,
      isBorrowedNow: true,
    });

    console.log("successfully borrowed:", game, user);
    return { status: "success", ref: docRef };
  } catch (error) {
    console.error(error);
    return { status: "fail", message: `エラーが発生しました: ${error}` };
  }
};

//===================
//* ボドゲを返す
//===================
export const returnBoardGame = async (
  game: BoardGame,
  user: User | undefined
) => {
  try {
    if (!user) throw new Error("ユーザーデータがありません");

    //現在のレンタルデータを取得する
    const q = query(
      borrowCollectionRef,
      where("gameID", "==", game.id),
      where("uid", "==", user.id),
      where("active", "==", true)
    );
    const activeBorrowData = await getDocs(q);

    //返す対象がない場合
    if (!activeBorrowData.docs.length) {
      return {
        status: "fail",
        message: "貸し出し登録が見つかりませんでした",
      };
    }

    //borrowコレクションとgamesを編集
    //何らかの原因でactiveなデータが複数あった場合のために一応全部falseにできる処理にしとく
    for (const document of activeBorrowData.docs) {
      const borrowData = document.data() as BorrowData;
      const docRef = doc(db, "borrow", document.id);

      //borrow上で編集
      console.log("return game: ", borrowData);
      updateDoc(docRef, { active: false });

      //games上で編集
      updateBoardGameDataByID({
        id: borrowData.gameID,
        isBorrowedNow: false,
      });
    }

    //成功した場合
    return {
      status: "success",
      message: `${activeBorrowData.docs[0].data().name}の返却が完了しました`,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "fail",
      message: `エラーが発生しました: ${error}`,
    };
  }
};

//===================
//* ユーザーのレンタル情報を取得
//===================
export const getBorrowDataByUser = async (user: User, active?: boolean) => {
  //取得条件
  const queryArray = [where("uid", "==", user.id)];

  //activeが引数に指定されているなら、対象の状態のレンタルのみを収集
  if (active != undefined) {
    queryArray.push(where("active", "==", active));
  }

  //データ取得
  const q = query(borrowCollectionRef, ...queryArray);
  const activeBorrowRef = await getDocs(q);

  //データを返す
  return activeBorrowRef.docs.map((doc) => doc.data() as BorrowData);
};

//===================
//* ユーザーの借り入れ情報を取得する
//* 第二引数のactiveで返却待ちかどうかを指定できる
//* バリバリにN+1問題が起きてるので注意。firestore側では対策が難しいのでlimit掛けるなどが必要かも
//* あとコード汚い。。
//===================
export const getBorrowedGameDataByUser = async (
  user: User,
  options?: { active?: boolean }
): Promise<ConbinedBorrowData[]> => {
  //レンタルデータを収集
  const activeBorrowData = await getBorrowDataByUser(
    user,
    options ? options.active : undefined
  );

  //ボドゲデータを収集
  const gameDatas = await Promise.all(
    activeBorrowData.map((borrowData) => {
      return getBoardGameData(where("id", "==", borrowData.gameID));
    })
  );

  //ボドゲ情報と貸出情報を合成したデータリストを作る
  const result = [];
  for (let i = 0; i < activeBorrowData.length; i++) {
    result.push({
      gameData: gameDatas[i][0],
      borrowData: activeBorrowData[i],
    });

    if (gameDatas[i].length != 1) {
      console.error("ボドゲデータに不備があります: ", activeBorrowData[i]);
    }
  }

  return result;
};

//===================
//* ユーザーによってボドゲが借りられているかどうか
//===================
export const isGameBorrowedByUser = async (
  game: BoardGame,
  user: User | undefined
) => {
  if (!user) return false;

  //現在のレンタルデータを取得する
  const q = query(
    borrowCollectionRef,
    where("gameID", "==", game.id),
    where("uid", "==", user.id),
    where("active", "==", true)
  );
  const activeBorrowData = await getDocs(q);

  //取得してきたdocsの数が1ならレンタル中
  return !!activeBorrowData.docs.length;
};
