import { FC, useEffect, useState, useRef } from "react";
import { Box, Container, SxProps } from "@mui/system";
import { BoardGame } from "@/interfaces/boardgame";

import { getBoardGameSnapshot } from "@/api/games/functions";
import {
  where,
  orderBy,
  endAt,
  limit,
  startAfter,
  DocumentData,
} from "firebase/firestore";
import { useInfiniteScroller } from "@/hooks/useInfiniteScroller";

import BoardGameCard from "@/components/boardgame/BoardGameCard";
import CommonLoading from "@/components/common/CommonLoading";
import { Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useSnackbar } from "@/hooks/useSnackbar";
import CommonError from "../common/CommonError";
import BoardGameDialog from "./BoardGameDialog";

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
  const LOAD_BUFFER_HEIGHT = 500;

  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogGameData, setDialogGameData] = useState<BoardGame | null>(null);

  //ページに応じて適切な情報を抜き出す
  const fetch = async (page: number): Promise<BoardGame[]> => {
    const gameSnapShot = await getBoardGameSnapshot([
      orderBy("ratingCount", "desc"),
      ...(lastDoc ? [startAfter(lastDoc)] : []), //条件付き追加。雑。
      limit(DATA_FETCH_AMOUNT),
    ]);

    setLastDoc(gameSnapShot.docs[gameSnapShot.docs.length - 1]);

    const newData: BoardGame[] = gameSnapShot.docs.map((doc) =>
      doc.data()
    ) as BoardGame[];
    return newData;
  };

  const loadMoreLineRef = useRef(null);
  const { data, hasMore, isError } = useInfiniteScroller<BoardGame>(
    loadMoreLineRef,
    fetch
  );

  //ダイアログを開いて対象ボドゲを上書き
  const openDialog = (game: BoardGame) => {
    setDialogOpen(true);
    setDialogGameData(game);
  };

  //ダイアログを閉じる。ボドゲ指定は残ったままなので注意
  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {/* ボドゲ詳細ダイアログ */}
      <BoardGameDialog
        open={isDialogOpen}
        game={dialogGameData}
        onClose={closeDialog}
      >
        あああ
      </BoardGameDialog>

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
                <BoardGameCard boardGame={game} openDialog={openDialog} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {isError ? (
          <CommonError>
            データロード中にエラーが発生しました。
            <br />
            再読み込みが必要です。
          </CommonError>
        ) : hasMore ? (
          <Box sx={{ my: 1 }}>
            <CommonLoading>データを読み込み中...</CommonLoading>
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
    </>
  );
};

export default BoardGameBrowser;
