import React from 'react';
import { client, mockMatches } from '../../libs/client';
import { Shield, Activity, Calendar } from 'lucide-react';

export const metadata = {
  title: '試合結果・マッチレポート',
  description: '埼玉県深谷市を拠点とする社会人サッカーチーム「深谷PG」の公式試合結果および戦評・マッチレポート一覧です。',
};

type Match = {
  id: string;
  date: string;
  opponent: string;
  homeAway: string[] | string;
  ourScore: number;
  opponentScore: number;
  result: string[] | string;
  report: string;
  photo?: {
    url: string;
    width: number;
    height: number;
  } | Array<{
    url: string;
    width: number;
    height: number;
  }>;
};

export const revalidate = 0;

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

export default async function MatchPage() {
  let matches: Match[] = [];

  try {
    if (process.env.MICRO_CMS_SERVICE_DOMAIN && process.env.MICRO_CMS_API_KEY) {
      const data = await client.getList<Match>({ 
        endpoint: 'matches',
        customRequestInit: { cache: 'no-store' }
      });
      matches = data.contents;
    } else {
      matches = mockMatches as Match[];
    }
  } catch (error) {
    console.error("データの取得に失敗しました", error);
    matches = mockMatches as Match[];
  }

  return (
    <div className="bg-[#101415] text-[#e0e3e5] min-h-screen font-sans py-16 px-4 relative overflow-hidden">
      {/* アンビエントグロー光 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#ffd700]/10 blur-[160px] rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* ヘッダーバナー */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] animate-pulse"></span>
              <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                FUKAYA PG OFFICIAL FOOTBALL CLUB
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
              MATCH REPORTS
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm">
            熱戦の記録。最新の試合結果と詳細なレポートをお届けします。
          </p>
        </div>

        {/* 試合結果カード一覧 (Pitch Precision Match Report UI) */}
        <div className="space-y-8">
          {matches.map((match) => {
            const homeAwayStr = getFieldValue(match.homeAway);
            const resultStr = getFieldValue(match.result);
            const dateStr = formatDate(match.date);

            return (
              <div 
                key={match.id} 
                className="bg-[#1d2022]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:border-purple-500/40 transition-all duration-300 shadow-2xl group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-[#ffd700] opacity-80"></div>

                {/* 上部情報の横並び */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                  
                  {/* 日付と区分 */}
                  <div className="flex items-center gap-4 w-full lg:w-1/4">
                    <div className="w-12 h-12 rounded-xl bg-[#15181a] border border-white/10 flex flex-col items-center justify-center text-gray-300 font-mono">
                      <Calendar size={18} className="text-purple-400 mb-0.5" />
                    </div>
                    <div>
                      <span className="text-sm font-mono font-bold text-gray-300 block">
                        {dateStr}
                      </span>
                      <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full uppercase mt-1 ${
                        homeAwayStr === 'Home' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/10 text-gray-300 border border-white/20'
                      }`}>
                        {homeAwayStr.toUpperCase()} MATCH
                      </span>
                    </div>
                  </div>

                  {/* スコアボード中央エリア */}
                  <div className="flex items-center justify-center space-x-4 sm:space-x-8 w-full lg:w-2/4 bg-[#15181a]/80 p-4 rounded-xl border border-white/5">
                    <div className="text-right flex-1 flex items-center justify-end gap-2 sm:gap-3">
                      <span className="font-extrabold text-base sm:text-xl text-white truncate">深谷PG</span>
                      <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 hidden sm:flex">
                        <Shield size={16} />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-3 px-4 py-1">
                      <span className={`text-3xl sm:text-4xl font-black ${match.ourScore > match.opponentScore ? 'text-[#ffd700]' : 'text-white'}`}>
                        {match.ourScore}
                      </span>
                      <span className="text-gray-500 font-extrabold text-2xl">-</span>
                      <span className={`text-3xl sm:text-4xl font-black ${match.opponentScore > match.ourScore ? 'text-red-400' : 'text-gray-300'}`}>
                        {match.opponentScore}
                      </span>
                    </div>

                    <div className="text-left flex-1 flex items-center justify-start gap-2 sm:gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 flex-shrink-0 hidden sm:flex">
                        <Activity size={16} />
                      </div>
                      <span className="font-extrabold text-base sm:text-xl text-gray-300 truncate">{match.opponent}</span>
                    </div>
                  </div>

                  {/* 結果バッジ */}
                  <div className="flex lg:justify-end w-full lg:w-1/4">
                    <span className={`px-5 py-2 text-sm font-mono font-extrabold rounded-full tracking-widest uppercase shadow-lg w-full lg:w-auto text-center ${
                      resultStr === 'WIN' ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40 shadow-[0_0_15px_rgba(255,215,0,0.2)]' :
                      resultStr === 'LOSE' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      'bg-gray-500/20 text-gray-300 border border-gray-500/40'
                    }`}>
                      {resultStr}
                    </span>
                  </div>
                </div>

                {/* 下部：レポートテキストと写真 */}
                <div className="pt-6">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 border-l-2 border-purple-500 pl-4 py-1">
                    {match.report}
                  </p>

                  {(() => {
                    const photoObj = Array.isArray(match.photo) ? match.photo[0] : match.photo;
                    if (!photoObj || !photoObj.url) return null;
                    
                    return (
                      <div className="mt-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={photoObj.url} 
                          alt={`${match.opponent}戦の写真`} 
                          className="w-full h-auto max-h-[480px] object-cover hover:scale-105 transition-transform duration-700 brightness-95 hover:brightness-105"
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}