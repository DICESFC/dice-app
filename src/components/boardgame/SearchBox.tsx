import { FC, useEffect, useState, useRef, FormEvent, memo } from "react";
import { Box, SxProps } from "@mui/system";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { GameSearchQueryObject } from "@/interfaces/boardgame";

type Props = {
  handleSearch: (query: GameSearchQueryObject) => void;
};

/*———————————–
  ボドゲ検索ボックス
———————————–*/
const SearchBox: FC<Props> = memo(function SearchBox({ handleSearch }) {
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //プレースホルダーからランダムに例を抜き出し
  useEffect(() => {
    setPlaceholder(
      PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
    );
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    //BoardGameBrowserにクエリを提出する
    handleSearch({
      word: inputRef.current ? inputRef.current.value : "",
    });
  };

  return (
    <Box sx={{ position: "sticky", top: 0, py: 0.7 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          px: 1,
          py: 0.1,
          display: "flex",
          alignItems: "center",
          maxWidth: "lg",
          borderRadius: "100vh",
          opacity: 0.97,
        }}
      >
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon color="inherit" />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "検索" }}
          inputRef={inputRef}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton disabled sx={{ p: "10px" }} aria-label="directions">
          <TuneIcon />
        </IconButton>
      </Paper>
    </Box>
  );
});

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

export default SearchBox;
