import { NextPageWithLayout } from "@/interfaces/common";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import HomeLayout, {
  navigationPadding,
} from "@/components/layouts/HomeLayout/HomeLayout";
import Auth from "@/components/auth/Auth";

/*———————————–
  ボドゲ一覧画面
———————————–*/
const Games: NextPageWithLayout = () => {
  return <BoardGameBrowser allowBorrow sx={{ pb: `${navigationPadding}px` }} />;
};

Games.getLayout = (page) => {
  return (
    <Auth>
      <HomeLayout>{page}</HomeLayout>
    </Auth>
  );
};

export default Games;
