import { FC } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

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
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Box maxWidth="sm">
          <Button href="/">Go to the home page</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
