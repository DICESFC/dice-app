import { FC, useState } from "react";
import { Box, Paper, Typography, Button, Divider } from "@mui/material";
import CsvUploadButton from "./CsvUploadButton";
import GameConfirmTable from "./GameConfirmTable";
import { BoardGame } from "@/interfaces/boardgame";

type Props = {};

/*———————————–
  CSVからボドゲ追加するやつ
———————————–*/
const GameCsvUploader: FC<Props> = () => {
  const [gameData, setGameData] = useState<BoardGame[]>([]);
  const [isReadyToSubmit, setReadyToSubmit] = useState<boolean>(true);

  //テンプレートファイルを保存
  const onDownloadTemplate = () => {
    const link = document.createElement("a");
    link.download = `db_games_template.csv`;
    link.href = "/resources/others/db_games_template.csv";
    link.click();
  };

  //ボドゲ登録
  const submit = async () => {
    if (isReadyToSubmit) {
      setReadyToSubmit(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "auto",
        transition: "0.5s",
        width: "100%",
      }}
    >
      <Typography variant="h6">CSVからボードゲームを追加</Typography>

      <Box sx={{ my: 1 }}>
        <CsvUploadButton setGameData={setGameData} />

        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDownloadTemplate()}
        >
          テンプレートを入手
        </Button>
      </Box>

      {/* アップロード完了後 */}
      {!!gameData.length && (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            アップロード完了！🎉
            <br />
            以下のリストで追加内容を確認して下さい。
          </Typography>

          <Divider sx={{ mt: 1 }} />

          <GameConfirmTable gameData={gameData} />

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            確認は大丈夫ですか？
            <br />
            送信ボタンでボドゲが登録されます
          </Typography>

          <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
            送信
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default GameCsvUploader;
