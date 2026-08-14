import React from 'react';
import { Sparkles, Camera, Image as ImageIcon, BookOpen, Printer, Sliders, ShieldCheck, Landmark } from 'lucide-react';
import brandEmblem from '../assets/images/gemini_restore_emblem_1786650826371.jpg';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'builder', label: 'Tạo Master Prompt', icon: Sliders },
    { id: 'analyzer', label: 'Phân Tích Ảnh Cũ AI', icon: Camera },
    { id: 'vietnam-heritage', label: '🇻🇳 Di Sản Việt Nam (1950-1990)', icon: Landmark },
    { id: 'templates', label: 'Mẫu Prompt Thể Loại', icon: Sparkles },
    { id: 'keywords', label: 'Bảng Từ Khóa Tiếng Anh', icon: BookOpen },
    { id: 'calculator', label: 'Tính Kích Thước In', icon: Printer },
    { id: 'guide', label: 'Mẹo In Ấn Nâng Cao', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030914]/95 backdrop-blur-md border-b border-amber-500/20 text-zinc-100 shadow-lg shadow-black/40">
      {/* Top Gold Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Logo & Branding matching the Master Banner */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-sm overflow-hidden border border-amber-400/60 bg-[#061226] shadow-md shadow-amber-500/10 shrink-0 group">
              <img
                src={brandEmblem}
                alt="Gemini PhotoRestore Pro Studio Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/30 rounded-sm pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight uppercase font-sans flex items-center gap-1.5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-extrabold">GEMINI</span>
                  <span className="text-zinc-200 font-medium">PhotoRestore Pro Studio</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#06142a] text-amber-300 border border-amber-400/40 rounded-sm shadow-sm">
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
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#06142a] border border-amber-500/30 text-[10px] font-mono text-amber-200 rounded-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>No Watermark</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#061226] border border-zinc-800 text-[11px] font-mono text-zinc-300 rounded-sm">
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
                    ? 'bg-amber-400 text-black shadow-md font-bold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#081730]/80'
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
