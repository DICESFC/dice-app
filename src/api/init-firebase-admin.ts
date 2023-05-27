import * as dotenv from "dotenv";
dotenv.config();

import { initializeApp, credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

//Firebaseと接続するための秘密鍵
//.envの中身はFirebaseコンソールから確認するか @おかゆうご に聞いてね〜
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

export const app = initializeApp({
  credential: credential.cert(serviceAccount),
});

export const firestore = getFirestore();
export const storage = getStorage();
