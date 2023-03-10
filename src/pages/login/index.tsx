import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button, Typography } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from "@/hooks/useAuthState";

import Image from "@/components/common/Image";
import GoogleLoginButton from "@/components/auth/GoogleButton";
import { useRouter } from "next/router";
import CommonError from "@/components/common/CommonError";

/*———————————–
  ログイン画面
———————————–*/
const Login: NextPageWithLayout = () => {
  const { isSignedIn, isError, userInfo } = useAuthState();
  const router = useRouter();

  //正常にログインした状態ならホームへ
  if (isSignedIn && userInfo.isMember) {
    router.replace("/");
  }

  const signInWithGoogle = async () => {
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

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Box
          sx={{
            marginX: "auto",
            maxWidth: "65%",
            height: "auto",
            mb: 2,
          }}
        >
          <Image
            src="/resources/logo/dicelogo.png"
            alt="DICEロゴ"
            width="700"
            height="700"
            priority={true}
          />
        </Box>

        <Box sx={{ mb: 1 }}>
          <GoogleLoginButton onClick={signInWithGoogle} />
        </Box>
        <Typography variant="caption">ログインするには？</Typography>

        {isError && (
          <CommonError title="認証エラー">
            Google認証に失敗しました。
            <br />
            keio.jpアカウントにログインできているかを再度確認して下さい。
          </CommonError>
        )}

        {isSignedIn && !userInfo.isMember && (
          <CommonError title="権限エラー" severity="warning">
            アプリの閲覧権限がありません。
            <br />
            サークルへお問い合わせ下さい。
          </CommonError>
        )}
      </Box>
    </Container>
  );
};

export default Login;
