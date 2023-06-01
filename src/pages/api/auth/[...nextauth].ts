import NextAuth from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firestore } from "lib/firestore";

export default NextAuth({
  adapter: FirestoreAdapter(firestore),
  // ...
});