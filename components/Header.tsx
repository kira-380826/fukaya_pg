'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Trophy, Calendar, Mail, Users, ArrowRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: 'ホーム', href: '/', icon: Home },
    { name: 'マッチレポート', href: '/match', icon: Trophy },
    { name: 'スケジュール', href: '/schedule', icon: Calendar },
    { name: 'スポンサーサイト', href: '/sponsors', icon: Users },
    { name: 'お問い合わせ', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* --- 上部のナビゲーションバー (Pitch Precision  editorial dark theme) --- */}
      <header className="bg-[#101415]/80 backdrop-blur-xl text-[#e0e3e5] sticky top-0 z-50 border-b border-white/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* チームロゴ */}
          <Link 
            href="/" 
            onClick={closeMenu} 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-105 transition-transform duration-300">
              <span className="font-extrabold text-white text-lg tracking-tighter">PG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-wider text-white uppercase group-hover:text-purple-300 transition-colors">
                深谷PG
              </span>
              <span className="text-[10px] tracking-[0.2em] text-purple-400 uppercase font-mono -mt-1 hidden sm:inline">
                Fukaya Football Club
              </span>
            </div>
          </Link>

          {/* PC用ナビゲーションバー (Desktop Nav) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-bold tracking-wider uppercase transition-all relative py-2 ${
                    isActive 
                      ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-[#ffd700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 右側アクションエリア (SNSリンク・モバイルメニューボタン) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/fukaya_pg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 hover:from-purple-600 hover:to-pink-600 text-pink-400 hover:text-white rounded-lg border border-pink-500/30 hover:border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-105"
              aria-label="公式Instagramを見る"
              title="公式Instagram"
            >
              <InstagramIcon size={20} />
            </a>

            {/* モバイル用ハンバーガーボタン */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg border border-white/10 transition-colors"
              aria-label="メニューを開く"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* --- サイドバー本体 (スマホ・タブレット用) --- */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu} 
      />

      <aside 
        className={`fixed top-0 right-0 h-full w-80 bg-[#151122] text-white z-[70] shadow-2xl border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            {/* サイドバーヘッダー */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg uppercase tracking-widest text-purple-400">Navigation</span>
              </div>
              <button 
                onClick={closeMenu} 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* ナビゲーションリンク一覧 */}
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      onClick={closeMenu} 
                      className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-purple-900/50 text-white border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`mr-3.5 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} size={20} /> 
                        <span className="font-bold tracking-wide">{item.name}</span>
                      </div>
                      <ArrowRight size={16} className={`opacity-40 ${isActive ? 'text-purple-400 opacity-100' : ''}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* サイドバー下部 */}
          <div className="pt-6 border-t border-white/10 flex flex-col items-center">
            <a
              href="https://www.instagram.com/fukaya_pg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-pink-500/40 text-pink-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all text-xs font-bold uppercase tracking-wider mb-4"
            >
              <InstagramIcon size={16} />
              <span>Official Instagram</span>
            </a>
            <p className="text-xs text-gray-500 font-mono">FUKAYA PG OFFICIAL FOOTBALL CLUB</p>
            <p className="text-[11px] text-gray-600 mt-1">© 2026 深谷PG</p>
          </div>
        </div>
      </aside>
    </>
  );
}