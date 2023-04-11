import { FC, useEffect, useState, useRef } from "react";
import { Box, SxProps } from "@mui/system";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

type Props = {
  allowBorrow?: boolean;
  sx?: SxProps;
};

/*———————————–
  ボドゲ検索ボックス
———————————–*/
const SearchBox: FC<Props> = () => {
  const PLACEHOLDERS = [
    "ここにボドゲ名を入力",
    "ここにボドゲ名を入力",
    "ここにボドゲ名を入力",
    "ここにボドゲ名を入力",
    "ここにボドゲ名を入力",
    "ここにボドゲ名を入力",
    "検索してみよう",
    "検索してみよう",
    "検索してみよう",
    "検索してみよう",
    "検索してみよう",
    "検索してみよう",
    "ボドゲ名で検索",
    "ボドゲ名で検索",
    "ボドゲ名で検索",
    "ボドゲ名で検索",
    "日本語名, 英語名で検索",
    "日本語名, 英語名で検索",
    "日本語名, 英語名で検索",
    "日本語名, 英語名で検索",
    "テラフォーミング・マーズ",
    "Dominion",
    "ドミニオン",
    "Catan",
    "カタン",
    "DiXit",
    "Splendor",
  ];

  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPlaceholder(
      PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
    );
  }, []);

  return (
    <Box sx={{ position: "sticky", top: 0, py: 0.7 }}>
      <Paper
        component="form"
        sx={{
          px: 1,
          py: 0.1,
          display: "flex",
          alignItems: "center",
          maxWidth: "lg",
          borderRadius: "100vh",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "検索" }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton disabled sx={{ p: "10px" }} aria-label="directions">
          <TuneIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBox;
