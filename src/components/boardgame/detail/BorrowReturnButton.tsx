import { FC } from "react";
import { BoardGame } from "@/interfaces/boardgame";
import { Button, CircularProgress, Typography } from "@mui/material";

import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthState } from "@/hooks/useAuthState";
import { useQuery } from "react-query";
import {
  borrowBoardGame,
  isGameBorrowedByUser,
  returnBoardGame,
} from "@/api/borrow/functions";
import { useSnackbar } from "@/hooks/useSnackbar";
import CheckIcon from "@mui/icons-material/Check";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

type Props = {
  game: BoardGame;
};

/*———————————–
  ボドゲ貸出/返却ボタン
  TODO: ここでAPI叩いてるのどうなの？要検討
———————————–*/
const BorrowReturnButton: FC<Props> = ({ game }) => {
  const { isSignedIn, userData } = useAuthState();
  const { openSnackbar } = useSnackbar();

  const router = useRouter();

  const {
    data: isBorrowedByCurrentUser,
    isLoading: isBorrowStateLoading,
    isError,
    error,
  } = useQuery({
    queryKey: "get-isborrowednow-by-user",
    queryFn: async () => isGameBorrowedByUser(game, userData),
    //ログイン時のみuseQueryを発動させる
    enabled: isSignedIn,
  });

  if (isError) {
    openSnackbar(`${error}`);
  }

  const handleClick = async () => {
    if (!isBorrowStateLoading && isSignedIn) {
      if (isBorrowedByCurrentUser) {
        await handleReturn();
      } else {
        await handleBorrow();
      }
    }
  };

  const handleBorrow = async () => {
    if (game) {
      const result = await borrowBoardGame(game, userData);

      if (result.status === "success") {
        openSnackbar("レンタルが正常に登録されました");
        router.push("/");
      } else {
        console.error(result.message);
        openSnackbar(result.message as string, "error");
      }
    }
  };

  const handleReturn = async () => {
    if (game) {
      const result = await returnBoardGame(game, userData);
      console.log(result);

      if (result.status === "success") {
        openSnackbar("正常に返却できました");
        router.push("/");
      } else {
        console.error(result.message);
        openSnackbar(result.message as string, "error");
      }
    }
  };

  //結局借りられるかどうか
  const canBorrow = !isBorrowedByCurrentUser && !isBorrowStateLoading;

  return (
    <>
      {/* 借りるボタン */}
      <Button
        variant={canBorrow ? "contained" : "outlined"}
        size="large"
        sx={{
          mt: 1,
          width: "100%",
          fontWeight: 600,
          backgroundColor: canBorrow ? "primary.light" : "",
          "&:hover": {
            backgroundColor: canBorrow ? "primary.main" : "",
          },
        }}
        disabled={
          !isSignedIn || (!isBorrowedByCurrentUser && game.isBorrowedNow)
        }
        onClick={handleClick}
      >
        {isBorrowStateLoading ? (
          <>
            <CircularProgress />
          </>
        ) : isBorrowedByCurrentUser ? (
          <>
            <CheckIcon sx={{ mr: 1 }} />
            このボドゲを返却！
          </>
        ) : game.isBorrowedNow ? (
          <>現在貸出中</>
        ) : (
          <>このボドゲを借りる！</>
        )}
      </Button>

      {!isSignedIn && (
        <Typography variant="caption" sx={{ mt: 3 }}>
          ボドゲを借りるには<Link href="/login">ログイン</Link>
          する必要があります。
        </Typography>
      )}
    </>
  );
};

export default BorrowReturnButton;
