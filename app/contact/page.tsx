import React from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export const metadata = {
  title: 'CONTACT | 深谷PG',
  description: '深谷PGへのお問い合わせ、練習試合のお申し込みはこちら',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 tracking-tight">CONTACT</h1>
        <p className="text-gray-600">練習試合のお申し込み、スポンサーに関するお問い合わせなどはこちらから。</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* コンタクト情報 */}
        <div className="md:w-1/3 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-purple-200 pb-2">お問い合わせ先</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              ご質問やご要望がございましたら、以下のフォームまたは直接メールにてご連絡ください。確認次第、担当者より折り返しご連絡いたします。
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="bg-purple-100 p-3 rounded-full mr-4 text-purple-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">Email</p>
                <p className="font-medium">contact@fukayapg.example.com</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="bg-purple-100 p-3 rounded-full mr-4 text-purple-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">Location</p>
                <p className="font-medium">埼玉県深谷市〇〇 1-2-3</p>
              </div>
            </div>
          </div>
        </div>

        {/* フォーム */}
        <div className="md:w-2/3 bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="name">お名前 / チーム名 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="例: 深谷 太郎"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">メールアドレス <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="例: info@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="subject">お問い合わせ種別 <span className="text-red-500">*</span></label>
              <div className="relative">
                <select 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none bg-white"
                  required
                >
                  <option value="">選択してください</option>
                  <option value="practice">練習試合のお申し込み</option>
                  <option value="sponsor">スポンサーに関するお問い合わせ</option>
                  <option value="join">入部希望・見学</option>
                  <option value="other">その他</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="message">お問い合わせ内容 <span className="text-red-500">*</span></label>
              <textarea 
                id="message" 
                rows={6} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                placeholder="お問い合わせ内容を詳細にご記入ください。"
                required
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="inline-flex items-center justify-center w-full md:w-auto px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <Send size={18} className="mr-2" />
                メッセージを送信する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}