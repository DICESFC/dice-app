import { ChangeEvent, FC, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { getNgram } from "@/api/games/utils";
import { Box } from "@mui/system";
import { getBoardGameSnapshot } from "@/api/games/api/functions";
import { BoardGame } from "@/interfaces/boardgame";
import { useSnackbar } from "@/hooks/useSnackbar";
import { updateDoc } from "firebase/firestore";
import CommonLoading from "@/components/common/CommonLoading";

type Props = {};

//ボドゲのNGram(検索用)をすべて更新する
const UpdateGameNgramButton: FC<Props> = () => {
  const { openSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //すべてのボドゲのngramをアップデート
  const handleClick = async () => {
    try {
      console.log("start update ngram");
      setIsLoading(true);
      const querySnapshot = await getBoardGameSnapshot([]);

      //各ボドゲについて処理をpromiseの配列として取得
      const promises = querySnapshot.docs.map((doc) => {
        const originalData = doc.data() as BoardGame;

        //日本語, 英語のそれぞれでngramを獲得した後合成
        const jpNgram = getNgram(originalData.name);
        const enNgram = originalData.englishName
          ? getNgram(originalData.englishName)
          : {};

        const ngramField = { ...jpNgram, ...enNgram };
        console.log(Object.keys(ngramField));
        return updateDoc(doc.ref, { ngramField });
      });

      await Promise.all(promises);

      console.log("end update ngram");
      openSnackbar(`${querySnapshot.docs.length}件のNGramを更新しました！`);
    } catch (e) {
      console.error(e);
      openSnackbar(`${e}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          my: 1,
          height: "auto",
          transition: "0.5s",
          width: "100%",
        }}
      >
        <Typography variant="h6">ボドゲ検索用NGramを更新</Typography>
        <Typography variant="caption">
          ボドゲのワード検索がおかしい場合はこれを押して下さい。ボドゲ名更新した時に必要かも。
        </Typography>

        <Box sx={{ my: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            disabled={isLoading}
          >
            NGramを更新
          </Button>

          {isLoading && <CommonLoading>NGramを更新中...</CommonLoading>}
        </Box>
      </Paper>
    </>
  );
};

export default UpdateGameNgramButton;
