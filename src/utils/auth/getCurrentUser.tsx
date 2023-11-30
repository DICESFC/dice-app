import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin, firestore } from "@/api/init-firebase-admin";
import { User } from "@/interfaces/user";

export type UserAuthInfo = {
  uid: string;
  email?: string;
  data: User;
};

/*———————————–
  サーバーサイド側で現在のユーザー情報を認証＆取得するやつ
———————————–*/
export const authenticateCurrentUser = async (
  ctx: GetServerSidePropsContext
): Promise<UserAuthInfo> => {
  const cookies = nookies.get(ctx);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.auth_token);

  // the user is authenticated!
  const { uid, email } = token;
  const user = await firestore.collection("users").doc(uid).get();

  return {
    uid,
    email,
    data: { ...(user.data() as User), id: uid },
  };
};
