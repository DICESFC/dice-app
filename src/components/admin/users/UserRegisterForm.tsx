import { FC, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { createUser } from "@/api/client/users/functions";

type Props = {};

/*———————————–
  CSVからボドゲ追加するやつ
———————————–*/
const UserRegisterForm: FC<Props> = () => {
  const onButtonClick = async () => {
    createUser({ name: "おかゆうごテスト", email: "yugoka5@gmail.com" });
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "auto",
        transition: "0.5s",
        width: "100%",
      }}
    >
      <Typography variant="body2">メールアドレスからユーザーを追加</Typography>
      <Button onClick={onButtonClick}>てすと</Button>
    </Paper>
  );
};

export default UserRegisterForm;
