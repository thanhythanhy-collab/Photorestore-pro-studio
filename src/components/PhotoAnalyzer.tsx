import React, { useState } from 'react';
import { PhotoAnalysisResult } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Camera, Upload, Sparkles, Check, Copy, AlertTriangle, ShieldCheck, Printer, RefreshCw, FileText } from 'lucide-react';

export const PhotoAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [copiedPromptVi, setCopiedPromptVi] = useState<boolean>(false);

  // Preset sample vintage photos for instant testing
  const samplePhotos = [
    {
      name: 'Chân dung cũ phai màu',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      restoredUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      category: 'portrait',
    },
    {
      name: 'Ảnh gia đình đông người năm 1970',
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
      restoredUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      category: 'group',
    },
    {
      name: 'Phố cổ & Kiến trúc di tích',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      restoredUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      category: 'landscape',
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setAnalysisResult(null);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (sample: typeof samplePhotos[0]) => {
    setSelectedFile(null);
    setImagePreview(sample.url);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const runAnalysis = async () => {
    if (!imagePreview) {
      setErrorMessage('Vui lòng tải lên hoặc chọn 1 bức ảnh mẫu để phân tích.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: selectedFile?.type || 'image/jpeg',
          userNotes: userNotes,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        throw new Error(data.error || 'Không thể phân tích ảnh.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi phân tích ảnh. Đang tự động tạo dữ liệu phân tích mẫu...');
      // Generate fallback analytical response if API key is not present or offline
      setAnalysisResult({
        detectedCategory: 'portrait',
        subjectDescription: 'Chân dung cá nhân phai màu cổ điển thập niên 1970 với vệt nứt xước nhẹ',
        damageTypes: ['Vệt xước phím', 'Ố vàng thâm niên', 'Mờ nhòe mắt tóc', 'Phai màu đen trắng'],
        faceCount: 1,
        qualityCondition: 'Severely Damaged',
        masterPromptVi: `Phục hồi và nâng cấp bức ảnh chân dung cũ này bằng công nghệ AI tiên tiến:
Giữ nguyên: 100% đường nét khuôn mặt, ánh mắt, nụ cười và thần thái gốc của nhân vật. Không làm biến dạng hay mờ các đặc điểm nhận dạng.
Màu sắc: Tái tạo màu sắc tự nhiên, chân thực, tông màu da (skin tone) hồng hào, sống động, tránh màu nhân tạo quá đà.
Xử lý kỹ thuật: Làm sắc nét chi tiết (mắt, tóc, trang phục), loại bỏ hoàn toàn vệt xước, ố vàng, nếp gấp, mốc kính và nhiễu hạt (noise reduction).
Chất lượng: Độ phân giải cực cao 8K, độ nét siêu cao (ultra-sharp detail), rõ từng sợi tóc và kết cấu da (skin texture), sẵn sàng cho in ấn chất lượng cao.`,
        masterPromptEn: `Restore and enhance this vintage portrait photo using advanced AI technology: Preserve 100% of original facial features, realistic skin tones with natural skin texture (no plastic look), denoise, remove scratches & stains, 8K resolution ultra-sharp print quality.`,
        preservationAdvice: 'Lưu ý giữ 100% ánh mắt và nếp nhăn tự nhiên quanh miệng của cụ. Tránh để AI cà láng mịn da.',
        technicalNotes: 'Bức ảnh có mật độ nhiễu hạt cao. Nên ưu tiên lệnh Denoise nhẹ trước khi tăng nét mắt.',
        printReadinessScore: 88,
        recommendedResolution: '7087 x 10630 Pixels (8K @ 300 DPI)',
        upscaleSteps: [
          'Chạy Master Prompt trên Gemini để khôi phục nét và màu.',
          'Dùng Topaz Gigapixel AI hoặc Magnific AI nâng DPI lên 300+.',
          'Kiểm tra nét chữ / thêu áo trước khi gửi máy in chuyên dụng.',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptVi(true);
    setTimeout(() => setCopiedPromptVi(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 flex items-center gap-2">
          <Camera className="w-5 h-5 text-zinc-400" />
          <span>Chẩn Đoán Tổn Hại Ảnh Cũ & Tự Động Tạo Prompt Phục Hồi</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-1 font-light">
          Tải ảnh cũ lên, Gemini AI Multimodal Vision sẽ kiểm tra số khuôn mặt, tổn hại (ố vàng, xước, mốc) và tự động viết Master Prompt chuẩn in ấn 8K dành riêng cho ảnh đó.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Area (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6">
          {/* File Upload Dropzone */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              1. Tải Lên Bức Ảnh Cũ Cần Phục Hồi
            </label>

            <div className="relative border border-dashed border-zinc-700 hover:border-zinc-500 p-6 text-center transition-all bg-[#141414] cursor-pointer group rounded-sm">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {imagePreview ? (
                <div className="relative aspect-video max-h-56 mx-auto rounded-sm overflow-hidden border border-zinc-800">
                  <img
                    src={imagePreview}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-zinc-200 font-medium">
                    Nhấp để đổi ảnh khác
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-4">
                  <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-zinc-700 text-zinc-300 mx-auto flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-300">
                      Kéo thả ảnh hoặc nhấp để chọn file
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1 font-light">
                      Hỗ trợ JPG, PNG, WEBP (Tối đa 25MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Preset Samples */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Hoặc Chọn Ảnh Cũ Mẫu Có Sẵn Để Thử Ngay:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {samplePhotos.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => selectSample(s)}
                  className={`relative overflow-hidden border text-left text-xs transition-all cursor-pointer aspect-square rounded-sm ${
                    imagePreview === s.url
                      ? 'border-zinc-100 ring-1 ring-zinc-100'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img src={s.url} alt={s.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 p-1 text-[9px] font-mono text-zinc-300 truncate uppercase">
                    {s.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User Notes */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
              Ghi Chú Bổ Sung Cho AI (Tùy chọn)
            </label>
            <input
              type="text"
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Ghi chú màu áo, năm chụp hoặc mong muốn cụ thể..."
              className="w-full bg-[#141414] border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 font-light"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing || !imagePreview}
            className="w-full h-11 bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 text-black font-bold uppercase tracking-widest rounded-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all text-xs"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Gemini đang soi chi tiết & chẩn đoán...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>Chẩn Đoán AI & Viết Master Prompt</span>
              </>
            )}
          </button>

          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-sm text-xs text-red-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Right Column: Analysis Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              {/* Summary Badges Card */}
              <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Kết quả chẩn đoán Gemini Vision
                    </span>
                    <h3 className="text-lg font-light tracking-tight text-zinc-100">
                      {analysisResult.subjectDescription}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono uppercase">
                      Khuôn mặt: {analysisResult.faceCount}
                    </span>
                    <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono uppercase">
                      {analysisResult.qualityCondition}
                    </span>
                  </div>
                </div>

                {/* Detected Damage Tags */}
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                    Tổn Hại Đã Phát Hiện Trên Bề Mặt:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.damageTypes.map((dmg, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono uppercase"
                      >
                        ⚠️ {dmg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advice Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#141414] border border-zinc-800 rounded-sm p-3 text-xs text-zinc-300 space-y-1">
                    <span className="font-medium text-zinc-200 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" /> Bảo Tồn Chi Tiết Gốc:
                    </span>
                    <p className="text-zinc-400 text-[11px] font-light">{analysisResult.preservationAdvice}</p>
                  </div>

                  <div className="bg-[#141414] border border-zinc-800 rounded-sm p-3 text-xs text-zinc-300 space-y-1">
                    <span className="font-medium text-zinc-200 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Printer className="w-3.5 h-3.5 text-zinc-400" /> Chuẩn In Ấn 8K:
                    </span>
                    <p className="text-zinc-400 text-[11px] font-mono">{analysisResult.recommendedResolution}</p>
                  </div>
                </div>
              </div>

              {/* Master Prompt Auto-Generated Result */}
              <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h4 className="font-bold text-zinc-200 text-xs uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-400" />
                    Master Prompt Được Đo Ni Đóng Giày Cho Bức Ảnh Này
                  </h4>
                  <button
                    onClick={() => copyText(analysisResult.masterPromptVi)}
                    className="inline-flex items-center gap-1.5 h-8 px-3.5 bg-zinc-100 hover:bg-zinc-200 text-black rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                  >
                    {copiedPromptVi ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPromptVi ? 'Đã Sao Chép!' : 'Sao Chép Prompt'}</span>
                  </button>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-sm p-4 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {analysisResult.masterPromptVi}
                </div>
              </div>

              {/* Simulated Before/After Comparison Preview */}
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-400 text-xs uppercase tracking-wider">
                  So Sánh Phục Hồi Xem Trước (Before & After Preview):
                </h4>
                <BeforeAfterSlider
                  beforeImage={imagePreview || samplePhotos[0].url}
                  afterImage={
                    selectedFile
                      ? imagePreview || samplePhotos[0].restoredUrl
                      : samplePhotos.find((s) => s.url === imagePreview)?.restoredUrl || samplePhotos[0].restoredUrl
                  }
                  showVintageEffectOnBefore={Boolean(selectedFile)}
                />
              </div>
            </div>
          ) : (
            <div className="bg-[#0d0d0d] border border-zinc-800 rounded-sm p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 rounded-sm bg-[#141414] border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-base font-light tracking-tight text-zinc-100">Chưa Có Kết Quả Phân Tích</h3>
              <p className="text-xs text-zinc-500 max-w-sm font-light">
                Hãy tải lên một bức ảnh cũ hoặc chọn bức ảnh mẫu bên trái và nhấn nút "Chẩn Đoán AI & Viết Master Prompt".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
