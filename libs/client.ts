import { createClient } from 'microcms-js-sdk';

// 環境変数が設定されていない場合でもエラーで落ちないようにする
// ※NEXT_PUBLIC_ を外すことで、APIキーがブラウザ側に漏洩しないようになります
const serviceDomain = process.env.MICRO_CMS_SERVICE_DOMAIN || 'mock-domain';
const apiKey = process.env.MICRO_CMS_API_KEY || 'mock-api-key';

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});

// モックデータ（環境変数が未設定の場合のフォールバック用）
export const mockMatches = [
  {
    id: "1",
    date: "2026-05-20T10:00:00.000Z",
    opponent: "FC〇〇",
    homeAway: "Home",
    ourScore: 2,
    opponentScore: 1,
    result: "WIN",
    report: "後半アディショナルタイムに劇的な逆転ゴール！",
  },
  {
    id: "2",
    date: "2026-05-13T14:00:00.000Z",
    opponent: "〇〇ユナイテッド",
    homeAway: "Away",
    ourScore: 0,
    opponentScore: 0,
    result: "DRAW",
    report: "両者一歩も譲らない激しい攻防の末、スコアレスドロー。",
  },
  {
    id: "3",
    date: "2026-05-06T12:00:00.000Z",
    opponent: "アスレチック〇〇",
    homeAway: "Home",
    ourScore: 1,
    opponentScore: 3,
    result: "LOSE",
    report: "前半先制するも、後半に崩れ悔しい敗戦。",
  }
];
