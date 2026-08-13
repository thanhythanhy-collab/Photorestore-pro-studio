import React, { useState } from 'react';
import { Printer, Sparkles } from 'lucide-react';

export const PrintCalculator: React.FC = () => {
  const [printWidthCm, setPrintWidthCm] = useState<number>(20);
  const [printHeightCm, setPrintHeightCm] = useState<number>(30);
  const [targetDpi, setTargetDpi] = useState<number>(300);

  // Preset print sizes
  const presetSizes = [
    { label: 'Ảnh thẻ 3x4 cm', w: 3, h: 4 },
    { label: 'Ảnh thẻ 4x6 cm', w: 4, h: 6 },
    { label: 'Ảnh thờ 20x30 cm', w: 20, h: 30 },
    { label: 'Bằng khen A4 (21x29.7 cm)', w: 21, h: 29.7 },
    { label: 'Ảnh ép gỗ 30x45 cm', w: 30, h: 45 },
    { label: 'Tranh treo tường 60x90 cm', w: 60, h: 90 },
  ];

  // Mathematical calculations
  const widthPixels = Math.round((printWidthCm / 2.54) * targetDpi);
  const heightPixels = Math.round((printHeightCm / 2.54) * targetDpi);
  const totalPixels = widthPixels * heightPixels;
  const megapixels = (totalPixels / 1000000).toFixed(1);

  // Calculate recommended upscale multiplier from standard 1080p / 2K AI output
  let recommendedUpscale = '1x (Không cần upscale thêm)';
  if (widthPixels > 4000 || heightPixels > 4000) {
    recommendedUpscale = 'Upscale 4x (Topaz Gigapixel AI / Magnific AI)';
  } else if (widthPixels > 2000 || heightPixels > 2000) {
    recommendedUpscale = 'Upscale 2x (Topaz Gigapixel AI / Remini)';
  }

  const applyPreset = (w: number, h: number) => {
    setPrintWidthCm(w);
    setPrintHeightCm(h);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 flex items-center gap-2">
          <Printer className="w-5 h-5 text-zinc-400" />
          <span>Công Cụ Tính Kích Thước In Ấn & Chuẩn Mật Độ Điểm Ảnh (DPI Calculator)</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-1 font-light">
          Tính toán chính xác độ phân giải Pixel cần thiết để in ảnh thờ, bằng khen hoặc tranh treo tường không bao giờ bị vỡ hình.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6">
          {/* Quick Presets */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Chọn Khổ In Chuẩn Phổ Biến:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetSizes.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset.w, preset.h)}
                  className={`px-3 py-2.5 rounded-sm border text-xs font-semibold text-left transition-all cursor-pointer ${
                    printWidthCm === preset.w && printHeightCm === preset.h
                      ? 'bg-zinc-100 border-zinc-100 text-black font-bold'
                      : 'bg-[#141414] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Width & Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                Chiều Rộng In (cm)
              </label>
              <input
                type="number"
                value={printWidthCm}
                onChange={(e) => setPrintWidthCm(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#141414] border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-700"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                Chiều Cao In (cm)
              </label>
              <input
                type="number"
                value={printHeightCm}
                onChange={(e) => setPrintHeightCm(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#141414] border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>

          {/* Target DPI selection */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Chọn Tiêu Chuẩn Mật Độ In (DPI):
            </label>
            <div className="space-y-2">
              {[
                { dpi: 300, label: '300 DPI - Chuẩn Tiêu Chuẩn In Ảnh Rõ Nét (Khuyên Dùng)', desc: 'Dành cho Ảnh thờ, Bằng khen, Ảnh kỷ niệm gia đình.' },
                { dpi: 600, label: '600 DPI - Chuẩn In Nghệ Thuật Cao Cấp Fine Art', desc: 'Dành cho Tranh treo tường lớn, tạp chí thương mại.' },
                { dpi: 150, label: '150 DPI - Chuẩn Xem Từ Xa / Bạt Hiflex', desc: 'Dành cho Băng rôn lớn xem ngoài trời.' },
              ].map((item) => (
                <button
                  key={item.dpi}
                  type="button"
                  onClick={() => setTargetDpi(item.dpi)}
                  className={`w-full p-3 rounded-sm border text-left text-xs transition-all cursor-pointer ${
                    targetDpi === item.dpi
                      ? 'bg-[#141414] border-zinc-600 text-zinc-100 font-medium'
                      : 'bg-[#141414] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-zinc-200 font-bold">{item.label}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 font-light">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Calculation Display (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Calculation Result Box */}
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  Thông Số File Xuất In Chuẩn 300+ DPI
                </span>
                <h3 className="text-xl font-light tracking-tight text-zinc-100 mt-1">
                  Khổ In {printWidthCm} x {printHeightCm} cm @ {targetDpi} DPI
                </h3>
              </div>
              <div className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-sm font-mono text-xs font-bold">
                {megapixels} MP
              </div>
            </div>

            {/* Matrix Result */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-mono">
                  Kích Thước Pixel Cần Xuất:
                </span>
                <p className="text-xl font-light font-mono text-zinc-100">
                  {widthPixels} x {heightPixels} px
                </p>
              </div>

              <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-mono">
                  Đề Xuất Upscale AI:
                </span>
                <p className="text-sm font-mono text-zinc-300">
                  {recommendedUpscale}
                </p>
              </div>
            </div>

            {/* Workflow steps */}
            <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                Quy Trình 3 Bước Xử Lý In Khổ Lớn:
              </h4>

              <div className="space-y-2 text-xs text-zinc-400 font-light">
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-300 font-mono text-[10px] border border-zinc-700 rounded-sm">
                    01
                  </span>
                  <span>
                    Dùng Gemini Master Prompt để phục hồi màu sắc, khử ố vàng và làm rõ nét mặt gốc.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-300 font-mono text-[10px] border border-zinc-700 rounded-sm">
                    02
                  </span>
                  <span>
                    Cho file đã phục hồi qua phần mềm Upscale (Topaz Gigapixel AI hoặc Magnific AI) để đưa chiều rộng đạt tối thiểu <strong className="text-zinc-200 font-mono">{widthPixels}px</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-300 font-mono text-[10px] border border-zinc-700 rounded-sm">
                    03
                  </span>
                  <span>
                    Xuất định dạng JPG/PNG chất lượng 100% hoặc TIFF không nén để máy in ảnh chuyên dụng tiến hành in.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
