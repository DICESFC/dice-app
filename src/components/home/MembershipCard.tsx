import { FC } from "react";
import { Card } from "@mui/material";
import { useAuthState } from "@/hooks/useAuthState";

/*———————————–
  メンバーカード
———————————–*/
const MembershipCard: FC = () => {
  const { userInfo } = useAuthState();

  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "5 / 3",
        borderRadius: "7px",
        height: 400,
      }}
      elevation={7}
    >
      ようこそ {userInfo.name}さん！
    </Card>
  );
};

export default MembershipCard;
