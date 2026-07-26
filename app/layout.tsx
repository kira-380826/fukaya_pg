import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "深谷PG | サッカーチーム公式HP",
  description: "深谷PGの公式ホームページです。最新の試合結果やスケジュールをお届けします。",
  openGraph: {
    title: "深谷PG | サッカーチーム公式HP",
    description: "深谷PGの公式ホームページです。最新の試合結果やスケジュールをお届けします。",
    siteName: "深谷PG",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#101415] text-[#e0e3e5] font-sans selection:bg-purple-600 selection:text-white`}>
        {/* 全ページ共通のヘッダー */}
        <Header />
        
        {/* 各ページの中身がここに入る (flex-growでフッターを最下部に押しやる) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 共通フッター (Pitch Precision editorial dark style) */}
        <footer className="bg-[#0b0f10] py-12 text-center text-gray-400 border-t border-white/10 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-purple-600/30 blur-[60px] rounded-full"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <p className="mb-3 font-black text-white text-lg tracking-widest uppercase">深谷PG OFFICIAL WEBSITE</p>
            <p className="text-xs text-gray-500 font-mono tracking-wider">&copy; 2026 深谷PG. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}