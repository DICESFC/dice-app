import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Typography, Box, Button, Card } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import MembershipCard from "@/components/home/MembershipCard";
import Auth from "@/components/auth/Auth";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "@/api/init-firebase-admin";
import { getUserDataByUID } from "@/api/admin/users/functions";

/*———————————–
  ホーム画面
———————————–*/
const Home: NextPageWithLayout = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            mt: 2,
            px: 2,
          }}
        >
          <MembershipCard />
          {/*a*/}
        </Container>
      </Box>
    </Container>
  );
};

Home.getLayout = (page: React.ReactNode) => {
  return (
    <>
      <Head>
        <title>ホーム - DICE</title>
      </Head>

      <Auth>
        <HomeLayout>{page}</HomeLayout>
      </Auth>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(cookies.auth_token);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.auth_token);

    // the user is authenticated!
    const { uid, email } = token;

    await getUserDataByUID(uid);

    // FETCH STUFF HERE!! 🚀
    console.log(uid, email);
    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    //認証に失敗したらログインページへ
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    console.log(err);
    return { props: {} as never };
  }
};

export default Home;
