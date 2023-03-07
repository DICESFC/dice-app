import {
  BottomNavigationAction,
  BottomNavigationActionProps,
  styled,
} from "@mui/material";

/*
 * 角丸　＆　アクセントカラーを利用したBottomNavigationAction
 */
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
