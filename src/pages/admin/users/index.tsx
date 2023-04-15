import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";

import Auth from "@/components/auth/Auth";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";

/*———————————–
  ユーザー管理画面
———————————–*/
const AdminUserManager: NextPageWithLayout = () => {
  return <Container>ようこそ、ユーザー管理者ページへ...</Container>;
};

AdminUserManager.getLayout = (page) => {
  return (
    <Auth adminOnly>
      <AdminLayout>{page}</AdminLayout>
    </Auth>
  );
};

export default AdminUserManager;
