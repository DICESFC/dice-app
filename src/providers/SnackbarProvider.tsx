import { ReactNode, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import SnackbarContext, { useSnackbar } from "../hooks/useSnackbar";

type Props = {
  children: ReactNode;
};

const SnackbarProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const openSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "success"
  ) => {
    //エラーならログにも出力する
    if (severity === "error") {
      console.error(message);
    }

    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { useSnackbar };
export default SnackbarProvider;
