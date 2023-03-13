import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, getFirestore } from "firebase/firestore";

//仮置
export type User = {
  id: number;
  name?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = getFirestore();

  const usersCollectionRef = collection(db, "users");

  if (req.method === "POST") {
    const usersSnap = await getDocs(usersCollectionRef);

    // Get data from your database
    res.status(200).json({ t: usersSnap.docs.map((doc) => doc.data()) });
  }
};

export default handler;
