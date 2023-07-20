import { FC } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  useMediaQuery,
  useTheme,
  DialogProps,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircleInstruction from "./CircleInstruction";

interface CustomDialogProps extends DialogProps {
  onClose: () => void;
}

/*———————————–
  ログイン方法＆サークル説明のダイアログ
———————————–*/
const CircleInstructionDialog: FC<CustomDialogProps> = (props) => {
  const { onClose, open, ...rest } = props;
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!open) return <></>;

  return (
    <Dialog {...rest} fullScreen={isFullScreen} open={open} onClose={onClose}>
      <IconButton
        onClick={() => onClose()}
        color="inherit"
        sx={{ position: "absolute", top: 15, right: 20 }}
      >
        <CloseIcon />
      </IconButton>

      {/* ボドゲ詳細ビュー本体 */}
      <DialogContent
        sx={{
          height: "100%",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CircleInstruction />
      </DialogContent>
    </Dialog>
  );
};

export default CircleInstructionDialog;
