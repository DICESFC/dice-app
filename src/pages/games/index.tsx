import { NextPageWithLayout } from "@/interfaces/common";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import HomeLayout, { navigationPadding } from "@/layouts/HomeLayout/HomeLayout";
import Auth from "@/components/auth/Auth";
import Head from "next/head";

/*———————————–
  ボドゲ一覧画面
———————————–*/
const Games: NextPageWithLayout = () => {
  return <BoardGameBrowser allowBorrow sx={{ pb: `${navigationPadding}px` }} />;
};

Games.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>ボドゲリスト - DICE</title>
      </Head>

      <Auth>
        <HomeLayout>{page}</HomeLayout>
      </Auth>
    </>
  );
};

export default Games;
