import React from 'react';
import { client, mockMatches } from '../libs/client';
import HomeContent from '../components/HomeContent';

type Match = {
  id: string;
  date: string;
  opponent: string;
  homeAway: string[] | string;
  ourScore: number;
  opponentScore: number;
  result: string[] | string;
  report: string;
};

// キャッシュを無効化して常に最新の試合結果を反映
export const revalidate = 0;

export default async function HomePage() {
  let matches: Match[] = [];

  try {
    // APIキーが設定されている場合はmicroCMSから取得
    if (process.env.MICRO_CMS_SERVICE_DOMAIN && process.env.MICRO_CMS_API_KEY) {
      const data = await client.getList<Match>({ 
        endpoint: 'matches',
        customRequestInit: { cache: 'no-store' },
        queries: { limit: 3 }
      });
      matches = data.contents;
    } else {
      matches = mockMatches as Match[];
    }
  } catch (error) {
    console.error("試合結果の取得に失敗しました", error);
    matches = mockMatches as Match[];
  }

  // スポンサーのデータ（既存のデータを完全に保持）
  const currentSponsors = [
    { id: 1, name: "株式会社〇〇テック", url: "https://example.com", plan: "Gold", imageUrl: "/sponsor-dummy.png" },
    { id: 2, name: "Sample Design LLC.", url: "https://example.com", plan: "Silver", imageUrl: "/sponsor-dummy.png" },
    { id: 3, name: "〇〇工務店", url: "https://example.com", plan: "Bronze", imageUrl: "/sponsor-dummy.png" },
  ];

  return <HomeContent matches={matches} sponsors={currentSponsors} />;
}