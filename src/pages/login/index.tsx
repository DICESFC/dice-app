import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button, Typography } from "@mui/material";

import { useAuthState } from "@/hooks/useAuthState";
import { signInWithGoogle } from "@/api/auth/functions";

import Image from "@/components/common/Image";
import GoogleLoginButton from "@/components/auth/GoogleButton";
import { useRouter } from "next/router";
import CommonError from "@/components/common/CommonError";
import Link from "next/link";
import CircleInstructionDialog from "@/components/welcome/CircleInstructionDialogue";
import { useState } from "react";

/*———————————–
  ログイン画面
———————————–*/
const Login: NextPageWithLayout = () => {
  const { isSignedIn, isError, userInfo } = useAuthState();
  const router = useRouter();
  const [isCircleInstructionOpen, setIsCircleInstructionOpen] =
    useState<boolean>(false);

  //正常にログインした状態ならホームへ
  if (isSignedIn && userInfo.isMember) {
    router.replace("/");
  }

  return (
    <>
      <CircleInstructionDialog
        open={isCircleInstructionOpen}
        onClose={() => setIsCircleInstructionOpen(false)}
      />
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
          <Typography
            variant="caption"
            sx={{ display: "block", cursor: "pointer" }}
            onClick={() => setIsCircleInstructionOpen(true)}
          >
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
          <CommonError title="認証に失敗しました">
            アカウントが発行されていない可能性があります。
            <br />
            keio.jpアカウントで再度ログインしてみてください。
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
    </>
  );
};

export default Login;
