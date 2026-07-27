import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import InstagramIcon from "../components/InstagramIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://fukayapg.com"),
  title: {
    default: "深谷PG | 埼玉県深谷市の社会人サッカーチーム",
    template: "%s | 深谷PG",
  },
  description: "埼玉県深谷市を拠点に活動する社会人サッカーチーム「深谷PG」の公式ホームページです。最新の試合結果や日程、チーム情報をお届けします。",
  openGraph: {
    title: "深谷PG | 埼玉県深谷市の社会人サッカーチーム",
    description: "埼玉県深谷市を拠点に活動する社会人サッカークラブ「深谷PG」のオフィシャルウェブサイト。",
    url: "https://fukayapg.com",
    siteName: "深谷PG OFFICIAL WEBSITE",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/photo/homeMainphoto.jpg",
        width: 1200,
        height: 630,
        alt: "深谷PG メインビジュアル",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "深谷PG | 埼玉県深谷市の社会人サッカーチーム",
    description: "埼玉県深谷市を拠点に活動する社会人サッカークラブ「深谷PG」公式HP。",
    images: ["/photo/homeMainphoto.jpg"],
  },
  verification: {
    google: "google847eb2f54c631256",
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
        {/* 構造化データ (JSON-LD: SportsTeam) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsTeam",
              "name": "深谷PG",
              "alternateName": "Fukaya PG",
              "sport": "Soccer",
              "url": "https://fukayapg.com",
              "logo": "https://fukayapg.com/photo/homeMainphoto.jpg",
              "description": "埼玉県深谷市を拠点に活動する社会人サッカークラブチーム。",
              "location": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "深谷市",
                  "addressRegion": "埼玉県",
                  "addressCountry": "JP"
                }
              },
              "sameAs": [
                "https://www.instagram.com/fukaya_pg"
              ]
            }),
          }}
        />

        {/* 全ページ共通のヘッダー */}
        <Header />
        
        {/* 各ページの中身がここに入る (flex-growでフッターを最下部に押しやる) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 共通フッター (Pitch Precision editorial dark style) */}
        <footer className="bg-[#0b0f10] py-14 text-center text-gray-400 border-t border-white/10 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-purple-600/30 blur-[60px] rounded-full"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            {/* インスタグラム公式リンクボタン */}
            <a
              href="https://www.instagram.com/fukaya_pg"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-[#191c1e] hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-gray-300 hover:text-white px-6 py-3 rounded-full border border-white/15 hover:border-transparent transition-all duration-300 shadow-lg mb-8 hover:scale-105"
            >
              <InstagramIcon size={20} className="text-pink-400 group-hover:text-white transition-colors" />
              <span className="font-bold text-sm tracking-wider uppercase">Official Instagram</span>
            </a>

            <p className="mb-2 font-black text-white text-lg tracking-widest uppercase">深谷PG OFFICIAL WEBSITE</p>
            <p className="text-xs text-gray-500 font-mono tracking-wider">&copy; 2026 深谷PG. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}