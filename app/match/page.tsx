import React from 'react';
import { client, mockMatches } from '../../libs/client';

// microCMSから取得する試合結果の型定義
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

export const metadata = {
  title: 'MATCH REPORTS | 深谷PG',
  description: '深谷PGの最新の試合結果とレポート',
};

// キャッシュを無効化して常に最新を取得
export const revalidate = 0;

export default async function MatchPage() {
  let matches: Match[] = [];

  try {
    // APIキーが設定されている場合はmicroCMSから取得
    if (process.env.MICRO_CMS_SERVICE_DOMAIN && process.env.MICRO_CMS_API_KEY) {
      const data = await client.getList<Match>({ 
        endpoint: 'matches',
        customRequestInit: { cache: 'no-store' } // キャッシュを完全に無効化して常に最新データを取得
      });
      matches = data.contents;
    } else {
      // 未設定の場合はモックデータを使用
      matches = mockMatches as Match[];
    }
  } catch (error) {
    console.error("データの取得に失敗しました", error);
    matches = mockMatches as Match[];
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 tracking-tight">MATCH REPORTS</h1>
        <p className="text-gray-600">最新の試合結果をお届けします。</p>
      </div>

      <div className="grid gap-6">
        {matches.map((match) => {
          // microCMSのセレクトフィールドは設定によって配列（["Home"]など）で返るため、文字列として取り出す
          const homeAwayStr = Array.isArray(match.homeAway) ? match.homeAway[0] : (match.homeAway || "");
          const resultStr = Array.isArray(match.result) ? match.result[0] : (match.result || "");

          return (
            <div key={match.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
              
              {/* 上部：試合情報の横並びレイアウト */}
              <div className="flex flex-col md:flex-row items-center justify-between">
                
                {/* 日付とHome/Away */}
                <div className="flex flex-col text-center md:text-left mb-4 md:mb-0 md:w-1/4">
                  <span className="text-sm font-bold text-gray-400 mb-1">
                    {new Date(match.date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </span>
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full w-max mx-auto md:mx-0 ${
                    homeAwayStr === 'Home' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {homeAwayStr.toUpperCase()}
                  </span>
                </div>

                {/* スコアと対戦相手 */}
                <div className="flex items-center justify-center space-x-6 md:w-2/4 mb-4 md:mb-0">
                  <div className="text-right flex-1">
                    <span className="font-bold text-lg md:text-xl text-gray-800">深谷PG</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 bg-gray-50 px-6 py-3 rounded-xl">
                    <span className={`text-3xl font-bold ${match.ourScore > match.opponentScore ? 'text-purple-600' : 'text-gray-800'}`}>
                      {match.ourScore}
                    </span>
                    <span className="text-gray-400 font-bold">-</span>
                    <span className={`text-3xl font-bold ${match.opponentScore > match.ourScore ? 'text-red-600' : 'text-gray-800'}`}>
                      {match.opponentScore}
                    </span>
                  </div>

                  <div className="text-left flex-1">
                    <span className="font-bold text-lg md:text-xl text-gray-800">{match.opponent}</span>
                  </div>
                </div>

                {/* 結果バッジとレポート */}
                <div className="flex flex-col items-center md:items-end md:w-1/4 text-center md:text-right">
                  <span className={`px-4 py-1 text-sm font-extrabold rounded-md mb-2 ${
                    resultStr === 'WIN' ? 'bg-green-100 text-green-700' :
                    resultStr === 'LOSE' ? 'bg-red-100 text-red-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {resultStr}
                  </span>
                  <p className="text-xs text-gray-500 max-w-xs">{match.report}</p>
                </div>
              </div>

              {/* 下部：写真がある場合は中央に大きく表示 */}
              {(() => {
                // 単一画像フィールドと複数画像フィールドのどちらにも対応
                const photoObj = Array.isArray(match.photo) ? match.photo[0] : match.photo;
                if (!photoObj || !photoObj.url) return null;
                
                return (
                  <div className="mt-6 flex justify-center w-full border-t border-gray-50 pt-6">
                    <div className="w-full max-w-2xl overflow-hidden rounded-xl shadow-sm border border-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={photoObj.url} 
                        alt={`${match.opponent}戦の写真`} 
                        className="w-full h-auto max-h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}