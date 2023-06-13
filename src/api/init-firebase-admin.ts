import * as dotenv from "dotenv";
dotenv.config();

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

//Firebaseと接続するための秘密鍵
//.envの中身はFirebaseコンソールから確認するか @おかゆうご に聞いてね〜
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

export const firebaseAdmin =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : (admin.apps[0] as admin.app.App);

export const firestore = getFirestore();
export const storage = getStorage();
