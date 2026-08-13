import React from 'react';
import { PRINT_PRO_TIPS } from '../data/promptsData';
import { Lightbulb, Cpu } from 'lucide-react';

export const GuideSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-zinc-400" />
          <span>Mẹo Nâng Cao Để Đạt Chất Lượng In Ấn Phục Hồi Tốt Nhất</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-1 font-light">
          Kinh nghiệm từ các chuyên gia phục hồi ảnh lâu năm giúp bạn kết hợp giữa Gemini AI và quy trình in ấn chuyên nghiệp.
        </p>
      </div>

      {/* Grid of 4 Major Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRINT_PRO_TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="bg-[#0d0d0d] border border-zinc-800 hover:border-zinc-700 rounded-sm p-6 transition-all space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#141414] border border-zinc-800 text-zinc-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                0{idx + 1}
              </div>
              <h3 className="font-light tracking-tight text-zinc-100 text-base">{tip.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed pl-11">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Recommended Upscale Software Comparison */}
      <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <Cpu className="w-5 h-5 text-zinc-400" />
          <div>
            <h3 className="text-lg font-light tracking-tight text-zinc-100">
              Các Công Cụ Upscale AI Chuyên Dụng Tối Ưu Nâng DPI
            </h3>
            <p className="text-xs text-zinc-500 font-light">
              Sử dụng sau khi đã có ảnh phục hồi nét màu từ Gemini
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest block">
              01. Topaz Gigapixel AI
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Chuẩn mực ngành in ấn chuyên nghiệp. Giữ nét chữ, hoa văn thêu và tóc cực nét mà không bị mờ nhòe.
            </p>
          </div>

          <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest block">
              02. Magnific AI
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Công nghệ AI thế hệ mới giúp bổ sung các chi tiết siêu thực cho làn da, vải vóc và khung cảnh.
            </p>
          </div>

          <div className="bg-[#141414] border border-zinc-800 rounded-sm p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest block">
              03. Remini Pro
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Nhanh chóng làm nét lại khuôn mặt trên điện thoại dành cho các bức ảnh thờ hoặc chân dung cá nhân nhỏ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
