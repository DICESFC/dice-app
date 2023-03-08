import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import type { User } from "../../interfaces";
import { db, auth } from "../../api/firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const usersCollectionRef = collection(db, "users");

  if (req.method === "POST") {
    const usersSnap = await getDocs(usersCollectionRef);

    // Get data from your database
    res.status(200).json({ t: usersSnap.docs.map((doc) => doc.data()) });
  }
};

export default handler;
