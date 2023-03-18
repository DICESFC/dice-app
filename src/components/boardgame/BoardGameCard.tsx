import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../common/Image";
import { Box } from "@mui/system";

type Props = {
  boardGame: BoardGame;
};

/*———————————–
  ボドゲ一覧のカード
———————————–*/
const BoardGameCard: FC<Props> = ({ boardGame }) => {
  return (
    <Card elevation={3}>
      <Card
        sx={{
          width: "100%",
          height: "50%",
          background: "gray",
        }}
      />

      {/* サムネイル */}
      {boardGame.thumbnail ? (
        <Box
          sx={{
            m: 1,
          }}
        >
          <Image
            src={boardGame.thumbnail}
            alt={boardGame.name}
            width="500"
            height="500"
            style={{
              objectFit: "contain",
              width: "100%",
              aspectRatio: 1,
            }}
          />
        </Box>
      ) : (
        <></>
      )}
      <Typography variant="body2" sx={{ textAlign: "center", m: 1 }}>
        {boardGame.name}
      </Typography>
    </Card>
  );
};

export default BoardGameCard;
