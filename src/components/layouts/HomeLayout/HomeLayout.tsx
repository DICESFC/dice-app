import { useState, ReactNode, FC } from "react";
import { useRouter } from "next/router";
import { Card, BottomNavigation } from "@mui/material";

import BottomMenuAction from "./BottomMenuAction";

import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

type Props = {
  children: ReactNode;
};

type Navigation = {
  label: string;
  href: string;
  icon?: ReactNode;
};

/*
 * 下にナビゲーションバーが表示されるタイプのレイアウト(ホームなど)
 */
const HomeLayout: FC<Props> = ({ children }) => {
  //ボトムナビゲーションの一覧
  //labelがkeyなので被りは無しでよろしゅう
  const NAVIGATIONS: Navigation[] = [
    {
      label: "ホーム",
      href: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      label: "レンタル",
      href: "/rental",
      icon: <ArchiveOutlinedIcon />,
    },
    {
      label: "ボドゲ",
      href: "/games",
      icon: <CasinoOutlinedIcon />,
    },
  ];
  const NAVIGATION_MARGIN = 20;

  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(0);

  //メニューがタップされたら画面遷移＆メニュー見た目に反映
  const onSelectMenu = (menuID: number): void => {
    setSelectedMenu(menuID);

    const targetNavigation = NAVIGATIONS[menuID];
    //画面遷移
    router.push(targetNavigation.href);
  };

  return (
    <>
      {children}
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
            height: 50,
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
