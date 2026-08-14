import React from 'react';
import { MASTER_SYSTEM_PROMPT_EXPLANATION } from '../data/promptsData';
import { Layers, Info, Sparkles, ShieldCheck, Printer, Zap, Cpu, Award } from 'lucide-react';
import luxuryBanner from '../assets/images/royal_blue_gold_banner_1786677229226.jpg';
import brandEmblem from '../assets/images/gemini_restore_emblem_1786650826371.jpg';

export const MasterPromptStructureCard: React.FC = () => {
  return (
    <div className="relative rounded-sm overflow-hidden border border-amber-500/30 bg-gradient-to-b from-[#08152b] via-[#040c18] to-[#02060d] shadow-2xl shadow-blue-950/40">
      {/* Top Gold Foil Accent Border */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      {/* Brand Visual Hero Banner Section */}
      <div className="relative w-full overflow-hidden border-b border-amber-500/20 bg-[#020711]">
        {/* Background Image with Cinematic Aspect */}
        <div className="relative w-full h-52 sm:h-72 md:h-80 lg:h-96">
          <img
            src={luxuryBanner}
            alt="GEMINI PhotoRestore Pro Studio - Royal Blue Gold Master Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Royal Blue to Obsidian Ambient Gradient Masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040c18] via-[#040c18]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040c18]/80 via-transparent to-[#040c18]/80" />

          {/* Floating Luxury Badges in Banner */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 z-20">
            <div className="flex items-center gap-3 bg-[#061226]/85 backdrop-blur-md border border-amber-400/40 px-3.5 py-2 rounded-sm shadow-xl">
              <div className="w-8 h-8 rounded-sm overflow-hidden border border-amber-400/50 shrink-0">
                <img
                  src={brandEmblem}
                  alt="Studio Monogram"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-bold tracking-wider uppercase">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tiêu Chuẩn Phục Hồi Cao Cấp</span>
                </div>
                <div className="text-zinc-200 text-xs font-light">
                  Phục chế nguyên bản thần thái & kết cấu da thật 8K
                </div>
              </div>
            </div>

            {/* Quick Specs Pills */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#081730]/90 backdrop-blur-md border border-sky-400/30 text-sky-200 text-[11px] font-mono rounded-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Không Watermark</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#081730]/90 backdrop-blur-md border border-amber-400/30 text-amber-200 text-[11px] font-mono rounded-sm">
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Chuẩn In 300+ DPI</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#081730]/90 backdrop-blur-md border border-blue-400/30 text-blue-200 text-[11px] font-mono rounded-sm">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Gemini 3.6 Vision</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Prompt Architecture */}
      <div className="p-6 sm:p-8 relative z-10">
        {/* Title Bar & Master Formula */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-amber-500/20">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Cấu Trúc Prompt Chuẩn Pro • Master System Prompt Formula</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-100 flex items-center gap-2.5">
              <span>{MASTER_SYSTEM_PROMPT_EXPLANATION.title}</span>
              <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-sm">
                8K Ready
              </span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl font-light leading-relaxed">
              {MASTER_SYSTEM_PROMPT_EXPLANATION.description}
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1.5 p-2 bg-[#061224] border border-amber-500/30 text-xs text-zinc-200 font-mono rounded-sm self-start lg:self-auto shadow-inner">
            <span className="px-2 py-1 bg-blue-950/80 text-blue-200 border border-blue-700/50 rounded-sm">[1. Hành Động]</span>
            <span className="text-amber-400/80 font-bold">+</span>
            <span className="px-2 py-1 bg-amber-950/80 text-amber-200 border border-amber-700/50 rounded-sm">[2. Bảo Tồn]</span>
            <span className="text-amber-400/80 font-bold">+</span>
            <span className="px-2 py-1 bg-cyan-950/80 text-cyan-200 border border-cyan-700/50 rounded-sm">[3. Kỹ Thuật]</span>
            <span className="text-amber-400/80 font-bold">+</span>
            <span className="px-2 py-1 bg-emerald-950/80 text-emerald-200 border border-emerald-700/50 rounded-sm">[4. Sạch & In Ấn]</span>
          </div>
        </div>

        {/* 4 Steps Grid with Royal Blue Dark & Gold Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {MASTER_SYSTEM_PROMPT_EXPLANATION.components.map((comp, idx) => {
            const stepColors = [
              { border: 'hover:border-blue-400/50', badge: 'bg-blue-950 text-blue-300 border-blue-700', stepText: 'text-blue-400' },
              { border: 'hover:border-amber-400/50', badge: 'bg-amber-950 text-amber-300 border-amber-700', stepText: 'text-amber-400' },
              { border: 'hover:border-cyan-400/50', badge: 'bg-cyan-950 text-cyan-300 border-cyan-700', stepText: 'text-cyan-400' },
              { border: 'hover:border-emerald-400/50', badge: 'bg-emerald-950 text-emerald-300 border-emerald-700', stepText: 'text-emerald-400' },
            ][idx % 4];

            return (
              <div
                key={idx}
                className={`bg-[#061124]/90 border border-zinc-800 ${stepColors.border} p-4 transition-all duration-200 flex flex-col justify-between rounded-sm shadow-md group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-sm tracking-wider uppercase ${stepColors.badge}`}>
                      {comp.en}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">BƯỚC 0{idx + 1}</span>
                  </div>
                  <h3 className="font-medium text-zinc-100 text-sm mb-1.5 group-hover:text-amber-300 transition-colors">
                    {comp.step}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3 font-light">{comp.detail}</p>
                </div>

                <div className="mt-auto bg-[#030914] border border-zinc-800/90 p-2.5 rounded-sm">
                  <p className="text-[11px] text-zinc-300 font-mono italic leading-snug">
                    "{comp.example}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice box */}
        <div className="mt-6 flex items-start gap-3 bg-[#061226]/80 border border-amber-500/20 p-4 text-xs text-zinc-300 rounded-sm">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="font-light leading-relaxed">
            <strong className="text-amber-300 font-medium uppercase tracking-wider text-[11px] mr-1">Bí quyết chuyên gia Gemini 3.6:</strong> Prompt đạt chuẩn cao cấp khi phân định rõ ràng giữa yếu tố <em className="text-zinc-100 not-italic font-medium underline underline-offset-4 decoration-amber-400/60">bảo lưu 100%</em> (thần thái mắt, nét cười, cấu trúc xương mặt gốc) và các yếu tố <em className="text-zinc-100 not-italic font-medium underline underline-offset-4 decoration-sky-400/60">khử nhiễu AI chuyên sâu</em> (nứt rách, ố vàng, mờ nhòe, không dính bất kỳ watermark nào).
          </p>
        </div>
      </div>
    </div>
  );
};

