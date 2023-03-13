import {
  BottomNavigationAction,
  BottomNavigationActionProps,
  styled,
} from "@mui/material";

/*———————————–
  ホーム下部のナビゲーションボタン
———————————–*/
const BottomMenuAction = styled(
  BottomNavigationAction
)<BottomNavigationActionProps>(({ theme }) => ({
  fontWeight: 700,
  borderRadius: "100vh",
  color: "inherit",

  "&.Mui-selected": {
    color: theme.palette.orange.main,
    "& .MuiSvgIcon-root": {
      color: theme.palette.orange.main,
    },
  },

  "& .MuiTouchRipple-child": {
    backgroundColor: theme.palette.orange.main,
  },
}));

export default BottomMenuAction;
