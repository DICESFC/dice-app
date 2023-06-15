import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Typography, Box, Button, Card } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import MembershipCard from "@/components/home/MembershipCard";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import {
  UserAuthInfo,
  authenticateCurrentUser,
} from "@/utils/auth/getCurrentUser";

/*———————————–
  ホーム画面
———————————–*/
const Home: NextPageWithLayout<{ currentUser: UserAuthInfo }> = ({
  currentUser,
}) => {
  return <Container maxWidth="lg">破壊してやったぜ！！</Container>;
};

Home.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>ホーム - DICE</title>
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

export default Home;
