import { NextPageWithLayout } from "@/interfaces/common";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import Auth from "@/components/auth/Auth";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import CommonError from "@/components/common/CommonError";
import { getBoardGameData } from "@/api/games/functions";
import { where } from "firebase/firestore";
import CommonLoading from "@/components/common/CommonLoading";
import { useSnackbar } from "@/hooks/useSnackbar";
import BoardGameDetail from "@/components/boardgame/detail/BoardGameDetail";
import Head from "next/head";

/*———————————–
  ボドゲ詳細画面
  TODO: モーダル化
———————————–*/
const Games: NextPageWithLayout = () => {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const { id } = router.query;

  //情報を入手
  const { data, isLoading, isError } = useQuery(
    `get-boardgame-${id}`,
    async () => getBoardGameData(where("id", "==", id))
  );

  if (isLoading) return <CommonLoading>データ読み込み中...</CommonLoading>;
  if (isError || !data) {
    return <CommonError>データの読み込みに失敗しました</CommonError>;
  }

  if (data.length == 0) {
    router.push("/404");
    return <CommonLoading />;
  }

  if (data.length > 1) {
    openSnackbar(`ID"${data[0].id}"は重複しています。修正が必要です。`);
  }

  const gameData = data[0];

  return (
    <>
      <Head>
        <title>{gameData.name} - DICE</title>
      </Head>

      <Box>
        <BoardGameDetail game={gameData} />
      </Box>
    </>
  );
};

Games.getLayout = (page) => {
  return (
    <>
      <Auth>
        <HomeLayout>{page}</HomeLayout>
      </Auth>
    </>
  );
};

export default Games;
