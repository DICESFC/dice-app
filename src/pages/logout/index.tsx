import { NextPageWithLayout } from "@/interfaces/common";

import { useAuthState } from "@/hooks/useAuthState";
import { useRouter } from "next/router";
import { signOut } from "@/features/auth/functions";
import CommonLoading from "@/components/common/CommonLoading";
import { useEffect } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";

/*———————————–
  ログアウト
———————————–*/
const Logout: NextPageWithLayout = () => {
  const { isSignedIn, isLoading } = useAuthState();
  const router = useRouter();
  const isReady = router.isReady;
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    signOut();
  }, []);

  //ログイン状態でないなら戻る
  if (!isSignedIn && !isLoading && isReady) {
    router.replace("/login");
    openSnackbar("サインアウトに成功しました");
  }

  return <CommonLoading>サインアウト中...</CommonLoading>;
};

export default Logout;
