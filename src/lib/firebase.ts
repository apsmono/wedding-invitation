import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseOptions,
} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

export const isFirebaseConfigured = requiredFirebaseKeys.every(Boolean);

export const firebaseApp = isFirebaseConfigured
  ? (getApps()[0] ?? initializeApp(firebaseConfig))
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null;

export function getFirebaseApp() {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase belum dikonfigurasi. Salin .env.example ke .env lalu isi nilai VITE_FIREBASE_* dari pengaturan proyek Firebase Anda.",
    );
  }

  return getApps()[0] ?? getApp();
}

export function getFirebaseAuth() {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth belum dikonfigurasi. Tambahkan terlebih dahulu nilai VITE_FIREBASE_* dari pengaturan proyek Firebase Anda.",
    );
  }

  return firebaseAuth;
}

export function getFirebaseDb() {
  if (!firebaseDb) {
    throw new Error(
      "Firestore belum dikonfigurasi. Tambahkan nilai VITE_FIREBASE_* ke .env lalu buat basis data Firestore pada proyek Firebase Anda.",
    );
  }

  return firebaseDb;
}
