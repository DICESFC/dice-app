import { useState, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { Drawer, DrawerProps } from "@mui/material";
import theme from "@/styles/theme";

interface Props {
  //anyはずしたい
  menuState: any;
  drawerWidth: number;
  isMobileSize: boolean;
}

/*———————————–
  管理画面メニュー
———————————–*/
const AdminMenu: FC<Props> = ({ menuState, drawerWidth, isMobileSize }) => {
  const router = useRouter();
  const [isMenuOpen, setMenu] = menuState;

  const showMenu = isMenuOpen || !isMobileSize;

  return (
    <Drawer
      variant={isMobileSize ? "temporary" : "permanent"}
      //スマホ版でない場合は常に表示
      open={showMenu}
      onClose={() => setMenu(false)}
      sx={{
        flexShrink: 0,
        width: isMenuOpen ? drawerWidth : 0,

        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),

        ...(!isMobileSize && {
          "& .MuiDrawer-paper": {
            width: isMenuOpen ? drawerWidth : 0,
            boxSizing: "border-box",
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }),
      }}
      anchor="left"
    >
      aaaaaaaaaaaaaaaa
    </Drawer>
  );
};

export default AdminMenu;
