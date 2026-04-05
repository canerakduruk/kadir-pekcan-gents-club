
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdFX4jZK9KYyS1kGjWmoKKeV2IaQZHDMc",
  authDomain: "kadir-pekcan-gents-club.firebaseapp.com",
  projectId: "kadir-pekcan-gents-club",
  messagingSenderId: "873383600561",
  appId: "1:873383600561:web:9259907cf4cd84a5255d90"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);