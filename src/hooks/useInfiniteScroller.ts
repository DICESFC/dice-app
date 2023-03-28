//ページ下部までスクロールしたら次のページを追加読込するやつ
//参考にした記事: https://qiita.com/seira/items/8a170cc950241a8fdb23

import { RefObject, useCallback, useEffect, useState } from "react";

export const useInfiniteScroller = <T>(
  ref: RefObject<HTMLElement | null>,
  fetch: (page: number) => Promise<T[]>
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  //空配列などが帰ってきたらロードを止めるためのやつ
  const [hasMore, setHasMore] = useState<boolean>(true);

  //ページは0から始まる
  const [page, setPage] = useState(0);

  const scrollObserver = useCallback(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          //オブザーブ対象の要素が画面に入った時
          if (entry.isIntersecting && !isLoading && hasMore) {
            try {
              setIsLoading(true);

              //読み込み対象が無い時
              const newData = await fetch(page);
              if (!newData.length) {
                setHasMore(false);
                return;
              }

              setPage(page + 1);
              setData((oldData) => [...oldData, ...newData]);
            } catch (e) {
              console.error(e);
              setIsError(true);
              setHasMore(false);
            } finally {
              setIsLoading(false);
            }
          }
        });
      }),
    [page, fetch, hasMore, isLoading]
  );

  useEffect(() => {
    const target = ref.current;
    if (target) {
      const observer = scrollObserver();
      observer.observe(target);
      return () => {
        observer.unobserve(target);
      };
    }
  }, [scrollObserver, ref]);

  return { data, isLoading, isError, hasMore };
};
