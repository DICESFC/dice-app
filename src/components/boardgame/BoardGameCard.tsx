import { FC } from "react";
import { Card } from "@mui/material";
import { BoardGame } from "@/interfaces";

type Props = {
  boardGame: BoardGame;
};

const BoardGameCard: FC<Props> = ({ boardGame }) => {
  return (
    <Card elevation={3}>
      <Card
        sx={{
          width: "100%",
          height: "50%",
          m: 3,
          background: "gray",
        }}
      />
      ボードゲーム
    </Card>
  );
};

export default BoardGameCard;
