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
)<BottomNavigationActionProps>(() => ({
  fontWeight: 700,
  borderRadius: "100vh",
  color: "inherit",
}));

export default BottomMenuAction;
