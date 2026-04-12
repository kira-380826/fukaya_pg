import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] flex items-center justify-center bg-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 italic">BEYOND THE LIMIT</h2>
          <p className="text-xl md:text-2xl mb-8">誇りを胸に、勝利をその手に。</p>
          <Link href="/match" className="bg-white text-purple-900 px-8 py-3 rounded-md font-bold text-lg hover:bg-purple-100 transition shadow-lg inline-block">
            最新の試合結果を見る
          </Link>
        </div>
      </section>

      {/* ホーム用の短い案内など（必要に応じて追加） */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-purple-900 mb-4">WELCOME TO TEAM PURPLE</h3>
          <p className="text-gray-600">私たちは東京を拠点に活動するサッカーチームです。</p>
        </div>
      </section>
    </>
  );
}