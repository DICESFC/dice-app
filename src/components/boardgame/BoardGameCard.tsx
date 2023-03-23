import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../common/Image";
import { Box } from "@mui/system";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import styled from "@emotion/styled";

const GameOverviewText = styled(Typography)({
  display: "inline-flex",
  alignItems: "center",
});

type Props = {
  boardGame: BoardGame;
};

/*———————————–
  ボドゲ一覧のカード
———————————–*/
const BoardGameCard: FC<Props> = ({ boardGame }) => {
  return (
    <Card elevation={3} sx={{ p: 1 }}>
      {/* サムネイル */}
      <Box>
        <Image
          src={boardGame.thumbnail || "/resources/logo/dicelogo.png"}
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

      <Typography
        variant="body1"
        sx={{
          fontWeight: 900,
          mt: 1,
          mx: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          "-webkit-line-clamp": 2,
          "-webkit-box-orient": "vertical",
          lineHeight: "1.2",
          maxHeight: "2.4rem",
        }}
      >
        {boardGame.name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 1,
          mt: 0.3,
        }}
      >
        <GameOverviewText
          variant="caption"
          sx={{ color: "success.main", fontWeight: 700 }}
        >
          <CheckOutlinedIcon fontSize="inherit" />
          貸出可
        </GameOverviewText>

        <GameOverviewText variant="caption">
          <AccessTimeOutlinedIcon fontSize="inherit" />
          {boardGame.maxPlayTime || "不明"}
        </GameOverviewText>

        <GameOverviewText variant="caption">
          <PersonOutlineOutlinedIcon fontSize="inherit" />
          {boardGame.minPlayers}-{boardGame.maxPlayers}
        </GameOverviewText>
      </Box>
    </Card>
  );
};

export default BoardGameCard;
