import { firestore } from "@/api/init-firebase-admin";

//===================
//* uidからユーザーを取得する
//===================
export const getUserDataByUID = async (uid: string) => {
  const userData = await firestore.collection("users").doc(uid).get();
  console.log(userData);
};
