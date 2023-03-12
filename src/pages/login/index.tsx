import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button, Typography } from "@mui/material";
import Image from "@/components/common/Image";
import GoogleLoginButton from "@/components/auth/GoogleButton";

/*———————————–
  ログイン画面
———————————–*/
const Home: NextPageWithLayout = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Box
          sx={{
            marginX: "auto",
            maxWidth: "65%",
            height: "auto",
            mb: 2,
          }}
        >
          <Image
            src="/resources/logo/dicelogo.png"
            alt="DICEロゴ"
            width="700"
            height="700"
          />
        </Box>

        <Box sx={{ mb: 1 }}>
          <GoogleLoginButton />
        </Box>
        <Typography variant="caption">ログインするには？</Typography>
      </Box>
    </Container>
  );
};

export default Home;
