import { FC } from "react";
import { Alert, AlertTitle } from "@mui/material";

const CommonError: FC = () => {
  return (
    <Alert severity="error" sx={{ m: 3 }}>
      <AlertTitle>エラー</AlertTitle>
      データの取得中に何らかのエラーが発生しました。
    </Alert>
  );
};

export default CommonError;
