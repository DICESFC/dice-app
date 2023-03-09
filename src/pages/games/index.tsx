import { FC } from "react";
import { Container, Grid } from "@mui/material";
import { BoardGame } from "@/interfaces";
import { getBoardGame } from "@/api/games/functions";
import { useQuery } from "react-query";

import CommonError from "@/components/common/CommonError";
import CommonLoading from "@/components/common/CommonLoading";
import BoardGameCard from "@/components/boardgame/BoardGameCard";

const Games: FC = () => {
  const boardGames = useQuery("get-boardgame", getBoardGame);

  if (boardGames.isError) return <CommonError />;
  if (boardGames.isLoading) return <CommonLoading />;

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mt: 3 }} spacing={1}>
        {boardGames.data.map((game: BoardGame) => (
          <Grid item xs={6} sm={4} lg={3}>
            <BoardGameCard boardGame={game} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Games;
