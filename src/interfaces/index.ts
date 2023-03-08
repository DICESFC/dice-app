export type User = {
  id: number;
  name?: string;
};

export type BoardGame = {
  name: string;
  thumbnail?: string;
  //良好, 問題あり, 不明
  condition?: "Good" | "Bad" | "Unknown";
  canBorrow: boolean;
  minPlayers?: number;
  maxPlayers?: number;
  //プレイ時間(分)
  playTime?: number;
  createdAt?: number;
};
