import { NextPageWithLayout } from "@/interfaces/common";
import { Container,Link, Typography, Box, Button, Card } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import MembershipCard from "@/components/home/MembershipCard";
import Auth from "@/components/auth/Auth";
import Head from "next/head";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


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
         
         <Button variant="outlined" href="./admin" startIcon={< AdminPanelSettingsIcon/>}>
           Admin
         </Button>
         {/* .がpwdでそっから相対パス */}
         
          <MembershipCard />
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
