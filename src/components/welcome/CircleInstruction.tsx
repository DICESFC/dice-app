import { Box, Typography } from "@mui/material";
import ResponsiveImage from "../common/Image";

/*———————————–
  ログイン方法＆サークル説明
———————————–*/
const CircleInstruction = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
        p: 5,
      }}
    >
      <Box>
        <Typography variant="h4">DICEに入会しよう！</Typography>
        <Typography>
          <br />
          ・DICE-APPを使うにはDICE入会が必要
          <br />
          ・ログインすればレンタル、サークル内通貨の取引などが利用可🙌
          <br />
          <br />
          ログインページ下部『新歓ページはこちら』からボドゲリストが閲覧できます(会員登録不要！)
          <br />
        </Typography>
      </Box>
    </Box>
  );
};

export default CircleInstruction;
