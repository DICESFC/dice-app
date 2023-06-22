import { NextPageWithLayout } from "@/interfaces/common";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import HomeLayout, { navigationPadding } from "@/layouts/HomeLayout/HomeLayout";
import Head from "next/head";
import {
  UserAuthInfo,
  authenticateCurrentUser,
} from "@/utils/auth/getCurrentUser";
import { GetServerSidePropsContext } from "next";

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const currentUser = await authenticateCurrentUser(ctx);
    //メンバー権限がない場合
    if (!currentUser.data.isMember) {
      throw new Error("ログイン状態が確認できませんでした");
    }

    return {
      props: { currentUser },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} as never };
  }
};

export default Games;
