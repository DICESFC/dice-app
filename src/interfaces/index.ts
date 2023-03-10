export type User = {
  id: number;
  name?: string;
};

export type BoardGame = {
  name: string;
  name_english?: string;
  thumbnail?: string;
  //良好, 問題あり, 不明
  condition?: "Good" | "Bad" | "Unknown";
  canBorrow: boolean;
  minPlayers?: number;
  maxPlayers?: number;
  //プレイ時間(分)
  minPlayTime?: number;
  maxPlayTime?: number;
  createdAt?: number;
};
