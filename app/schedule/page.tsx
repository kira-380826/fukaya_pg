// app/schedule/page.tsx
import { google } from 'googleapis';

// サーバーサイドでのみ実行されるデータ取得関数
async function getCalendarEvents() {
  const targetCalendarId = process.env.GOOGLE_CALENDAR_ID;
  
  // サービスアカウントによる認証設定
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    // 環境変数から読み込んだ秘密鍵の改行文字を実際の改行に変換
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendar.events.list({
      calendarId: targetCalendarId,
      timeMin: new Date().toISOString(), // 現在時刻以降の予定を取得
      maxResults: 10, // 取得する最大件数
      singleEvents: true, // 繰り返し予定を展開する
      orderBy: 'startTime', // 開始時間順にソート
    });
    return response.data.items || [];
  } catch (error) {
    console.error('カレンダーの取得に失敗しました', error);
    return [];
  }
}

export default async function SchedulePage() {
  // サーバー側でデータを取得（非同期）
  const events = await getCalendarEvents();

  return (
    <div className="container mx-auto p-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-purple-900 mb-8 border-b-2 border-purple-200 pb-2">
        スケジュール
      </h1>
      
      {events.length === 0 ? (
        <p className="text-gray-600">今後の予定は現在ありません。</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => {
            // 終日予定（date）と時間指定予定（dateTime）の分岐処理
            const start = event.start?.dateTime || event.start?.date;
            const formattedDate = start 
              ? new Date(start).toLocaleString('ja-JP', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                }) 
              : '日時未定';

            return (
              <div 
                key={event.id} 
                className="bg-white p-6 rounded-xl shadow-md border-l-8 border-purple-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-purple-600 font-bold mb-1">{formattedDate}</p>
                    <h2 className="text-xl font-bold text-gray-900">{event.summary}</h2>
                    {event.description && (
                      <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                    )}
                  </div>
                  {event.location && (
                    <div className="mt-4 md:mt-0 text-right">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        📍 {event.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}