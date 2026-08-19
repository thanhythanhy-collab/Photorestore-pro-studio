import React, { useState } from 'react';
import { PROMPT_TEMPLATES, DAMAGE_OPTIONS, TECHNICAL_KEYWORDS } from '../data/promptsData';
import { RestorationCategory } from '../types';
import { Copy, Check, Sparkles, RefreshCw, Wand2 } from 'lucide-react';

interface PromptBuilderProps {
  initialCategory?: RestorationCategory;
  onSelectCategory?: (cat: RestorationCategory) => void;
  initialPromptVi?: string;
  initialPromptEn?: string;
  initialKeywords?: string[];
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({
  initialCategory = 'portrait',
  initialPromptVi,
  initialPromptEn,
  initialKeywords
}) => {
  const [category, setCategory] = useState<RestorationCategory>(initialCategory);
  const [selectedDamages, setSelectedDamages] = useState<string[]>(['scratches', 'yellowing', 'blur']);
  const [userNotes, setUserNotes] = useState<string>('Bức ảnh chân dung cũ gia đình chụp thập niên 1970');
  const [includeIdTuning, setIncludeIdTuning] = useState<boolean>(false);
  const [includeNoWatermark, setIncludeNoWatermark] = useState<boolean>(true);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    initialKeywords || [
      'Preserve 100% original facial features',
      'Natural skin texture',
      '8K resolution',
      'Ultra-sharp detail',
      'No watermark, no logo, no signature'
    ]
  );

  const [copiedVi, setCopiedVi] = useState(false);
  const [copiedEn, setCopiedEn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom prompt output state
  const [customPromptVi, setCustomPromptVi] = useState<string>(initialPromptVi || '');
  const [customPromptEn, setCustomPromptEn] = useState<string>(initialPromptEn || '');

  // Synchronize when initial props change
  React.useEffect(() => {
    if (initialPromptVi) setCustomPromptVi(initialPromptVi);
    if (initialPromptEn) setCustomPromptEn(initialPromptEn);
    if (initialKeywords) setSelectedKeywords(initialKeywords);
  }, [initialPromptVi, initialPromptEn, initialKeywords]);

  // Toggle damage selection
  const toggleDamage = (id: string) => {
    setSelectedDamages((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Toggle keyword chip
  const toggleKeyword = (kw: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
  };

  // Generate Master Prompt using Server API / Rule logic
  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          damageList: selectedDamages.map((id) => DAMAGE_OPTIONS.find((d) => d.id === id)?.label),
          userDescription: userNotes,
          extraKeywords: selectedKeywords,
          idPhotoOption: includeIdTuning,
          noWatermarkOption: includeNoWatermark,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setCustomPromptVi(resData.data.masterPromptVi);
        setCustomPromptEn(resData.data.masterPromptEn);
      } else {
        // Fallback local builder
        buildFallbackPrompt();
      }
    } catch {
      buildFallbackPrompt();
    } finally {
      setIsGenerating(false);
    }
  };

  const buildFallbackPrompt = () => {
    const template = PROMPT_TEMPLATES.find((t) => t.category === category) || PROMPT_TEMPLATES[0];

    // Combine selected damage snippets
    const damageViSnippets = selectedDamages
      .map((id) => DAMAGE_OPTIONS.find((d) => d.id === id)?.promptSnippetVi)
      .filter(Boolean);

    const damageEnSnippets = selectedDamages
      .map((id) => DAMAGE_OPTIONS.find((d) => d.id === id)?.promptSnippetEn)
      .filter(Boolean);

    let actionVi = template.components.action;
    let preservationVi = template.components.preservation;
    let technicalVi = `Xử lý kỹ thuật: ${damageViSnippets.join(' ')} Giữ nguyên tông màu da chân thực, tránh làm láng mịn dạng nhựa (plastic look).`;
    let idTuningVi = includeIdTuning ? template.components.idPhotoOpt || '' : '';
    let formatVi = template.components.format;

    if (includeNoWatermark) {
      formatVi += '\nCam kết sạch: Tuyệt đối không chèn watermark, không logo, không chữ ký hay văn bản thừa, xuất ảnh tràn viền 100% nguyên bản.';
    }

    if (userNotes.trim()) {
      preservationVi += ` Đặc biệt chú ý chi tiết: ${userNotes.trim()}.`;
    }

    const fullVi = `${actionVi}\n${preservationVi}\n${technicalVi}${idTuningVi ? '\n' + idTuningVi : ''}\n${formatVi}`;

    const antiWatermarkEn = includeNoWatermark ? 'Clean output, no watermark, no logo, no signature, no text stamp, no borders.' : '';
    let fullEn = `${template.promptEn}\nAdditional specs: ${damageEnSnippets.join(' ')} ${selectedKeywords.join(', ')}. ${antiWatermarkEn} Subject details: ${userNotes}.`;

    setCustomPromptVi(fullVi);
    setCustomPromptEn(fullEn);
  };

  // Run initial build if custom prompt is not already present or on explicit category changes
  React.useEffect(() => {
    if (!initialPromptVi && !customPromptVi) {
      buildFallbackPrompt();
    }
  }, [category]);

  const copyToClipboard = (text: string, type: 'vi' | 'en') => {
    navigator.clipboard.writeText(text);
    if (type === 'vi') {
      setCopiedVi(true);
      setTimeout(() => setCopiedVi(false), 2000);
    } else {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#050e1f]/90 border border-amber-500/30 rounded-sm p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Xưởng Kiến Tạo Master Prompt • Studio Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-100 flex items-center gap-2 font-serif-luxury">
            <Wand2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Tùy Biến Master Prompt 4 Thành Phần Chuẩn Pro</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light max-w-2xl">
            Tổ hợp tình trạng hư tổn, đặc điểm nhận dạng nhân học và từ khóa quang học vi mô để tạo ra prompt AI hoàn mỹ nhất.
          </p>
        </div>

        <button
          onClick={handleGeneratePrompt}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 rounded-sm shadow-lg shadow-amber-500/20 shrink-0 font-mono"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin text-black" />
          ) : (
            <Sparkles className="w-4 h-4 text-black" />
          )}
          <span>{isGenerating ? 'AI Đang Xử Lý...' : 'Tạo Master Prompt Pro'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-[#050f24] border border-amber-500/25 rounded-sm p-4 sm:p-6 shadow-xl">
          {/* 1. Category Selection */}
          <div>
            <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-2 font-mono">
              1. Thể Loại Ảnh Cần Phục Hồi
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'portrait', label: 'Chân dung & Ảnh thẻ' },
                { id: 'group', label: 'Tập thể / Đa người' },
                { id: 'landscape', label: 'Phong cảnh & Kiến trúc' },
                { id: 'document', label: 'Giấy tờ & Tư liệu' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as RestorationCategory)}
                  className={`px-3 py-2.5 text-xs font-medium text-left transition-all cursor-pointer border rounded-sm ${
                    category === cat.id
                      ? 'bg-[#0a2046] border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-500/10'
                      : 'bg-[#030914] border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Damage Selection */}
          <div>
            <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-2 font-mono">
              2. Chọn Tổn Hại Của Bức Ảnh (Khử Nhiễu AI)
            </label>
            <div className="space-y-2">
              {DAMAGE_OPTIONS.map((dmg) => {
                const isSelected = selectedDamages.includes(dmg.id);
                return (
                  <label
                    key={dmg.id}
                    onClick={() => toggleDamage(dmg.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-sm border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#081b38] border-amber-500/50 text-amber-100 shadow-sm'
                        : 'bg-[#030914] border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 border-amber-500/50 bg-[#061226] text-amber-400 focus:ring-amber-400 rounded-sm"
                    />
                    <div>
                      <span className="font-semibold text-zinc-100 block">{dmg.label}</span>
                      <span className="text-[11px] text-zinc-400 font-light">{dmg.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ID Photo Studio Tuning option (Only for portrait) */}
          {category === 'portrait' && (
            <div className="bg-[#030914] border border-amber-500/20 rounded-sm p-3.5">
              <label className="flex items-center gap-3 text-xs text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeIdTuning}
                  onChange={(e) => setIncludeIdTuning(e.target.checked)}
                  className="border-zinc-700 bg-zinc-900 text-amber-400 focus:ring-amber-400 rounded-sm"
                />
                <div>
                  <span className="font-semibold text-zinc-100">Thêm Tùy Chỉnh Ảnh Thẻ Chuyên Nghiệp</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5 font-light">
                    Ánh sáng studio cân đối, làm gọn tóc rối, mắt nhìn thẳng nhẹ nhàng.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Guaranteed No Watermark Option */}
          <div className="bg-[#030914] border border-emerald-500/30 rounded-sm p-3.5">
            <label className="flex items-center gap-3 text-xs text-zinc-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNoWatermark}
                onChange={(e) => setIncludeNoWatermark(e.target.checked)}
                className="border-zinc-700 bg-zinc-900 text-emerald-400 focus:ring-emerald-400 rounded-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-zinc-100">Khóa Lệnh Xuất 100% Không Dính Watermark</span>
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-sm">No Watermark</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 font-light">
                  Chèn lệnh cấm AI gắn logo, dấu chìm bản quyền, chữ ký hay viền trang trí giả.
                </p>
              </div>
            </label>
          </div>

          {/* Quick Pro 5-Mastery Presets Injector */}
          <div className="bg-gradient-to-br from-[#061836] via-[#041024] to-[#020712] border border-amber-400/40 rounded-sm p-4 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>5 Kỹ Thuật Vi Mô Đỉnh Cao (1-Click)</span>
              </span>
              <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.5 rounded font-mono font-bold">PRO STUDIO</span>
            </div>
            <p className="text-[11px] text-zinc-300 font-light leading-relaxed">
              Tự động chèn: Vân da vi mô (SSS), ánh nhìn giác mạc (Catchlight), hạt phim 35mm bạc muối, vân dệt vải và căn màu in Lab CMYK 300 DPI.
            </p>
            <button
              type="button"
              onClick={() => {
                const proKeywords = [
                  'Preserve 100% original facial features',
                  'Organic skin micro-texture',
                  'Subsurface scattering SSS',
                  'Sharp iris geometry & catchlight',
                  '35mm organic film grain',
                  'Microscopic fabric weave',
                  'Calibrated CMYK print proofing',
                  '8K resolution',
                  'No watermark, no logo, no signature'
                ];
                setSelectedKeywords(proKeywords);
              }}
              className="w-full py-2 px-3 bg-amber-400/15 hover:bg-amber-400/25 text-amber-200 border border-amber-400/50 text-xs font-semibold rounded-sm cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Áp Dụng Trọn Bộ 5 Kỹ Thuật Vi Mô Vào Prompt</span>
            </button>
          </div>

          {/* 3. User Notes */}
          <div>
            <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-2 font-mono">
              3. Ghi Chú Đặc Điểm Nhận Dạng / Bối Cảnh Gốc
            </label>
            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Ví dụ: Ảnh cụ bà mặc áo dài lụa Hà Đông màu mỡ gà, đeo kiềng bạc, tóc vấn khăn..."
              rows={3}
              className="w-full bg-[#030914] border border-zinc-800 rounded-sm p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all resize-none font-light"
            />
          </div>

          {/* 4. English Keywords Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-amber-300 uppercase tracking-widest font-mono">
                4. Từ Khóa Kỹ Thuật Tiếng Anh
              </label>
              <span className="text-[10px] text-zinc-400 font-mono">
                {selectedKeywords.length} ĐÃ CHỌN
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto no-scrollbar p-1">
              {TECHNICAL_KEYWORDS.map((kw) => {
                const isSel = selectedKeywords.includes(kw.en);
                return (
                  <button
                    key={kw.en}
                    type="button"
                    onClick={() => toggleKeyword(kw.en)}
                    className={`px-2 py-1 rounded-sm text-[10px] font-mono border transition-all cursor-pointer ${
                      isSel
                        ? 'bg-[#081e42] border-amber-400 text-amber-200 font-bold shadow-sm'
                        : 'bg-[#030914] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {isSel ? '✓ ' : '+ '}
                    {kw.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Prompt Output Box (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vietnamese Master Prompt Box */}
          <div className="bg-[#050f24] border border-amber-500/30 rounded-sm p-4 sm:p-6 relative shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200 font-serif-luxury">
                  Master Prompt Tiếng Việt (Chuẩn 4 Thành Phần)
                </h3>
              </div>

              <button
                onClick={() => copyToClipboard(customPromptVi, 'vi')}
                className="inline-flex items-center justify-center gap-1.5 h-8 px-4 bg-amber-400 hover:bg-amber-300 text-black rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                {copiedVi ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedVi ? 'Đã Sao Chép!' : 'Sao Chép Prompt VI'}</span>
              </button>
            </div>

            <div className="bg-[#020611] border border-zinc-800 p-4 font-mono text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto rounded-sm select-all">
              {customPromptVi}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400 font-mono">
              <span>Tối ưu hóa cho Gemini 3.6 Vision & Nano/Pro engines</span>
              <span className="text-amber-300 font-bold uppercase">CẤU TRÚC 4 THÀNH PHẦN HOÀN CHỈNH</span>
            </div>
          </div>

          {/* English Master Prompt Box */}
          <div className="bg-[#050f24] border border-zinc-800 rounded-sm p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-sky-200 font-mono">
                  English Technical Prompt (AI Engine Optimized)
                </h3>
              </div>

              <button
                onClick={() => copyToClipboard(customPromptEn, 'en')}
                className="inline-flex items-center justify-center gap-1.5 h-8 px-4 bg-[#081836] hover:bg-[#0c234f] border border-amber-500/40 text-amber-200 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {copiedEn ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEn ? 'Copied!' : 'Copy English Prompt'}</span>
              </button>
            </div>

            <div className="bg-[#020611] border border-zinc-800 p-4 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto rounded-sm select-all">
              {customPromptEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
