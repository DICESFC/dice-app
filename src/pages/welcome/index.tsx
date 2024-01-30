import { NextPageWithLayout } from "@/interfaces/common";
import { Box, Button } from "@mui/material";
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

        <Button
        variant = "contained" 
        size = "large" 
        sx={{
          fontWeight: "600",
          position: "fixed",
          width: "84.4%",          
          bottom: "3%",
          left: "7.2%",
          zIndex: "99999",
          borderRadius: "20px",
          //margin: "5%",
          }}
          href="https://docs.google.com/spreadsheets/d/13ZoSeHn0RfN7p8H0FeyRUISnXinnQXaVJfB41_M0Xrg/edit#gid=1797793016"
        >
          入会希望者はここをタップ！!
        </Button>

        <BoardGameBrowser />
      </Box>
    </>
  );
};

export default Games;
