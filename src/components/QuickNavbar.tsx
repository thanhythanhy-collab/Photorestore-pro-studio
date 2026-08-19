import React from 'react';
import {
  Sliders,
  Zap,
  Landmark,
  Camera,
  Sparkles,
  BookOpen,
  Printer,
  FileText,
  ChevronRight
} from 'lucide-react';

interface QuickNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const QuickNavbar: React.FC<QuickNavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'builder', label: 'Tạo Master Prompt', icon: Sliders, short: 'Master Prompt' },
    { id: 'pro-mastery', label: '5 Kỹ Thuật Đỉnh Cao', icon: Zap, short: '5 Kỹ Thuật' },
    { id: 'vietnam-heritage', label: 'Di Sản Việt Nam', icon: Landmark, short: 'Di Sản VN' },
    { id: 'analyzer', label: 'Phân Tích Ảnh Vision AI', icon: Camera, short: 'Vision AI' },
    { id: 'templates', label: 'Mẫu Thể Loại Chuẩn', icon: Sparkles, short: 'Mẫu Prompt' },
    { id: 'keywords', label: 'Từ Khóa AI English', icon: BookOpen, short: 'Từ Khóa' },
    { id: 'calculator', label: 'Tính Kích Thước In 8K', icon: Printer, short: 'Size In 8K' },
    { id: 'guide', label: 'Cẩm Nang Studio', icon: FileText, short: 'Cẩm Nang' },
  ];

  return (
    <div className="bg-[#050e1f]/90 border border-amber-500/25 rounded-sm p-2 sm:p-3 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-amber-500/15">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Điều Hướng Nhanh Studio (Quick Workbench)</span>
        </span>
        <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
          Chạm để chuyển công cụ
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-2 rounded-sm text-xs font-medium transition-all duration-200 cursor-pointer text-center sm:text-left ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                  : 'bg-[#06142a]/70 hover:bg-[#0c2244] text-zinc-300 hover:text-amber-200 border border-zinc-800/80 hover:border-amber-500/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-black stroke-[2.5]' : 'text-amber-400'}`} />
              <span className="truncate text-[11px] sm:text-xs">{tab.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
