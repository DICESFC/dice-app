import { updateBoardGameDataByID } from "./../games/api/functions";
import { BoardGame } from "@/interfaces/boardgame";
import { BorrowData } from "@/interfaces/borrow";
import { User } from "@/interfaces/user";
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
export const borrowBoardGame = async (game: BoardGame, user: User) => {
  try {
    const canBorrow = await checkCanBorrow(game);
    if (!canBorrow) {
      return {
        status: "fail",
        message: "このボードゲームは現在レンタルされています",
      };
    }

    const jstOffset = +((new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);

    // 取得できる値は必ず日本時間になる
    const jstNow = new Date(Date.now() + jstOffset);
    // 1日は86400000ミリ秒なので、それを7日分追加
    const dueDate = new Date(jstNow.getTime() + 7 * 86400000);

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
    return { status: "fail", message: "エラーが発生しました" };
  }
};

//===================
//* ボドゲを返す
//===================
export const returnBoardGame = async (game: BoardGame, user: User) => {
  try {
    console.log(game, user);
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
      message: "エラーが発生しました",
    };
  }
};
