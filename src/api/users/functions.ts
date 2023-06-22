import { DEFAULT_MAX_BORROW_POINT } from "@/constants/constants";
import { User, UserCreateData, UserUpdateData } from "@/interfaces/user";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();
const usersCollectionRef = collection(db, "users");

const auth = getAuth();
//===================
//* ユーザーを作成する
//===================
export const createUser = async (userCreateData: UserCreateData) => {
  try {
    //auth上でユーザーを作成する
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userCreateData.email,
      generateRandomPassword()
    );
    const uid = userCredential.user.uid;

    //初期値設定＆不足情報を補う
    //ここ書き方改善したい
    const userData: UserUpdateData = {
      id: uid,
      name: userCreateData.name,
      //一応セキュリティ怖いのでEmailはなしで
      //email: userCreateData.email,

      //権限設定
      isMember:
        userCreateData.isMember === undefined ? true : userCreateData.isMember,
      isAdmin:
        userCreateData.isAdmin === undefined ? false : userCreateData.isAdmin,

      //貸し出し関連のポイント
      maxBorrowPoint:
        userCreateData.isAdmin === undefined
          ? DEFAULT_MAX_BORROW_POINT
          : userCreateData.maxBorrowPoint,
      usedBorrowPoint: 0,
    };

    //FireStoreでユーザー情報登録
    await setUserData(userData, uid);
  } catch (e) {
    console.error(e);
  }
};

//===================
//* FireStore上でユーザーを設定する
//===================
export const setUserData = async (userData: UserUpdateData, uid: string) => {
  const docRef = doc(usersCollectionRef, uid);
  await updateDoc(docRef, { ...userData, id: uid });
};

//===================
//* 登録用にパスワードを生成。実際に使うのはGoogleログイン
//* ほんとに実装これでいいのか？？
//===================
const generateRandomPassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 40;
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
};
