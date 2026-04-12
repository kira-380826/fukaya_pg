'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false); // リンクを押したらメニューを閉じる

  return (
    <nav className="bg-purple-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter hover:text-purple-200 transition">
          TEAM PURPLE
        </Link>

        {/* PC用メニュー */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">
          <li><Link href="/match" className="hover:text-purple-200 transition">Match</Link></li>
          <li><Link href="/schedule" className="hover:text-purple-200 transition">Schedule</Link></li>
          <li>
            <Link href="/contact" className="bg-white text-purple-900 px-4 py-1 rounded-full hover:bg-purple-100 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* スマホ用ボタン */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="outline-none" aria-label="メニュー開閉">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* スマホ用ドロップダウン */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800 absolute top-full left-0 w-full shadow-lg border-t border-purple-700">
          <ul className="flex flex-col p-4 space-y-4 font-medium">
            <li><Link href="/match" onClick={closeMenu} className="block hover:text-purple-200">Match</Link></li>
            <li><Link href="/schedule" onClick={closeMenu} className="block hover:text-purple-200">Schedule</Link></li>
            <li>
              <Link href="/contact" onClick={closeMenu} className="block text-center bg-white text-purple-900 py-2 rounded-md">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}