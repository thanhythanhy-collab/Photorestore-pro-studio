import React, { useState } from 'react';
import { PROMPT_TEMPLATES, DAMAGE_OPTIONS, TECHNICAL_KEYWORDS } from '../data/promptsData';
import { RestorationCategory } from '../types';
import { Copy, Check, Sparkles, RefreshCw, Wand2 } from 'lucide-react';

interface PromptBuilderProps {
  initialCategory?: RestorationCategory;
  onSelectCategory?: (cat: RestorationCategory) => void;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({ initialCategory = 'portrait' }) => {
  const [category, setCategory] = useState<RestorationCategory>(initialCategory);
  const [selectedDamages, setSelectedDamages] = useState<string[]>(['scratches', 'yellowing', 'blur']);
  const [userNotes, setUserNotes] = useState<string>('Bức ảnh chân dung cũ gia đình chụp thập niên 1970');
  const [includeIdTuning, setIncludeIdTuning] = useState<boolean>(false);
  const [includeNoWatermark, setIncludeNoWatermark] = useState<boolean>(true);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([
    'Preserve 100% original facial features',
    'Natural skin texture',
    '8K resolution',
    'Ultra-sharp detail',
    'No watermark, no logo, no signature'
  ]);

  const [copiedVi, setCopiedVi] = useState(false);
  const [copiedEn, setCopiedEn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom prompt output state
  const [customPromptVi, setCustomPromptVi] = useState<string>('');
  const [customPromptEn, setCustomPromptEn] = useState<string>('');

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

  // Run initial build if empty
  React.useEffect(() => {
    buildFallbackPrompt();
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
    <div className="space-y-8">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light tracking-tight text-zinc-100 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-zinc-400" />
            <span>Công Cụ Tùy Biến Master Prompt 4 Thành Phần</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1 font-light">
            Chọn thể loại, tích chọn tình trạng tổn hại ảnh và từ khóa kỹ thuật để tạo ngay prompt tối ưu cho Gemini.
          </p>
        </div>

        <button
          onClick={handleGeneratePrompt}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 h-11 px-6 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 rounded-sm"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{isGenerating ? 'Đang tạo bằng Gemini AI...' : 'Tạo Master Prompt Pro'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6">
          {/* 1. Category Selection */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
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
                      ? 'bg-zinc-800/80 border-l-2 border-l-zinc-100 border-zinc-700 text-zinc-100 font-bold'
                      : 'bg-[#141414] border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Damage Selection */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
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
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-[#141414] border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 border-zinc-700 bg-zinc-900 text-zinc-100 focus:ring-zinc-700"
                    />
                    <div>
                      <span className="font-medium text-zinc-200 block">{dmg.label}</span>
                      <span className="text-[11px] text-zinc-500 font-light">{dmg.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ID Photo Studio Tuning option (Only for portrait) */}
          {category === 'portrait' && (
            <div className="bg-[#141414] border border-zinc-800 rounded-sm p-3.5">
              <label className="flex items-center gap-3 text-xs text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeIdTuning}
                  onChange={(e) => setIncludeIdTuning(e.target.checked)}
                  className="border-zinc-700 bg-zinc-900 text-zinc-100 focus:ring-zinc-700"
                />
                <div>
                  <span className="font-semibold text-zinc-200">Thêm Tùy Chỉnh Ảnh Thẻ Chuyên Nghiệp</span>
                  <p className="text-[11px] text-zinc-500 mt-0.5 font-light">
                    Ánh sáng studio cân đối, làm gọn tóc rối, mắt nhìn thẳng nhẹ nhàng.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Guaranteed No Watermark Option */}
          <div className="bg-[#141414] border border-zinc-800 rounded-sm p-3.5">
            <label className="flex items-center gap-3 text-xs text-zinc-200 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNoWatermark}
                onChange={(e) => setIncludeNoWatermark(e.target.checked)}
                className="border-zinc-700 bg-zinc-900 text-zinc-100 focus:ring-zinc-700"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-zinc-200">Khóa Lệnh Xuất 100% Không Dính Watermark</span>
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm">No Watermark</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5 font-light">
                  Chèn lệnh cấm AI gắn logo, dấu chìm bản quyền, chữ ký hay viền trang trí giả.
                </p>
              </div>
            </label>
          </div>

          {/* 3. User Notes */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              3. Ghi Chú Đặc Điểm Nhận Dạng / Bối Cảnh Gốc
            </label>
            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Ví dụ: Ảnh cụ bà mặc áo dài gấm đỏ, đeo dây chuyền vàng, tóc búi cao..."
              rows={3}
              className="w-full bg-[#141414] border border-zinc-800 rounded-sm p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all resize-none font-light"
            />
          </div>

          {/* 4. English Keywords Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                4. Từ Khóa Tiếng Anh Bổ Sung
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">
                {selectedKeywords.length} SELECTED
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
                        ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-bold'
                        : 'bg-[#141414] border-zinc-800 text-zinc-400 hover:text-zinc-200'
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
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6 relative">
            <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                  Master Prompt Tiếng Việt (Chuẩn 4 Thành Phần)
                </h3>
              </div>

              <button
                onClick={() => copyToClipboard(customPromptVi, 'vi')}
                className="inline-flex items-center gap-1.5 h-8 px-3.5 bg-zinc-100 hover:bg-zinc-200 text-black rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {copiedVi ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedVi ? 'Đã Sao Chép!' : 'Sao Chép Text'}</span>
              </button>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto rounded-sm">
              {customPromptVi}
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
              <span>Được thiết kế tối ưu hóa cho Gemini 3.6 Flash & Image models</span>
              <span className="text-zinc-400 font-mono uppercase">Structure: 4-Part Approved</span>
            </div>
          </div>

          {/* English Master Prompt Box */}
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6">
            <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                  English Technical Prompt (AI Engine Optimized)
                </h3>
              </div>

              <button
                onClick={() => copyToClipboard(customPromptEn, 'en')}
                className="inline-flex items-center gap-1.5 h-8 px-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {copiedEn ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEn ? 'Copied!' : 'Copy English'}</span>
              </button>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 p-4 font-mono text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto rounded-sm">
              {customPromptEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
