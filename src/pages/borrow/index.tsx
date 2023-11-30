import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";

import axios from "axios";
import Auth from "@/components/auth/Auth";
import Head from "next/head";

/*———————————–
  レンタル画面
———————————–*/
const Borrow: NextPageWithLayout = () => {
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
          現状は開発用のあれこれ置き場
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

      <Auth>
        <HomeLayout>{page}</HomeLayout>
      </Auth>
    </>
  );
};

export default Borrow;
