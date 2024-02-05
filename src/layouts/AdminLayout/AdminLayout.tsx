import { useState, ReactNode, FC, useEffect } from "react";
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
  BottomNavigation, 
  Card
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AdminMenu from "./AdminMenu";
import theme from "@/styles/theme";
import Head from "next/head";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useAuthState } from "@/hooks/useAuthState";
import AdminBottomMenuAction from "./AdminBottomMenuAction";

type Props = {
  children: ReactNode;
};

type Navigation = {
  label: string;
  href: string;
  icon?: ReactNode;
};

const NAVIGATION_MARGIN = 20;
const NAVIGATION_HEIGHT = 50;

export const navigationPadding: number =
  NAVIGATION_MARGIN * 1.5 + NAVIGATION_HEIGHT;

/*———————————–
  管理画面レイアウト
———————————–*/
const AdminLayout: FC<Props> = ({ children }) => {
  const { userData } = useAuthState();
  const NAVIGATIONS: Navigation[] = [
    {
      label: "ホーム",
      href: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      label: "レンタル",
      href: "/borrow",
      icon: <ArchiveOutlinedIcon />,
    },
    {
      label: "ボドゲ",
      href: "/games",
      icon: <CasinoOutlinedIcon />,
    },
    //userがアドミンなら管理ボタンをナビに追加
    ...((userData?.isAdmin) ? [
    {
      label: "管理",
      href: "/admin",
      icon: <ManageAccountsOutlinedIcon />,
    },] : [])
  ];

  //メニューがタップされたら画面遷移
  const onSelectMenu = (menuID: number): void => {
    const targetNavigation = NAVIGATIONS[menuID];
    //画面遷移
    router.push(targetNavigation.href);

    //クリック時は下のuseEffectに先んじて画面反映
    //遷移を早く感じさせるための工夫です
    setSelectedMenu(menuID);
  };

  const drawerWidth = 240;

  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(-1);
  //URL更新を監視してメニューに反映
  //TODO: onSelectMenu経由でpathが変わった時には呼び出さないようにしたい
  useEffect(() => {
    //現在のpathから選択されたメニューを割り出す
    //ちょっと重い処理なのであんまり呼び出したくない
    let result = 0;
    //前方一致の最大文字数
    let maxMatchLength = 0;

    //各メニューに対し比較
    for (let menuID = 0; menuID < NAVIGATIONS.length; menuID++) {
      const nav = NAVIGATIONS[menuID];

      //   navのhrefとpathが前方一致
      //＆ これまでで一番文字数が大きい場合
      // => 結果を上書き
      if (
        router.pathname.indexOf(nav.href) === 0 &&
        nav.href.length > maxMatchLength
      ) {
        maxMatchLength = nav.href.length;
        result = menuID;
      }
    }

    //結果を選択済みメニューに
    setSelectedMenu(result);
  }, [router.pathname]);


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
    <>
      <Head>
        <title>管理者ページ - DICE</title>
      </Head>

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
          {/* ナビゲーション本体 */}
          <Card
            sx={{
              position: "fixed",
              bottom: NAVIGATION_MARGIN,
              width: `calc(100% - ${NAVIGATION_MARGIN * 15}px)`,
              marginX: `${NAVIGATION_MARGIN}px`,
              borderRadius: "100vh",
              opacity: 0.96,
            }}
            elevation={2}
          >
            <BottomNavigation
              value={selectedMenu}
              onChange={(event, newValue) => {
                onSelectMenu(newValue);
              }}
              sx={{
                height: `${NAVIGATION_HEIGHT}px`,
                opacity: 1,
              }}
            >
              {NAVIGATIONS.map((nav) => (
                <AdminBottomMenuAction
                  key={nav.label}
                  label={nav.label}
                  icon={nav.icon}
                />
              ))}
            </BottomNavigation>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
