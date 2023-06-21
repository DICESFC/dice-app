import { FC } from "react";
import { Card } from "@mui/material";
import { User } from "@/interfaces/user";
import { useQuery } from "react-query";
import { getBorrowedGameDataByUser } from "@/api/borrow/functions";
import CommonLoading from "../common/CommonLoading";
import CommonError from "../common/CommonError";

type Props = {
  user: User;
};

/*———————————–
  現在借りているボドゲ集
———————————–*/
const BorrowedGames: FC<Props> = ({ user }) => {
  //返却待ちのボドゲを収集する
  const { data, isLoading, isError } = useQuery(
    `get-boardgame-${user.id}`,
    async () => getBorrowedGameDataByUser(user, true)
  );

  if (isError)
    return <CommonError>レンタル情報の読み込みに失敗しました</CommonError>;
  if (isLoading || !data)
    return <CommonLoading>レンタル情報を読み込み中...</CommonLoading>;

  return <>{data.map((d) => d.borrowData.gameName)}</>;
};

export default BorrowedGames;
