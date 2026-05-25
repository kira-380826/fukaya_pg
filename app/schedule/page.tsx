import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 tracking-tight">SCHEDULE</h1>
        <p className="text-gray-600">今後の試合・練習予定をご確認いただけます。</p>
      </div>

      <div className="space-y-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col md:flex-row overflow-hidden">
            
            {/* カレンダーアイコン部分 */}
            <div className={`md:w-32 flex flex-col items-center justify-center p-6 text-white ${schedule.type === 'Match' ? 'bg-purple-600' : 'bg-gray-500'}`}>
              <span className="text-sm font-bold opacity-80">{new Date(schedule.date).toLocaleDateString('ja-JP', { month: 'short' })}</span>
              <span className="text-4xl font-extrabold">{new Date(schedule.date).getDate()}</span>
              <span className="text-xs mt-1">{new Date(schedule.date).toLocaleDateString('ja-JP', { weekday: 'short' })}</span>
            </div>

            {/* 詳細情報 */}
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${schedule.type === 'Match' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                  {schedule.type.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{schedule.title}</h3>
              
              <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center mt-2 sm:mt-0">
                  <Clock size={16} className="mr-1 text-gray-400" />
                  {new Date(schedule.date).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <MapPin size={16} className="mr-1 text-gray-400" />
                  {schedule.location}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm border-t border-gray-100 pt-3">{schedule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}