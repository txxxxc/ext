"use client";
import { redirect, usePathname } from "next/navigation";
import { useFirebaseAuthnContext } from "@/contexts/firebase";

export type AppContainerProps = {
  children?: React.ReactNode;
};

const isLoginRequiredPath = (path: string) => {
  return path !== "/login";
};

export const AppContainer = ({ children }: AppContainerProps) => {
  const { currentUser } = useFirebaseAuthnContext();
  const pathName = usePathname();
  if (currentUser && !isLoginRequiredPath(pathName)) return redirect("/");
  if (!currentUser && !isLoginRequiredPath(pathName)) return <>{children}</>;
  if (currentUser === undefined) return <Loading />;
  if (currentUser === null) return redirect("/login");
  return <>{children}</>;
};

export const Loading = () => {
  return (
    <div>
      <p>読み込み中...</p>
    </div>
  );
};
