'use client';

import React, { useState } from 'react';
import { Send, Mail, MapPin } from 'lucide-react';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '練習試合のお申し込み',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = "atsushikira0826@gmail.com";
    const mailSubject = `【深谷PG問い合わせ】${formData.subject} (${formData.name}様)`;
    const mailBody = `お名前/チーム名: ${formData.name}\nメールアドレス: ${formData.email}\nご用件: ${formData.subject}\n\n【お問い合わせ内容】\n${formData.message}\n\n------------------------\n深谷PG オフィシャルWEBサイトより送信`;
    
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
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
                    href="mailto:atsushikira0826@gmail.com" 
                    className="font-bold text-white text-sm hover:text-[#ffd700] underline transition-colors break-all"
                  >
                    atsushikira0826@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center bg-[#15181a] p-4 rounded-xl border border-white/5">
                <div className="bg-purple-900/40 border border-purple-500/30 p-3 rounded-xl mr-4 text-purple-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Club Location</p>
                  <p className="font-bold text-white text-sm">埼玉県深谷市〇〇 1-2-3</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-gray-500">FUKAYA PG OFFICIAL FOOTBALL CLUB</span>
            </div>
          </div>

          {/* 右側：お問い合わせフォーム (Pitch Precision Form) */}
          <div className="lg:col-span-7 bg-[#1d2022]/90 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition font-sans text-sm"
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
                    className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition font-sans text-sm"
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
                  className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white focus:outline-none focus:border-purple-500 transition font-sans text-sm"
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
                  className="w-full px-4 py-3.5 rounded-xl bg-[#15181a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition font-sans text-sm leading-relaxed"
                  placeholder="具体的なご希望の日程や、ご質問内容をこちらにご記入ください。"
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#ffd700] hover:bg-white text-[#101415] font-black py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.25)] flex items-center justify-center space-x-3 uppercase tracking-wider text-base group cursor-pointer"
                >
                  <span>送信する（メールソフト起動）</span>
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
