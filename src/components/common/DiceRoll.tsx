import { FC, ReactNode } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/*———————————–
  ロード中のサークル
———————————–*/

type Props = {
  children?: ReactNode;
};

const CommonLoading: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        sx={{
          m: 5,
        }}
      />
      {children && <Typography variant="body2">{children}</Typography>}
    </Box>
  );
};

export default CommonLoading;
