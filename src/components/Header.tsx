import React from 'react';
import { Sparkles, Camera, Image as ImageIcon, BookOpen, Printer, Sliders } from 'lucide-react';
import brandEmblem from '../assets/images/gemini_restore_emblem_1786650826371.jpg';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'builder', label: 'Tạo Master Prompt', icon: Sliders },
    { id: 'analyzer', label: 'Phân Tích Ảnh Cũ AI', icon: Camera },
    { id: 'templates', label: 'Mẫu Prompt Thể Loại', icon: Sparkles },
    { id: 'keywords', label: 'Bảng Từ Khóa Tiếng Anh', icon: BookOpen },
    { id: 'calculator', label: 'Tính Kích Thước In', icon: Printer },
    { id: 'guide', label: 'Mẹo In Ấn Nâng Cao', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Logo & Branding */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-sm overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-md shrink-0">
              <img
                src={brandEmblem}
                alt="Gemini PhotoRestore Pro Studio Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-zinc-100 uppercase font-sans">
                  GEMINI <span className="text-zinc-400 font-normal">PhotoRestore Pro Studio</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-zinc-900 text-amber-300/90 border border-zinc-700 rounded-sm">
                  Official Studio
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden xs:block font-light">
                Bộ Prompt Phục Hồi Ảnh Cũ Chuẩn AI • Chuẩn In Ấn 8K 300+ DPI
              </p>
            </div>
          </div>

          {/* Right Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GEMINI 3.6 VISION API</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 border-t border-zinc-800/80 text-xs sm:text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer rounded-sm ${
                  isActive
                    ? 'bg-zinc-100 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
