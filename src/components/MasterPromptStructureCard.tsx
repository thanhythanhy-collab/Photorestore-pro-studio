import React from 'react';
import { MASTER_SYSTEM_PROMPT_EXPLANATION } from '../data/promptsData';
import { Layers, Info } from 'lucide-react';
import brandBanner from '../assets/images/gemini_photorestore_logo_1786650803879.jpg';

export const MasterPromptStructureCard: React.FC = () => {
  return (
    <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm overflow-hidden shadow-xl">
      {/* Brand Visual Hero Banner */}
      <div className="relative w-full h-44 sm:h-60 md:h-72 overflow-hidden border-b border-zinc-800 bg-[#080808]">
        <img
          src={brandBanner}
          alt="GEMINI PhotoRestore Pro Studio Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/20" />
      </div>

      <div className="p-6 sm:p-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              <span>Cấu Trúc Prompt Chuẩn Pro (Master System Prompt)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-100">
              {MASTER_SYSTEM_PROMPT_EXPLANATION.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl font-light">
              {MASTER_SYSTEM_PROMPT_EXPLANATION.description}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-zinc-700 text-xs text-zinc-200 font-mono rounded-sm self-start md:self-auto">
            <span>[1. Hành Động]</span>
            <span className="text-zinc-500">+</span>
            <span>[2. Bảo Tồn]</span>
            <span className="text-zinc-500">+</span>
            <span>[3. Kỹ Thuật]</span>
            <span className="text-zinc-500">+</span>
            <span>[4. In Ấn]</span>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {MASTER_SYSTEM_PROMPT_EXPLANATION.components.map((comp, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-zinc-800 hover:border-zinc-700 p-4 transition-all flex flex-col justify-between rounded-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-300 bg-zinc-900 border border-zinc-700 px-2 py-0.5 tracking-wider uppercase">
                    {comp.en}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">STEP 0{idx + 1}</span>
                </div>
                <h3 className="font-medium text-zinc-100 text-sm mb-1.5">{comp.step}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3 font-light">{comp.detail}</p>
              </div>

              <div className="mt-auto bg-[#0a0a0a] border border-zinc-800/80 p-2.5 rounded-sm">
                <p className="text-[11px] text-zinc-300 font-mono italic leading-snug">
                  "{comp.example}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Notice box */}
        <div className="mt-6 flex items-start gap-3 bg-[#141414]/60 border border-zinc-800 p-3.5 text-xs text-zinc-300 rounded-sm">
          <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <p className="font-light">
            <strong className="text-zinc-100 font-medium uppercase tracking-wider text-[11px] mr-1">Bí quyết chuyên gia:</strong> Gemini hoạt động xuất sắc nhất khi prompt có định hướng rõ ràng giữa chi tiết <em className="text-zinc-100 not-italic font-medium underline underline-offset-4 decoration-zinc-700">cần bảo lưu tuyệt đối</em> (thần thái nét mặt) và các chi tiết <em className="text-zinc-100 not-italic font-medium underline underline-offset-4 decoration-zinc-700">cần can thiệp khử nhiễu AI</em> (ố vàng, vết nứt, mốc kính).
          </p>
        </div>
      </div>
    </div>
  );
};
