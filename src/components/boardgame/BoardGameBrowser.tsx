import { FC, useEffect, useState, useRef } from "react";
import { Box, Container, SxProps } from "@mui/system";
import { BoardGame, GameSearchQueryObject } from "@/interfaces/boardgame";

import { getBoardGameSnapshot } from "@/api/games/functions";
import {
  where,
  orderBy,
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
import SearchBox from "./searchbox/SearchBox";
import { useRouter } from "next/router";
import { getNgram } from "@/api/games/utils";
import { convertQuery } from "./queryConverter";

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

  const router = useRouter();
  const query = router.query;

  //URLクエリをFirebase用に変換
  const queryFirebaseArray = convertQuery(query, lastDoc, DATA_FETCH_AMOUNT);

  //=================
  //ページに応じて適切な情報を抜き出す
  //=================
  const fetch = async (page: number): Promise<BoardGame[]> => {
    const gameSnapShot = await getBoardGameSnapshot([...queryFirebaseArray]);

    setLastDoc(gameSnapShot.docs[gameSnapShot.docs.length - 1]);

    const newData: BoardGame[] = gameSnapShot.docs.map((doc) =>
      doc.data()
    ) as BoardGame[];
    return newData;
  };

  //=================
  //無限スクローラー本体
  //=================
  const loadMoreLineRef = useRef(null);
  const { data, hasMore, isError, resetData } = useInfiniteScroller<BoardGame>(
    loadMoreLineRef,
    fetch
  );

  //=================
  //ダイアログを開いて表示対象ボドゲを上書き
  //=================
  const openDialog = async (game: BoardGame) => {
    setDialogOpen(true);
    setDialogGameData(game);
  };

  //=================
  //ダイアログを閉じる。
  //ボドゲ指定は残ったままなので注意
  //=================
  const closeDialog = () => {
    setDialogOpen(false);
  };

  //=================
  //このコンポーネントの状態をリセットする
  //=================
  const resetBrowser = () => {
    //無限スクローラーのリセット
    resetData();
    setLastDoc(null);
    setDialogOpen(false);
    setDialogGameData(null);
  };

  //=================
  //検索ボックスのsubmit時にクエリパラメータを更新し、各種パラメータをリセットする
  //=================
  const handleSearch = async (
    queryData: GameSearchQueryObject
  ): Promise<void> => {
    await router.push({
      pathname: router.basePath,
      query: queryData,
    });
  };

  //=================
  // クエリに変更があったらブラウザをリセット
  //=================
  useEffect(() => {
    resetBrowser();
  }, [router.asPath]);

  //=================
  // ダイアログを開いてる時にブラウザバックしたら遷移の代わりにダイアログを閉じる
  //=================
  useEffect(() => {
    if (isDialogOpen) {
      const handlePopState = () => {
        history.pushState(null, "", router.asPath);
        closeDialog();
        return false;
      };

      router.beforePopState(handlePopState);

      //unmountするやつ
      return () => router.beforePopState(() => true);
    }
  }, [isDialogOpen]);

  return (
    <>
      {/* ボドゲ詳細ダイアログ */}
      <BoardGameDialog
        open={isDialogOpen}
        game={dialogGameData}
        onClose={closeDialog}
      />

      <Box
        sx={{
          position: "relative",
          minHeight: 1,
          ...sx,
        }}
      >
        <Container maxWidth="lg" sx={{}}>
          {/* 検索ボックス */}
          <SearchBox handleSearch={handleSearch} currentQuery={query} />

          {query.word && (
            <Typography variant="body2" sx={{ my: 1 }}>
              検索結果: {query.word}
            </Typography>
          )}

          {/* ボドゲリスト本体 */}
          <Grid container spacing={1}>
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
            {data.length ? <DoneIcon color="success" fontSize="large" /> : ""}
            <Typography variant="h6" sx={{ mb: 4 }}>
              {data.length
                ? "全て表示しました！"
                : "検索結果が見つかりませんでした"}
            </Typography>

            <Typography variant="caption" sx={{ mt: 5, mb: 2 }}>
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
