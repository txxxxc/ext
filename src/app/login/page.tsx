"use client";
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/firebase";

const PageComponent: NextPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-md">Googleアカウントでログインしてください。</p>
        <Button className="mt-4" variant="outline" onClick={login}>
          ログインする
        </Button>
      </div>
    </div>
  );
};

export default PageComponent;
