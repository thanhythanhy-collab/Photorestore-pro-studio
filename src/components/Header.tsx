import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  Image as ImageIcon,
  BookOpen,
  Printer,
  Sliders,
  ShieldCheck,
  Landmark,
  Zap,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Layers,
  HelpCircle,
  FolderKanban
} from 'lucide-react';
import brandEmblem from '../assets/images/gemini_restore_emblem_1786650826371.jpg';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Grouped Navigation Items for Clear Ergonomics
  const navGroups: NavGroup[] = [
    {
      groupName: 'CÔNG CỤ CỐT LÕI',
      items: [
        { id: 'builder', label: 'Tạo Master Prompt', shortLabel: 'Master Builder', icon: Sliders, badge: 'Cốt lõi' },
        { id: 'pro-mastery', label: '⚡ 5 Kỹ Thuật Đỉnh Cao', shortLabel: '5 Kỹ Thuật Đỉnh Cao', icon: Zap, badge: 'Mới' },
        { id: 'vietnam-heritage', label: '🇻🇳 Di Sản Việt Nam', shortLabel: 'Di Sản Việt Nam', icon: Landmark, badge: '1950-1990' },
        { id: 'analyzer', label: 'Phân Tích Ảnh Cũ AI', shortLabel: 'Phân Tích AI', icon: Camera, badge: 'Vision' },
      ]
    },
    {
      groupName: 'THƯ VIỆN & XUẤT XƯỞNG',
      items: [
        { id: 'templates', label: 'Mẫu Prompt Thể Loại', shortLabel: 'Mẫu Thể Loại', icon: Sparkles },
        { id: 'keywords', label: 'Bảng Từ Khóa Tiếng Anh', shortLabel: 'Từ Khóa English', icon: BookOpen },
        { id: 'calculator', label: 'Tính Kích Thước In 8K', shortLabel: 'Tính Size In 8K', icon: Printer },
        { id: 'guide', label: 'Mẹo In Ấn Nâng Cao', shortLabel: 'Mẹo In Lab', icon: ImageIcon },
      ]
    }
  ];

  const allItems = navGroups.flatMap(g => g.items);

  // Handle horizontal scroll indicators
  const checkScroll = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      navContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#030914]/98 backdrop-blur-xl border-b border-amber-500/25 text-zinc-100 shadow-xl shadow-black/60">
      {/* Top Gold Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/90 to-transparent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Branding Bar */}
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Studio Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded overflow-hidden border border-amber-400/70 bg-[#061226] shadow-md shadow-amber-500/20 shrink-0 group">
              <img
                src={brandEmblem}
                alt="Gemini PhotoRestore Pro Studio Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/40 rounded pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-lg font-bold tracking-tight uppercase font-sans flex items-center gap-1.5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-extrabold">GEMINI</span>
                  <span className="text-zinc-100 font-semibold">PhotoRestore Studio</span>
                </h1>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest bg-amber-400/15 text-amber-300 border border-amber-400/40 rounded">
                  v3.6 8K
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden xs:block font-light">
                Phục Hồi Ảnh Cũ Chuẩn AI • Giữ Nét Mặt Gốc • Không Dính Watermark
              </p>
            </div>
          </div>

          {/* Right Controls: Quick Badges + Mobile Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#06142a] border border-amber-500/30 text-[10px] font-mono text-amber-200 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% No Watermark</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#061226] border border-zinc-800 text-[10px] font-mono text-zinc-300 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VISION AI READY</span>
            </div>

            {/* Mobile / Tablet Full Menu Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#081836] hover:bg-[#0c2452] border border-amber-500/40 text-amber-200 text-xs font-semibold rounded cursor-pointer transition-colors shadow-sm"
              aria-label="Danh mục chức năng"
            >
              {isMobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-amber-400" />}
              <span>Danh Mục ({allItems.length})</span>
            </button>
          </div>
        </div>

        {/* Desktop & Smooth Scroll Navigation Bar with Arrow Hints */}
        <div className="relative border-t border-zinc-800/80 py-1.5 flex items-center">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollNav('left')}
              className="absolute left-0 z-20 h-8 w-7 bg-gradient-to-r from-[#030914] via-[#030914]/90 to-transparent flex items-center justify-start text-amber-300 hover:text-white cursor-pointer transition-all"
              aria-label="Cuộn trái"
            >
              <ChevronLeft className="w-5 h-5 bg-[#06142a] border border-amber-500/40 rounded-full p-0.5 shadow-md" />
            </button>
          )}

          {/* Navigation Items Track */}
          <div
            ref={navContainerRef}
            onScroll={checkScroll}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 py-0.5"
          >
            {allItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer rounded shrink-0 select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black shadow-lg shadow-amber-500/20 font-bold scale-[1.02]'
                      : 'text-zinc-300 hover:text-zinc-100 bg-[#061226]/80 hover:bg-[#091e42] border border-zinc-800 hover:border-amber-500/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black stroke-[2.5]' : 'text-amber-400/90'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                      isActive ? 'bg-black/20 text-black' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => scrollNav('right')}
              className="absolute right-0 z-20 h-8 w-7 bg-gradient-to-l from-[#030914] via-[#030914]/90 to-transparent flex items-center justify-end text-amber-300 hover:text-white cursor-pointer transition-all"
              aria-label="Cuộn phải"
            >
              <ChevronRight className="w-5 h-5 bg-[#06142a] border border-amber-500/40 rounded-full p-0.5 shadow-md" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Category Mobile Modal / Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden border-t border-amber-500/30 bg-[#040e21] px-4 py-5 space-y-5 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-amber-400" />
              <span>Tất Cả Chức Năng Phục Hồi Studio</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Nhấp để mở ngay</span>
          </div>

          <div className="space-y-4">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold px-1">
                  {group.groupName}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`flex items-center justify-between p-3 rounded text-left transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md'
                            : 'bg-[#06142b] border-zinc-800 text-zinc-200 hover:border-amber-400/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                          <span className="text-xs">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                            isActive ? 'bg-black text-amber-300' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
