import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'SCHEDULE | 深谷PG',
  description: '深谷PGの試合・練習スケジュール',
};

export default function SchedulePage() {
  const schedules = [
    {
      id: 1,
      type: "Match",
      date: "2026-06-01T10:00:00",
      title: "第5節 vs 県立〇〇高校OB",
      location: "深谷市営グラウンド",
      description: "リーグ戦第5節。応援よろしくお願いします！"
    },
    {
      id: 2,
      type: "Practice",
      date: "2026-06-05T19:00:00",
      title: "全体練習",
      location: "〇〇フットサルコート",
      description: "紅白戦中心のメニューを実施予定。"
    },
    {
      id: 3,
      type: "Match",
      date: "2026-06-12T13:00:00",
      title: "第6節 vs FC〇〇",
      location: "さいたま市〇〇公園",
      description: "アウェーでの重要な一戦です。"
    }
  ];

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
        <div className="space-y-6">
          {schedules.map((schedule) => {
            const isMatch = schedule.type === 'Match';
            const dateObj = new Date(schedule.date);
            const monthStr = dateObj.toLocaleDateString('ja-JP', { month: 'short' });
            const dayNum = dateObj.getDate();
            const weekStr = dateObj.toLocaleDateString('ja-JP', { weekday: 'short' });
            const timeStr = dateObj.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

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
                        {schedule.type === 'Match' ? 'OFFICIAL MATCH' : 'PRACTICE'}
                      </span>
                      
                      <div className="flex items-center text-gray-400 text-sm font-mono gap-4">
                        <span className="flex items-center gap-1.5 bg-[#15181a] px-3 py-1 rounded-lg border border-white/5">
                          <Clock size={15} className="text-purple-400" />
                          <span>{timeStr}〜</span>
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {schedule.title}
                    </h2>
                    
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                      {schedule.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center text-sm font-bold text-gray-400 gap-2">
                    <MapPin size={18} className="text-[#ffd700]" />
                    <span className="text-white">{schedule.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}