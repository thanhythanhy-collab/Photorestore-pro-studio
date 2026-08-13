import { PromptTemplate, KeywordItem, DamageOption } from '../types';

export const MASTER_SYSTEM_PROMPT_EXPLANATION = {
  title: 'Cấu Trúc Master System Prompt 4 Thành Phần',
  description: 'Khi gửi ảnh cũ lên Gemini hoặc các công cụ AI tạo/sửa ảnh, cấu trúc 4 thành phần giúp AI hiểu rõ mục tiêu và giữ 100% thần thái gốc:',
  components: [
    {
      step: '1. Hành Động Chính',
      en: '[Main Action]',
      detail: 'Mô tả tác vụ cụ thể: Phục hồi, tô màu, nâng cấp, chỉnh sửa ảnh thẻ, làm nét phong cảnh...',
      example: 'Phục hồi và nâng cấp bức ảnh chân dung cũ này bằng công nghệ AI tiên tiến:'
    },
    {
      step: '2. Yêu Cầu Bảo Tồn Chi Tiết Gốc',
      en: '[Preservation Requirements]',
      detail: 'Cam kết giữ nguyên nét mặt, ánh mắt, nụ cười, thần thái, kiến trúc hay bố cục gốc mà không làm biến dạng.',
      example: 'Giữ nguyên: 100% đường nét khuôn mặt, ánh mắt, nụ cười và thần thái gốc của nhân vật. Không làm biến dạng hay mờ các đặc điểm nhận dạng.'
    },
    {
      step: '3. Xử Lý Kỹ Thuật AI',
      en: '[AI Technical Processing]',
      detail: 'Xử lý nhiễu hạt (noise), vết xước, ố vàng, mốc kính, nếp gấp rách, tái tạo tông màu da (skin tone) chân thực.',
      example: 'Xử lý kỹ thuật: Làm sắc nét chi tiết (mắt, tóc, trang phục), loại bỏ hoàn toàn vệt xước, ố vàng, nếp gấp, mốc kính và nhiễu hạt (noise reduction).'
    },
    {
      step: '4. Định Dạng & Chuẩn In Ấn',
      en: '[Output Format & Print Standard]',
      detail: 'Quy định độ phân giải (8K), kết cấu da tự nhiên (skin texture), không bóng láng dạng nhựa, sẵn sàng cho in ấn.',
      example: 'Chất lượng: Độ phân giải cực cao 8K, độ nét siêu cao (ultra-sharp detail), rõ từng sợi tóc và kết cấu da (skin texture), sẵn sàng cho in ấn chất lượng cao.'
    }
  ]
};

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'portrait-id',
    title: 'Phục Hồi Ảnh Chân Dung & Chỉnh Sửa Ảnh Thẻ',
    category: 'portrait',
    subtitle: 'Mẫu 1: Dành cho ảnh cá nhân, chân dung cũ, ảnh thờ, ảnh thẻ',
    description: 'Tối ưu cho việc giữ trọn vẹn đường nét khuôn mặt, thần thái người thân, làn da tự nhiên và ánh sáng studio cân đối.',
    components: {
      action: 'Phục hồi và nâng cấp bức ảnh chân dung cũ này bằng công nghệ AI tiên tiến:',
      preservation: 'Giữ nguyên: 100% đường nét khuôn mặt, ánh mắt, nụ cười và thần thái gốc của nhân vật. Không làm biến dạng hay mờ các đặc điểm nhận dạng.',
      technical: 'Màu sắc: Tái tạo màu sắc tự nhiên, chân thực, tông màu da (skin tone) hồng hào, sống động, tránh màu nhân tạo quá đà.\nXử lý kỹ thuật: Làm sắc nét chi tiết (mắt, tóc, trang phục), loại bỏ hoàn toàn vệt xước, ố vàng, nếp gấp, mốc kính và nhiễu hạt (noise reduction).',
      idPhotoOpt: 'Tùy chỉnh ảnh thẻ (nếu cần): Tối ưu hóa ánh sáng studio, làm gọn tóc rối, căn chỉnh lại góc mặt cân đối, ánh mắt nhìn thẳng nhẹ nhàng.',
      format: 'Chất lượng: Độ phân giải cực cao 8K, độ nét siêu cao (ultra-sharp detail), rõ từng sợi tóc và kết cấu da (skin texture), sẵn sàng cho in ấn chất lượng cao.'
    },
    promptVi: `Phục hồi và nâng cấp bức ảnh chân dung cũ này bằng công nghệ AI tiên tiến:
Giữ nguyên: 100% đường nét khuôn mặt, ánh mắt, nụ cười và thần thái gốc của nhân vật. Không làm biến dạng hay mờ các đặc điểm nhận dạng.
Màu sắc: Tái tạo màu sắc tự nhiên, chân thực, tông màu da (skin tone) hồng hào, sống động, tránh màu nhân tạo quá đà.
Xử lý kỹ thuật: Làm sắc nét chi tiết (mắt, tóc, trang phục), loại bỏ hoàn toàn vệt xước, ố vàng, nếp gấp, mốc kính và nhiễu hạt (noise reduction).
Tùy chỉnh ảnh thẻ (nếu cần): Tối ưu hóa ánh sáng studio, làm gọn tóc rối, căn chỉnh lại góc mặt cân đối, ánh mắt nhìn thẳng nhẹ nhàng.
Chất lượng & Định dạng: Độ phân giải cực cao 8K, độ nét siêu cao (ultra-sharp detail), rõ từng sợi tóc và kết cấu da (skin texture), sẵn sàng cho in ấn chất lượng cao. Không chèn watermark, không logo, không chữ ký, ảnh sạch nguyên bản 100%.`,
    promptEn: `Restore and enhance this vintage portrait photo using advanced AI technology:
Preserve: Maintain 100% of the original facial features, eye expression, smile, and natural emotion of the subject. Avoid any facial distortion or blurring of identifiable traits.
Colorization: Reconstruct realistic natural color tones with vivid, healthy skin tones, avoiding harsh synthetic colors.
Technical Enhancement: Sharpen fine details (eyes, hair, clothing texture), completely remove surface scratches, yellow stains, creases, mold marks, and perform noise reduction.
ID Photo Tuning (if applicable): Optimize balanced studio lighting, tidy messy hair, align facial proportions evenly, with a clear direct gaze.
Output Quality: 8K ultra-high resolution, ultra-sharp details, preserving authentic skin texture (no plastic smooth look), ready for commercial high-quality printing. Clean borderless output, no watermark, no logo, no signature, no text stamp.`,
    englishKeywords: [
      'Preserve 100% original facial features',
      'High fidelity, no face distortion',
      'Natural skin texture',
      'Realistic skin tones',
      'Denoise & deblur',
      'Scratch and stain removal',
      '8K resolution',
      'Ultra-sharp detail',
      'No watermark, no logo, clean output'
    ],
    sampleBefore: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    sampleAfter: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tips: [
      'Luôn kiểm tra ánh mắt của nhân vật sau khi Gemini tạo xong.',
      'Nếu ảnh bị mất một góc khuôn mặt, hãy ghi chú rõ side-profile hoặc front-facing.',
      'Yêu cầu giữ lại kết cấu da (skin texture) để tránh bị bóng láng dạng nhựa.'
    ]
  },
  {
    id: 'group-photos',
    title: 'Phục Hồi Ảnh Tập Thể / Nhiều Người',
    category: 'group',
    subtitle: 'Mẫu 2: Dành cho ảnh gia đình, lớp học, hội nghị, ảnh dòng họ',
    description: 'Chuyên biệt làm nét đồng đều khuôn mặt của tất cả các cá nhân kể cả hàng sau bị nhòe, không làm lẫn lộn nét mặt.',
    components: {
      action: 'Phục hồi toàn diện bức ảnh tập thể cũ này:',
      preservation: 'Bảo tồn: Giữ nguyên 100% khuôn mặt và biểu cảm của từng người trong hình, không làm biến dạng hay nhầm lẫn các nét mặt giữa các cá nhân.',
      technical: 'Làm rõ nét: Nhận diện và làm nét đồng đều khuôn mặt của tất cả mọi người (kể cả những người ở hàng sau hoặc vị trí bị mờ nặng).\nXử lý bề mặt: Khử sạch nhiễu hạt, vá các rách nát, vết nứt, đốm mốc và vết ố theo thời gian.\nMàu sắc & Ánh sáng: Cân bằng ánh sáng tổng thể, phục hồi màu sắc trang phục và khung cảnh xung quanh tự nhiên, hài hòa.',
      format: 'Đầu ra: Xuất ảnh sắc nét, độ phân giải cao 8K, phân tách rõ ràng từng chi tiết nhỏ để in ấn khổ lớn không bị vỡ hình.'
    },
    promptVi: `Phục hồi toàn diện bức ảnh tập thể cũ này:
Bảo tồn: Giữ nguyên 100% khuôn mặt và biểu cảm của từng người trong hình, không làm biến dạng hay nhầm lẫn các nét mặt giữa các cá nhân.
Làm rõ nét: Nhận diện và làm nét đồng đều khuôn mặt của tất cả mọi người (kể cả những người ở hàng sau hoặc vị trí bị mờ nặng).
Xử lý bề mặt: Khử sạch nhiễu hạt, vá các rách nát, vết nứt, đốm mốc và vết ố theo thời gian.
Màu sắc & Ánh sáng: Cân bằng ánh sáng tổng thể, phục hồi màu sắc trang phục và khung cảnh xung quanh tự nhiên, hài hòa.
Đầu ra: Xuất ảnh sắc nét, độ phân giải cao 8K, phân tách rõ ràng từng chi tiết nhỏ để in ấn khổ lớn không bị vỡ hình.`,
    promptEn: `Comprehensively restore this vintage group photograph:
Preservation: Preserve 100% of every individual's facial structure and expression. Do not distort faces or swap facial features between subjects.
Uniform Sharpening: Detect and sharpen all faces evenly across the entire group, including people in back rows or heavily blurred areas.
Surface Damage Restoration: Clean up digital noise, patch torn gaps, crack lines, mold spots, and aged discoloration.
Lighting & Color: Balance overall ambient lighting, reconstruct natural harmonious clothing colors and background setting.
Output: High resolution 8K output, distinct clarity for every small detail, print-ready for large format printing without pixelation.`,
    englishKeywords: [
      'Multi-face preservation',
      'Uniform face sharpening',
      'No facial swapping',
      'Patch torn gaps and crack lines',
      'Balanced ambient lighting',
      '8K print-ready quality'
    ],
    sampleBefore: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    sampleAfter: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    tips: [
      'Ghi rõ số lượng người hoặc chỉ định vùng bị che mờ nhiều nhất.',
      'Sử dụng 8K resolution để từng chi tiết nhỏ ở hàng sau không bị vỡ khi in ấn khổ lớn.'
    ]
  },
  {
    id: 'landscape-architecture',
    title: 'Phục Hồi Ảnh Phong Cảnh & Kiến Trúc Cổ',
    category: 'landscape',
    subtitle: 'Mẫu 3: Dành cho di tích, danh lam thắng cảnh, phố cổ, ảnh tư liệu',
    description: 'Tập trung tái tạo độ tương phản kiến trúc, chiều sâu bầu trời, chất liệu gỗ đá cổ và loại bỏ hiện tượng mờ mốc.',
    components: {
      action: 'Phục hồi và làm sống lại bức ảnh phong cảnh/kiến trúc cổ này:',
      preservation: 'Chi tiết gốc: Giữ lại trọn vẹn bố cục, các đường nét kiến trúc, cây cối và hậu cảnh nguyên bản.',
      technical: 'Khử nhiễu & Làm sạch: Loại bỏ hoàn toàn hiện tượng mờ mờ, mốc ảnh, vết xước và nhiễu hạt (grain).\nMàu sắc: Phục hồi màu bầu trời, cây xanh, mặt nước và vật liệu kiến trúc với gam màu tự nhiên, giàu sức sống và có chiều sâu.\nTăng cường: Tăng độ tương phản nhẹ, độ nét kiến trúc cao (crisp architectural details), phân tách rõ các mảng sáng tối.',
      format: 'Chất lượng: Siêu nét (ultra-detailed), độ phân giải cao 8K, chuẩn màu cho in ấn tạp chí/tranh treo tường.'
    },
    promptVi: `Phục hồi và làm sống lại bức ảnh phong cảnh/kiến trúc cổ này:
Chi tiết gốc: Giữ lại trọn vẹn bố cục, các đường nét kiến trúc, cây cối và hậu cảnh nguyên bản.
Khử nhiễu & Làm sạch: Loại bỏ hoàn toàn hiện tượng mờ mờ, mốc ảnh, vết xước và nhiễu hạt (grain).
Màu sắc: Phục hồi màu bầu trời, cây xanh, mặt nước và vật liệu kiến trúc với gam màu tự nhiên, giàu sức sống và có chiều sâu.
Tăng cường: Tăng độ tương phản nhẹ, độ nét kiến trúc cao (crisp architectural details), phân tách rõ các mảng sáng tối.
Chất lượng: Siêu nét (ultra-detailed), độ phân giải cao 8K, chuẩn màu cho in ấn tạp chí/tranh treo tường.`,
    promptEn: `Restore and revitalize this vintage landscape/architectural photograph:
Original Structure: Preserve 100% of the original compositional structure, architectural line art, foliage, and background elements.
Denoise & Clean: Eliminate atmospheric blur, haze, mold growth, surface scratches, and film grain.
Vibrant Natural Color: Restore natural hues for sky blue, lush greenery, water reflection, and authentic building material textures.
Architectural Polish: Slightly increase contrast with crisp architectural details, separating highlights and shadows clearly.
Quality: Ultra-detailed 8K resolution, color-calibrated for high-end magazine or wall art printing.`,
    englishKeywords: [
      'Crisp architectural details',
      'Preserve original composition',
      'Natural sky & foliage colorization',
      'Film grain removal',
      'Fine material texture restoration',
      'Commercial print standard'
    ],
    sampleBefore: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    sampleAfter: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tips: [
      'Ghi chú loại vật liệu như "mái ngói rêu phong", "tường gạch cổ", "gỗ trạm khắc" để AI giữ chi tiết bề mặt.',
      'Ánh sáng tự nhiên (golden hour hoặc daylight) sẽ tôn lên chiều sâu cảnh vật.'
    ]
  },
  {
    id: 'historical-document',
    title: 'Phục Hồi Giấy Tờ Cũ, Bằng Khen & Tư Liệu',
    category: 'document',
    subtitle: 'Mẫu 4: Dành cho sắc phong, bằng khen, chứng nhận, giấy tờ lịch sử',
    description: 'Khử ố vàng giấy, làm rõ từng vệt mực, con dấu đỏ và hoa văn chìm mà không làm bay chữ.',
    components: {
      action: 'Phục hồi và số hóa tư liệu/giấy tờ lịch sử cũ này:',
      preservation: 'Bảo tồn văn bản: Giữ nguyên 100% font chữ, nét chữ ký, con dấu, hoa văn viền và nội dung gốc.',
      technical: 'Xử lý giấy & Mực: Loại bỏ các vết mốc ố vàng, thâm ố, nếp gập gãy. Làm nổi bật nét chữ mực đen và sắc đỏ của dấu triện/con dấu.\nCân bằng phông nền: Làm sạch phông nền giấy cũ thành sắc kem lịch sự hoặc giữ độ cũ tự nhiên nhưng sáng rõ.',
      format: 'Đầu ra: Độ phân giải 8K cực rõ nét, tương phản văn bản cao (high document contrast), lý tưởng cho lưu trữ & in ấn khổ A4/A3.'
    },
    promptVi: `Phục hồi và số hóa tư liệu/giấy tờ lịch sử cũ này:
Bảo tồn văn bản: Giữ nguyên 100% font chữ, nét chữ ký, con dấu, hoa văn viền và nội dung gốc.
Xử lý giấy & Mực: Loại bỏ các vết mốc ố vàng, thâm ố, nếp gập gãy. Làm nổi bật nét chữ mực đen và sắc đỏ của dấu triện/con dấu.
Cân bằng phông nền: Làm sạch phông nền giấy cũ thành sắc kem lịch sự hoặc giữ độ cũ tự nhiên nhưng sáng rõ.
Đầu ra: Độ phân giải 8K cực rõ nét, tương phản văn bản cao (high document contrast), lý tưởng cho lưu trữ & in ấn khổ A4/A3.`,
    promptEn: `Restore and digitize this historical document / certificate:
Text Preservation: Keep 100% of original calligraphic scripts, signature strokes, stamp seals, border patterns, and text content intact.
Paper & Ink Cleanups: Remove severe yellow staining, mold spots, fold line creases. Enhance black ink legibility and vibrant red stamp ink fidelity.
Background Balancing: Clean aged paper background to refined ivory tone with high clarity.
Output: Ultra-sharp 8K document resolution, optimized text contrast, ideal for digital archive and fine print reproduction.`,
    englishKeywords: [
      'High document contrast',
      'Text legibility preservation',
      'Red seal stamp enhancement',
      'Remove yellow paper staining',
      'Archive quality restoration'
    ],
    sampleBefore: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    sampleAfter: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    tips: [
      'Nên scan hoặc chụp thẳng góc vuông 90 độ để giữ chữ không bị bẹt méo.',
      'Nhấn mạnh "High contrast text" để nét chữ ký mờ không bị biến mất.'
    ]
  }
];

export const TECHNICAL_KEYWORDS: KeywordItem[] = [
  { en: 'Preserve 100% original facial features', vi: 'Giữ 100% nét mặt gốc', description: 'Giữ nguyên nét mặt không bị biến dạng hay giả tạo', category: 'Facial Fidelity' },
  { en: 'High fidelity', vi: 'Độ trung thực cao', description: 'Bảo lưu từng góc cạnh thần thái của nhân vật', category: 'Facial Fidelity' },
  { en: 'No face distortion', vi: 'Không biến dạng khuôn mặt', description: 'Tránh hiện tượng AI ghép nhầm mặt người khác', category: 'Facial Fidelity' },
  { en: 'Natural skin texture', vi: 'Kết cấu da tự nhiên', description: 'Giữ lỗ chân lông & nếp nhăn tự nhiên, tránh da bẹt nhựa', category: 'Skin & Texture' },
  { en: 'No plastic look', vi: 'Không bóng mượt kiểu nhựa', description: 'Ngăn chặn hiện tượng cà mịn quá đà', category: 'Skin & Texture' },
  { en: 'Realistic skin tones', vi: 'Tông màu da thực tế', description: 'Màu da hồng hào, tự nhiên như chụp thực tế', category: 'Skin & Texture' },
  { en: 'Denoise', vi: 'Khử nhiễu hạt', description: 'Loại bỏ nốt nhiễu muỗi (noise) của phim cũ', category: 'Damage Restoration' },
  { en: 'Deblur', vi: 'Làm mờ/nhòe sắc nét lại', description: 'Khôi phục độ sắc nét cho vùng bị nhòe nét', category: 'Damage Restoration' },
  { en: 'Scratch removal', vi: 'Xóa vết xước', description: 'Loại bỏ đường xước phím, vệt nứt bề mặt ảnh', category: 'Damage Restoration' },
  { en: 'Stain removal', vi: 'Xóa vết ố mốc', description: 'Làm sạch ố vàng, đốm ố mốc kính theo thời gian', category: 'Damage Restoration' },
  { en: 'Damage restoration', vi: 'Phục hồi rách nát', description: 'Vá lại góc ảnh rách hoặc nếp gập gãy', category: 'Damage Restoration' },
  { en: '8K resolution', vi: 'Độ phân giải 8K', description: 'Xuất file kích thước siêu rộng cực kỳ rõ nét', category: 'Quality & Resolution' },
  { en: 'Ultra-sharp detail', vi: 'Chi tiết siêu nét', description: 'Tách biệt rõ từng sợi tóc, hàng mi, thêu áo', category: 'Quality & Resolution' },
  { en: 'Natural colorization', vi: 'Tô màu tự nhiên', description: 'Chuyển ảnh đen trắng sang màu chuẩn vintage', category: 'Color & Lighting' },
  { en: 'Vibrant authentic colors', vi: 'Màu sắc sống động chân thực', description: 'Màu hài hòa không rực quá đà', category: 'Color & Lighting' },
  { en: 'High DPI', vi: 'Độ mật độ điểm in cao (300+ DPI)', description: 'Giúp in khổ lớn không bị vỡ ảnh', category: 'Print Ready' },
  { en: 'Print-ready quality', vi: 'Chuẩn file sẵn sàng in', description: 'Tối ưu độ sắc nét cho máy in ảnh chuyên nghiệp', category: 'Print Ready' },
  { en: 'Commercial print standard', vi: 'Tiêu chuẩn in thương mại', description: 'Dành cho in tranh treo tường, bằng khen, ảnh thờ', category: 'Print Ready' },
  { en: 'No watermark, no logo, no signature', vi: '100% Không Watermark / Logo / Chữ ký', description: 'Đảm bảo ảnh sạch hoàn toàn, không dính dấu bản quyền hay logo AI', category: 'Quality & Resolution' },
  { en: 'Clean borderless photograph', vi: 'Ảnh sạch không viền thừa', description: 'Xuất ảnh tràn viền tự nhiên, không khung giả', category: 'Quality & Resolution' }
];

export const DAMAGE_OPTIONS: DamageOption[] = [
  {
    id: 'scratches',
    label: 'Vệt Xước & Nếp Vỡ gập',
    description: 'Ảnh bị các đường nứt, nếp nát ngang dọc',
    promptSnippetVi: 'Loại bỏ hoàn toàn các nếp vỡ, vệt xước phím và đường nứt trên bề mặt ảnh.',
    promptSnippetEn: 'Completely eliminate fold line creases, surface cracks, and key scratches.'
  },
  {
    id: 'yellowing',
    label: 'Ố Vàng & Đốm Mốc Kính',
    description: 'Bị đổi màu đốm vàng, mốc thâm theo năm tháng',
    promptSnippetVi: 'Tẩy sạch đốm mốc, ố vàng thâm niên và vết mờ mốc kính.',
    promptSnippetEn: 'Remove yellowing discoloration, aged mold spots, and glass moisture haze.'
  },
  {
    id: 'blur',
    label: 'Nhòe Mờ & Mất Nét Mắt/Tóc',
    description: 'Khuôn mặt mờ nét, khó nhìn rõ mắt tóc',
    promptSnippetVi: 'Tái tạo làm nét chi tiết mắt, lông mày, tóc và thêu trang phục sắc nét.',
    promptSnippetEn: 'Sharpen blurred eyes, eyebrows, hair strands, and embroidery details crisp.'
  },
  {
    id: 'faded',
    label: 'Ảnh Đen Trắng / Phai Màu',
    description: 'Cần tô màu lên ảnh hoặc khôi phục màu sắc phai',
    promptSnippetVi: 'Tô màu sắc tự nhiên cho ảnh đen trắng, giữ tông màu da hồng hào chân thực.',
    promptSnippetEn: 'Colorize vintage black & white photo with realistic vibrant skin tones.'
  },
  {
    id: 'noise',
    label: 'Nhiễu Hạt Hạt Muỗi (Film Grain)',
    description: 'Nhiễu hạt nặng do máy ảnh cổ hoặc scan lại',
    promptSnippetVi: 'Thực hiện khử nhiễu hạt (noise reduction) giúp bề mặt ảnh mịn màng nhưng giữ nguyên kết cấu da.',
    promptSnippetEn: 'Perform high-grade noise reduction while preserving natural skin texture.'
  }
];

export const PRINT_PRO_TIPS = [
  {
    title: '1. Chụp / Quét ảnh gốc rõ nét',
    desc: 'Tránh bóng phản chiếu của đèn khi dùng điện thoại chụp lại ảnh cũ. Nên chụp ở nơi ánh sáng ban ngày dịu, vuông góc 90 độ với bức ảnh.'
  },
  {
    title: '2. Nhất quyết yêu cầu giữ "Skin Texture"',
    desc: 'Luôn thêm cụm từ "giữ lại kết cấu da tự nhiên (skin texture), không làm láng mịn dạng nhựa (plastic look)" trong prompt để ảnh nhìn thật và có chiều sâu.'
  },
  {
    title: '3. Quy trình Upscale nâng DPI lên 300+',
    desc: 'Sau khi Gemini phục hồi màu và nét, nếu cần in khổ lớn (Ảnh thờ 20x30cm, Bằng khen A4, Tranh 60x90cm), dùng các công cụ Upscale AI chuyên dụng như Topaz Gigapixel AI hoặc Magnific AI để nâng DPI lên 300+.'
  },
  {
    title: '4. Kiểm tra ánh mắt & thần thái',
    desc: 'Bảo tồn thần thái là quan trọng nhất. Nếu AI vô tình sửa đổi đồng tử hoặc khuôn mặt quá nhiều, hãy bổ sung prompt "Preserve 100% original eyes and smile identity".'
  }
];
