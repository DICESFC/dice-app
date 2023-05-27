import { BoardGame } from "@/interfaces/boardgame";

//================
//ボドゲの〇〇〜〇〇分、〇〇人などのテキスト。
//実はやや複雑なロジックなので共通化
//================
export const getDetailText = (game: BoardGame, addSuffix: boolean = false) => {
  return {
    playTime: getRangeText(
      game.minPlayTime,
      game.maxPlayTime,
      addSuffix ? "分" : ""
    ),
    players: getRangeText(
      game.minPlayers,
      game.maxPlayers,
      addSuffix ? "人" : ""
    ),
    condition: getConditionText(game),
  };
};

//コンディションの文字列を定義。後で変更しやすいようにするため。
const getConditionText = (game: BoardGame): string => {
  if (game.condition === "Good") {
    return "良好";
  } else if (game.condition === "Bad") {
    return "問題あり";
  } else {
    return "不明";
  }
};

//最小値, 最大値を〇〇〜〇〇みたいな文字列に変換
const getRangeText = (
  min: number | undefined,
  max: number | undefined,
  suffix: string = ""
): string => {
  if (!max && !min) {
    return "不明";

    //minとmaxが等しい場合
  } else if (max == min) {
    return `${max}${suffix}`;

    //minしか無い場合
  } else if (!max) {
    return `${min}${suffix}`;

    //maxしか無い場合
  } else if (!min) {
    return `${max}${suffix}`;

    //どっちもある場合
  } else {
    return `${min}-${max}${suffix}`;
  }
};
