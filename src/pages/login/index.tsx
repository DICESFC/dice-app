import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button, Typography } from "@mui/material";

import { useAuthState } from "@/hooks/useAuthState";
import { signInWithGoogle } from "@/features/auth/functions";

import Image from "@/components/common/Image";
import GoogleLoginButton from "@/components/auth/GoogleButton";
import { useRouter } from "next/router";
import CommonError from "@/components/common/CommonError";
import Link from "next/link";

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
            priority
          />
        </Box>

        <Box sx={{ mb: 1 }}>
          <GoogleLoginButton onClick={signInWithGoogle} />
        </Box>
        <Typography variant="caption" sx={{ display: "block" }}>
          ログインするには？
        </Typography>

        <Box sx={{ mt: 9 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            \ ボドゲリスト公開中 /
          </Typography>
          <Link href="/welcome" style={{ textDecoration: "none" }}>
            <Button variant="outlined" size="large">
              新歓ページはこちら
            </Button>
          </Link>
        </Box>
      </Box>

      {isError && (
        <CommonError title="認証エラー">
          Google認証に失敗しました。
          <br />
          keio.jpアカウントで再ログインしてみて下さい。
        </CommonError>
      )}

      {isSignedIn && !userInfo.isMember && (
        <CommonError title="権限エラー" severity="warning">
          アプリの閲覧権限がありません。
          <br />
          サークルへお問い合わせ下さい。
        </CommonError>
      )}
    </Container>
  );
};

export default Login;
