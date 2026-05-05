import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  // スポンサーのデータ（/sponsors/page.tsx と同じものを使用）
  const currentSponsors = [
    { id: 1, name: "株式会社〇〇テック", url: "https://example.com", plan: "Gold", imageUrl: "" },
    { id: 2, name: "Sample Design LLC.", url: "https://example.com", plan: "Silver", imageUrl: "" },
    { id: 3, name: "〇〇工務店", url: "https://example.com", plan: "Bronze", imageUrl: "" },
  ];

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] flex items-center justify-center bg-purple-500 overflow-hidden">
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
          <h3 className="text-3xl font-bold text-purple-900 mb-4">WELCOME TO 深谷PG</h3>
          <p className="text-gray-600">私たちは深谷PGです。</p>
        </div>
      </section>

      {/* === スポンサーセクション === */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-purple-900 tracking-wider mb-2">SPONSORS</h2>
            <p className="text-gray-600 text-sm md:text-base">
              深谷PGの活動は、以下のスポンサー様の支援により成り立っています。
            </p>
          </div>

          {/* スポンサーロゴ一覧 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
            {currentSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 ${
                  sponsor.plan === "Gold" ? "col-span-2 md:col-span-2 border-b-4 border-b-[#ffd700]" : 
                  sponsor.plan === "Silver" ? "border-b-4 border-b-[#c0c0c0]" : 
                  "border-b-4 border-b-[#cd7f32]"
                }`}
              >
                {/* ロゴ画像エリア */}
                <div className={`flex items-center justify-center bg-gray-50 p-4 ${sponsor.plan === "Gold" ? "h-32 md:h-40" : "h-24 md:h-32"}`}>
                  {sponsor.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={sponsor.imageUrl} 
                      alt={`${sponsor.name} logo`} 
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* テキスト情報エリア */}
                <div className="p-3 flex flex-col items-center border-t border-gray-100 bg-white">
                  <span className="font-bold text-gray-800 text-center text-sm md:text-base">
                    {sponsor.name}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* スポンサー募集ページへの導線 */}
          <div className="text-center">
            <Link 
              href="/sponsors" 
              className="inline-flex items-center justify-center bg-white text-purple-600 font-bold py-3 px-8 rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300 shadow-sm"
            >
              スポンサー募集について・詳細を見る
              {/* インポートされていた ChevronRight アイコンを使用 */}
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}