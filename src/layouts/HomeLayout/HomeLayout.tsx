import { useState, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, BottomNavigation, Card } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

import BottomMenuAction from "./BottomMenuAction";

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

  //メニューがタップされたら画面遷移
  const onSelectMenu = (menuID: number): void => {
    const targetNavigation = NAVIGATIONS[menuID];
    //画面遷移
    router.push(targetNavigation.href);
  };

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

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "baseBackground.main",
        }}
      >
        <Box
          style={{
            paddingBottom: `${navigationPadding}px`,
            height: `calc(100% - ${navigationPadding}px)`,
          }}
        >
          <main>{children}</main>
        </Box>
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
