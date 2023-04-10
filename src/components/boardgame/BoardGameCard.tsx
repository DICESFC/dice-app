import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../common/Image";
import { Box } from "@mui/system";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSnackbar } from "@/hooks/useSnackbar";

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
  const router = useRouter();
  const { openSnackbar } = useSnackbar();

  const canBorrow =
    boardGame.isBorrowedNow === false && !boardGame.prohibitBorrow;

  const onClick = () => {
    //router.push(`games/${boardGame.id}`);
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
          mx: 0.5,
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

        {/*        
        <GameOverviewText variant="caption">
          {boardGame.isExpansion === true
            ? "拡張"
            : boardGame.isExpansion === false
            ? "本体"
            : "不明"}
        </GameOverviewText>
        */}
      </Box>
    </Card>
  );
};

export default BoardGameCard;
