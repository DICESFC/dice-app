import { FC } from "react";
import { Box } from "@mui/system";
import { BoardGame } from "@/interfaces/boardgame";
import Image from "../../common/Image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { checkCanBorrow } from "@/api/borrow/canBorrow";
import BoardGameDetailProperty from "./DetailProperty";
import { getDetailText } from "@/api/games/detailText";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthState } from "@/hooks/useAuthState";
import BorrowReturnButton from "./BorrowReturnButton";

type Props = {
  game: BoardGame;
};

/*———————————–
  ボドゲ詳細パーツ
———————————–*/
const BoardGameDetail: FC<Props> = ({ game }) => {
  const { isSignedIn } = useAuthState();

  //レンタル可能かどうかのロジックを抜き出したやつ
  const { canBorrow, canBorrowLabel } = checkCanBorrow(game);

  //プレイ時間やプレイ人数をテキストに変換したやつを出してくれる
  const detailText = getDetailText(game, true);

  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
        p: 5,
      }}
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
          width="300"
          height="300"
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

        {/* 詳細情報セクション */}
        <Accordion
          sx={{
            textAlign: "start",
            mt: 5,
            borderTop: "none",
            "&::before": {
              opacity: 0,
              border: "none",
            },
          }}
          elevation={1}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ borderTop: "none" }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              詳細情報
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ mx: 1, mb: 1 }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, display: "block" }}
              >
                英語名: {game.englishName}
              </Typography>
            </Box>

            {/* 難易度情報 */}
            <Grid container sx={{ mx: 1, textAlign: "start" }}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="caption"
                  sx={{ display: "block", fontWeight: 600 }}
                >
                  ルール難易度
                </Typography>
                <Rating
                  readOnly
                  value={game.learningComplexity}
                  precision={0.1}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="caption"
                  sx={{ display: "block", fontWeight: 600 }}
                >
                  プレイ難易度
                </Typography>
                <Rating
                  readOnly
                  value={game.strategyComplexity}
                  precision={0.1}
                />
              </Grid>
            </Grid>

            <Divider sx={{ mt: 1, mb: 0.2 }} />

            {game.atlasURL && (
              <Typography variant="caption" sx={{ mx: 1, display: "block" }}>
                Atlas:{" "}
                <Link
                  href={game.atlasURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {game.atlasURL.split("/")[5]}
                </Link>
              </Typography>
            )}

            <Typography variant="caption" sx={{ mx: 1, display: "block" }}>
              ID: {game.id}
            </Typography>

            <Typography
              variant="caption"
              sx={{ mx: 1, mt: 1, display: "block" }}
            >
              <Link href={`games/${game.id}`}>ページとして開く</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* 借りるボタン */}
        <BorrowReturnButton game={game} />
      </Box>
    </Box>
  );
};

export default BoardGameDetail;
