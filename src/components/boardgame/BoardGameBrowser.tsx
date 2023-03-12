import { FC } from "react";
import { Grid } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import { getBoardGame } from "@/api/games/functions";
import { useQuery } from "react-query";

import BoardGameCard from "@/components/boardgame/BoardGameCard";
import CommonError from "@/components/common/CommonError";
import CommonLoading from "@/components/common/CommonLoading";

type Props = {
  allowBorrow?: boolean;
};

/*———————————–
  ボドゲリスト本体
———————————–*/
const BoardGameBrowser: FC<Props> = ({ allowBorrow }) => {
  const boardGames = useQuery("get-boardgame", getBoardGame);

  // ロード中,エラー時はそれに応じた表示
  if (boardGames.isLoading) return <CommonLoading />;
  if (boardGames.isError) return <CommonError />;

  return (
    <Grid container sx={{ mt: 3 }} spacing={1}>
      {boardGames.data.map((game: BoardGame) => (
        <Grid item xs={6} sm={4} lg={3} key={game.code}>
          <BoardGameCard boardGame={game} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardGameBrowser;
