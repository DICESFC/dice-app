import { NextPageWithLayout } from "@/interfaces/common";
import { Box } from "@mui/material";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";

/*———————————–
  ボドゲ一覧画面
———————————–*/
const Games: NextPageWithLayout = () => {
  return (
    <Box
      style={{
        height: "100vh",
      }}
    >
      <BoardGameBrowser />
    </Box>
  );
};

export default Games;
