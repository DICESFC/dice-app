import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  QueryConstraint,
  QuerySnapshot,
  updateDoc,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();
const gamesCollectionRef = collection(db, "games");

//===================
//* ボドゲを借りる
//===================
