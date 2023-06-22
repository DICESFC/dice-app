import { borrowBoardGame, returnBoardGame } from "@/api/borrow/functions";
import { getBoardGameData } from "@/api/games/api/functions";
import Auth from "@/components/auth/Auth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { NextPageWithLayout } from "@/interfaces/common";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import { UserAuthInfo } from "@/utils/auth/getCurrentUser";
import { authenticateCurrentUser } from "@/utils/auth/getCurrentUser";
import { Button } from "@mui/material";
import { where } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

//ボドゲレンタルテスト用の仮ページ
const BorrowGame: NextPageWithLayout<{ currentUser: UserAuthInfo }> = ({
  currentUser,
}) => {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const { id } = router.query;

  //情報を入手
  const { data, isLoading, isError } = useQuery(
    `get-boardgame-${id}`,
    async () => getBoardGameData(where("id", "==", id))
  );

  const handleBorrow = async () => {
    if (data) {
      const result = await borrowBoardGame(data[0], currentUser.data);
      if (result.status === "success") {
        openSnackbar("レンタルが正常に登録されました");
      } else {
        console.error(result.message);
        openSnackbar(result.message as string, "error");
      }
    }
  };

  const handleReturn = async () => {
    if (data) {
      const result = await returnBoardGame(data[0], currentUser.data);
      if (result.status === "success") {
        openSnackbar("正常に返却できました");
      } else {
        console.error(result.message);
        openSnackbar(result.message as string, "error");
      }
    }
  };

  return (
    <>
      <Button onClick={handleBorrow}>借りる</Button>
      <Button onClick={handleReturn}>返す</Button>
    </>
  );
};

BorrowGame.getLayout = (page) => {
  return (
    <>
      <Auth>
        <HomeLayout>{page}</HomeLayout>
      </Auth>
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
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} as never };
  }
};

export default BorrowGame;
