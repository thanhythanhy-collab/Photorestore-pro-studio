import React, { useState, useMemo } from 'react';
import {
  VIETNAM_HERITAGE_ITEMS,
  HERITAGE_CATEGORIES,
  HERITAGE_PERIODS,
  HeritageItem
} from '../data/vietnamHeritageData';
import {
  Sparkles,
  Copy,
  Check,
  Search,
  BookOpen,
  History,
  MapPin,
  Palette,
  ShieldCheck,
  ChevronRight,
  Filter,
  Sliders,
  Layers,
  Info,
  Wand2,
  BookmarkPlus
} from 'lucide-react';

interface VietnamHeritageLibraryProps {
  onApplyPrompt?: (promptVi: string, promptEn: string, keywords: string[]) => void;
  onNavigateToBuilder?: () => void;
}

export const VietnamHeritageLibrary: React.FC<VietnamHeritageLibraryProps> = ({
  onApplyPrompt,
  onNavigateToBuilder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<HeritageItem | null>(VIETNAM_HERITAGE_ITEMS[0]);

  // Copy tracking states
  const [copiedIdVi, setCopiedIdVi] = useState<string | null>(null);
  const [copiedIdEn, setCopiedIdEn] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  // Quick Composer State (Bộ Trộn Di Sản Nhanh)
  const [composerAttire, setComposerAttire] = useState<string>('aodai_hanoi_silk');
  const [composerSetting, setComposerSetting] = useState<string>('setting_phoco_hanoi');
  const [composerTone, setComposerTone] = useState<string>('tone_kodak_tri_x_blackwhite');
  const [composerProp, setComposerProp] = useState<string>('prop_non_la_bai_tho_quat_nan');
  const [copiedComposer, setCopiedComposer] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return VIETNAM_HERITAGE_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchPeriod = selectedPeriod === 'all' || item.era === selectedPeriod || item.era === 'all';
      const matchRegion = selectedRegion === 'all' || item.region === selectedRegion || item.region === 'Nationwide';
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.culturalNotes.toLowerCase().includes(query) ||
        item.keywords.some((k) => k.toLowerCase().includes(query));

      return matchCategory && matchPeriod && matchRegion && matchQuery;
    });
  }, [selectedCategory, selectedPeriod, selectedRegion, searchQuery]);

  const copyToClipboard = (text: string, type: 'vi' | 'en', id: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'vi') {
      setCopiedIdVi(id);
      setTimeout(() => setCopiedIdVi(null), 2000);
    } else {
      setCopiedIdEn(id);
      setTimeout(() => setCopiedIdEn(null), 2000);
    }
  };

  const handleApply = (item: HeritageItem) => {
    if (onApplyPrompt) {
      onApplyPrompt(item.promptVi, item.promptEn, item.keywords);
      setAppliedNotice(`Đã chèn mẫu "${item.name}" vào Bộ Tạo Prompt!`);
      setTimeout(() => setAppliedNotice(null), 3000);
    }
    if (onNavigateToBuilder) {
      setTimeout(() => onNavigateToBuilder(), 600);
    }
  };

  // Build composite prompt
  const combinedComposerData = useMemo(() => {
    const attire = VIETNAM_HERITAGE_ITEMS.find((i) => i.id === composerAttire);
    const setting = VIETNAM_HERITAGE_ITEMS.find((i) => i.id === composerSetting);
    const tone = VIETNAM_HERITAGE_ITEMS.find((i) => i.id === composerTone);
    const prop = VIETNAM_HERITAGE_ITEMS.find((i) => i.id === composerProp);

    const promptVi = `[Phục Hồi Lịch Sử Việt Nam Chuẩn Xác]: ${attire?.promptVi || ''} ${prop ? `Đạo cụ đi kèm: ${prop.promptVi}` : ''} ${setting ? `Hậu cảnh: ${setting.promptVi}` : ''} ${tone ? `Xử lý màu sắc & quang học: ${tone.promptVi}` : ''} Đảm bảo giữ nguyên 100% nét mặt người thật, xuất file siêu nét chuẩn in ấn 8K, tuyệt đối không chèn watermark hay chữ ký.`;

    const promptEn = `[Authentic Historical Vietnamese Restoration]: ${attire?.promptEn || ''} ${prop ? `Accompanied by accessories: ${prop.promptEn}` : ''} ${setting ? `Background environment: ${setting.promptEn}` : ''} ${tone ? `Color grading & film texture: ${tone.promptEn}` : ''} Preserve 100% original facial features, 8K ultra-fine resolution, 300+ DPI print quality, clean edge-to-edge render with zero watermarks or signatures.`;

    const keywords = [
      ...(attire?.keywords || []),
      ...(setting?.keywords || []),
      ...(tone?.keywords || []),
      ...(prop?.keywords || []),
      'authentic Vietnamese heritage',
      'no westernized distortion',
      '8K print quality'
    ];

    return { promptVi, promptEn, keywords };
  }, [composerAttire, composerSetting, composerTone, composerProp]);

  const copyComposerPrompt = (type: 'vi' | 'en') => {
    const text = type === 'vi' ? combinedComposerData.promptVi : combinedComposerData.promptEn;
    navigator.clipboard.writeText(text);
    setCopiedComposer(true);
    setTimeout(() => setCopiedComposer(false), 2000);
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

      {/* Hero Header of Heritage Library */}
      <div className="relative rounded-sm overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#06152d] via-[#040d1c] to-[#02060e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest rounded-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kho Tri Thức Văn Hóa & Nhân Học Lịch Sử Việt Nam</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-amber-50 uppercase font-serif-luxury">
            Thư Viện Trang Phục & Bối Cảnh Lịch Sử{' '}
            <span className="gold-gradient-text">
              (1950 – 1990)
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light mt-3 leading-relaxed">
            Bộ câu lệnh và hướng dẫn chuyên sâu phục dựng ảnh cũ Việt Nam chuẩn nhân học: Áo dài lụa Hà Đông, áo tân thời Sài Gòn, quân phục Bộ Đội Cụ Hồ, xe Vespa cổ, phố cổ Hà Nội, làng quê Bắc Bộ và các tone màu phim Kodak/Agfacolor kinh điển. <strong className="text-amber-300 font-medium">Bảo đảm 100% không bị lai tạp phong cách phương Tây</strong>.
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-500/20 text-xs">
            <div className="flex items-center gap-2 text-zinc-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Chuẩn xác lịch sử 100%</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <Palette className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Bảng màu di sản tự nhiên</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Prompt Song Ngữ Anh / Việt</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <Wand2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>1 Click chèn vào Master Builder</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK HERITAGE COMPOSER (Bộ Trộn Di Sản Nhanh) */}
      <div className="bg-[#050f21] border border-amber-500/30 rounded-sm p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Bộ Trộn Di Sản Lịch Sử Nhanh (Vietnamese Heritage Prompt Composer)</span>
        </div>
        <p className="text-xs text-zinc-400 mb-6 font-light">
          Kết hợp nhanh 4 yếu tố di sản để tạo ra một câu lệnh hoàn chỉnh cho ảnh chân dung gia đình, ảnh cưới xưa hoặc ảnh tư liệu lịch sử:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 1. Attire */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-900 text-blue-200 text-[10px] flex items-center justify-center font-mono">1</span>
              <span>Trang Phục Lịch Sử</span>
            </label>
            <select
              value={composerAttire}
              onChange={(e) => setComposerAttire(e.target.value)}
              className="w-full bg-[#081730] border border-zinc-700 text-xs text-zinc-200 rounded p-2.5 focus:border-amber-400 focus:outline-none"
            >
              <optgroup label="Trang Phục Nữ Truyền Thống">
                <option value="aodai_hanoi_silk">Áo Dài Lụa Hà Đông (1950-1960)</option>
                <option value="aodai_saigon_raglan">Áo Dài Raglan Sài Gòn (1960-1975)</option>
                <option value="aobaba_nam_bo_khanran">Áo Bà Ba Nam Bộ & Khăn Rằn</option>
                <option value="aotu_than_kinhbac">Áo Tứ Thân & Nón Quai Thao Bắc Bộ</option>
                <option value="aodai_nu_sinh_dongkhanh_hue">Áo Dài Trắng Nữ Sinh Đồng Khánh Huế</option>
                <option value="aodai_nhung_gam_trungnien">Áo Dài Nhung Gấm Quý Bà Trọng Vọng</option>
                <option value="trangphuc_nu_thanhnien_xungphong">Nữ Thanh Niên Xung Phong / Nữ Biệt Động</option>
              </optgroup>
              <optgroup label="Đám Cưới Xưa & Lễ Gia Tộc">
                <option value="damcuoi_hanoi_baocap">Đám Cưới Bao Cấp Hà Nội (Hoa Lay-ơn)</option>
                <option value="damcuoi_saigon_retrowestern">Đám Cưới Sài Gòn Retro Tân Thời</option>
                <option value="lecuoi_truyenthong_aotathan_khanvan">Lễ Gia Tiên Áo Gấm Khăn Vành Cung Đình</option>
                <option value="le_mungtho_chuctho_giatoc">Lễ Mừng Thọ Bát Tuần Đại Gia Đình</option>
                <option value="chup_hinh_tet_nguyendan_xua">Chụp Hình Tết Nguyên Đán & Chợ Hoa Xưa</option>
              </optgroup>
              <optgroup label="Trang Phục Dân Tộc Tây Bắc & Tây Nguyên">
                <option value="thocau_hmong_hoabinh_taybac">Thổ Cẩm H'Mông & Dao Đỏ Tây Bắc</option>
                <option value="thocam_thai_den_trang_muong">Áo Cóm, Khăn Piêu & Cúc Bướm Bạc Thái</option>
                <option value="thocam_taynguyen_edee_gairai">Thổ Cẩm Dân Tộc Ê-đê & Ba Na Tây Nguyên</option>
                <option value="trangphuc_champa_ninhthuan">Áo Dài Truyền Thống Chăm Ninh Thuận</option>
              </optgroup>
              <optgroup label="Trang Phục Nam & Quân Phục">
                <option value="quanphuc_bodoicuhu_khangchien">Quân Phục Bộ Đội Cụ Hồ Mũ Cối</option>
                <option value="auphuc_trithuc_vintage">Âu Phục Trí Thức & Công Chức Xưa</option>
                <option value="aodai_nam_nguthan">Áo Dài Ngũ Thân & Khăn Đóng Nam</option>
                <option value="trangphuc_baocap_congnhan">Trang Phục Thời Bao Cấp (1975-1985)</option>
                <option value="trangphuc_congnhan_nongtruong_lamnghiep">Thanh Niên Nông Trường & Thợ Mỏ</option>
              </optgroup>
            </select>
          </div>

          {/* 2. Props */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-900 text-amber-200 text-[10px] flex items-center justify-center font-mono">2</span>
              <span>Xe Cổ & Đạo Cụ</span>
            </label>
            <select
              value={composerProp}
              onChange={(e) => setComposerProp(e.target.value)}
              className="w-full bg-[#081730] border border-zinc-700 text-xs text-zinc-200 rounded p-2.5 focus:border-amber-400 focus:outline-none"
            >
              <option value="prop_non_la_bai_tho_quat_nan">Nón Lá Bài Thơ Xứ Huế & Quạt Nan Tre</option>
              <option value="prop_xe_dap_phuonghoang_supercub">Xe Đạp Phượng Hoàng & Honda Super Cub 81</option>
              <option value="prop_xe_vespa_lambretta_cophuong">Xe Tay Ga Vespa Sprint & Lambretta Cổ</option>
              <option value="prop_dai_radio_cassette_national">Đài Radio National & Phích Rạng Đông</option>
            </select>
          </div>

          {/* 3. Setting */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-cyan-900 text-cyan-200 text-[10px] flex items-center justify-center font-mono">3</span>
              <span>Bối Cảnh Lịch Sử</span>
            </label>
            <select
              value={composerSetting}
              onChange={(e) => setComposerSetting(e.target.value)}
              className="w-full bg-[#081730] border border-zinc-700 text-xs text-zinc-200 rounded p-2.5 focus:border-amber-400 focus:outline-none"
            >
              <option value="setting_phoco_hanoi">Phố Cổ Hà Nội Tường Vôi Vàng & Mái Ngói Rêu</option>
              <option value="setting_saigon_honngocvienthai">Sài Gòn Hòn Ngọc Viễn Đông & Chợ Bến Thành</option>
              <option value="setting_langque_dongbang_bacbo">Làng Quê Bắc Bộ (Cây Đa, Sân Đình & Giếng Làng)</option>
              <option value="setting_songnuoc_chonoimientay">Chợ Nổi Sông Nước Miền Tây & Dừa Nước</option>
              <option value="setting_codohue_songhuong_kinhthanh">Cố Đô Huế, Ngọ Môn & Sông Hương Trầm Mặc</option>
            </select>
          </div>

          {/* 4. Film Tone */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-900 text-emerald-200 text-[10px] flex items-center justify-center font-mono">4</span>
              <span>Tone Màu & Quang Học</span>
            </label>
            <select
              value={composerTone}
              onChange={(e) => setComposerTone(e.target.value)}
              className="w-full bg-[#081730] border border-zinc-700 text-xs text-zinc-200 rounded p-2.5 focus:border-amber-400 focus:outline-none"
            >
              <option value="tone_kodak_tri_x_blackwhite">Đen Trắng Silver Gelatin (Kodak Tri-X)</option>
              <option value="tone_agfacolor_kodachrome_warm">Phim Màu Kodachrome / Agfacolor Ấm Áp</option>
              <option value="tone_sepia_vintage_postcard">Tone Sepia Nâu Ấm Bưu Ảnh Cổ Điển</option>
            </select>
          </div>
        </div>

        {/* Composer Output Box */}
        <div className="bg-[#020814] border border-zinc-800 rounded p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-amber-300 font-bold uppercase">
              ★ Master Prompt Tổ Hợp Di Sản (Tiếng Việt & Tiếng Anh Tối Ưu)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyComposerPrompt('vi')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#081a38] hover:bg-[#0b234d] text-amber-200 border border-amber-500/40 text-xs rounded transition-all cursor-pointer"
              >
                {copiedComposer ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Sao Chép Prompt Tiếng Việt</span>
              </button>
              <button
                onClick={() => copyComposerPrompt('en')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded transition-all cursor-pointer"
              >
                {copiedComposer ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Sao Chép Prompt Tiếng Anh</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-[#061226] p-3 rounded border border-zinc-800/80">
            {combinedComposerData.promptVi}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {combinedComposerData.keywords.slice(0, 7).map((kw, kIdx) => (
              <span key={kIdx} className="px-2 py-0.5 bg-[#081b3a] text-sky-300 border border-sky-600/30 text-[10px] font-mono rounded">
                +{kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {HERITAGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-black shadow-md font-bold'
                  : 'bg-[#061226] text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${selectedCategory === cat.id ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar (Period, Region, Search) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#040c1a] border border-zinc-800 p-3 rounded-sm">
          {/* Period Filter */}
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-[#081833] border border-zinc-700 text-xs text-zinc-200 rounded p-2 focus:border-amber-400 focus:outline-none"
            >
              {HERITAGE_PERIODS.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#081833] border border-zinc-700 text-xs text-zinc-200 rounded p-2 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">Tất Cả Vùng Miền (3 Miền & Tây Bắc / Tây Nguyên)</option>
              <option value="North">Miền Bắc & Hà Nội</option>
              <option value="Central">Miền Trung & Cố Đô Huế</option>
              <option value="South">Miền Nam & Sài Gòn</option>
              <option value="Northwest">Tây Bắc & Đông Bắc (H'Mông, Dao, Thái)</option>
              <option value="Highlands">Tây Nguyên Đại Ngàn (Ê Đê, Ba Na)</option>
              <option value="Nationwide">Toàn Quốc</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm áo dài, quân phục, bối cảnh, tone phim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#081833] border border-zinc-700 pl-9 pr-3 py-2 text-xs text-zinc-200 rounded focus:border-amber-400 focus:outline-none placeholder-zinc-500"
            />
          </div>
        </div>
      </div>

      {/* Main Grid of Heritage Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#061226] border border-zinc-800 rounded-sm p-12 text-center text-zinc-400 space-y-3">
          <Info className="w-8 h-8 text-amber-400 mx-auto" />
          <p className="text-sm">Không tìm thấy di sản nào khớp với bộ lọc.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPeriod('all');
              setSelectedRegion('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-amber-400 text-black text-xs font-semibold rounded cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const isViCopied = copiedIdVi === item.id;
            const isEnCopied = copiedIdEn === item.id;

            return (
              <div
                key={item.id}
                className="bg-[#051024] border border-zinc-800 hover:border-amber-500/50 rounded-sm p-6 transition-all duration-200 flex flex-col justify-between space-y-5 shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Top Meta Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-600/40 text-[10px] font-mono font-semibold rounded">
                        {item.eraLabel}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-600/40 text-[10px] font-mono rounded">
                        {item.regionLabel}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      ID: #{item.id}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-amber-200/80 italic font-light mt-0.5">
                      "{item.tagline}"
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {item.description}
                  </p>

                  {/* Color Palette Swatches */}
                  <div className="bg-[#020713] p-3 rounded border border-zinc-800/80 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                      <Palette className="w-3 h-3 text-amber-400" />
                      <span>Bảng màu chuẩn văn hóa & chất liệu:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {item.colorPalette.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center gap-2 bg-[#081938] px-2 py-1 rounded text-[11px] text-zinc-300 font-mono"
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="truncate text-[10px]">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cultural & Restoration Advice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-[#08152e] p-2.5 rounded border border-zinc-800">
                      <strong className="text-amber-300 font-medium block mb-1">Ý nghĩa nhân học:</strong>
                      <span className="text-zinc-400 font-light leading-relaxed">{item.culturalNotes}</span>
                    </div>
                    <div className="bg-[#08152e] p-2.5 rounded border border-zinc-800">
                      <strong className="text-sky-300 font-medium block mb-1">Lưu ý khi phục hồi:</strong>
                      <span className="text-zinc-400 font-light leading-relaxed">{item.restorationAdvice}</span>
                    </div>
                  </div>

                  {/* Prompts Section */}
                  <div className="space-y-2.5 pt-2">
                    {/* Vietnamese Prompt */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-zinc-400 font-semibold">Prompt Tiếng Việt:</span>
                        <button
                          onClick={() => copyToClipboard(item.promptVi, 'vi', item.id)}
                          className="flex items-center gap-1 text-[10px] text-amber-300 hover:underline cursor-pointer"
                        >
                          {isViCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{isViCopied ? 'Đã sao chép!' : 'Sao chép'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-300 bg-[#030914] p-3 rounded border border-zinc-800 font-mono leading-relaxed">
                        {item.promptVi}
                      </p>
                    </div>

                    {/* English Prompt */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-zinc-400 font-semibold">Master Prompt Tiếng Anh (8K AI):</span>
                        <button
                          onClick={() => copyToClipboard(item.promptEn, 'en', item.id)}
                          className="flex items-center gap-1 text-[10px] text-amber-300 hover:underline cursor-pointer"
                        >
                          {isEnCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{isEnCopied ? 'Đã sao chép!' : 'Sao chép'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400 bg-[#030914] p-3 rounded border border-zinc-800 font-mono leading-relaxed">
                        {item.promptEn}
                      </p>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.keywords.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-2 py-0.5 bg-[#081833] text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 text-[10px] font-mono rounded"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => copyToClipboard(`${item.promptVi}\n\n${item.promptEn}`, 'en', item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#081a38] hover:bg-[#0b2450] text-zinc-200 text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sao chép cả 2 ngôn ngữ</span>
                  </button>

                  <button
                    onClick={() => handleApply(item)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold rounded cursor-pointer shadow-md transition-all"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Dùng Cho Bộ Tạo Prompt</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
