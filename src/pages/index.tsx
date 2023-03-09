import { FC } from "react";
import { Container, Typography, Box, Button, Card } from "@mui/material";
import MembershipCard from "@/components/home/MembershipCard";

const Home: FC = () => {
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

export default Home;
