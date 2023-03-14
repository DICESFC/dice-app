import { useState, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, AppBar } from "@mui/material";
import theme from "@/styles/theme";

type Props = {
  children: ReactNode;
};

/*———————————–
  下部にナビゲーションが表示されるレイアウト(Homeなど)
———————————–*/
const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        paddingTop: "50px",
      }}
    >
      <AppBar position="absolute" sx={{ py: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DICE-APP Admin
        </Typography>
      </AppBar>

      {/* ページ本体 */}
      {children}
    </Box>
  );
};

export default AdminLayout;
