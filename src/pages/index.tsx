import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Typography, Box, Button, Card } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import MembershipCard from "@/components/home/MembershipCard";
import Auth from "@/components/auth/Auth";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "@/api/init-firebase-admin";

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

Home.getLayout = (page) => {
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
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.auth_token);

    // the user is authenticated!
    const { uid, email } = token;

    // FETCH STUFF HERE!! 🚀
    console.log(uid, email);
    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }
};

export default Home;
