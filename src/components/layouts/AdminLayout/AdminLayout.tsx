import { useState, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, AppBar, Container, Toolbar } from "@mui/material";

type Props = {
  children: ReactNode;
};

/*———————————–
  下部にナビゲーションが表示されるレイアウト(Homeなど)
———————————–*/
const AdminLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

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
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DICE 管理者ページ
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ページ本体 */}
      <Container sx={{ paddingTop: "30px" }}>{children}</Container>
    </Box>
  );
};

export default AdminLayout;
