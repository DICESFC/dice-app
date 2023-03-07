import { FC } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const Home: FC = () => {
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
        <Button href="/about" color="secondary">
          Go to the about page
        </Button>
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
      </Box>
    </Container>
  );
};

export default Home;
