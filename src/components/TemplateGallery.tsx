import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/promptsData';
import { PromptTemplate, RestorationCategory } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Copy, Check, Sparkles, Lightbulb, Users, User, Landmark, FileCheck } from 'lucide-react';

interface TemplateGalleryProps {
  onUseTemplate?: (cat: RestorationCategory) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onUseTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedLang, setCopiedLang] = useState<'vi' | 'en'>('vi');

  const categories = [
    { id: 'all', label: 'Tất Cả Mẫu Prompt' },
    { id: 'portrait', label: 'Mẫu 1: Chân Dung & Ảnh Thẻ', icon: User },
    { id: 'group', label: 'Mẫu 2: Ảnh Tập Thể', icon: Users },
    { id: 'landscape', label: 'Mẫu 3: Phong Cảnh & Kiến Trúc', icon: Landmark },
    { id: 'document', label: 'Mẫu 4: Giấy Tờ & Tư Liệu', icon: FileCheck },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? PROMPT_TEMPLATES
      : PROMPT_TEMPLATES.filter((t) => t.category === selectedCategory);

  const copyPrompt = (template: PromptTemplate, isVi: boolean) => {
    const text = isVi ? template.promptVi : template.promptEn;
    navigator.clipboard.writeText(text);
    setCopiedId(template.id);
    setCopiedLang(isVi ? 'vi' : 'en');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light tracking-tight text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-zinc-400" />
            <span>Các Mẫu Prompt Chi Tiết Cho Từng Thể Loại Ảnh</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1 font-light">
            Bộ prompt mẫu chuẩn hóa chuyên sâu theo từng loại ảnh, được thiết kế tối ưu trọn vẹn chi tiết gốc và khử nhiễu.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-zinc-100 text-black border-zinc-100 font-bold'
                  : 'bg-[#0d0d0d] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Template Cards List */}
      <div className="space-y-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-[#0d0d0d] border border-zinc-800 hover:border-zinc-700 rounded-sm p-6 sm:p-8 transition-all space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest bg-zinc-900 px-2.5 py-1 rounded-sm border border-zinc-700">
                  {template.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-100 mt-2">
                  {template.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
                  {template.description}
                </p>
              </div>

              {onUseTemplate && (
                <button
                  onClick={() => onUseTemplate(template.category)}
                  className="inline-flex items-center gap-2 h-10 px-4 bg-zinc-100 hover:bg-zinc-200 text-black font-bold uppercase tracking-wider rounded-sm text-xs transition-all cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Dùng Mẫu Này Trong Builder</span>
                </button>
              )}
            </div>

            {/* Template Grid: Prompts (Left 7 cols) & Before/After (Right 5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 cols: Prompts display */}
              <div className="lg:col-span-7 space-y-5">
                {/* Vietnamese Prompt */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Prompt Tiếng Việt Chuẩn (Copy Gửi Gemini)
                    </span>
                    <button
                      onClick={() => copyPrompt(template, true)}
                      className="inline-flex items-center gap-1.5 h-7 px-3 bg-zinc-100 hover:bg-zinc-200 text-black rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {copiedId === template.id && copiedLang === 'vi' ? (
                        <Check className="w-3.5 h-3.5 text-black" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedId === template.id && copiedLang === 'vi'
                          ? 'Đã Sao Chép!'
                          : 'Sao Chép Text'}
                      </span>
                    </button>
                  </div>

                  <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-4 font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {template.promptVi}
                  </div>
                </div>

                {/* English Prompt */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      English Technical Prompt
                    </span>
                    <button
                      onClick={() => copyPrompt(template, false)}
                      className="inline-flex items-center gap-1.5 h-7 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {copiedId === template.id && copiedLang === 'en' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedId === template.id && copiedLang === 'en'
                          ? 'Copied!'
                          : 'Copy English'}
                      </span>
                    </button>
                  </div>

                  <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-4 font-mono text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">
                    {template.promptEn}
                  </div>
                </div>

                {/* English Keywords Badge List */}
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">
                    Từ Khóa Tiếng Anh Trọng Tâm:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {template.englishKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-sm text-[10px] font-mono uppercase"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Interactive Before/After & Tips */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                    Ảnh Mẫu Minh Họa Trước & Sau Phục Hồi:
                  </span>
                  <BeforeAfterSlider
                    beforeImage={template.sampleBefore}
                    afterImage={template.sampleAfter}
                  />
                </div>

                {/* Category Pro Tips */}
                <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-300 text-[10px] font-bold uppercase tracking-widest">
                    <Lightbulb className="w-4 h-4 text-zinc-400" />
                    <span>Lưu Ý Chuyên Gia Cho Thể Loại Này:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {template.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2 font-light">
                        <span className="text-zinc-500 font-mono">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
