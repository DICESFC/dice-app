import { useState, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Divider,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import theme from "@/styles/theme";

interface Props {
  //anyはずしたい
  menuState: any;
  drawerWidth: number;
  isMobileSize: boolean;
}

type Navigation = {
  type: "menu" | "divider";
  label: string;
  href?: string;
  icon?: ReactNode;
};

/*———————————–
  管理画面メニュー
———————————–*/
const AdminMenu: FC<Props> = ({ menuState, drawerWidth, isMobileSize }) => {
  const router = useRouter();
  const [isMenuOpen, setMenu] = menuState;

  const showMenu = isMenuOpen || !isMobileSize;

  //サイドメニュー項目
  const NAVIGATIONS: Navigation[] = [
    {
      type: "menu",
      label: "ホームに戻る",
      href: "/",
      icon: <ArrowBackIosNewOutlinedIcon />,
    },
    {
      type: "divider",
      label: "home-divider",
    },
    {
      type: "menu",
      label: "トップページ",
      href: "/admin",
      icon: <SupervisedUserCircleOutlinedIcon />,
    },
    {
      type: "menu",
      label: "ボドゲ管理",
      href: "/admin/games",
      icon: <CasinoOutlinedIcon />,
    },
    {
      type: "menu",
      label: "ユーザー管理",
      href: "/admin/users",
      icon: <AccountCircleIcon />,
    },
  ];

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
      {/* メニュー本体 */}
      <List>
        {NAVIGATIONS.map((nav: Navigation) =>
          nav.type == "menu" ? (
            <ListItem key={nav.label} disablePadding>
              <ListItemButton
                sx={{ borderRadius: 1, mx: 1 }}
                onClick={() => {
                  if (!nav.href) return;
                  if (isMobileSize) setMenu(false);
                  router.push(nav.href);
                }}
              >
                <ListItemIcon>{nav.icon}</ListItemIcon>
                <ListItemText primary={nav.label} />
              </ListItemButton>
            </ListItem>
          ) : (
            <Divider key={nav.label} sx={{ my: 1 }} />
          )
        )}
      </List>
    </Drawer>
  );
};

export default AdminMenu;
