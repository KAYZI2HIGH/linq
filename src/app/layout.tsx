import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { NotifyProvider } from "@/contexts/FriendRequestContext";
import { SessionProvider } from "next-auth/react";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} antialiased`}>
        <SessionProvider>
          <NotifyProvider>
            <Toaster position="top-center" />
            {children}
          </NotifyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
