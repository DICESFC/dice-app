import { FC } from "react";
import { Box } from "@mui/system";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../../common/Image";
import { Divider, Typography } from "@mui/material";
import { checkCanBorrow } from "@/features/borrow/api/canBorrow";
import BoardGameDetailProperty from "./DetailProperty";
import { getDetailText } from "@/features/games/detailText";

type Props = {
  game: BoardGame;
};

/*———————————–
  ボドゲ詳細パーツ
———————————–*/
const BoardGameDetail: FC<Props> = ({ game }) => {
  //レンタル可能かどうかのロジックを抜き出したやつ
  const { canBorrow, canBorrowLabel } = checkCanBorrow(game);

  //プレイ時間やプレイ人数をテキストに変換したやつを出してくれる
  const detailText = getDetailText(game, true);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", maxWidth: "100%", p: 5 }}
    >
      <Box sx={{ textAlign: "center" }}>
        {/* レンタル可否 */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: canBorrow ? "success.main" : "warning.main",
          }}
        >
          {canBorrowLabel}
        </Typography>

        {/* ボドゲ名 */}
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 700,
          }}
        >
          {game.name}
        </Typography>

        {/* サムネイル */}
        <Image
          src={game.thumbnail || "/resources/logo/dicelogo.png"}
          alt={game.name}
          width="200"
          height="200"
          style={{
            objectFit: "contain",
            width: "70vw",
            maxWidth: "300px",
            aspectRatio: 1,
          }}
        />

        <Divider
          sx={{
            my: 2,
          }}
        />

        {/* 基本情報 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: 3,
          }}
        >
          <BoardGameDetailProperty label="時間">
            {detailText.playTime}
          </BoardGameDetailProperty>

          <BoardGameDetailProperty label="人数">
            {detailText.players}
          </BoardGameDetailProperty>

          <BoardGameDetailProperty label="状態">
            {detailText.condition}
          </BoardGameDetailProperty>
        </Box>
      </Box>
    </Box>
  );
};

export default BoardGameDetail;
