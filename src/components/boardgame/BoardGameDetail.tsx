import { FC } from "react";
import { Box } from "@mui/system";
import { BoardGame } from "@/interfaces/boardgame";

type Props = {
  game: BoardGame;
};

/*———————————–
  ボドゲ詳細パーツ
———————————–*/
const BoardGameDetail: FC<Props> = ({ game }) => {
  return <Box>{`${game.name}`}</Box>;
};

export default BoardGameDetail;
