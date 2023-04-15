import { getNgram } from "@/features/games/utils";
import { QueryConstraint } from "firebase/firestore";
import { GameSearchQueryObject } from "./../../interfaces/boardgame";
import {
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
} from "firebase/firestore";

//=================
// 検索クエリオブジェクトをfirebase用に変換する
//=================
export const convertQuery = (
  query: GameSearchQueryObject,
  lastDoc: DocumentData | null,
  DATA_FETCH_AMOUNT: number
): QueryConstraint[] => {
  //検索ワードに関するクエリ。これがある場合は並び替えが無効になる
  const searchWordQuery = getNgramQuery(query.word);

  //検索ワードクエリとは両立できない
  const orderQuery = searchWordQuery.length ? [] : getOrderQuery();

  const result: QueryConstraint[] = [
    ...getNgramQuery(query.word),

    //仮追加の並び替え
    ...orderQuery,
    ...(lastDoc ? [startAfter(lastDoc)] : []), //条件付き追加。雑。
    limit(DATA_FETCH_AMOUNT),
  ];

  return result;
};

//検索ワードをNgramを使った検索クエリに変換
const getNgramQuery = (word: string | undefined): QueryConstraint[] => {
  if (!word) return [];
  //Ngramを獲得する
  const ngramObject = getNgram(word);
  const ngramKeys = Object.keys(ngramObject);

  //各ngramについてwhereを登録する
  const result: QueryConstraint[] = ngramKeys.map((key) => {
    return where(`ngramField.${key}`, "==", true);
  });

  return result;
};

const getOrderQuery = () => {
  return [orderBy("ratingCount", "desc")];
};
