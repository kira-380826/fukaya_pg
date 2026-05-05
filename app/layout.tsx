import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TEAM PURPLE | サッカーチーム公式HP",
  description: "TEAM PURPLEの公式ホームページです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen flex flex-col bg-purple-50 text-gray-900 font-sans`}>
        {/* 全ページ共通のヘッダー */}
        <Header />
        
        {/* 各ページの中身がここに入る (flex-growでフッターを最下部に押しやる) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 全ページ共通のフッター */}
        <footer className="bg-gray-100 py-10 text-center text-gray-600 border-t mt-auto">
          <p className="mb-4 font-bold text-purple-900">TEAM PURPLE OFFICIAL WEBSITE</p>
          <p className="text-sm">&copy; 2026 TEAM PURPLE. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}