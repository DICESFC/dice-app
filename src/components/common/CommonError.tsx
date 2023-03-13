import { FC, ReactNode } from "react";
import { Alert, AlertTitle } from "@mui/material";

/*———————————–
  エラーアラート
———————————–*/

type Props = {
  title?: string;
  severity?: "error" | "warning" | "info" | "success";
  children?: ReactNode;
};

const CommonError: FC<Props> = ({ title, severity, children }) => {
  const DEFAULT_TITLE = "エラー";
  const DEFAULT_MESSAGE = "何らかのエラーが発生しました。";

  return (
    <Alert
      severity={severity ? severity : "error"}
      sx={{ m: 3, textAlign: "start" }}
    >
      <AlertTitle>{title ? title : DEFAULT_TITLE}</AlertTitle>
      {children ? children : DEFAULT_MESSAGE}
    </Alert>
  );
};

export default CommonError;
