export type BoardGame = {
  name: string;
  code: string;
  isBorrowedNow: boolean;
  prohibitBorrow: boolean;

  englishName?: string;
  thumbnail?: string;
  //良好, 問題あり, 不明
  condition?: "Good" | "Bad" | "Unknown";
  minPlayers?: number;
  maxPlayers?: number;
  //プレイ時間(分)
  minPlayTime?: number;
  maxPlayTime?: number;
  //評価
  rating?: number;
  ratingCount?: number;
  //拡張かどうか
  isExpansion?: boolean;
  //追加日
  createdAt?: number;
};
