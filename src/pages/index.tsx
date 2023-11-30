import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Link, Typography, Box, Button, Card } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import MembershipCard from "@/components/home/MembershipCard";
import Head from "next/head";
import { UserAuthInfo } from "@/utils/auth/getCurrentUser";
import BorrowedGames from "@/components/home/BorrowedGames/BorrowedGames";
import Auth from "@/components/auth/Auth";
import { useAuthState } from "@/hooks/useAuthState";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

/*———————————–
  ホーム画面
———————————–*/
const Home: NextPageWithLayout<{ currentUser: UserAuthInfo }> = () => {
  const { userData } = useAuthState();

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
          {/* .がpwdでそっから相対パス */}
          <Button
            variant="outlined"
            href="./admin"
            startIcon={<AdminPanelSettingsIcon />}
          >
            Admin
          </Button>

          {/* メンバーカード */}
          <MembershipCard user={userData} />

          {/* 現在借りているゲーム */}
          <BorrowedGames user={userData} />
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

export default Home;
