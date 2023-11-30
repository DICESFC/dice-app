import { BoardGame } from "./boardgame";

//貸し出しデータ
export type BorrowData = {
  //ユーザーのドキュメントid
  uid: string;
  //ゲームのid(こっちはドキュメントIDじゃないので注意)
  gameID: string;
  borrowedAt: number;
  dueDate: number;
  returnedAt?: number;
  active: boolean;
  gameName: string;
  userName: string;
};

//貸し出しとゲームデータを合成したもの
export type ConbinedBorrowData = {
  borrowData: BorrowData;
  gameData: BoardGame;
};
