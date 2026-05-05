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

export default function SchedulePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-left">スケジュール</h1>
      
      <div className="flex justify-center">
        {/* カレンダーをレスポンシブに表示するためのラッパー */}
        <div className="w-full max-w-[800px] bg-[#F8F5FA] rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=1d0e374c70e656a9569f1ebd1f337475db8c1a93c1b95f553c17c749cfca76b2%40group.calendar.google.com&ctz=Asia%2FTokyo"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
    </main>
  );
}