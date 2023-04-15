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
      <IconButton
        size="large"
        onClick={() => onClose()}
        color="inherit"
        sx={{ position: "absolute", top: 20, right: 30 }}
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
        <BoardGameDetail game={game} />
      </DialogContent>
    </Dialog>
  );
};

export default BoardGameDialog;
