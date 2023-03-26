import { FC, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
//mui試験的機能のMasonryを使用してるので注意
import Masonry from "@mui/lab/Masonry";
import InfiniteScroll from "react-infinite-scroller";

import { BoardGame } from "@/interfaces/boardgame";
import { getBoardGame } from "@/api/games/functions";

import BoardGameCard from "@/components/boardgame/BoardGameCard";
import CommonError from "@/components/common/CommonError";
import CommonLoading from "@/components/common/CommonLoading";
import { limit, where, orderBy, startAt } from "firebase/firestore";
import { Box } from "@mui/system";

type Props = {
  allowBorrow?: boolean;
};

/*———————————–
  ボドゲリスト本体
  react-infinite-scrollerライブラリを使ってるけど後々変えたい
———————————–*/
const BoardGameBrowser: FC<Props> = ({ allowBorrow }) => {
  //一度に何件取得するか
  const DATA_FETCH_AMOUNT = 20;

  const [data, setData] = useState<BoardGame[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const scrollerRef = useRef(null);

  //ページに応じて適切な情報を抜き出す
  const loadPage = async (page: number): Promise<BoardGame[]> => {
    try {
      setIsFetching(true);
      /*
      const newData: BoardGame[] = await getBoardGame([
        orderBy("ratingCount", "desc"),
        startAt(page * DATA_FETCH_AMOUNT),
        limit(DATA_FETCH_AMOUNT),
      ]);
      */

      const newData: BoardGame[] = [];

      for (let i = 0; i < DATA_FETCH_AMOUNT; i++) {
        newData.push({
          name: `ボドゲ${page}-${i + 1}`,
          code: `${Math.random()}`,
        });
      }

      await new Promise((r) => setTimeout(r, 10));

      return newData;
    } finally {
      setIsFetching(false);
    }
  };

  //loadMoreが2回呼び出されてしまうのでクロージャ変数を使って止めてる。
  //あんまりいい実装じゃないので変えたい
  const getLoadHandler = () => {
    let isHandlerCalled = false;

    //追加のデータを読み込む関数
    return async (page: number) => {
      if (isFetching || isHandlerCalled) return;
      isHandlerCalled = true;

      console.log(page);

      //新しいデータを取得
      const newData = await loadPage(page);

      if (newData.length === 0) {
        // 取得したデータがない場合は取得を停止する
        setHasMore(false);
        return;
      }

      // 新しいデータを古いデータに追加する
      setData((prevData) => [...prevData, ...newData]);
    };
  };

  return (
    <Box sx={{ overflow: "scroll", height: "100vh" }} ref={scrollerRef}>
      <InfiniteScroll
        initialLoad
        pageStart={0}
        loadMore={getLoadHandler()}
        hasMore={hasMore}
        loader={
          <CommonLoading key={0}>データを読み込み中です...</CommonLoading>
        }
        useWindow={false}
        threshold={700}
        getScrollParent={() => null}
      >
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
          {data.map((game: BoardGame) => (
            <BoardGameCard boardGame={game} key={game.code} />
          ))}
        </Masonry>
      </InfiniteScroll>
    </Box>
  );
};

export default BoardGameBrowser;
