import React from 'react';
import { client, mockSchedules } from '../../libs/client';
import { MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: '試合日程・練習スケジュール',
  description: '埼玉県深谷市を拠点とする社会人サッカーチーム「深谷PG」の公式試合予定・練習スケジュール一覧です。',
};

type Schedule = {
  id: string;
  type?: unknown;
  date?: string;
  title?: unknown;
  location?: unknown;
  description?: unknown;
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

export default async function SchedulePage() {
  let schedules: Schedule[] = [];

  try {
    if (process.env.MICRO_CMS_SERVICE_DOMAIN && process.env.MICRO_CMS_API_KEY) {
      const data = await client.getList<Schedule>({ 
        endpoint: 'schedules',
        customRequestInit: { cache: 'no-store' }
      });
      schedules = data.contents;
    } else {
      schedules = mockSchedules as Schedule[];
    }
  } catch (error) {
    console.error("スケジュールデータの取得に失敗しました", error);
    schedules = mockSchedules as Schedule[];
  }

  return (
    <div className="bg-[#101415] text-[#e0e3e5] min-h-screen font-sans py-16 px-4 relative overflow-hidden">
      {/* アンビエントグロー */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-900/15 blur-[160px] rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* ヘッダーバナー */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase font-bold">
                UPCOMING FIXTURES
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
              SCHEDULE
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm">
            深谷PGの今後の試合・練習予定をご確認いただけます。
          </p>
        </div>

        {/* スケジュール一覧 (Pitch Precision Brutalist Cards) */}
        {schedules.length === 0 ? (
          <div className="bg-[#1d2022]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center text-gray-400 shadow-2xl">
            <p className="font-bold text-lg text-white mb-2">現在のところ予定されているスケジュールはありません。</p>
            <p className="text-sm text-gray-500">スケジュールが追加されるまでしばらくお待ちください。</p>
          </div>
        ) : (
          <div className="space-y-6">
            {schedules.map((schedule) => {
              const typeStr = getFieldValue(schedule.type) || 'Match';
              const isMatch = typeStr.toLowerCase() === 'match' || typeStr === '試合' || typeStr === '公式戦';
              const titleStr = getFieldValue(schedule.title) || 'タイトル未定';
              const locationStr = getFieldValue(schedule.location) || '場所未定';
              const descStr = getFieldValue(schedule.description) || '';

              const dateStr = schedule.date || '';
              const dateObj = new Date(dateStr);
              const isValidDate = !isNaN(dateObj.getTime());
              const monthStr = isValidDate ? dateObj.toLocaleDateString('ja-JP', { month: 'short' }) : '未定';
              const dayNum = isValidDate ? dateObj.getDate() : '--';
              const weekStr = isValidDate ? dateObj.toLocaleDateString('ja-JP', { weekday: 'short' }) : '-';
              const timeStr = isValidDate ? dateObj.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) : '';

              return (
                <div 
                  key={schedule.id} 
                  className="bg-[#1d2022]/90 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col md:flex-row overflow-hidden shadow-2xl group"
                >
                  {/* 左側：日付カレンダーブロック */}
                  <div className={`md:w-36 flex flex-col items-center justify-center p-6 text-white border-b md:border-b-0 md:border-r border-white/10 ${
                    isMatch ? 'bg-gradient-to-br from-purple-900/80 to-purple-950/80' : 'bg-[#15181a]'
                  }`}>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300 mb-1">{monthStr}</span>
                    <span className="text-5xl font-black tracking-tighter text-white">{dayNum}</span>
                    <span className="text-xs font-mono font-bold mt-1 px-2 py-0.5 rounded bg-white/10 text-gray-300">({weekStr})</span>
                  </div>

                  {/* 右側：詳細情報 */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                          isMatch ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30' : 'bg-white/10 text-gray-300 border border-white/20'
                        }`}>
                          {isMatch ? 'OFFICIAL MATCH' : 'PRACTICE'}
                        </span>
                        
                        {timeStr && (
                          <div className="flex items-center text-gray-400 text-sm font-mono gap-4">
                            <span className="flex items-center gap-1.5 bg-[#15181a] px-3 py-1 rounded-lg border border-white/5">
                              <Clock size={15} className="text-purple-400" />
                              <span>{timeStr}〜</span>
                            </span>
                          </div>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 group-hover:text-purple-300 transition-colors">
                        {titleStr}
                      </h2>
                      
                      {descStr && (
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                          {descStr}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center text-sm font-bold text-gray-400 gap-2">
                      <MapPin size={18} className="text-[#ffd700]" />
                      <span className="text-white">{locationStr}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}