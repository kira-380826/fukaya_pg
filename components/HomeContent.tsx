'use client';

import React from 'react';
import { Trophy, Calendar, ChevronRight, ArrowRight, Shield, Award, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Match = {
  id: string;
  date: string;
  opponent: string;
  homeAway: string[] | string;
  ourScore: number;
  opponentScore: number;
  result: string[] | string;
  report: string;
};

type Sponsor = {
  id: number;
  name: string;
  url: string;
  plan: string;
  imageUrl: string;
};

interface HomeContentProps {
  matches: Match[];
  sponsors: Sponsor[];
}

// microCMSのセレクトフィールド等（文字列、配列、オブジェクト）から安全に文字列を抽出するヘルパー
const getFieldValue = (field: unknown): string => {
  if (field === null || field === undefined) return "";
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (Array.isArray(field)) return getFieldValue(field[0]);
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    const val = obj.name || obj.label || obj.value || obj.id;
    if (val !== undefined && val !== null) return String(val);
    return "";
  }
  return String(field);
};

// 安全な日付フォーマットヘルパー
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "DATE TBD";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr || "DATE TBD";
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export default function HomeContent({ matches, sponsors }: HomeContentProps) {
  return (
    <div className="bg-[#101415] text-[#e0e3e5] min-h-screen font-sans overflow-hidden">
      {/* 背景のグロー効果 (Pitch Precision Ambient Glows) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-1/2 h-1/2 bg-purple-600/15 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-2/3 h-2/3 bg-indigo-900/15 blur-[160px] rounded-full mix-blend-screen"></div>
      </div>

      {/* --- 1. ヒーローセクション (2つのボタン構成) --- */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10 pt-10 pb-32"
        style={{ backgroundImage: 'url("/photo/homeMainphoto.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#101415] via-[#101415]/85 to-[#101415]/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101415] via-transparent to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* アクセントバッジ */}
            <div className="flex items-center gap-3 mb-6 bg-[#1d2022]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg w-max">
              <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse"></span>
              <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                FUKAYA PG OFFICIAL FOOTBALL CLUB
              </span>
            </div>

            {/* タイトル */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white drop-shadow-2xl">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-[#ffd700]">
                THE LIMIT
              </span>
            </h1>

            {/* サブタイトル */}
            <p className="text-xl md:text-2xl mb-10 font-normal tracking-wide text-gray-300 max-w-2xl border-l-2 border-purple-500 pl-4 py-1">
              誇りを胸に、勝利をその手に。
            </p>

            {/* 新デザイン特有のデュアルCTAボタン構成 */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/match" 
                  className="group inline-flex items-center gap-3 bg-[#ffd700] text-[#101415] px-8 py-4 rounded-xl font-black text-base md:text-lg tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:bg-white"
                >
                  <Trophy className="h-5 w-5 text-[#101415] group-hover:scale-110 transition-transform" />
                  <span>最新の試合結果を見る</span>
                  <ChevronRight className="h-5 w-5 text-[#101415] group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/schedule" 
                  className="group inline-flex items-center gap-3 bg-[#1d2022]/80 backdrop-blur-md text-white border border-white/20 hover:border-purple-400 px-8 py-4 rounded-xl font-bold text-base md:text-lg tracking-wider uppercase transition-all hover:bg-purple-900/30 shadow-lg"
                >
                  <Calendar className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>試合日程を確認</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. オーバーラップ Latest Results スコアボード構成 (-mt-20 z-20) --- */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 -mt-24 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 bg-[#15181a]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#ffd700] animate-pulse"></span>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              LATEST RESULTS <span className="text-sm font-mono text-purple-400 font-normal">/ 最新試合結果</span>
            </h2>
          </div>
          <Link 
            href="/match" 
            className="text-sm font-mono text-purple-400 hover:text-white uppercase flex items-center gap-1 transition-colors self-end sm:self-auto group"
          >
            <span>マッチレポート一覧</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* スコアカード 3連グリッド (Pitch Precision Scoreboards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((match, idx) => {
            const homeAwayStr = getFieldValue(match.homeAway);
            const resultStr = getFieldValue(match.result);
            const dateStr = formatDate(match.date);

            return (
              <motion.div 
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#1d2022]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* 装飾グラデーション */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div>
                  {/* カードヘッダー */}
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10 font-mono text-xs">
                    <span className="text-gray-400 tracking-wider">MATCHDAY • {dateStr}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[10px]">{homeAwayStr}</span>
                      <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                        resultStr === 'WIN' ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30' :
                        resultStr === 'LOSE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                      }`}>
                        {resultStr}
                      </span>
                    </div>
                  </div>

                  {/* スコア表示 */}
                  <div className="flex items-center justify-between mb-6 my-2">
                    <div className="flex flex-col items-center gap-2 w-1/3 text-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-purple-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-105 transition-transform p-1">
                        <img src="/photo/emblem.jpg" alt="深谷PG" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-white text-sm md:text-base tracking-tight truncate w-full">深谷PG</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 bg-[#15181a] px-4 py-2 rounded-xl border border-white/5">
                      <span className={`text-2xl md:text-3xl font-black ${match.ourScore > match.opponentScore ? 'text-[#ffd700]' : 'text-white'}`}>
                        {match.ourScore}
                      </span>
                      <span className="text-gray-500 font-bold">-</span>
                      <span className={`text-2xl md:text-3xl font-black ${match.opponentScore > match.ourScore ? 'text-red-400' : 'text-gray-300'}`}>
                        {match.opponentScore}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-1/3 text-center opacity-80">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                        <Activity size={20} />
                      </div>
                      <span className="font-bold text-gray-300 text-sm md:text-base tracking-tight truncate w-full">{match.opponent}</span>
                    </div>
                  </div>
                </div>

                {/* カードフッター (レポート概要) */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400 line-clamp-1 flex-1 mr-2">{match.report}</p>
                  <Link href="/match" className="text-purple-400 hover:text-white p-1 rounded transition-colors flex-shrink-0">
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- 3. Welcomeセクション (スプリット・エディトリアルレイアウト構成) --- */}
      <section className="py-20 px-4 relative z-10 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 左側：セクションタイトルカード */}
          <div className="lg:col-span-5 bg-[#191c1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase font-bold">
                  01 // CLUB PHILOSOPHY
                </span>
              </div>
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/15 bg-black/50 p-2 mb-6 shadow-xl">
                <img src="/photo/emblem.jpg" alt="深谷PG エンブレム" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-6">
                WELCOME TO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#ffd700]">深谷PG</span>
              </h2>
            </div>

            <div className="pt-6 border-t border-white/10 mt-8">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">FUKAYA PG OFFICIAL WEBSITE</p>
            </div>
          </div>

          {/* 右側：メインコンテンツカード */}
          <div className="lg:col-span-7 bg-[#1d2022]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-purple-500/30 transition-all duration-500">
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#ffd700]/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-[0.07] pointer-events-none transform rotate-12 group-hover:scale-105 transition-transform duration-700">
              <img src="/photo/emblem.jpg" alt="" className="w-full h-full object-contain filter grayscale" />
            </div>
            
            <div>
              <div className="h-1 w-20 bg-gradient-to-r from-[#ffd700] to-purple-500 mb-8 rounded-full"></div>
              
              <p className="text-white text-2xl md:text-3xl font-extrabold tracking-wide leading-relaxed mb-8">
                私たちは深谷PGです。
              </p>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                誇りを胸に、勝利をその手に。深谷PGは常に高みを目指し、熱気とデータ分析を融合させた新しいスタイルのサッカークラブとして前進し続けます。
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-end">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#ffd700] hover:text-white uppercase tracking-wider transition-colors group/link"
              >
                <span>お問い合わせ・練習試合のお申し込み</span>
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. スポンサーセクション (エディトリアルバナー構成) --- */}
      <section className="py-20 px-4 bg-[#0b0f10]/90 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                  02 // OFFICIAL PARTNERS
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
                SPONSORS
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-gray-400 text-sm md:text-base">
                深谷PGの活動は、以下のスポンサー様の支援により成り立っています。
              </p>
              <p className="mt-2 text-xs text-amber-400 font-mono bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded inline-block">
                ※現在表示の企業様は掲載イメージ（サンプルデータ）です
              </p>
            </div>
          </div>

          {/* スポンサーロゴ一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {sponsors.map((sponsor) => {
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
                      ? "md:col-span-2 border-t-4 border-t-[#ffd700] shadow-[0_0_25px_rgba(255,215,0,0.12)]" 
                      : isSilver 
                      ? "border-t-4 border-t-gray-300" 
                      : "border-t-4 border-t-amber-600"
                  }`}
                >
                  <div className="px-5 py-3 bg-black/40 border-b border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-wider text-gray-400 uppercase">
                      OFFICIAL PARTNER
                    </span>
                    <span className={`font-mono text-[11px] font-bold px-3 py-0.5 rounded-full uppercase ${
                      isGold 
                        ? "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30" 
                        : isSilver 
                        ? "bg-gray-300/20 text-gray-300 border border-gray-300/30" 
                        : "bg-amber-600/20 text-amber-400 border border-amber-600/30"
                    }`}>
                      {sponsor.plan}
                    </span>
                  </div>

                  <div className={`flex items-center justify-center p-8 bg-[#15181a] relative group-hover:bg-[#191c1e] transition-colors ${
                    isGold ? "h-44 md:h-52" : "h-36 md:h-44"
                  }`}>
                    {sponsor.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={sponsor.imageUrl} 
                        alt={`${sponsor.name} logo`} 
                        className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Award className="h-8 w-8 mb-1.5 opacity-40 text-amber-400" />
                        <span className="font-mono text-xs text-amber-400/80 font-bold">SAMPLE LOGO IMAGE</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex items-center justify-between border-t border-white/10 bg-[#1d2022]">
                    <span className="font-bold text-white text-base md:text-lg group-hover:text-purple-300 transition-colors">
                      {sponsor.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              href="/sponsors" 
              className="inline-flex items-center justify-center gap-3 bg-[#1d2022] hover:bg-purple-600 text-white font-bold py-4 px-12 rounded-xl border border-white/15 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] tracking-wide group"
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
