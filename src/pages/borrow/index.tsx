import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";

import axios from "axios";
import Auth from "@/components/auth/Auth";

/*———————————–
  レンタル画面
———————————–*/
const Borrow: NextPageWithLayout = () => {
  const submit = async () => {
    const game: BoardGame = {
      name: "カタン",
      code: "00000000",
      condition: "Good",
      prohibitBorrow: false,
      isBorrowedNow: false,
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

Borrow.getLayout = (page) => {
  return (
    <Auth>
      <HomeLayout>{page}</HomeLayout>
    </Auth>
  );
};

export default Borrow;
