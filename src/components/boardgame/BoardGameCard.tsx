import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../common/Image";
import { Box } from "@mui/system";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

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
  const canBorrow =
    boardGame.isBorrowedNow === false && !boardGame.prohibitBorrow;

  return (
    <Card elevation={3} sx={{ p: 1 }}>
      {/* サムネイル */}
      <Box>
        <Image
          src={boardGame.thumbnail || "/resources/logo/dicelogo.png"}
          alt={boardGame.name}
          width="300"
          height="300"
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

          //非推奨説あり？
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
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
          sx={{
            color: canBorrow ? "success.main" : "warning.main",
            fontWeight: 700,
          }}
        >
          {canBorrow ? (
            <>
              <CheckOutlinedIcon fontSize="inherit" />
              貸出可
            </>
          ) : (
            <>貸出不可</>
          )}
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
