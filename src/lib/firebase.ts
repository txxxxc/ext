import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { env } from "@/env.mjs";
import { User } from "@/lib/user";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const apps = getApps();
const app = apps.length ? apps[0] : initializeApp(firebaseConfig);
const authProvider = new GoogleAuthProvider();

export const firestore = (): Firestore => {
  return getFirestore(app);
};
export default app;

export const login = async () => {
  await signInWithPopup(getAuth(app), authProvider);
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  onFirebaseAuthStateChanged(getAuth(app), (user) => {
    callback(
      user && {
        id: user.uid,
        displayName: user.displayName ?? "",
        email: user.email ?? "",
        avatarUrl: user.photoURL,
      },
    );
  });
};

const appV1 = {
  _get: (...path: string[]) => collections.app._get("v1", ...path),
  user: (id: string) => appV1.users.of(id),
  users: {
    get: (...path: string[]) => appV1._get("users", ...path),
    of: (id: string) => ({
      get: (...path: string[]) => appV1.users.get(id, ...path),
    }),
  },
} as const;

export const collections = {
  _get: (p: string, ...path: string[]) => [firestore(), p, ...path] as const,
  app: {
    _get: (...path: string[]) => collections._get("app", ...path),
    v1: appV1,
  } as const,
} as const;
