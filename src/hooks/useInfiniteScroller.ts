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

  //ページは0から始まる
  const [page, setPage] = useState(0);

  const scrollObserver = useCallback(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            try {
              setIsLoading(true);
              const newData = await fetch(page);
              setPage(page + 1);
              setData((oldData) => [...oldData, ...newData]);
            } catch (e) {
              console.error(e);
              setIsError(true);
            } finally {
              setIsLoading(false);
            }
          }
        });
      }),
    [page, fetch]
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

  return { data, isLoading, isError };
};
