import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import theme from "@/styles/theme";

const CommonLoading: FC = () => {
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
          color: theme.palette.orange.main,
        }}
      />
    </Box>
  );
};

export default CommonLoading;
