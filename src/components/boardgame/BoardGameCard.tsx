import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../common/Image";
import { Box } from "@mui/system";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import styled from "@emotion/styled";
import { checkCanBorrow } from "@/features/borrow/api/canBorrow";
import { getDetailText } from "@/features/games/detailText";

const GameOverviewText = styled(Typography)({
  display: "inline-flex",
  alignItems: "center",
});

type Props = {
  boardGame: BoardGame;
  openDialog: (game: BoardGame) => void;
};

/*———————————–
  ボドゲ一覧のカード
———————————–*/
const BoardGameCard: FC<Props> = ({ boardGame, openDialog }) => {
  const { canBorrow, canBorrowLabel } = checkCanBorrow(boardGame);
  const detailText = getDetailText(boardGame);

  const onClick = () => {
    openDialog(boardGame);
  };

  return (
    <Card elevation={3} sx={{ p: 1 }} onClick={() => onClick()}>
      {/* サムネイル */}
      <Box>
        <Image
          src={boardGame.thumbnail || "/resources/logo/dicelogo.png"}
          alt={boardGame.name}
          width="200"
          height="200"
          style={{
            objectFit: "contain",
            width: "100%",
            aspectRatio: 1,
          }}
        />
      </Box>

      {/* ボドゲ名 */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 900,
          mt: 1,
          mx: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
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
          {canBorrowLabel}
        </GameOverviewText>

        <GameOverviewText variant="caption">
          <AccessTimeOutlinedIcon fontSize="inherit" sx={{ mr: 0.3 }} />
          {boardGame.maxPlayTime || "不明"}
        </GameOverviewText>

        <GameOverviewText variant="caption">
          <PersonOutlineOutlinedIcon fontSize="inherit" sx={{ mr: 0.3 }} />
          {detailText.players}
        </GameOverviewText>
      </Box>
    </Card>
  );
};

export default BoardGameCard;
