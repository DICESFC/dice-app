import { AuthContext, AuthState } from "@/providers/AuthProvider";
import { useContext } from "react";

/**
 * ユーザーのサインイン状態を取得するためのカスタムフック
 */
export const useAuthState = (): AuthState => {
  return useContext(AuthContext);
};
