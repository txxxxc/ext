"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@/lib/firebase";
import { User } from "@/lib/user";

type AuthContextTypeProps = {
  currentUser: User | null | undefined;
};

const FirebaseAuthnContext = createContext<AuthContextTypeProps>({
  currentUser: undefined,
});

type Props = {
  children?: React.ReactNode;
};

export const FirebaseAuthnProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined,
  );

  // ログイン状態の変化を監視
  useEffect(() => {
    onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <FirebaseAuthnContext.Provider value={{ currentUser }}>
      {children}
    </FirebaseAuthnContext.Provider>
  );
};

export const useFirebaseAuthnContext = () => useContext(FirebaseAuthnContext);
