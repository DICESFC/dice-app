import { NextPageWithLayout } from "@/interfaces/common";
import { Container, Box, Button } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import Head from "next/head";
import { useState } from "react";
import Scanner from "@/components/common/Scanner";
import { getBoardGameData } from "@/api/games/api/functions";
import { useQuery } from "react-query";
import { where } from "firebase/firestore";
import { useEffect } from "react";
import {
  UserAuthInfo,
  authenticateCurrentUser,
} from "@/utils/auth/getCurrentUser";
import { GetServerSidePropsContext } from "next";

/*———————————–
  レンタル画面
———————————–*/
const Borrow: NextPageWithLayout<{ currentUser: UserAuthInfo }> = ({
  currentUser,
}) => {
  const [camera, setCamera] = useState(false);
  const [code, setCode] = useState<null | number>(null);

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

  console.log(data);

  return (
    <>
      <Container maxWidth="lg">
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
          <h1>レンタルページ</h1>
          現状は開発用のあれこれ置き場です
          <p>{code ? code : "Scanning..."}</p>
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

      <HomeLayout>{page}</HomeLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const currentUser = await authenticateCurrentUser(ctx);
    //メンバー権限がない場合
    if (!currentUser.data.isMember) {
      throw new Error("ログイン状態が確認できませんでした");
    }

    return {
      props: { currentUser },
    };
  } catch (err: any) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} as never };
  }
};

export default Borrow;
