export type BoardGame = {
  [key: string]: any;

  name: string;
  code: string;
  id: string;
  isBorrowedNow?: boolean;
  prohibitBorrow?: boolean;

  englishName?: string;
  thumbnail?: string;
  //良好, 問題あり, 不明
  condition?: "Good" | "Bad" | "Unknown";
  minPlayers?: number;
  maxPlayers?: number;
  //プレイ時間(分)
  minPlayTime?: number;
  maxPlayTime?: number;
  //minPlayers 〜 maxPlayers の配列
  //検索用
  players?: number[];
  //評価
  rating?: number;
  ratingCount?: number;
  //ゲームの複雑生
  learningComplexity?: number;
  strategyComplexity?: number;
  complexityVotes?: number;
  //拡張かどうか
  isExpansion?: boolean;
  atlasURL?: string;
  //追加日
  createdAt?: number;

  //検索用NGram
  ngramField?: { [key: string]: boolean };
};

//ボドゲ追加時の情報
//ID, ngramはなくてもいいよってこと
export type BoardGameAddQuery = BoardGame & {
  id?: string;
  ngramField?: { [key: string]: boolean };
};

//ボドゲ更新時の情報
//name, code, ngramは任意ってこと。idは必要
export type BoardGameUpdateQuery = BoardGame & {
  name?: string;
  code?: string;
  ngramField?: { [key: string]: boolean };
};
