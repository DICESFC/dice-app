//ユーザーデータ
export type User = {
  name: string;
  id: string;
  email?: string;
  isMember: boolean;
  isAdmin: boolean;
  dicePoint: number;
  //最大の貸し出し許容量
  maxBorrowPoint: number;
  //これがmaxを超えることはできない
  usedBorrowPoint: number;
};

//ユーザー作成時のデータ
export type UserCreateData = {
  name: string;
  email: string;
  isMember?: boolean;
  isAdmin?: boolean;
  maxBorrowPoint?: number;
};

//ユーザー更新時のデータ
export type UserUpdateData = {
  id: string;
  name?: string;
  isMember?: boolean;
  isAdmin?: boolean;
  dicePoint?: number;
  //最大の貸し出し許容量
  maxBorrowPoint?: number;
  //これがmaxを超えることはできない
  usedBorrowPoint?: number;
};
