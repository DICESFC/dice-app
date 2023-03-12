import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, addDoc } from "firebase/firestore";
import type { BoardGame } from "../../interfaces/boardgame";
import { db, auth } from "../../api/firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const boardGamesCollectionRef = collection(db, "games");

  try {
    //===================
    //*
    //* ボドゲ取得
    //*
    //===================
    if (req.method === "GET") {
      const gameSnap = await getDocs(boardGamesCollectionRef);
      // Get data from your database
      res.status(200).json(gameSnap.docs.map((doc) => doc.data()));

      //===================
      //*
      //* ボドゲ追加
      //*
      //===================
    } else if (req.method === "POST") {
      const data: BoardGame = req.body;
      const docRef = await addDoc(boardGamesCollectionRef, data);
      res.status(200).json({ result: "success", ref: docRef });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
