// ./initAuth.js
import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    firebaseAuthEmulatorHost: "localhost:9099",
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        //クライアント側からはアクセス不可
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
      },
      databaseURL: "https://dice-sfc.firebaseio.com/",
    },
    // Firebaseの仕様上こっちは全世界に公開する
    firebaseClientInitConfig: {
      apiKey: "AIzaSyBZ5BKYv5gi9fNIyk9gz8qczWmwmoErN4M",
      authDomain: "dice-sfc.firebaseapp.com",
      projectId: "dice-sfc",
      storageBucket: "dice-sfc.appspot.com",
      messagingSenderId: "790326409805",
      appId: "1:790326409805:web:e08900815be8d79af6fa04",
      measurementId: "G-P7S3LY47C1",
    },
    cookies: {
      name: "DiceApp", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 14 * 60 * 60 * 24 * 1000, // 14日
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE, // ローカルではfalse, 本番ではtrueになるように
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};

export default initAuth;
