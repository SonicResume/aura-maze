import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBrck1di7_N7B2d-H8mwZud17N9CYgC8wc',
  authDomain: 'resume-97612.firebaseapp.com',
  projectId: 'resume-97612',
  storageBucket: 'resume-97612.firebasestorage.app',
  messagingSenderId: '1096541776873',
  appId: '1:1096541776873:web:e3f1cea6e86f73e98f7978',
  measurementId: 'G-13CSJVVL13',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export async function registerUser(email, password) {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    return {
      success: true,
      user: credential.user,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function loginUser(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return {
      success: true,
      user: credential.user,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function loginWithGoogle() {
  try {
    const credential = await signInWithPopup(
      auth,
      googleProvider
    )

    return {
      success: true,
      user: credential.user,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function logoutUser() {
  await signOut(auth)
}