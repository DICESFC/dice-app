import type { NextApiRequest, NextApiResponse } from "next";
import { unsetAuthCookies } from "next-firebase-auth";
import initAuth from "../../api/auth/initAuth"; // the module you created aboveabove

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: "予期せぬエラーが発生しました。" });
  }
  return res.status(200).json({ success: true });
};

export default handler;
