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
        width: "100%",
      }}
    >
      <BoardGameBrowser />
    </Box>
  );
};

export default Games;
