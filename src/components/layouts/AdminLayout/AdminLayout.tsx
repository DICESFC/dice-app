import { useState, ReactNode, FC } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  useMediaQuery,
  Theme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AdminMenu from "./AdminMenu";
import theme from "@/styles/theme";

type Props = {
  children: ReactNode;
};

/*———————————–
  管理画面レイアウト
———————————–*/
const AdminLayout: FC<Props> = ({ children }) => {
  const drawerWidth = 240;

  const router = useRouter();
  const menuState = useState<boolean>(false);
  const [isMenuOpen, setMenu] = menuState;

  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (!isMobileSize && !isMenuOpen) {
    setMenu(true);
  }

  //ドロワーに合わせてコンテンツをずらすかどうか
  const shiftContents = !isMobileSize && isMenuOpen;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        paddingTop: "50px",
      }}
    >
      <AdminMenu
        menuState={menuState}
        drawerWidth={drawerWidth}
        isMobileSize={isMobileSize}
      />

      <AppBar
        color="secondary"
        sx={{
          width: `calc(100% - ${shiftContents ? drawerWidth : 0}px)`,
          margingLeft: isMenuOpen ? drawerWidth : 0,

          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar>
          {(!isMenuOpen || isMobileSize) && (
            <IconButton
              onClick={() => setMenu((prev) => !prev)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DICE 管理者ページ
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1 }}>
        {/* ページ本体 */}
        <Container sx={{ paddingTop: "30px", width: "100%" }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
