import { ChangeEvent, FC, useState } from "react";
import { Button } from "@mui/material";
import { csvToGameList } from "@/api/games/utils";
import CommonError from "@/components/common/CommonError";
import FileUploadIcon from "@mui/icons-material/FileUpload";

type Props = {
  setGameData: any;
  setError: any;
};

const CsvUploadButton: FC<Props> = ({ setGameData, setError }) => {
  //アップロードされたファイルをパースして親に渡す
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const file = event.target.files?.[0];

    if (file) {
      //エラー状態をリセット
      setError(null);
      const reader = new FileReader();

      //ロード完了時
      reader.onload = () => {
        try {
          const result = reader.result;
          if (typeof result === "string") {
            // CSVのパース処理
            const csvData = result
              .split(/\r\n|\n/)
              .filter((line) => line) // 改行だけの行を削除
              .map((line) => line.split(","));

            const gameData = csvToGameList(csvData);
            setGameData(gameData);
          }
        } catch (e) {
          console.error(e);
          setError(String(e));
        }
      };

      reader.readAsText(file);

      //選択状況をリセット
      event.target.value = "";
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        component="label"
        sx={{ mr: 1 }}
      >
        <FileUploadIcon sx={{ mr: 1 }} />
        アップロード
        <input
          hidden
          accept=".csv"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
      </Button>
    </>
  );
};

export default CsvUploadButton;
