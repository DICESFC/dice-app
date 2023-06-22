//本当はAPI RoutesとFirebase REST APIを使ってフロント/バックのロジック分けたかったけど
//実装めんどくさいのでフロント側からここ使ってます。。。不甲斐ない。。。
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//firebaseはフロント側で動作する仕組みなのでここは公開する必要あり
//詳しくはセキュリティルールなどについて調べてみてね
const firebaseConfig = {
  apiKey: "AIzaSyBZ5BKYv5gi9fNIyk9gz8qczWmwmoErN4M",
  authDomain: "dice-sfc.firebaseapp.com",
  projectId: "dice-sfc",
  storageBucket: "dice-sfc.appspot.com",
  messagingSenderId: "790326409805",
  appId: "1:790326409805:web:e08900815be8d79af6fa04",
  measurementId: "G-P7S3LY47C1",
};

initializeApp(firebaseConfig);
getAuth();
getFirestore();
