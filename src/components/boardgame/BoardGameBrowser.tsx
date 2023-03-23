import { FC } from "react";
import { Grid } from "@mui/material";
//mui試験的機能のMasonryを使用してるので注意
import Masonry from "@mui/lab/Masonry";
import { BoardGame } from "@/interfaces/boardgame";
import { getBoardGame } from "@/api/games/functions";
import { useQuery } from "react-query";

import BoardGameCard from "@/components/boardgame/BoardGameCard";
import CommonError from "@/components/common/CommonError";
import CommonLoading from "@/components/common/CommonLoading";
import { limit, where, orderBy } from "firebase/firestore";

type Props = {
  allowBorrow?: boolean;
};

/*———————————–
  ボドゲリスト本体
———————————–*/
const BoardGameBrowser: FC<Props> = ({ allowBorrow }) => {
  const { data, isError, isLoading } = useQuery("get-boardgame", () => {
    return getBoardGame([orderBy("ratingCount", "desc"), limit(30)]);
  });

  // ロード中,エラー時はそれに応じた表示
  if (isLoading)
    return <CommonLoading>ゲーム情報を読み込み中...</CommonLoading>;

  if (isError || !data)
    return (
      <CommonError>
        データの読み込み中にエラーが発生しました。権限が無いか、APIが使用回数上限に達している可能性があります。
      </CommonError>
    );

  return (
    <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={1}>
      {data.map((game: BoardGame) => (
        <BoardGameCard boardGame={game} key={game.code} />
      ))}
    </Masonry>
  );
};

export default BoardGameBrowser;
