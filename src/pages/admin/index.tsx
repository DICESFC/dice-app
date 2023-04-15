import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";

import Auth from "@/components/auth/Auth";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";

/*———————————–
  管理者画面ホーム
———————————–*/
const AdminHome: NextPageWithLayout = () => {
  return <Container>ようこそ、管理者ページへ...</Container>;
};

AdminHome.getLayout = (page) => {
  return (
    <Auth adminOnly>
      <AdminLayout>{page}</AdminLayout>
    </Auth>
  );
};

export default AdminHome;
