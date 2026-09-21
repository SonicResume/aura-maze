import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// 🔐 Your verified live Firebase application credential matrix
const firebaseConfig = {
  apiKey: "AIzaSyBrck1di7_N7B2d-H8mwZud17N9CYgC8wc",
  authDomain: "resume-97612.firebaseapp.com",
  projectId: "resume-97612",
  storageBucket: "resume-97612.firebasestorage.app",
  messagingSenderId: "1096541776873",
  appId: "1:1096541776873:web:e3f1cea6e86f73e98f7978",
  measurementId: "G-13CSJVVL13"
};

// Initialize Core App Instance Container
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/* ---------------- 📝 ACCOUNT SIGN UP DISPATCH ---------------- */
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/* ---------------- 🔑 ACCOUNT SIGN IN DISPATCH ---------------- */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // 🎫 Fetch the unique cryptographically signed Firebase ID token string
    const idToken = await userCredential.user.getIdToken();
    return { success: true, token: idToken, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/* ---------------- 🚪 ACCOUNT SESSION TERMINATION ---------------- */
export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem("authToken");
}
