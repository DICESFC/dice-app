import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

/**
 * useAuthState フックの戻り値の型
 */
export type AuthState = {
  isSignedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  userId: string | undefined;
  userInfo: {
    name: string | undefined;
    email: string | undefined;
    isAdmin: boolean;
    isMember: boolean;
  };
};

/**
 * useAuthState が返す初期値。
 */
const INITIAL_AUTH_STATE: AuthState = {
  isSignedIn: false,
  isError: false,
  isLoading: true,
  userId: undefined,
  userInfo: {
    name: undefined,
    email: undefined,
    isAdmin: false,
    isMember: false,
  },
};

/**
 * ユーザーのサインイン状態を取得するためのカスタムフック
 */
export const useAuthState = (): AuthState => {
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE);

  // サインイン状態の変化を監視する
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      try {
        if (user) {
          const docRef = doc(getFirestore(), "users", user.uid);
          const result = await getDoc(docRef);
          const data = result.data();

          const userInfo = data ? data : {};

          setAuthState({
            isSignedIn: true,
            isLoading: false,
            isError: false,
            userId: user.uid,
            userInfo: {
              name: userInfo.name || undefined,
              email: userInfo.email || undefined,
              isAdmin: userInfo.isAdmin || false,
              isMember: userInfo.isMember || false,
            },
          });
        } else {
          setAuthState({ ...INITIAL_AUTH_STATE, isLoading: false });
        }
      } catch (e) {
        //登録されていないユーザーなど
        console.error(e);
        setAuthState({
          ...INITIAL_AUTH_STATE,
          isLoading: false,
          isError: true,
        });
      }
    });

    // ページ遷移時にサインイン状態の監視を解除
    return () => unsubscribe();
  }, []);

  return authState;
};
