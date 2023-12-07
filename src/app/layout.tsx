import type { Metadata } from "next";
import { FirebaseAuthnProvider } from "@/contexts/firebase";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AppContainer } from "@/components/app-container";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <FirebaseAuthnProvider>
          <AppContainer>{children}</AppContainer>
        </FirebaseAuthnProvider>
      </body>
    </html>
  );
}
