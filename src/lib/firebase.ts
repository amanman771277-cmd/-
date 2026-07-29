import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Hardcode the config from firebase-applet-config.json for now, or fetch it if needed.
// Actually, in Vite it's better to inline it or use env vars, but I'll inline it.
const firebaseConfig = {
  projectId: "logical-centaur-26m9v",
  appId: "1:875537578751:web:1c136defc36b92c1a2eaca",
  apiKey: "AIzaSyD8ZY1xm8X_ByYnrLssnVIfOi1YrNWdpKk",
  authDomain: "logical-centaur-26m9v.firebaseapp.com",
  storageBucket: "logical-centaur-26m9v.firebasestorage.app",
  messagingSenderId: "875537578751"
};

const app = initializeApp(firebaseConfig);

// The setup output included a custom databaseId: "ai-studio-spicedinemenu-e9d88cd5-5102-40aa-a63e-b8bac9592408"
export const db = getFirestore(app, "ai-studio-spicedinemenu-e9d88cd5-5102-40aa-a63e-b8bac9592408");
