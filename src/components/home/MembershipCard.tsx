import { FC } from "react";
import { Card } from "@mui/material";
import { User } from "@/interfaces/user";

type Props = {
  user: User;
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
      ようこそ {user.name}さん！
    </Card>
  );
};

export default MembershipCard;
