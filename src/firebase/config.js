import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUZC-Ss5G8hAJrWjQrrKe7_D4IIqbTROc",
  authDomain: "mini-blog-a396b.firebaseapp.com",
  projectId: "mini-blog-a396b",
  storageBucket: "mini-blog-a396b.appspot.com",
  messagingSenderId: "987601336905",
  appId: "1:987601336905:web:3ce58c2e6c34186d11dd98",
  measurementId: "G-LMH69WM19Y",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
