import { FC } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  useMediaQuery,
  useTheme,
  DialogProps,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BoardGame } from "@/interfaces/boardgame";
import BoardGameDetail from "./BoardGameDetail";

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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {game.name}
        <IconButton size="large" onClick={() => onClose()} color="inherit">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ビュー本体 */}
      <DialogContent>
        <BoardGameDetail game={game} />
      </DialogContent>
    </Dialog>
  );
};

export default BoardGameDialog;
