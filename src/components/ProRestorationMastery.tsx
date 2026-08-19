import React, { useState } from 'react';
import { PRO_RESTORATION_TECHNIQUES, ProTechniqueGroup } from '../data/proTechniquesData';
import {
  Sparkles,
  Eye,
  Film,
  Layers,
  Printer,
  Check,
  Copy,
  Wand2,
  ShieldCheck,
  Sliders,
  Maximize2,
  ChevronRight,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ProRestorationMasteryProps {
  onApplyTechnique?: (promptVi: string, promptEn: string, keywords: string[]) => void;
  onNavigateToBuilder?: () => void;
}

export const ProRestorationMastery: React.FC<ProRestorationMasteryProps> = ({
  onApplyTechnique,
  onNavigateToBuilder,
}) => {
  const [selectedTechId, setSelectedTechId] = useState<string>('tech_micro_texture');
  const [copiedVi, setCopiedVi] = useState<string | null>(null);
  const [copiedEn, setCopiedEn] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  // Active Multi-layer switches (Bật tắt phối hợp 5 kỹ thuật cùng lúc)
  const [activeTechniques, setActiveTechniques] = useState<{ [key: string]: boolean }>({
    tech_micro_texture: true,
    tech_eye_catchlight: true,
    tech_analog_grain: true,
    tech_fabric_weave: true,
    tech_cmyk_proofing: true,
  });

  const activeTech = PRO_RESTORATION_TECHNIQUES.find((t) => t.id === selectedTechId) || PRO_RESTORATION_TECHNIQUES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'Film':
        return <Film className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Printer':
        return <Printer className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const toggleTechniqueSwitch = (id: string) => {
    setActiveTechniques((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyText = (text: string, type: 'vi' | 'en', id: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'vi') {
      setCopiedVi(id);
      setTimeout(() => setCopiedVi(null), 2000);
    } else {
      setCopiedEn(id);
      setTimeout(() => setCopiedEn(null), 2000);
    }
  };

  const handleApplySingle = (tech: ProTechniqueGroup) => {
    if (onApplyTechnique) {
      onApplyTechnique(tech.promptVi, tech.promptEn, tech.keywordsEn);
      setAppliedNotice(`Đã chèn giải pháp "${tech.titleVi}" vào Master Builder!`);
      setTimeout(() => setAppliedNotice(null), 3000);
    }
    if (onNavigateToBuilder) {
      setTimeout(() => onNavigateToBuilder(), 600);
    }
  };

  // Generate Multi-Technique Master Stack Prompt (Phối hợp toàn bộ các kỹ thuật được chọn)
  const masterStackData = React.useMemo(() => {
    const selectedList = PRO_RESTORATION_TECHNIQUES.filter((t) => activeTechniques[t.id]);

    const combinedVi = `[Master 8K Studio Restoration Stack - 5 Giải Pháp Đỉnh Cao]: ` +
      selectedList.map((t) => t.promptVi).join(' ') +
      ` Khóa 100% nhân diện và cảm xúc nguyên bản, hoàn toàn không watermark, logo hay chữ ký, xuất file cực phẩm 300 DPI cho phòng Lab in ấn.`;

    const combinedEn = `[Master 8K Studio Restoration Stack - Pro Photography Standard]: ` +
      selectedList.map((t) => t.promptEn).join(' ') +
      ` Preserve 100% authentic facial features and soul, zero watermarks, zero logos, zero signatures, masterclass 300+ DPI print-ready archival output.`;

    const allKeywords = Array.from(
      new Set(selectedList.flatMap((t) => t.keywordsEn))
    );

    return { combinedVi, combinedEn, allKeywords, count: selectedList.length };
  }, [activeTechniques]);

  const copyMasterStack = (type: 'vi' | 'en') => {
    const text = type === 'vi' ? masterStackData.combinedVi : masterStackData.combinedEn;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const applyMasterStack = () => {
    if (onApplyTechnique) {
      onApplyTechnique(masterStackData.combinedVi, masterStackData.combinedEn, masterStackData.allKeywords);
      setAppliedNotice(`Đã nạp toàn bộ Tổ Hợp ${masterStackData.count} Kỹ Thuật Đỉnh Cao vào Bộ Tạo Master Prompt!`);
      setTimeout(() => setAppliedNotice(null), 3000);
    }
    if (onNavigateToBuilder) {
      setTimeout(() => onNavigateToBuilder(), 600);
    }
  };

  return (
    <div className="space-y-10">
      {/* Toast Notice */}
      {appliedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#06142a] border border-amber-400 text-amber-200 px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-medium">{appliedNotice}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative rounded-sm overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#061733] via-[#040e21] to-[#02050c] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest rounded-sm mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Tiêu Chuẩn Phục Chế Vi Mô & Quang Học Chuyên Nghiệp</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-amber-50 uppercase font-serif-luxury">
            5 Nhóm Giải Pháp & Kỹ Thuật{' '}
            <span className="gold-gradient-text">
              Nâng Tầm Ảnh Phục Hồi Đỉnh Cao
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light mt-3 leading-relaxed">
            Chuyển hóa từ một bức ảnh AI thông thường thành một <strong className="text-amber-300 font-medium">tác phẩm phục chế chuẩn bảo tàng và in ấn Lab</strong>. Giải quyết triệt để vấn đề da mặt tượng sáp, mắt vô hồn, cháy sáng áo dài trắng, phẳng lì kỹ thuật số và lệch màu khi in ấn.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-500/20 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Real Skin Pores</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <Eye className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Catchlight & Iris Lock</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <Film className="w-4 h-4 text-amber-400 shrink-0" />
              <span>35mm Silver Halide Grain</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <Printer className="w-4 h-4 text-purple-400 shrink-0" />
              <span>300+ DPI Lab Proofing</span>
            </div>
          </div>
        </div>
      </div>

      {/* MASTER MULTI-LAYER STACK COMPOSER (Tổ Hợp Toàn Diện 5 Kỹ Thuật) */}
      <div className="bg-[#050f21] border border-amber-500/40 rounded-sm p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Tổ Hợp Master 5 Lớp Vi Mô (Multi-Layer Mastery Stack)</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-light">
              Bật/tắt các tầng kỹ thuật để tự động gộp thành một siêu câu lệnh phục chế hoàn chỉnh:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyMasterStack('vi')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#081a38] hover:bg-[#0b2450] text-amber-200 border border-amber-500/30 text-xs rounded transition-all cursor-pointer font-medium"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Siêu Prompt Tiếng Việt</span>
            </button>
            <button
              onClick={applyMasterStack}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold rounded cursor-pointer shadow-md transition-all"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Chèn Tất Cả Vào Master Builder</span>
            </button>
          </div>
        </div>

        {/* 5 Layer Switches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {PRO_RESTORATION_TECHNIQUES.map((tech) => {
            const isActive = activeTechniques[tech.id];
            return (
              <button
                key={tech.id}
                onClick={() => toggleTechniqueSwitch(tech.id)}
                className={`p-3 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#081c3d] border-amber-400/80 shadow-md'
                    : 'bg-[#040b17] border-zinc-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                    Layer {tech.number}
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-400 text-black' : 'bg-zinc-700'}`}>
                    {isActive && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
                <div className="text-xs font-semibold text-zinc-100 line-clamp-1">
                  {tech.titleVi.split('(')[0]}
                </div>
                <div className="text-[10px] text-zinc-400 font-light mt-1 line-clamp-1">
                  {tech.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Output Box */}
        <div className="bg-[#020712] border border-zinc-800 rounded p-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="text-amber-300 font-bold uppercase">
              ★ Siêu Prompt Tổ Hợp ({masterStackData.count}/5 Kỹ Thuật Đang Kích Hoạt)
            </span>
            <button
              onClick={() => copyMasterStack('en')}
              className="text-sky-300 hover:underline flex items-center gap-1 cursor-pointer text-[10px]"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Master Prompt Tiếng Anh (Dành cho AI Vision)</span>
            </button>
          </div>
          <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-[#051124] p-3 rounded border border-zinc-800/80">
            {masterStackData.combinedVi}
          </p>
        </div>
      </div>

      {/* 5 Deep-Dive Interactive Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation List of 5 Techniques */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1 mb-3">
            Danh Mục 5 Kỹ Thuật Vi Mô Chuyên Nghiệp:
          </h3>

          {PRO_RESTORATION_TECHNIQUES.map((tech) => {
            const isSelected = selectedTechId === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTechId(tech.id)}
                className={`w-full text-left p-4 rounded-sm border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#081d40] to-[#051329] border-amber-400 text-zinc-100 shadow-lg'
                    : 'bg-[#050f21] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <div className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'bg-amber-400 text-black font-bold' : 'bg-[#08152e] text-zinc-400 border border-zinc-800'
                }`}>
                  {getIcon(tech.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                      Nhóm #{tech.number}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-zinc-800/80 text-zinc-300 rounded font-mono">
                      {tech.badge}
                    </span>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-semibold truncate mt-1 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {tech.titleVi}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light truncate mt-0.5">
                    {tech.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Deep Dive Content Details */}
        <div className="lg:col-span-8 bg-[#051024] border border-zinc-800 rounded-sm p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Header of Active Tech */}
          <div className="border-b border-zinc-800 pb-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                Kỹ Thuật #{activeTech.number} • {activeTech.badge}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {activeTech.titleEn}
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold text-zinc-100">
              {activeTech.titleVi}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 italic font-light">
              "{activeTech.tagline}"
            </p>
          </div>

          {/* Root Problem & Scientific Principle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#030914] border border-red-900/40 p-4 rounded space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider font-mono">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Vấn Đề Thường Gặp Cần Khắc Phục:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {activeTech.coreProblem}
              </p>
            </div>

            <div className="bg-[#030914] border border-emerald-900/40 p-4 rounded space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Nguyên Lý Quang Học & Phục Chế:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {activeTech.scientificPrinciple}
              </p>
            </div>
          </div>

          {/* Bad vs Pro Comparison */}
          <div className="bg-[#020712] border border-zinc-800 rounded p-4 space-y-3">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
              So Sánh Trực Quan Giữa Ảnh Thường và Ảnh Đỉnh Cao:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-red-950/30 border border-red-900/30 p-3 rounded text-zinc-300">
                <span className="text-red-400 font-bold block mb-1">❌ Ảnh Xử Lý Sơ Sài / Bệt Da:</span>
                <span className="font-light text-zinc-400">{activeTech.comparisons.bad}</span>
              </div>
              <div className="bg-emerald-950/30 border border-emerald-900/30 p-3 rounded text-zinc-200">
                <span className="text-emerald-400 font-bold block mb-1">✓ Chuẩn Master Studio 8K:</span>
                <span className="font-light text-zinc-300">{activeTech.comparisons.pro}</span>
              </div>
            </div>
          </div>

          {/* Recommended Technical Settings */}
          <div className="bg-[#06142a] p-4 rounded border border-amber-500/20 space-y-2">
            <div className="text-[11px] font-mono uppercase text-amber-300 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Thông Số Cấu Hình Quang Học Khuyên Dùng:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeTech.recommendedSettings.map((set, sIdx) => (
                <div key={sIdx} className="bg-[#030a16] p-2.5 rounded border border-zinc-800 text-[11px]">
                  <span className="text-zinc-400 block text-[10px]">{set.label}</span>
                  <span className="text-zinc-100 font-mono font-medium">{set.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompts Section */}
          <div className="space-y-3">
            {/* Vietnamese Prompt */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-300 font-semibold">Câu Lệnh Phục Hồi Chuyên Nghiệp (Tiếng Việt):</span>
                <button
                  onClick={() => copyText(activeTech.promptVi, 'vi', activeTech.id)}
                  className="flex items-center gap-1 text-[11px] text-amber-300 hover:underline cursor-pointer"
                >
                  {copiedVi === activeTech.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedVi === activeTech.id ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-300 bg-[#030914] p-3.5 rounded border border-zinc-800 font-mono leading-relaxed">
                {activeTech.promptVi}
              </p>
            </div>

            {/* English Prompt */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-300 font-semibold">Master Prompt Tiếng Anh (Tối ưu cho Gemini Vision 3.6):</span>
                <button
                  onClick={() => copyText(activeTech.promptEn, 'en', activeTech.id)}
                  className="flex items-center gap-1 text-[11px] text-amber-300 hover:underline cursor-pointer"
                >
                  {copiedEn === activeTech.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEn === activeTech.id ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-400 bg-[#030914] p-3.5 rounded border border-zinc-800 font-mono leading-relaxed">
                {activeTech.promptEn}
              </p>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeTech.keywordsEn.map((kw, kIdx) => (
                <span key={kIdx} className="px-2 py-0.5 bg-[#081833] text-sky-300 border border-sky-600/30 text-[10px] font-mono rounded">
                  +{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => copyText(`${activeTech.promptVi}\n\n${activeTech.promptEn}`, 'en', activeTech.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#081a38] hover:bg-[#0b2450] text-zinc-200 text-xs font-semibold rounded cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Sao chép Song Ngữ (Anh & Việt)</span>
            </button>

            <button
              onClick={() => handleApplySingle(activeTech)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold rounded cursor-pointer shadow-md transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span>Nạp Kỹ Thuật Này Vào Bộ Tạo Prompt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
