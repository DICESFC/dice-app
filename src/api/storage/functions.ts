import axios, { AxiosResponse } from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

//===================
//* 画像アップロード
//===================
export const uploadImage = async (
  url: string,
  gameName: string
): Promise<string> => {
  try {
    const storage = getStorage();

    //ファイルのダウンロード
    const response: AxiosResponse = await axios.get(url, {
      responseType: "blob",
    });

    const file = response.data;

    const storageRef = ref(
      storage,
      `images/boardgames/${gameName}-${new Date().getTime()}`
    );
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
