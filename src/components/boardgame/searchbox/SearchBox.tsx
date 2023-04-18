import {
  FC,
  useEffect,
  useState,
  useRef,
  FormEvent,
  memo,
  ChangeEvent,
} from "react";
import { Box, SxProps } from "@mui/system";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { GameSearchQueryObject } from "@/interfaces/boardgame";

type Props = {
  currentQuery: GameSearchQueryObject;
  handleSearch: (query: GameSearchQueryObject) => void;
};

/*———————————–
  ボドゲ検索ボックス
  TODO: 検索バーの文字入れで再レンダリングされるので、子コンポーネントはメモ化するなどして軽量化したい
———————————–*/
const SearchBox: FC<Props> = memo(function SearchBox({
  handleSearch,
  currentQuery,
}) {
  const [placeholder, setPlaceholder] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  //プレースホルダーからランダムに例を抜き出し
  //＆ 検索ワードをセットする
  useEffect(() => {
    setPlaceholder(
      PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
    );
    setSearchText(currentQuery.word ? currentQuery.word : "");
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    //BoardGameBrowserにクエリを提出する
    handleSearch({
      ...currentQuery,
      word: searchText,
    });
  };

  //消去ボタンが押された時
  const handleResetSearchText = () => {
    setSearchText("");
    handleSearch({
      ...currentQuery,
      word: "",
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
        {/* 検索ボタン */}
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon color="inherit" />
        </IconButton>

        {/* 入力バー */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "検索" }}
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
        />

        {/* 入力リセットボタン */}
        <IconButton
          sx={{
            p: "10px",
            opacity: searchText ? 1 : 0,
            transition: "opacity 0.3s",
            transitionDelay: "0.3s",
            cursor: searchText ? "pointer" : "default",
          }}
          aria-label="directions"
          onClick={handleResetSearchText}
        >
          <CloseIcon />
        </IconButton>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        {/* フィルターボタン(未実装) */}
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
