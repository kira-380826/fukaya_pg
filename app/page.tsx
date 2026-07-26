"use client";

import React from 'react';
import { Trophy, ChevronRight, Sparkles, Shield, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  // スポンサーのデータ（既存の内容を完全に保持）
  const currentSponsors = [
    { id: 1, name: "株式会社〇〇テック", url: "https://example.com", plan: "Gold", imageUrl: "/sponsor-dummy.png" },
    { id: 2, name: "Sample Design LLC.", url: "https://example.com", plan: "Silver", imageUrl: "/sponsor-dummy.png" },
    { id: 3, name: "〇〇工務店", url: "https://example.com", plan: "Bronze", imageUrl: "/sponsor-dummy.png" },
  ];

  return (
    <div className="bg-[#101415] text-[#e0e3e5] min-h-screen font-sans overflow-hidden">
      {/* 背景のグロー効果 (Pitch Precision Ambient Glows) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-1/2 h-1/2 bg-purple-600/15 blur-[140px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-2/3 h-2/3 bg-indigo-900/15 blur-[160px] rounded-full mix-blend-screen"></div>
      </div>

      {/* --- 1. ヒーローセクション --- */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10 pt-10 pb-20"
        style={{ backgroundImage: 'url("/hero-bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Editorial Brutalism 階層グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101415] via-[#101415]/85 to-[#101415]/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101415] via-transparent to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            {/* アクセントタグ (Pitch Precision The Flash) */}
            <div className="flex items-center gap-3 mb-6 bg-[#1d2022]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse"></span>
              <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                FUKAYA PG OFFICIAL FOOTBALL CLUB
              </span>
            </div>

            {/* タイトル: BEYOND THE LIMIT */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.95] text-white drop-shadow-2xl">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-[#ffd700]">
                THE LIMIT
              </span>
            </h1>

            {/* サブタイトル */}
            <p className="text-xl md:text-3xl mb-12 font-normal tracking-wide text-gray-300 max-w-2xl border-l-2 border-purple-500 pl-4 py-1">
              誇りを胸に、勝利をその手に。
            </p>

            {/* CTAボタン */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link 
                href="/match" 
                className="group inline-flex items-center gap-3 bg-[#ffd700] text-[#101415] px-8 py-4 rounded-xl font-black text-lg tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:bg-white"
              >
                <Trophy className="h-6 w-6 text-[#101415] group-hover:scale-110 transition-transform" />
                <span>最新の試合結果を見る</span>
                <ChevronRight className="h-5 w-5 text-[#101415] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. ホーム用の短い案内 (WELCOME TO 深谷PG) --- */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#191c1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-14 relative overflow-hidden shadow-2xl group hover:border-purple-500/30 transition-all duration-500"
          >
            {/* 装飾用背景光 */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase font-bold">
                ABOUT CLUB
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mb-6 flex items-center gap-3">
              WELCOME TO 深谷PG
            </h2>
            
            <div className="h-px w-20 bg-gradient-to-r from-[#ffd700] to-purple-500 mb-6"></div>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
              私たちは深谷PGです。
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. スポンサーセクション (SPONSORS) --- */}
      <section className="py-20 px-4 bg-[#0b0f10]/80 border-t border-white/10 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center md:text-left mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Shield className="h-4 w-4 text-[#ffd700]" />
                <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                  PARTNERS & SPONSORS
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
                SPONSORS
              </h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base max-w-md">
              深谷PGの活動は、以下のスポンサー様の支援により成り立っています。
            </p>
          </div>

          {/* スポンサーロゴ一覧 (Editorial Brutalism Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {currentSponsors.map((sponsor) => {
              const isGold = sponsor.plan === "Gold";
              const isSilver = sponsor.plan === "Silver";
              
              return (
                <a
                  key={sponsor.id}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col bg-[#1d2022]/80 backdrop-blur-xl rounded-xl transition-all duration-300 overflow-hidden border border-white/10 hover:border-purple-500/50 hover:-translate-y-1.5 shadow-xl ${
                    isGold 
                      ? "md:col-span-2 border-t-4 border-t-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.1)]" 
                      : isSilver 
                      ? "border-t-4 border-t-gray-300" 
                      : "border-t-4 border-t-amber-600"
                  }`}
                >
                  {/* カード上部バッジ */}
                  <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-gray-400 uppercase">
                      OFFICIAL PARTNER
                    </span>
                    <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      isGold 
                        ? "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30" 
                        : isSilver 
                        ? "bg-gray-300/20 text-gray-300 border border-gray-300/30" 
                        : "bg-amber-600/20 text-amber-400 border border-amber-600/30"
                    }`}>
                      {sponsor.plan}
                    </span>
                  </div>

                  {/* ロゴ画像エリア */}
                  <div className={`flex items-center justify-center p-8 bg-[#15181a] relative group-hover:bg-[#191c1e] transition-colors ${
                    isGold ? "h-40 md:h-48" : "h-32 md:h-40"
                  }`}>
                    {sponsor.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={sponsor.imageUrl} 
                        alt={`${sponsor.name} logo`} 
                        className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-600">
                        <Award className="h-10 w-10 mb-2 opacity-40" />
                        <span className="text-xs font-mono">LOGO PLACEHOLDER</span>
                      </div>
                    )}
                  </div>

                  {/* テキスト情報エリア */}
                  <div className="p-4 flex items-center justify-between border-t border-white/10 bg-[#1d2022]">
                    <span className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                      {sponsor.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* スポンサー募集ページへの導線 */}
          <div className="text-center">
            <Link 
              href="/sponsors" 
              className="inline-flex items-center justify-center gap-2 bg-[#1d2022] hover:bg-purple-600 text-white font-bold py-4 px-10 rounded-xl border border-white/15 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] tracking-wide group"
            >
              <span>スポンサー募集について・詳細を見る</span>
              <ChevronRight className="h-5 w-5 text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}