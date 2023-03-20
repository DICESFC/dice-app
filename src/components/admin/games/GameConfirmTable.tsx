import { FC } from "react";
import { BoardGame } from "@/interfaces/boardgame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  gameData: BoardGame[];
};

type TableContent = {
  //プロパティ名
  id: string;
  //上に表示される名前
  label: any;
  align?: "right" | "left" | "center";
};

//テーブルに表示する要素
const tableCols: TableContent[] = [
  {
    id: "name",
    label: "name",
  },
  {
    id: "code",
    label: "code",
  },
];

/*———————————–
  インポート確認用ボドゲリスト(管理画面用)
———————————–*/
const GameConfirmTable: FC<Props> = ({ gameData }) => {
  return (
    <Box sx={{ overflow: "scroll", maxHeight: "300px" }}>
      <Table aria-label="ボドゲリスト">
        <TableHead>
          <TableRow>
            {tableCols.map((col) => (
              <TableCell key={col.id} align={col.align}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {gameData.map((game) => (
            <TableRow key={game.code}>
              {tableCols.map((col) => (
                <TableCell key={col.id} align={col.align}>
                  {game[col.id] ? game[col.id] : ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default GameConfirmTable;
