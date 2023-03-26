import { FC, useEffect, useState, useRef } from "react";
import { Box, Container, SxProps } from "@mui/system";
import { BoardGame } from "@/interfaces/boardgame";

import { getBoardGame } from "@/api/games/functions";
import { where, orderBy, startAt, endAt } from "firebase/firestore";
import { useInfiniteScroller } from "@/hooks/useInfiniteScroller";

import BoardGameCard from "@/components/boardgame/BoardGameCard";
import CommonLoading from "@/components/common/CommonLoading";
import { Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  allowBorrow?: boolean;
  sx?: SxProps;
};

/*———————————–
  ボドゲリスト本体
———————————–*/
const BoardGameBrowser: FC<Props> = ({ allowBorrow, sx }) => {
  //一度に何件取得するか
  const DATA_FETCH_AMOUNT = 20;
  //
  const LOAD_BUFFER_HEIGHT = 500;

  //ページに応じて適切な情報を抜き出す
  const fetch = async (page: number): Promise<BoardGame[]> => {
    console.log(
      page * DATA_FETCH_AMOUNT,
      page * DATA_FETCH_AMOUNT + DATA_FETCH_AMOUNT
    );
    const newData: BoardGame[] = await getBoardGame([
      where("isExpansion", "==", true),
    ]);
    return newData;
  };

  const loadMoreLineRef = useRef(null);
  const { data, hasMore } = useInfiniteScroller<BoardGame>(
    loadMoreLineRef,
    fetch
  );

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 1,
        ...sx,
      }}
    >
      {/* ボドゲリスト本体 */}
      <Container maxWidth="lg" sx={{}}>
        <Grid container spacing={1} sx={{ mt: 0.5 }}>
          {data.map((game: BoardGame) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={game.code}>
              <BoardGameCard boardGame={game} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {hasMore ? (
        <Box sx={{ my: 1 }}>
          <CommonLoading />
        </Box>
      ) : (
        <Box sx={{ mt: 5, mb: 1, textAlign: "center" }}>
          <DoneIcon color="success" fontSize="large" />
          <Typography variant="h6" sx={{ mb: 4 }}>
            全て表示しました🙌
          </Typography>

          <Typography variant="body2">
            お探しのゲームがありませんか？
            <br />
            購入希望を出してボドゲを増やしましょう！
          </Typography>
        </Box>
      )}

      {/* ロード検知用ボックス。これが画面に入ると追加でコンテンツ取得 */}
      <Box
        ref={loadMoreLineRef}
        sx={{
          position: "absolute",
          bottom: `${LOAD_BUFFER_HEIGHT}px`,
          height: `${LOAD_BUFFER_HEIGHT}px`,
        }}
      />
    </Box>
  );
};

export default BoardGameBrowser;
