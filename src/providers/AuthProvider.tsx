import { User, getAuth } from "firebase/auth";
import nookies from "nookies";
import { useEffect, useState, createContext } from "react";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  // 認証トークンが変化した時にcookieに送信
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("[AuthProvider]ログアウト状態を検出しました");
        setUser(null);
        nookies.set(undefined, "auth_token", "", { path: "/" });
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
