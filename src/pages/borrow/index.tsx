import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";

import Head from "next/head";
import {
  UserAuthInfo,
  authenticateCurrentUser,
} from "@/utils/auth/getCurrentUser";
import { GetServerSidePropsContext } from "next";

/*———————————–
  レンタル画面
———————————–*/
const Borrow: NextPageWithLayout<{ currentUser: UserAuthInfo }> = ({
  currentUser,
}) => {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          レンタルページ
          <br />
          現状は開発用のあれこれ置き場です
        </Box>
      </Container>
    </>
  );
};

Borrow.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>ボドゲレンタル - DICE</title>
      </Head>

      <HomeLayout>{page}</HomeLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const currentUser = await authenticateCurrentUser(ctx);
    //メンバー権限がない場合
    if (!currentUser.data.isMember) {
      throw new Error("ログイン状態が確認できませんでした");
    }

    return {
      props: { currentUser },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} as never };
  }
};

export default Borrow;
