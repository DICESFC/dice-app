import { createContext, useContext } from "react";

type SnackbarContextType = {
  openSnackbar: (
    message: string,
    severity?: "success" | "error" | "warning" | "info"
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export default SnackbarContext;
