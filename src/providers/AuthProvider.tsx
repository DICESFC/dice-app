import { User as FirebaseUser, getAuth } from "firebase/auth";
import nookies from "nookies";
import { useEffect, useState, createContext } from "react";

const AuthContext = createContext<{
  user: FirebaseUser | null;
}>({
  //firebase authのユーザー情報
  user: null,
});

// 認証周りのデータをバックエンドから引っ張ってくるやつ
export function AuthProvider({ children }: any) {
  const [firebaseUser, setUser] = useState<FirebaseUser | null>(null);

  // 認証トークンが変化した時にcookieに送信
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      //ログアウト時
      if (!user) {
        console.log("[AuthProvider]ログアウト状態を検出しました");
        setUser(null);
        nookies.set(undefined, "auth_token", "", { path: "/" });

        //ログイン時
      } else {
        console.log("[AuthProvider]ログイン状態を検出しました: ", user);
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "auth_token", token, { path: "/" });
      }
    });
  }, []);

  //10分ごとにトークンをリフレッシュする
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user: firebaseUser }}>
      {children}
    </AuthContext.Provider>
  );
}
