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
import { BoardGame } from "@/interfaces/boardgame";
import BoardGameDetail from "./detail/BoardGameDetail";

interface CustomDialogProps extends DialogProps {
  game: BoardGame | null;
  open: boolean;
  onClose: () => void;
}

const BoardGameDialog: FC<CustomDialogProps> = (props) => {
  const { game, onClose, open, ...rest } = props;
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!game) return <></>;

  return (
    <Dialog {...rest} fullScreen={isFullScreen} open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <IconButton size="large" onClick={() => onClose()} color="inherit">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ボドゲ詳細ビュー本体 */}
      <DialogContent
        sx={{
          height: "100%",
          maxHeight: "80vh",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <BoardGameDetail game={game} />
      </DialogContent>
    </Dialog>
  );
};

export default BoardGameDialog;
