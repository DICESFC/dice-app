import {
  getAuth,
  signInWithPopup,
  signOut as signOutFirebase,
  GoogleAuthProvider,
  getIdToken,
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
    const user = await signInWithPopup(auth, provider);
    const idToken = auth.currentUser;
    console.log("login:", user);
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
