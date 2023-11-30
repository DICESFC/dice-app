import { useAuthState } from "@/hooks/useAuthState";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import CommonLoading from "../common/CommonLoading";

/*———————————–
  これで囲んだコンテンツは非メンバーに見えない
  TODO: スケルトン使いたい
———————————–*/
type Props = {
  children: ReactNode;
  adminOnly?: boolean;
  memberOnly?: boolean;
};

const Auth: FC<Props> = ({
  children,
  memberOnly = true,
  adminOnly = false,
}: Props) => {
  const { isLoading, isSignedIn, userData } = useAuthState();
  const router = useRouter();

  const isAuthenticated =
    isSignedIn && userData &&
    (!adminOnly || userData.isAdmin) &&
    (!memberOnly || userData.isMember);

  //認証だめやろがい！の場合
  if (!isLoading && !isAuthenticated) {
    router.replace("/login");
    return <CommonLoading />;
  }

  if (isLoading || !userData)
    return <CommonLoading>ログインしています...</CommonLoading>;

  //何もなければ次へ（そのまま処理）
  return <>{children}</>;
};

export default Auth;
