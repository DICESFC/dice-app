import { BoardGame } from "@/interfaces/boardgame";
import axios from "axios";

export const createBoardGame = async (data: BoardGame) => {
  const res = await axios.post("api/game", data);
  return res.data;
};

export const getBoardGame = async (data: any) => {
  const res = await axios.get("api/game", data);
  return res.data;
};

export const updateBoardGame = async (data: any) => {
  const res = await axios.put("api/game", data);
  return res.data;
};

export const deleteBoardGame = async (data: any) => {
  const res = await axios.delete("api/game", data);
  return res.data;
};
