import { FC, ReactNode } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

type Props = {
  label: string;
  children: ReactNode;
};

/*———————————–
  ボドゲ詳細の画像下部にある情報たち
———————————–*/
const BoardGameDetailProperty: FC<Props> = ({ label, children }) => {
  return (
    <Box>
      <Typography variant="caption" sx={{ display: "block", fontWeight: 600 }}>
        {label}
      </Typography>

      <Typography variant="caption" sx={{ display: "block" }}>
        {children}
      </Typography>
    </Box>
  );
};

export default BoardGameDetailProperty;
