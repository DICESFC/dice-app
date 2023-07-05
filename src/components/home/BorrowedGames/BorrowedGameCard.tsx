import { FC } from "react";
import { User } from "@/interfaces/user";
import { useQuery } from "react-query";
import { getBorrowedGameDataByUser } from "@/api/borrow/functions";
import CommonLoading from "../../common/CommonLoading";
import CommonError from "../../common/CommonError";
import { BorrowData, ConbinedBorrowData } from "@/interfaces/borrow";
import { Box, Card, Typography } from "@mui/material";
import Image from "@/components/common/Image";
import { getRemainTime } from "@/utils/borrow/borrowDue";

type Props = {
  data: ConbinedBorrowData;
};

/*———————————–
  現在借りているボドゲの表示カード
———————————–*/
const BorrowedGameCard: FC<Props> = ({ data }) => {
  const { gameData, borrowData } = data;

  //残り時間を取得
  const remainBorrowTime = getRemainTime(borrowData);

  //一日（ms）
  const oneDay = 86400000;
  //1時間(ms)
  const oneHour = 3600000;
  //1分(ms)
  const oneMinute = 600000;

  //残り日数
  const remainDate = Math.floor(remainBorrowTime / oneDay);
  //残り時間
  const remainHours = Math.floor(
    (remainBorrowTime - Math.floor(remainBorrowTime / oneDay) * oneDay) /
      oneHour
  );
  //残り分数
  const remainMinutes = Math.floor(
    (remainBorrowTime - remainDate * oneDay - remainHours * oneHour) / oneMinute
  );

  //残り〇〇日のメッセージ
  const remainDaysMessage =
    remainDate > 1
      ? `あと${remainDate}日 ${remainHours}時間 ${remainMinutes}分`
      : remainBorrowTime > 0
      ? `あと${Math.floor(remainBorrowTime / oneHour)}時間`
      : "返却期限切れ";

  return (
    <>
      <Card
        sx={{ height: "80px", display: "flex", borderRadius: "10px", my: 1 }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pl: 5,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                lineHeight: "0px",
                color: remainDate > 1 ? "" : "error.main",
              }}
            >
              {remainDaysMessage}
            </Typography>

            <Typography
              variant="h5"
              sx={{ fontWeight: "700", pb: 1, lineHeight: "20px" }}
            >
              {gameData.name}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 2, pr: 3, flexGrow: 0 }}>
          <Image
            src={gameData.thumbnail || "/resources/logo/dicelogo.png"}
            alt={gameData.name}
            width="100"
            height="100"
            style={{
              objectFit: "contain",
              height: "100%",
              aspectRatio: 1,
            }}
          />
        </Box>
      </Card>
    </>
  );
};

export default BorrowedGameCard;
