import {
  getAuth,
  signInWithPopup,
  signOut as signOutFirebase,
  GoogleAuthProvider,
} from "firebase/auth";

/*———————————–
  Googleサインイン
———————————–*/
export const signInWithGoogle = async () => {
  try {
    const auth = getAuth();

    // Googleプロバイダオブジェクトのインスタンスを作成
    const provider = new GoogleAuthProvider();
    // Googleでログイン
    const result = await signInWithPopup(auth, provider);
    console.log("login:", result);
  } catch (error) {
    console.error(error);
  }
};

/*———————————–
  サインアウト
———————————–*/
export const signOut = async () => {
  try {
    const auth = getAuth();
    await signOutFirebase(auth);
    console.log("サインアウト完了");
  } catch (error) {
    console.error(error);
  }
};
