'use client';

import React, { useState } from 'react';
import { Send, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '練習試合のお申し込み',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'メールの送信に失敗しました。');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '練習試合のお申し込み',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'エラーが発生しました。');
    }
  };

  return (
    <div className="bg-[#101415] text-[#e0e3e5] min-h-screen font-sans py-16 px-4 relative overflow-hidden">
      {/* アンビエントグロー */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#ffd700]/10 blur-[160px] rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* ヘッダーバナー */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] animate-pulse"></span>
              <span className="font-mono text-xs text-[#ffd700] tracking-[0.2em] uppercase font-bold">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
              CONTACT
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-sm">
            練習試合のお申し込み、スポンサーに関するお問い合わせなどはこちらから。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 左側：コンタクト情報カード (Pitch Precision Identity Box) */}
          <div className="lg:col-span-5 bg-[#191c1e]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl space-y-8">
            <div>
              <span className="font-mono text-xs text-purple-400 tracking-widest uppercase block mb-2">INQUIRY DESK</span>
              <h2 className="text-2xl font-black text-white mb-4">お問い合わせ先</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                ご質問やご要望がございましたら、以下のフォームまたは直接メールにてご連絡ください。確認次第、担当者より折り返しご連絡いたします。
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center bg-[#15181a] p-4 rounded-xl border border-white/5">
                <div className="bg-purple-900/40 border border-purple-500/30 p-3 rounded-xl mr-4 text-purple-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Email Address</p>
                  <a
                    href="mailto:fukawapg@gmail.com"
                    className="font-bold text-white text-sm hover:text-[#ffd700] underline transition-colors break-all"
                  >
                    fukawapg@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-gray-500">FUKAYA PG OFFICIAL FOOTBALL CLUB</span>
            </div>
          </div>

          {/* 右側：お問い合わせフォーム (Pitch Precision Form) */}
          <div className="lg:col-span-7 bg-[#1d2022]/90 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10">
            {status === 'success' ? (
              <div className="py-12 px-4 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-400">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-green-400 tracking-widest uppercase">MESSAGE SENT</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white">お問い合わせを受け付けました</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
                  メッセージの送信が完了いたしました。内容を確認次第、担当者より折り返しご連絡させていただきます。
                </p>
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="bg-[#15181a] hover:bg-white/10 border border-white/20 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 text-sm uppercase tracking-wider cursor-pointer"
                  >
                    別のお問い合わせを送る
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-950/50 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 text-red-300 text-sm">
                    <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-200 mb-1">送信エラー</p>
                      <p className="mb-2">{errorMessage}</p>
                      <p className="text-xs text-red-400">
                        ※ お急ぎの場合は直接 <a href="mailto:fukawapg@gmail.com" className="underline hover:text-white">fukawapg@gmail.com</a> までメールにてご連絡ください。
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2" htmlFor="name">
                      お名前 / チーム名 <span className="text-[#ffd700]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition font-sans text-sm disabled:opacity-50"
                      placeholder="例: 深谷 太郎"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2" htmlFor="email">
                      メールアドレス <span className="text-[#ffd700]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition font-sans text-sm disabled:opacity-50"
                      placeholder="例: info@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2" htmlFor="subject">
                    ご用件 <span className="text-[#ffd700]">*</span>
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white focus:outline-none focus:border-purple-500 transition font-sans text-sm disabled:opacity-50"
                  >
                    <option value="練習試合のお申し込み">練習試合のお申し込み</option>
                    <option value="スポンサーに関するお問い合わせ">スポンサーに関するお問い合わせ</option>
                    <option value="入部・見学について">入部・見学について</option>
                    <option value="その他のお問い合わせ">その他のお問い合わせ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2" htmlFor="message">
                    お問い合わせ内容 <span className="text-[#ffd700]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition font-sans text-sm leading-relaxed disabled:opacity-50"
                    placeholder="具体的なご希望の日程や、ご質問内容をこちらにご記入ください。"
                    required
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#ffd700] hover:bg-white text-[#101415] font-black py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.25)] flex items-center justify-center space-x-3 uppercase tracking-wider text-base group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={20} className="animate-spin text-[#101415]" />
                        <span>送信中...</span>
                      </>
                    ) : (
                      <>
                        <span>メッセージを送信する</span>
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
