import { getAuth } from "firebase/auth";
import nookies from "nookies";
import { useEffect, useState, createContext } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { User } from "@/interfaces/user";
import { User as FirebaseUser } from "firebase/auth";

//ログイン状態, 会員情報, ロード情報などを格納するオブジェクト
export type AuthState = {
  isSignedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  userData?: User;
};

const INITIAL_AUTH_STATE: AuthState = {
  isSignedIn: false,
  isError: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthState>(INITIAL_AUTH_STATE);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined);
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE);

  //ユーザー情報を取得する
  useEffect(() => {
    (async () => {
      //まだGoogleログインをしていない場合
      try {
        if (user === undefined) {
          setAuthState({
            ...authState,
            isSignedIn: false,
            isLoading: true,
            isError: false,
          });
        }
        else if (user === null) {
          setAuthState({
            ...authState,
            isSignedIn: false,
            isLoading: false,
            isError: false,
          });

          //Googleログインが済んでいる場合
        } else {
          setAuthState({
            ...authState,
            isLoading: true,
            isError: false,
          });

          const docRef = doc(getFirestore(), "users", user.uid);
          const result = await getDoc(docRef);
          const userData = result.data() as User;

          setAuthState({
            ...authState,
            userData: { ...userData, id: user.uid },
            isLoading: false,
            isError: false,
            isSignedIn: true,
          });
        }

        //情報取得に失敗した場合
      } catch (e) {
        console.error(e);
        setAuthState({
          ...INITIAL_AUTH_STATE,
          isLoading: false,
          isError: true,
        });
      }
    })();
  }, [user]);

  // 認証トークンが変化した時にcookieに送信
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        //console.log("[AuthProvider]ログアウト状態を検出しました");
        setUser(null);
        nookies.set(undefined, "auth_token", "", { path: "/" });
      } else {
        //console.log("[AuthProvider]ログイン状態を検出しました: ", user);
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
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
