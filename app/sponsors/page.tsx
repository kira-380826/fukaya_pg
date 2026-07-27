import React from 'react';
import { Award, Shield, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'オフィシャルパートナー・スポンサー募集',
  description: '埼玉県深谷市の社会人サッカーチーム「深谷PG」を支援していただいているパートナー・スポンサー様の一覧および協賛募集のご案内です。',
};

export default function SponsorsPage() {
  const currentSponsors = [
    { id: 1, name: "【サンプル】株式会社〇〇テック", url: "https://example.com", plan: "Gold", imageUrl: "" },
    { id: 2, name: "【サンプル】Sample Design LLC.", url: "https://example.com", plan: "Silver", imageUrl: "" },
  ];

  return (
    <div className="bg-[#101415] text-[#e0e3e5] min-h-screen font-sans py-16 px-4 relative overflow-hidden">
      {/* アンビエントグロー */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-20 w-96 h-96 bg-[#ffd700]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-600/15 blur-[160px] rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* ヘッダーバナー */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] animate-pulse"></span>
              <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                PARTNERSHIP & SUPPORT
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
              SPONSORS
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm">
            私たちの活動を支援していただけるスポンサー様の一覧と募集プランについて。
          </p>
        </div>

        {/* --- 1. スポンサープラン一覧 (Pitch Precision Plans) --- */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-5 w-5 text-purple-400" />
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wider">
              SPONSORSHIP PLANS <span className="text-sm font-mono text-gray-500 font-normal">/ スポンサープラン</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* ブロンズプラン */}
            <div className="bg-[#1d2022]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 border-t-4 border-t-amber-600 flex flex-col justify-between shadow-2xl hover:border-amber-600/50 transition-all">
              <div>
                <span className="font-mono text-xs text-amber-500 tracking-widest uppercase block mb-2">PARTNER PLAN</span>
                <h3 className="text-xl font-black text-white mb-4">ブロンズプラン</h3>
                <p className="text-4xl font-black text-white mb-6">
                  ¥5,000<span className="text-xs font-mono font-normal text-gray-400"> / 月</span>
                </p>
                <ul className="text-sm text-gray-300 space-y-4 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Webサイトへのお名前掲載（テキスト）</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>SNSでの感謝のメッセージ</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 text-center">
                <span className="text-xs font-mono text-gray-500">OFFICIAL BRONZE PARTNER</span>
              </div>
            </div>

            {/* シルバープラン */}
            <div className="bg-[#1d2022]/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 border-t-4 border-t-gray-300 flex flex-col justify-between shadow-2xl hover:border-gray-300/50 transition-all transform md:-translate-y-2">
              <div>
                <span className="font-mono text-xs text-gray-300 tracking-widest uppercase block mb-2">POPULAR PLAN</span>
                <h3 className="text-xl font-black text-white mb-4">シルバープラン</h3>
                <p className="text-4xl font-black text-white mb-6">
                  ¥10,000<span className="text-xs font-mono font-normal text-gray-400"> / 月</span>
                </p>
                <ul className="text-sm text-gray-300 space-y-4 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>Webサイトへのロゴ掲載（小）</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>SNSでの定期的な紹介</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span>イベント時のロゴ掲出</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 text-center">
                <span className="text-xs font-mono text-gray-400">OFFICIAL SILVER PARTNER</span>
              </div>
            </div>

            {/* ゴールドプラン */}
            <div className="bg-gradient-to-b from-[#1d2022] to-[#15181a] backdrop-blur-xl rounded-2xl p-8 border border-[#ffd700]/30 border-t-4 border-t-[#ffd700] flex flex-col justify-between shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:border-[#ffd700] transition-all">
              <div>
                <span className="font-mono text-xs text-[#ffd700] tracking-widest uppercase block mb-2 font-bold animate-pulse">PREMIUM PLAN</span>
                <h3 className="text-xl font-black text-white mb-4">ゴールドプラン</h3>
                <p className="text-4xl font-black text-[#ffd700] mb-6">
                  ¥20,000<span className="text-xs font-mono font-normal text-gray-400"> / 月</span>
                </p>
                <ul className="text-sm text-gray-300 space-y-4 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#ffd700] flex-shrink-0 mt-0.5" />
                    <span>Webサイトへのロゴ掲載（大・最上部）</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#ffd700] flex-shrink-0 mt-0.5" />
                    <span>練習着や公式グッズへのロゴ掲載</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#ffd700] flex-shrink-0 mt-0.5" />
                    <span>選手とのコラボ企画やイベント優先招待</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 text-center">
                <span className="text-xs font-mono font-bold text-[#ffd700]">OFFICIAL GOLD PARTNER</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. 現在のスポンサー様一覧 --- */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-5 w-5 text-[#ffd700]" />
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wider">
              CURRENT PARTNERS <span className="text-sm font-mono text-gray-500 font-normal">/ ご協賛企業様</span>
            </h2>
          </div>

          {/* サンプルであることを明示する注釈ボックス */}
          <div className="bg-[#1d2022]/90 border border-amber-500/40 rounded-xl p-4 md:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-amber-300 shadow-lg">
            <span className="text-xs font-mono bg-amber-500/20 px-3 py-1 rounded border border-amber-500/30 uppercase tracking-wider font-bold flex-shrink-0">
              Sample Notice
            </span>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              ※ 現在表示されているスポンサー企業名・ロゴはすべて<strong className="text-amber-400 font-bold underline">掲載イメージ（サンプルデータ）</strong>です。深谷PGを支援してくださるオフィシャルパートナー様を随時募集しております。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {currentSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1d2022]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center hover:border-purple-500/50 transition-all shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-black/40 rounded-bl-xl border-l border-b border-white/5 font-mono text-xs text-gray-400">
                  {sponsor.plan.toUpperCase()} PARTNER
                </div>

                <div className="h-28 flex items-center justify-center my-6 w-full">
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

                <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                    {sponsor.name}
                  </span>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">VISIT SITE →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* --- 3. お問い合わせバナー --- */}
        <section className="bg-[#191c1e]/90 backdrop-blur-xl rounded-3xl p-8 md:p-14 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-4">
            JOIN AS A PARTNER
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            スポンサーに関する詳細な資料や、ご予算に合わせたカスタマイズプランのご相談など、何でもお気軽にお問い合わせください。
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#ffd700] hover:bg-white text-[#101415] font-black py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] tracking-wider uppercase"
          >
            <span>お問い合わせ・ご相談はこちら</span>
          </a>
        </section>
      </div>
    </div>
  );
}