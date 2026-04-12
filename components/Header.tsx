'use client'; // 状態管理を行うため必須です

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Trophy, Calendar, Mail } from 'lucide-react'; // アイコンを追加

export default function Header() {
  // サイドバーが開いているかどうかを管理するステート
  const [isOpen, setIsOpen] = useState(false);

  // メニューを開閉する関数
  const toggleMenu = () => setIsOpen(!isOpen);
  // リンクをクリックしたときにメニューを閉じる関数（ページ移動と同時に閉じるため）
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* --- 上部のナビゲーションバー --- */}
      <nav className="bg-purple-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center">
          {/* メニューを開くためのボタン（PC/スマホ共通で表示） */}
          <button 
            onClick={toggleMenu}
            className="p-2 hover:bg-purple-800 rounded-md transition-colors mr-4"
            aria-label="メニューを開く"
          >
            <Menu size={28} />
          </button>

          {/* チームロゴ（クリックでホームへ） */}
          <Link href="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter hover:text-purple-200 transition">
            深谷PG
          </Link>
        </div>
      </nav>

      {/* --- サイドバー本体 --- */}
      
      {/* 1. 背景のオーバーレイ（メニューが開いている時だけ後ろを暗くする） */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu} // 暗い部分をクリックしても閉じます
      />

      {/* 2. スライドしてくるメニューパネル */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-purple-900 text-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* サイドバー内のヘッダー */}
          <div className="flex justify-between items-center mb-10">
            <span className="font-bold text-xl uppercase tracking-widest border-b-2 border-white">Menu</span>
            <button onClick={closeMenu} className="p-2 hover:bg-purple-800 rounded-full transition">
              <X size={24} />
            </button>
          </div>

          {/* ナビゲーションリンク一覧 */}
          <ul className="space-y-4">
            <li>
              <Link href="/" onClick={closeMenu} className="flex items-center p-3 rounded-lg hover:bg-purple-800 transition group">
                <Home className="mr-4 group-hover:scale-110 transition" size={20} /> 
                <span className="text-lg">ホーム</span>
              </Link>
            </li>
            <li>
              <Link href="/match" onClick={closeMenu} className="flex items-center p-3 rounded-lg hover:bg-purple-800 transition group">
                <Trophy className="mr-4 group-hover:scale-110 transition" size={20} /> 
                <span className="text-lg">マッチレポート</span>
              </Link>
            </li>
            <li>
              <Link href="/schedule" onClick={closeMenu} className="flex items-center p-3 rounded-lg hover:bg-purple-800 transition group">
                <Calendar className="mr-4 group-hover:scale-110 transition" size={20} /> 
                <span className="text-lg">スケジュール</span>
              </Link>
            </li>
            
            {/* お問い合わせだけデザインを変えて目立たせる例 */}
            <li className="pt-6">
              <Link href="/contact" onClick={closeMenu} className="flex items-center p-4 bg-white text-purple-900 rounded-xl font-bold hover:bg-purple-100 transition shadow-lg">
                <Mail className="mr-4" size={20} /> お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
        
        {/* サイドバー下部の装飾など */}
        <div className="absolute bottom-8 left-6 text-purple-300 text-xs">
          © 2026 深谷PG
        </div>
      </aside>
    </>
  );
}