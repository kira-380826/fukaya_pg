"use client";

export default function SponsorsPage() {
  // スポンサーのデータ（本来はデータベースなどから取得しますが、今回はサンプルとして配列を用意しています）
  const currentSponsors = [
    { id: 1, name: "株式会社〇〇テック", url: "https://example.com", plan: "Gold", imageUrl: "" },
    { id: 2, name: "Sample Design LLC.", url: "https://example.com", plan: "Silver", imageUrl: "" },
  ];

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Sponsors</h1>
        <p className="text-gray-600">
          私たちの活動を支援していただけるスポンサー様を募集しております。<br />
          皆様からのご支援は、プロジェクトの運営や開発資金として大切に活用させていただきます。
        </p>
      </div>

      {/* === 1. スポンサープラン一覧 === */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">スポンサープラン</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* 5,000円プラン */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#cd7f32] flex flex-col">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-700">ブロンズプラン</h3>
            <p className="text-3xl font-bold text-center mb-6 text-gray-800">
              ¥5,000<span className="text-sm font-normal text-gray-500"> / 月</span>
            </p>
            <ul className="text-sm text-gray-600 space-y-3 mb-6 flex-grow">
              <li>✓ Webサイトへのお名前掲載（テキスト）</li>
              <li>✓ SNSでの感謝のメッセージ</li>
            </ul>
          </div>

          {/* 10,000円プラン */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#c0c0c0] flex flex-col transform md:-translate-y-4">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-700">シルバープラン</h3>
            <p className="text-3xl font-bold text-center mb-6 text-gray-800">
              ¥10,000<span className="text-sm font-normal text-gray-500"> / 月</span>
            </p>
            <ul className="text-sm text-gray-600 space-y-3 mb-6 flex-grow">
              <li>✓ Webサイトへのロゴ掲載（小）</li>
              <li>✓ SNSでの定期的な紹介</li>
              <li>✓ イベント時のロゴ掲出</li>
            </ul>
          </div>

          {/* 20,000円プラン */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#ffd700] flex flex-col">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-700">ゴールドプラン</h3>
            <p className="text-3xl font-bold text-center mb-6 text-gray-800">
              ¥20,000<span className="text-sm font-normal text-gray-500"> / 月</span>
            </p>
            <ul className="text-sm text-gray-600 space-y-3 mb-6 flex-grow">
              <li>✓ Webサイトへの特大ロゴ掲載</li>
              <li>✓ SNSでの重点的な紹介</li>
              <li>✓ 各種制作物へのクレジット記載</li>
              <li>✓ 個別ミーティング（希望制）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* === 2. 現在のスポンサー表示エリア === */}
      <section className="mb-20">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gray-300 w-12 md:w-24"></div>
          <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wider">SPONSORS</h2>
          <div className="h-px bg-gray-300 w-12 md:w-24"></div>
        </div>

        {currentSponsors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {currentSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                // Goldの場合はカードを大きくし、枠線を金色にするなどの強調処理
                className={`group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 ${
                  sponsor.plan === "Gold" ? "md:col-span-2 border-b-4 border-b-[#ffd700]" : 
                  sponsor.plan === "Silver" ? "border-b-4 border-b-[#c0c0c0]" : 
                  "border-b-4 border-b-[#cd7f32]"
                }`}
              >
                {/* ロゴ画像エリア */}
                <div className={`flex items-center justify-center bg-gray-50 p-4 ${sponsor.plan === "Gold" ? "h-48 md:h-56" : "h-32 md:h-40"}`}>
                  {sponsor.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={sponsor.imageUrl} 
                      alt={`${sponsor.name} logo`} 
                      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                    />
                  ) : (
                    // 画像がない場合のプレースホルダー（ダミー表示）
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-medium tracking-wider">LOGO COMING SOON</span>
                    </div>
                  )}
                </div>

                {/* テキスト情報エリア */}
                <div className="p-5 flex flex-col items-center border-t border-gray-100 bg-white">
                  <span className={`font-bold text-gray-800 text-center mb-1 ${sponsor.plan === "Gold" ? "text-xl" : "text-md"}`}>
                    {sponsor.name}
                  </span>
                  <span className={`text-xs font-bold tracking-wider ${
                    sponsor.plan === "Gold" ? "text-[#ffd700]" : 
                    sponsor.plan === "Silver" ? "text-[#9ca3af]" : 
                    "text-[#cd7f32]"
                  }`}>
                    {sponsor.plan.toUpperCase()} SPONSOR
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500">現在、第一期スポンサー様を募集しております。</p>
          </div>
        )}
      </section>

      {/* === 3. 応募フォームへのリンク === */}
      <section className="max-w-2xl mx-auto mb-20">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center border-t-4 border-purple-500">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">スポンサーに応募する</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            私たちの活動にご賛同いただきありがとうございます。<br className="hidden md:block" />
            以下のボタンより、専用の応募フォーム（Googleフォーム）へお進みください。
          </p>
          
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScdIsW_GC-1SIB_zh0Tadu1xXRj-VC7tofgzakeArACJjXHOg/viewform?usp=header" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            応募フォームを開く
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <p className="text-xs text-gray-400 mt-6">
            ※クリックすると外部サイト（Google Forms）へ移動します。
          </p>
        </div>
      </section>
    </main>
  );
}