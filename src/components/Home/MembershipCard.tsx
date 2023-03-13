import { FC } from "react";
import { Card } from "@mui/material";

/*———————————–
  メンバーカード
———————————–*/
const MembershipCard: FC = () => {
  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "5 / 3",
        borderRadius: "7px",
      }}
      elevation={7}
    >
      メンバーカード
    </Card>
  );
};

export default MembershipCard;
