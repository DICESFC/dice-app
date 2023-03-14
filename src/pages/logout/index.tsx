import { NextPageWithLayout } from "@/interfaces/common";

import { useAuthState } from "@/hooks/useAuthState";
import { useRouter } from "next/router";
import { signOut } from "@/api/auth/functions";
import CommonLoading from "@/components/common/CommonLoading";
import { useEffect } from "react";

/*———————————–
  ログアウト
———————————–*/
const Logout: NextPageWithLayout = () => {
  const { isSignedIn, isLoading } = useAuthState();
  const router = useRouter();
  const isReady = router.isReady;

  useEffect(() => {
    signOut();
  }, [signOut]);

  //ログイン状態でないなら戻る
  if (!isSignedIn && !isLoading && isReady) {
    router.replace("/login");
  }

  return <CommonLoading>サインアウト中...</CommonLoading>;
};

export default Logout;
