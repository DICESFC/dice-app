import { useState, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Card, BottomNavigation } from "@mui/material";

import BottomMenuAction from "./BottomMenuAction";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import theme from "@/styles/theme";

type Props = {
  children: ReactNode;
};

type Navigation = {
  label: string;
  href: string;
  icon?: ReactNode;
};

/*———————————–
  下部にナビゲーションが表示されるレイアウト(Homeなど)
———————————–*/
const HomeLayout: FC<Props> = ({ children }) => {
  //　ボトムナビゲーションの一覧
  //　labelがkeyなので被りは無しで！
  //　hrefは/で始める, 末尾の/は無し
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
  ];
  const NAVIGATION_MARGIN = 20;
  const NAVIGATION_HEIGHT = 50;

  //メニューがタップされたら画面遷移
  const onSelectMenu = (menuID: number): void => {
    const targetNavigation = NAVIGATIONS[menuID];
    //画面遷移
    router.push(targetNavigation.href);
  };

  //現在のpathから選択されたメニューを割り出す
  //ちょっと重い処理なのであんまり呼び出したくない
  const getMenuIDFromPath = (path: string): number => {
    //前方一致の最大文字数
    let maxMatchLength = 0;
    let result = 0;

    //各メニューに対し比較
    for (let menuID = 0; menuID < NAVIGATIONS.length; menuID++) {
      const nav = NAVIGATIONS[menuID];

      //   navのhrefとpathが前方一致
      //＆ これまでで一番文字数が大きい場合
      // => 結果を上書き
      if (path.indexOf(nav.href) === 0 && nav.href.length > maxMatchLength) {
        maxMatchLength = nav.href.length;
        result = menuID;
      }
    }
    return result;
  };

  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(-1);

  //URL更新を監視してメニューに反映
  //TODO: onSelectMenu経由でpathが変わった時には呼び出さないようにしたい
  useEffect(() => {
    const menuID = getMenuIDFromPath(router.pathname);
    setSelectedMenu(menuID);
  }, [router.pathname, getMenuIDFromPath]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          marginBottom: `${NAVIGATION_MARGIN * 2 + NAVIGATION_HEIGHT}px`,
          backgroundColor: theme.palette.baseBackground.main,
        }}
      >
        <main>{children}</main>
      </Box>

      {/* ナビゲーション本体 */}
      <Card
        sx={{
          position: "fixed",
          bottom: NAVIGATION_MARGIN,
          width: `calc(100% - ${NAVIGATION_MARGIN * 2}px)`,
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
            <BottomMenuAction
              key={nav.label}
              label={nav.label}
              icon={nav.icon}
            />
          ))}
        </BottomNavigation>
      </Card>
    </>
  );
};

export default HomeLayout;
