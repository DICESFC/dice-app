import { FC } from "react";
import { Box, Card, Divider, Typography } from "@mui/material";
import { User } from "@/interfaces/user";
import { useQuery } from "react-query";
import { getBorrowedGameDataByUser } from "@/api/borrow/functions";
import CommonLoading from "../../common/CommonLoading";
import CommonError from "../../common/CommonError";
import BorrowedGameCard from "./BorrowedGameCard";
import ChecklistIcon from "@mui/icons-material/Checklist";

type Props = {
  user?: User;
};

/*———————————–
  現在借りているボドゲ集
———————————–*/
const BorrowedGames: FC<Props> = ({ user }) => {
  //返却待ちのボドゲを収集する
  const { data, isLoading, isError } = useQuery(
    `get-boardgame-${user ? user.id : ""}`,
    async () => {
      if (!user) return null;
      return getBorrowedGameDataByUser(user, { active: true });
    },
    { enabled: !!user }
  );

  if (!user) return <CommonLoading>ユーザー情報を読み込み中...</CommonLoading>;

  if (isError)
    return <CommonError>レンタル情報の読み込みに失敗しました</CommonError>;
  if (isLoading || !data)
    return <CommonLoading>レンタル情報を読み込み中...</CommonLoading>;

  return (
    <>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Typography sx={{ textAlign: "center" }}>現在借りているボドゲ</Typography>
      {data.map((d) => (
        <BorrowedGameCard data={d} key={d.gameData.id} />
      ))}

      {data.length === 0 && (
        <>
          <Box sx={{ textAlign: "center", mt: 3, color: "#aaaaaa" }}>
            <ChecklistIcon fontSize="large" />
            <Typography variant="body2">
              現在借りているボドゲはありません。
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default BorrowedGames;
