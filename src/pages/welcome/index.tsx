import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";

/*———————————–
  ボドゲ一覧画面
———————————–*/
const Games: NextPageWithLayout = () => {
  return (
    <Container maxWidth="lg">
      <BoardGameBrowser allowBorrow />
    </Container>
  );
};

export default Games;
