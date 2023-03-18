import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";

import Auth from "@/components/auth/Auth";
import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import GameCsvUploader from "@/components/admin/games/GameCsvUploader";

/*———————————–
  ボドゲ管理画面
———————————–*/
const AdminGameManager: NextPageWithLayout = () => {
  return (
    <Container maxWidth="md">
      <GameCsvUploader />
    </Container>
  );
};

AdminGameManager.getLayout = (page) => {
  return (
    <Auth adminOnly>
      <AdminLayout>{page}</AdminLayout>
    </Auth>
  );
};

export default AdminGameManager;
