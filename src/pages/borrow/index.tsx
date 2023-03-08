import { FC } from "react";
import { Container, Box, Button } from "@mui/material";
import axios from "axios";
import { BoardGame } from "@/interfaces";

const About: FC = () => {
  const submit = async () => {
    const game: BoardGame = {
      name: "カタン",
      condition: "Good",
      canBorrow: true,
      playTime: 60,
      createdAt: new Date().getTime(),
    };
    await axios.post("/api/game", game);
  };

  const get = async () => {
    const res = await axios.get("api/game");
    console.log(res.data);
  };

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
        レンタルページ
        <br />
        現状は開発用のあれこれ置き場です
        <Button sx={{ mt: 2 }} variant="contained" onClick={submit}>
          送信
        </Button>
        <Button sx={{ mt: 2 }} variant="contained" onClick={get}>
          取得
        </Button>
      </Box>
    </Container>
  );
};

export default About;
