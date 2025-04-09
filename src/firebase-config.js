// 📁 src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1hLR8hhFZJp8lJKVKR8Nrxm0yn_U12gk",
  authDomain: "feedback-collector-27c70.firebaseapp.com",
  projectId: "feedback-collector-27c70",
  storageBucket: "feedback-collector-27c70.firebasestorage.app",
  messagingSenderId: "210927967947",
  appId: "1:210927967947:web:abcc6be9f67123bf2ac54e",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
