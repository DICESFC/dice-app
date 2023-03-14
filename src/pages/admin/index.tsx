import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";

import Auth from "@/components/auth/Auth";
import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";

/*———————————–
  レンタル画面
———————————–*/
const Borrow: NextPageWithLayout = () => {
  const submit = async () => {};

  return <Container>ようこそ、管理者ページへ...</Container>;
};

Borrow.getLayout = (page) => {
  return (
    <Auth adminOnly>
      <AdminLayout>{page}</AdminLayout>
    </Auth>
  );
};

export default Borrow;
