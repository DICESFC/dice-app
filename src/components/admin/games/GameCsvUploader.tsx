import { FC, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import CsvUploadButton from "./CsvUploadButton";
import GameConfirmTable from "./GameConfirmTable";
import { BoardGame } from "@/interfaces/boardgame";
import CommonError from "@/components/common/CommonError";
import { createBoardGame } from "@/api/games/functions";
import { useSnackbar } from "@/hooks/useSnackbar";

type Props = {};

/*———————————–
  CSVからボドゲ追加するやつ
———————————–*/
const GameCsvUploader: FC<Props> = () => {
  const [gameData, setGameData] = useState<BoardGame[]>([]);
  const [isReadyToSubmit, setReadyToSubmit] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const { openSnackbar } = useSnackbar();

  //テンプレートファイルを保存
  const onDownloadTemplate = () => {
    const link = document.createElement("a");
    link.download = `db_games_template.csv`;
    link.href = "/resources/others/db_games_template.csv";
    link.click();
  };

  //ボドゲ登録
  const submit = async () => {
    try {
      if (isReadyToSubmit) {
        setReadyToSubmit(false);
        const promises = gameData.map((data) => createBoardGame(data));
        const result = Promise.all(promises);
        console.log(result);
        openSnackbar(`${gameData.length}件のアイテムが追加されました🎉`);
        setError(null);
        setReadyToSubmit(true);
        setGameData([]);
      }
    } catch (e) {
      setReadyToSubmit(true);
      setError(String(e));
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
        <CsvUploadButton setGameData={setGameData} setError={setError} />

        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDownloadTemplate()}
        >
          テンプレートを入手
        </Button>
      </Box>

      {/* エラーメッセージ */}
      {error && <CommonError>{error}</CommonError>}

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

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 1, width: 80 }}
            onClick={() => submit()}
          >
            {isReadyToSubmit ? (
              "送信"
            ) : (
              <CircularProgress size={25} color="inherit" />
            )}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default GameCsvUploader;
