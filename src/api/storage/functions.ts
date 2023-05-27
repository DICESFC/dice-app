import axios, { AxiosResponse } from "axios";
import { storage } from "../init-firebase-admin";

//===================
//* 画像アップロード
//===================
export const uploadImage = async (
  url: string,
  gameName: string
): Promise<string | undefined> => {
  try {
    //ファイルのダウンロード
    const response: AxiosResponse = await axios.get(url, {
      responseType: "text",
    });

    const imgData = response.data;
    const file = storage
      .bucket()
      .file(`images/boardgames/${gameName}-${new Date().getTime()}`);

    //ファイルアップロード
    await file.save(imgData);
    const downloadUrl = await file.getSignedUrl({
      action: "read",
      expires: "12-31-3020", //1000年後に設定
    });
    return downloadUrl[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
