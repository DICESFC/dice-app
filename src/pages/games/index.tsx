import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import { useAuthState } from "@/hooks/useAuthState";
import Auth from "@/components/auth/Auth";

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

Games.getLayout = (page) => {
  return (
    <Auth>
      <HomeLayout>{page}</HomeLayout>
    </Auth>
  );
};

export default Games;
