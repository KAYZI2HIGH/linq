import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { NotifyProvider } from "@/contexts/FriendRequestContext";
import { SessionProvider } from "next-auth/react";
import { MessageContextProvider } from "@/contexts/MessagesContext";
import QueryProvider from "@/components/provider/QueryProvider";
import { DashboardContextProvider } from "@/contexts/DashboardContext";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Linq",
  description: "Chat without Borders",
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
          <QueryProvider>
            <MessageContextProvider>
              <NotifyProvider>
                <DashboardContextProvider>
                  <Toaster position="top-center" />
                  {children}
                </DashboardContextProvider>
              </NotifyProvider>
            </MessageContextProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
