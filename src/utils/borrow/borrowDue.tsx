import { BorrowData } from "@/interfaces/borrow";

//正確な日本時間を取得
export const getCurrentTime = () => {
  const jstOffset = +((new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);
  // 取得できる値は必ず日本時間になる
  return new Date(Date.now() + jstOffset);
};

//レンタル経過時間
export const getElapsedTime = (borrowData: BorrowData) => {
  return getCurrentTime().getTime() - borrowData.borrowedAt;
};

//レンタル残り時間
export const getRemainTime = (borrowData: BorrowData) => {
  return borrowData.dueDate - getCurrentTime().getTime();
};
