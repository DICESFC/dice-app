import { FC } from "react";
import { Card } from "@mui/material";
import { User } from "@/interfaces/user";
import CommonLoading from "../common/CommonLoading";

type Props = {
  user?: User;
};

/*———————————–
  メンバーカード
———————————–*/
const MembershipCard: FC<Props> = ({ user }) => {
  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "5 / 3",
        borderRadius: "7px",
      }}
      elevation={7}
    >
      {user ? (
        <>ようこそ {user.name}さん！</>
      ) : (
        <CommonLoading>読み込み中...</CommonLoading>
      )}
    </Card>
  );
};

export default MembershipCard;
