import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Sparkles, Download, Check, ShieldCheck, ChevronDown, Image as ImageIcon } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  titleBefore?: string;
  titleAfter?: string;
  className?: string;
  showVintageEffectOnBefore?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  titleBefore = 'Ảnh Gốc Cũ (Chưa xử lý)',
  titleAfter = 'Đã Phục Hồi AI (8K Ultra Sharp)',
  className = '',
  showVintageEffectOnBefore = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [showFormatMenu, setShowFormatMenu] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg'>('png');
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close format dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowFormatMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clean, high-resolution, completely unwatermarked downloader
  const downloadCleanImage = async (imageSrc: string, format: 'png' | 'jpg' = exportFormat, suffix: string = 'phuc-hoi-khong-watermark') => {
    setIsDownloading(true);
    setShowFormatMenu(false);
    try {
      // Create offscreen image to capture original dimensions
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => {
          // If crossOrigin fails, fallback to direct fetch/blob
          resolve();
        };
        img.src = imageSrc;
      });

      // Try canvas export for 100% clean pristine pixels without any DOM overlay/watermark
      if (img.width > 0 && img.height > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const mime = format === 'png' ? 'image/png' : 'image/jpeg';
          const quality = format === 'jpg' ? 1.0 : undefined;
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `anh-${suffix}-${Date.now()}.${format}`;
              document.body.appendChild(link);
              link.click();
              URL.revokeObjectURL(url);
              document.body.removeChild(link);
              setDownloadSuccess(true);
              setTimeout(() => setDownloadSuccess(false), 2500);
              setIsDownloading(false);
              return;
            }
          }, mime, quality);
          return;
        }
      }

      // Fallback direct fetch & blob download
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `anh-${suffix}-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch {
      // Last resort fallback
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = `anh-${suffix}.${format}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className={`relative rounded-sm overflow-hidden border border-zinc-800 select-none bg-[#0d0d0d] ${className}`}>
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches.length > 0) handleMove(e.touches[0].clientX);
        }}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden cursor-col-resize group"
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterImage}
            alt="Restored Result"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-100 text-xs font-medium px-3 py-1.5 rounded-sm flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
            <span>{titleAfter}</span>
          </div>
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Original Vintage"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${
              showVintageEffectOnBefore ? 'filter sepia-[0.35] contrast-125 brightness-90 grayscale-[0.2]' : ''
            }`}
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              maxWidth: 'none',
            }}
          />
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-sm shadow-md">
            <span>{titleBefore}</span>
          </div>
        </div>

        {/* Vertical Separator Line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-zinc-100 shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-black border border-zinc-300 text-zinc-100 shadow-xl flex items-center justify-center cursor-col-resize group-hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Helper caption & Clean No-Watermark Download Footer */}
      <div className="bg-[#0a0a0a] border-t border-zinc-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Không Watermark • Không Logo</span>
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="font-mono text-zinc-400 text-[11px] hidden sm:inline">
            Vị trí: {Math.round(sliderPosition)}% Gốc
          </span>
        </div>

        <div className="flex items-center gap-2 relative" ref={menuRef}>
          {/* Main Download Button */}
          <button
            onClick={() => downloadCleanImage(afterImage, exportFormat, 'phuc-hoi-khong-watermark')}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 h-8 px-3.5 bg-zinc-100 hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-[11px] rounded-sm transition-all cursor-pointer disabled:opacity-50"
            title="Tải ảnh phục hồi chất lượng cao không dính bất kỳ watermark nào"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Đã Tải Xuống!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-black" />
                <span>{isDownloading ? 'Đang Xử Lý...' : `Tải Ảnh Sạch (${exportFormat.toUpperCase()})`}</span>
              </>
            )}
          </button>

          {/* Options Dropdown Trigger */}
          <button
            onClick={() => setShowFormatMenu(!showFormatMenu)}
            disabled={isDownloading}
            className="h-8 px-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-mono rounded-sm transition-all cursor-pointer flex items-center gap-1"
            title="Chọn định dạng xuất ảnh"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Format & Options Menu */}
          {showFormatMenu && (
            <div className="absolute right-0 bottom-full mb-1.5 w-60 bg-[#121212] border border-zinc-700 rounded-sm shadow-2xl p-1.5 z-30 space-y-1 text-left">
              <div className="px-2.5 py-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                Định dạng không watermark
              </div>
              
              <button
                onClick={() => {
                  setExportFormat('png');
                  downloadCleanImage(afterImage, 'png', 'phuc-hoi-lossless-khong-watermark');
                }}
                className={`w-full px-2.5 py-2 text-left text-xs rounded-sm transition-colors flex items-center justify-between cursor-pointer ${
                  exportFormat === 'png' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-zinc-200">PNG Lossless</div>
                  <div className="text-[10px] text-zinc-500 font-light">Không nén, chi tiết 8K nguyên bản</div>
                </div>
                {exportFormat === 'png' && <Check className="w-3.5 h-3.5 text-zinc-300" />}
              </button>

              <button
                onClick={() => {
                  setExportFormat('jpg');
                  downloadCleanImage(afterImage, 'jpg', 'phuc-hoi-hq-khong-watermark');
                }}
                className={`w-full px-2.5 py-2 text-left text-xs rounded-sm transition-colors flex items-center justify-between cursor-pointer ${
                  exportFormat === 'jpg' ? 'bg-zinc-800 text-zinc-100 font-medium' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-zinc-200">JPG Chất Lượng 100%</div>
                  <div className="text-[10px] text-zinc-500 font-light">Dung lượng tối ưu, chuẩn máy in</div>
                </div>
                {exportFormat === 'jpg' && <Check className="w-3.5 h-3.5 text-zinc-300" />}
              </button>

              <div className="border-t border-zinc-800 pt-1">
                <button
                  onClick={() => downloadCleanImage(beforeImage, 'png', 'anh-goc-vintage')}
                  className="w-full px-2.5 py-1.5 text-left text-[11px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ImageIcon className="w-3 h-3 text-zinc-500" />
                  <span>Tải ảnh gốc ban đầu (Before)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

