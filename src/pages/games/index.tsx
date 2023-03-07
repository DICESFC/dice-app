import { FC } from "react";
import { Container, Box } from "@mui/material";

const About: FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ボドゲ一覧ページ
      </Box>
    </Container>
  );
};

export default About;
