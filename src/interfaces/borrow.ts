//貸し出しデータ
export type BorrowData = {
  userID: string;
  gameID: string;
  borrowedAt: number;
  returnedAt?: number;
  active: boolean;
};
