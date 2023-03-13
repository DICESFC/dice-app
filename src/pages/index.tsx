import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Typography, Box, Button, Card } from "@mui/material";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import MembershipCard from "@/components/home/MembershipCard";
import Auth from "@/components/auth/Auth";

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
          my: 3,
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
        </Container>
      </Box>
    </Container>
  );
};

Home.getLayout = (page) => {
  return (
    <Auth>
      <HomeLayout>{page}</HomeLayout>
    </Auth>
  );
};

export default Home;
