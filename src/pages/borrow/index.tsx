import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button, Typography } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import Head from "next/head";
import { useState } from "react";
import Scanner from "@/components/common/Scanner";
import { getBoardGameData } from "@/api/games/api/functions";
import { useQuery } from "react-query";
import { where } from "firebase/firestore";
import { useEffect } from "react";

import Auth from "@/components/auth/Auth";
import { useRouter } from "next/router";

/*———————————–
  レンタル画面
———————————–*/
const Borrow: NextPageWithLayout = () => {
  const [camera, setCamera] = useState<boolean>(false);
  const [code, setCode] = useState<null | number>(null);

  const router = useRouter();

  const onDetected = (result: string) => {
    setCode(Number(result));
  };

  const { data, refetch } = useQuery(
    ["get-board-game", code],
    async () => getBoardGameData(where("code", "==", code)),
    { enabled: false }
  );

  useEffect(() => {
    if (code !== null) refetch();
  }, [code, refetch]);

  useEffect(() => {
    setCamera(true);
  });

  if (data && data.length) {
    console.log(data);
    const boardGameId = data[0].id;
    router.push(`games/${boardGameId}`);
  }

  return (
    <>
      <Container w-full>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography>
            この機能を使用する場合はカメラ使用を許可してね！
          </Typography>
          <Button variant="contained" onClick={() => setCamera(!camera)}>
            {camera ? "停止する" : "カメラ表示"}
          </Button>
          <div>{camera && <Scanner onDetected={onDetected} />}</div>
        </Box>
      </Container>
    </>
  );
};

Borrow.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>ボドゲレンタル - DICE</title>
      </Head>

      <Auth>
        <HomeLayout>{page}</HomeLayout>
      </Auth>
    </>
  );
};
export default Borrow;
