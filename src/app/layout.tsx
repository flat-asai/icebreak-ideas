import type React from "react";
import { Toaster } from "@/components/ui";
// import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アイスブレイクお題作成ツール",
  description: "会社のアイスブレイクに最適なお題を生成するツール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        {children}
        <Toaster position="bottom-right" />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
