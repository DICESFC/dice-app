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
};
