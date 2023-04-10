import { NextPageWithLayout } from "@/interfaces/common";
import { Box } from "@mui/material";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import Head from "next/head";

/*———————————–
  ボドゲ一覧画面
———————————–*/
const Games: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>新歓ページ - DICE</title>
      </Head>

      <Box
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <BoardGameBrowser />
      </Box>
    </>
  );
};

export default Games;
