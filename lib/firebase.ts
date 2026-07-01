import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkwgNHOfIBe7yVnqfEOPs9WMClkJzu-yM",
  authDomain: "whitecore-site.firebaseapp.com",
  projectId: "whitecore-site",
  storageBucket: "whitecore-site.firebasestorage.app",
  messagingSenderId: "231779608844",
  appId: "1:231779608844:web:7c1d72d389f028f88a8129",
  measurementId: "G-3CFNLQF9NS",
};

// Prevent re-init (IMPORTANT in Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics (only browser safe)
export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};