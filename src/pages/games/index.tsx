import { NextPageWithLayout } from "@/interfaces/common";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import HomeLayout, { navigationPadding } from "@/layouts/HomeLayout/HomeLayout";
import Head from "next/head";
import {
  UserAuthInfo,
  authenticateCurrentUser,
} from "@/utils/auth/getCurrentUser";

/*———————————–
  ボドゲ一覧画面
———————————–*/
export const Games: NextPageWithLayout<{ currentUser: UserAuthInfo }> = ({
  currentUser,
}) => {
  return <BoardGameBrowser allowBorrow sx={{ pb: `${navigationPadding}px` }} />;
};

Games.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>ボドゲリスト - DICE</title>
      </Head>

      <HomeLayout>{page}</HomeLayout>
    </>
  );
};

export default Games;
