export interface HeritageItem {
  id: string;
  name: string;
  category:
    | 'women_attire'
    | 'men_military'
    | 'ethnic_minorities'
    | 'weddings_rituals'
    | 'historical_settings'
    | 'vehicles_props'
    | 'vintage_tones';
  era: '1950-1960' | '1960-1975' | '1975-1985' | '1986-1990' | 'all';
  eraLabel: string;
  region: 'North' | 'Central' | 'South' | 'Highlands' | 'Northwest' | 'Nationwide';
  regionLabel: string;
  tagline: string;
  description: string;
  promptVi: string;
  promptEn: string;
  keywords: string[];
  colorPalette: { name: string; hex: string }[];
  culturalNotes: string;
  restorationAdvice: string;
}

export const HERITAGE_PERIODS = [
  { id: 'all', label: 'Tất Cả Thời Kỳ (1950 - 1990)' },
  { id: '1950-1960', label: '1950 – 1960 (Kháng Chiến & Hà Nội Tiếp Quản)' },
  { id: '1960-1975', label: '1960 – 1975 (Sài Gòn Tân Thời, Miền Bắc & Cố Đô)' },
  { id: '1975-1985', label: '1975 – 1985 (Thời Kỳ Bao Cấp & Thống Nhất Đất Nước)' },
  { id: '1986-1990', label: '1986 – 1990 (Đổi Mới, Đám Cưới Thập Niên 90 & Hội Nhập)' },
];

export const HERITAGE_CATEGORIES = [
  { id: 'all', label: 'Tất Cả Danh Mục Di Sản', count: 32 },
  { id: 'women_attire', label: 'Trang Phục Nữ Truyền Thống & Cách Tân', icon: 'Sparkles', count: 7 },
  { id: 'men_military', label: 'Trang Phục Nam, Quân Phục & Công Chức', icon: 'Shield', count: 5 },
  { id: 'weddings_rituals', label: 'Đám Cưới Xưa & Nghi Lễ Gia Tộc', icon: 'HeartHandshake', count: 5 },
  { id: 'ethnic_minorities', label: 'Trang Phục Dân Tộc & Tây Nguyên / Tây Bắc', icon: 'Sun', count: 4 },
  { id: 'historical_settings', label: 'Bối Cảnh Lịch Sử, Phố Cổ & Làng Quê 3 Miền', icon: 'MapPin', count: 5 },
  { id: 'vehicles_props', label: 'Xe Cổ, Đạo Cụ & Kỷ Vật Hoài Niệm', icon: 'Bike', count: 4 },
  { id: 'vintage_tones', label: 'Tone Màu Phim Analog & Buồng Tối Cổ Điển', icon: 'Film', count: 3 },
];

export const VIETNAM_HERITAGE_ITEMS: HeritageItem[] = [
  // ==========================================
  // 1. TRANG PHỤC NỮ TRUYỀN THỐNG (7 MẪU)
  // ==========================================
  {
    id: 'aodai_hanoi_silk',
    name: 'Áo Dài Lụa Hà Đông Cổ Cao (Hà Nội 1950 - 1960)',
    category: 'women_attire',
    era: '1950-1960',
    eraLabel: '1950 – 1960',
    region: 'North',
    regionLabel: 'Hà Nội & Bắc Bộ',
    tagline: 'Vẻ đẹp đoan trang, đài các của thiếu nữ Tràng An thời kỳ phục hòa',
    description: 'Áo dài phom dáng truyền thống tà dài qua gối mềm mại, chất liệu lụa tơ tằm dệt thủ công hoặc gấm nhẹ, cổ cao kín đáo 3-4cm, cài khuy bấm bên nách phải, quần lụa trắng hoặc đen rộng ống. Tóc vấn trần hoặc uốn lượn sóng bồng bềnh chuẩn nét thanh lịch phụ nữ Hà thành.',
    promptVi: 'Phục hồi trang phục áo dài truyền thống thiếu nữ Hà Nội thập niên 1950: Chất liệu vải lụa tơ tằm Hà Đông tự nhiên, độ rủ mềm mại, cổ đứng truyền thống cao kín đáo, chiết eo nhẹ tự nhiên không bó sát hiện đại. Quần lụa phi bóng mờ. Giữ nguyên 100% thần thái nét mặt Á Đông đoan trang, tóc uốn bồng cổ điển.',
    promptEn: 'Restoring authentic 1950s Hanoi traditional Vietnamese Ao Dai dress: woven natural Ha Dong mulberry silk fabric with soft flowing drape, high closed mandarin collar (3-4cm), traditional side fastening, subtle natural waistline without modern tight contours. Paired with wide-leg matte silk trousers. Preserving 100% authentic Vietnamese facial bone structure and classical retro wavy bob hairstyle.',
    keywords: ['traditional Hanoi Ao Dai', 'Ha Dong mulberry silk', 'mandarin collar', '1950s Vietnamese beauty', 'silk drape texture'],
    colorPalette: [
      { name: 'Trắng mỡ gà', hex: '#FDFBF7' },
      { name: 'Xanh ngọc bích', hex: '#2E6F62' },
      { name: 'Hồng phấn pastel', hex: '#E8B4B8' },
      { name: 'Đen nhung lụa', hex: '#1C1B1B' },
    ],
    culturalNotes: 'Thời kỳ này áo dài Hà Nội chú trọng sự thanh nhã, kín đáo, tà áo không xẻ quá cao như thập niên sau và không may ôm sát body.',
    restorationAdvice: 'Khi khử mốc hoặc ố trên áo dài, hãy giữ lại nếp gấp vải tự nhiên và độ bóng nhẹ của tơ tằm, tránh biến thành vải thun hoặc polyester hiện đại.'
  },
  {
    id: 'aodai_saigon_raglan',
    name: 'Áo Dài Raglan / Tân Thời Sài Gòn (1960 - 1975)',
    category: 'women_attire',
    era: '1960-1975',
    eraLabel: '1960 – 1975',
    region: 'South',
    regionLabel: 'Sài Gòn & Nam Bộ',
    tagline: 'Phong thái tân thời năng động, tay ráp raglan và cổ thuyền quyến rũ',
    description: 'Kiểu áo dài cải tiến nối tay raglan giúp vai áo phẳng phiu không bị nhăn, chiết eo thon gọn tôn dáng phụ nữ thành thị Sài Gòn. Cổ áo đa dạng từ cổ thuyền bà Nhu, cổ tròn viền nhỏ đến cổ truyền thống thấp. Hoa văn in hoa li ti hoặc vải đơn sắc rực rỡ.',
    promptVi: 'Phục dựng áo dài tân thời Sài Gòn thập niên 1960-1970: Kiểu tay raglan phẳng vai, chiết eo thanh mảnh, cổ thuyền hoặc cổ thấp 2cm, tà áo bay nhẹ duyên dáng. Tóc uốn phồng bồng bềnh kiểu retro Sài Gòn xưa, kính mát mắt mèo hoặc vòng cổ ngọc trai thanh lịch.',
    promptEn: 'Restoring authentic vintage Saigon raglan Ao Dai (1960s-1970s): seamless raglan shoulder seams, tailored slim waistline, chic boat-neckline or low mandarin collar, graceful flowing silk panels. Voluminous bouffant retro hair, classic cat-eye glasses or pearl necklace, vibrant retro city chic aesthetics.',
    keywords: ['Saigon vintage Ao Dai', 'raglan sleeve Ao Dai', 'boat neck Ao Dai', '1960s bouffant hair', 'retro Saigon fashion'],
    colorPalette: [
      { name: 'Vàng mù tạt retro', hex: '#E1AD01' },
      { name: 'Cam đất san hô', hex: '#D35400' },
      { name: 'Xanh lơ biển', hex: '#4A90E2' },
      { name: 'Tím hoa cà', hex: '#8E44AD' },
    ],
    culturalNotes: 'Áo dài Raglan do nhà may Dung ở Đakao Sài Gòn sáng chế năm 1960, nối thân và tay bằng hàng nút bấm từ cổ chéo xuống nách.',
    restorationAdvice: 'Chú ý tái hiện hoa văn in retro (polka dots, hoa nhí) sắc nét mà không bị vỡ hạt.'
  },
  {
    id: 'aobaba_nam_bo_khanran',
    name: 'Áo Bà Ba Lụa / Thô Mộc & Khăn Rằn Nam Bộ',
    category: 'women_attire',
    era: '1960-1975',
    eraLabel: '1950 – 1985',
    region: 'South',
    regionLabel: 'Miền Tây & Đồng Bằng Sông Cửu Long',
    tagline: 'Vẻ đẹp thuần hậu, đôn hậu và dũng cảm của người con gái Nam Bộ',
    description: 'Áo bà ba xẻ tà hai bên hông, cổ tròn hoặc cổ tim nhẹ, hàng nút cài phía trước, hai túi nhỏ phía dưới. May bằng vải lụa tơ, vải ú, vải gấm mỏng hoặc vải đen trơn mộc mạc. Đi kèm khăn rằn sọc ca rô đen trắng quấn cổ hoặc đội đầu, nón lá chằm.',
    promptVi: 'Phục hồi trang phục Áo Bà Ba Nam Bộ truyền thống: Phom áo ôm nhẹ thoải mái, vải lụa hoặc vải thô mộc tự nhiên, hai túi vuông phía vạt dưới, hàng cúc cài thẳng hàng. Khăn rằn ca rô đen trắng quàng cổ buông hai vạt duyên dáng, mái tóc thắt bím hoặc xõa dài tự nhiên. Nét mặt hiền hậu, phúc hậu chất phác.',
    promptEn: 'Restoring authentic Southern Vietnamese Ao Ba Ba blouse: tailored natural silk or cotton with side slits, two bottom front pockets, traditional front button row. Iconic black-and-white checkered Khen Ran scarf draped softly around the neck. Natural long black hair, warm, compassionate, and resilient Southern Vietnamese beauty.',
    keywords: ['Ao Ba Ba Southern Vietnam', 'Khan Ran checkered scarf', 'Mekong delta traditional attire', 'rustic cotton silk texture', 'warm gentle expression'],
    colorPalette: [
      { name: 'Đen mộc mạc', hex: '#212121' },
      { name: 'Nâu sồng phù sa', hex: '#5D4037' },
      { name: 'Hồng cánh sen lụa', hex: '#EC407A' },
      { name: 'Trắng ca rô khăn rằn', hex: '#F5F5F5' },
    ],
    culturalNotes: 'Áo bà ba và khăn rằn là biểu tượng bất hủ của người phụ nữ Nam Bộ cần cù, thủy chung trong lao động và kiên cường.',
    restorationAdvice: 'Phục hồi rõ nét các đường viền túi áo, thớ vải cotton/lụa và hoa văn ca rô của khăn rằn.'
  },
  {
    id: 'aotu_than_kinhbac',
    name: 'Áo Tứ Thân, Yếm Đào & Nón Quai Thao (Kinh Bắc Xưa)',
    category: 'women_attire',
    era: '1950-1960',
    eraLabel: '1950 Trở Về Trước',
    region: 'North',
    regionLabel: 'Bắc Ninh & Đồng Bằng Bắc Bộ',
    tagline: 'Nét duyên quan họ Kinh Bắc, yếm đào rực rỡ và dải thắt lưng xanh điều',
    description: 'Áo tứ thân buông vạt hoặc buộc vạt trước bụng, bên trong mặc yếm đào (hồng đào/đỏ điều) hoặc yếm trắng cổ xây, khoác ngoài áo the mỏng. Đeo thắt lưng xanh lụa đào, đội nón quai thao (nón ba tầm) rộng vành với dải quai thao bằng lụa rủ dài sang trọng.',
    promptVi: 'Phục hồi chân thực trang phục Áo Tứ Thân Bắc Bộ: Vạt áo lụa đũi nâu sồng hoặc the đen buông tà mềm mại, bên trong lộ yếm đào màu hồng thắm hoặc đỏ mận, cổ áo khoét nhẹ kín đáo. Dải lụa thắt lưng xanh ngọc hoặc đỏ điều rủ ngang hông. Nón quai thao ba tầm đan nan lá gồi mịn màng với dải quai thao lụa mềm buông dài. Nét mặt thanh tú, răng đen hạt huyền hoặc cười e ấp.',
    promptEn: 'Restoring authentic historical Northern Vietnamese Ao Tu Than (Four-Panel Gown): flowing rustic brown/black gauze silk over an inner vibrant scarlet/pink Yem breastcloth. Wrapped silk sash belt in emerald green or crimson draping gracefully. Large flat conical Non Quai Thao hat crafted from refined palm leaves with luxurious flowing silk chin ribbons. Graceful Kinh Bac traditional feminine beauty.',
    keywords: ['Ao Tu Than four-panel gown', 'inner Yem breastcloth', 'Non Quai Thao large hat', 'Kinh Bac traditional fashion', 'silk sash belt'],
    colorPalette: [
      { name: 'Hồng yếm đào', hex: '#D81B60' },
      { name: 'Nâu sồng đũi', hex: '#4E342E' },
      { name: 'Xanh dải lụa', hex: '#00897B' },
      { name: 'Vàng lá gồi nón', hex: '#D7CCC8' },
    ],
    culturalNotes: 'Áo tứ thân tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng), yếm đào tượng trưng cho nét e ấp duyên dáng của người phụ nữ.',
    restorationAdvice: 'Cần tái tạo độ phân lớp giữa áo ngoài, yếm trong và dải thắt lưng để tạo chiều sâu quang học 3D.'
  },
  {
    id: 'aodai_nu_sinh_dongkhanh_hue',
    name: 'Áo Dài Trắng Nữ Sinh Đồng Khánh Huế & Nón Bài Thơ',
    category: 'women_attire',
    era: '1960-1975',
    eraLabel: '1960 – 1975',
    region: 'Central',
    regionLabel: 'Cố Đô Huế & Miền Trung',
    tagline: 'Hình ảnh thanh khiết của nữ sinh trường Đồng Khánh bên cầu Tràng Tiền',
    description: 'Áo dài lụa trắng tinh khôi (hoặc màu tím hoa cà đặc trưng xứ Huế), cổ áo đứng cao 3cm, tà áo thướt tha chạm gót. Mái tóc thề buông dài ngang lưng mềm mại, tay ôm cặp da và nón lá bài thơ chằm cước trong suốt.',
    promptVi: 'Phục hồi nét thanh khiết Áo Dài Nữ Sinh Đồng Khánh Huế: Chất liệu vải lụa tơ tằm trắng mướt hoặc màu tím Huế mộng mơ, tà áo bay nhẹ trong gió chiều sông Hương. Tay cầm nón lá bài thơ soi rõ hoa văn cầu Tràng Tiền, mái tóc thề đen óng buông dài tự nhiên. Nét mặt dịu dàng, đôi mắt trong veo hiền thục xứ Huế.',
    promptEn: 'Restoring pristine historical Dong Khanh Hue Schoolgirl Ao Dai: pure flowing white silk (or royal Hue lavender violet silk) with modest standing collar. Hand holding translucent Hue poem conical hat (Non Bai Tho), natural silky straight black hair cascading over shoulders. Gentle, poetic, and serene Central Vietnamese imperial city beauty.',
    keywords: ['Dong Khanh Hue schoolgirl Ao Dai', 'pure white silk Ao Dai', 'Hue lavender violet', 'Non Bai Tho poem hat', 'poetic Vietnamese schoolgirl'],
    colorPalette: [
      { name: 'Trắng tinh khôi', hex: '#FFFFFF' },
      { name: 'Tím mộng mơ Huế', hex: '#6A1B9A' },
      { name: 'Xanh nước sông Hương', hex: '#4DD0E1' },
      { name: 'Đen tóc thề', hex: '#111111' },
    ],
    culturalNotes: 'Trường Nữ sinh Đồng Khánh thành lập năm 1917 là cái nôi nuôi dưỡng nét đẹp tri thức và công dung ngôn hạnh của phụ nữ miền Trung.',
    restorationAdvice: 'Chống cháy sáng tuyệt đối cho tà áo lụa trắng (anti-clipping), giữ trọn các đường nếp gấp mềm mại.'
  },
  {
    id: 'aodai_nhung_gam_trungnien',
    name: 'Áo Dài Nhung Gấm & Vòng Cổ Chuỗi Hạt Quý Bà Xưa (1960 - 1985)',
    category: 'women_attire',
    era: '1960-1975',
    eraLabel: '1960 – 1985',
    region: 'Nationwide',
    regionLabel: 'Đô Thị Hà Nội, Huế & Sài Gòn',
    tagline: 'Vẻ đẹp quý phái, phúc hậu và uy nghi của các bà, các mẹ thời xưa',
    description: 'Áo dài may bằng chất liệu nhung the tuyết cao cấp hoặc gấm dệt hoa văn chìm chữ Thọ/hoa sen. Màu sắc trầm ấm như xanh cổ vịt, đỏ mận chín, tím huế đậm hoặc đen tuyền quý phái. Đeo chuỗi ngọc trai trắng hoặc dây chuyền kiềng vàng quanh cổ, tóc vấn cao sang trọng.',
    promptVi: 'Phục chế trang phục Áo Dài Nhung Gấm quý bà trung niên Việt Nam: Chất liệu nhung tuyết mịn bắt sáng óng ánh hoặc gấm dệt hoa văn chìm tinh xảo. Đeo chuỗi ngọc trai tự nhiên quanh cổ hoặc kiềng vàng sáng bóng. Nét mặt phúc hậu, hiền từ, mái tóc búi gọn gàng kiểu quý phái gia đình danh giá xưa.',
    promptEn: 'Restoring vintage Vietnamese noble matriarch velvet/damask Ao Dai: plush velvet fabric with subtle luminous sheen or intricately woven silk damask with traditional floral motifs. Adorned with authentic layered pearl necklace or gold choker ring. Dignified, benevolent, and matriarchal vintage portrait photography.',
    keywords: ['velvet Ao Dai matriarch', 'vintage damask silk', 'pearl necklace Vietnamese mother', 'dignified matriarch portrait', 'plush velvet texture'],
    colorPalette: [
      { name: 'Đỏ mận chín', hex: '#5B0E2D' },
      { name: 'Xanh cổ vịt quý phái', hex: '#004D40' },
      { name: 'Đen nhung tuyết', hex: '#0A0A0A' },
      { name: 'Trắng ngọc trai', hex: '#F0EAE1' },
    ],
    culturalNotes: 'Trang phục chuẩn mực trong các dịp mừng thọ, lễ tết và ảnh chân dung kỷ niệm gia tộc của các bậc hiền mẫu.',
    restorationAdvice: 'Tái tạo độ sâu bắt sáng của chất liệu nhung tuyết và độ phản quang tròn trịa của từng hạt ngọc trai.'
  },
  {
    id: 'trangphuc_nu_thanhnien_xungphong',
    name: 'Quân Phục Nữ Thanh Niên Xung Phong / Nữ Biệt Động (1965 - 1975)',
    category: 'women_attire',
    era: '1960-1975',
    eraLabel: '1965 – 1975',
    region: 'Nationwide',
    regionLabel: 'Tuyến Lửa Trường Sơn & Miền Nam',
    tagline: 'Nụ cười rạng rỡ và vẻ đẹp kiên cường của những đóa hoa nơi tuyến lửa',
    description: 'Bộ quần áo bà ba đen hoặc áo chẽn Tô Châu xanh rêu, quần lụa đen rộng ống chống vắt, mũ tai bèo vải bạt mềm cài huy hiệu, khăn dù pháo sáng hoặc khăn rằn quàng cổ. Tóc thắt bím hai bên hoặc kẹp gọn gàng, thắt lưng da sĩ quan.',
    promptVi: 'Phục hồi chân thực hình ảnh Nữ Thanh Niên Xung Phong / Nữ Chiến Sĩ Giải Phóng: Áo kaki xanh rêu hoặc áo bà ba đen mộc mạc, mũ tai bèo vải mềm đội hơi lệch duyên dáng, khăn rằn hoặc khăn dù quàng cổ. Nụ cười rạng rỡ lạc quan, làn da rám nắng khỏe khoắn, ánh mắt sáng ngời ý chí kiên trung.',
    promptEn: 'Restoring authentic historical Vietnamese Female Volunteer Youth (TNXP) / Guerrilla heroine portrait: soft cotton jungle floppy hat (Mu Tai Beo), olive drab military tunic or rustic black Ao Ba Ba blouse, checkered neckerchief. Radiantly confident youthful smile, sun-kissed healthy skin, courageous and spirited historical eyes.',
    keywords: ['female volunteer youth Vietnam', 'Mu Tai Beo floppy hat', 'heroic young Vietnamese woman', 'Truong Son road heroine', 'authentic military portrait'],
    colorPalette: [
      { name: 'Xanh rêu quân nhu', hex: '#3E4F3C' },
      { name: 'Đen lụa bà ba', hex: '#1C1C1C' },
      { name: 'Đỏ huy hiệu', hex: '#D32F2F' },
      { name: 'Nâu đất Trường Sơn', hex: '#795548' },
    ],
    culturalNotes: 'Biểu tượng cho thế hệ thanh xuân bất tử hiến dâng tuổi trẻ cho độc lập, thống nhất non sông.',
    restorationAdvice: 'Làm nổi bật ánh mắt sáng trong, nụ cười tươi tắn và chất thô mộc của chiếc mũ tai bèo vải dù.'
  },

  // ==========================================
  // 2. TRANG PHỤC NAM & QUÂN PHỤC (5 MẪU)
  // ==========================================
  {
    id: 'quanphuc_bodoicuhu_khangchien',
    name: 'Quân Phục Bộ Đội Cụ Hồ (1950 - 1975)',
    category: 'men_military',
    era: '1960-1975',
    eraLabel: '1950 – 1975',
    region: 'Nationwide',
    regionLabel: 'Toàn quốc',
    tagline: 'Quân phục người lính giải phóng kiên trung với mũ cối, áo Tô Châu xanh cỏ úa',
    description: 'Áo Tô Châu hoặc áo chẽn kaki xanh cỏ úa / xanh rêu bộ đội, hai túi ngực có nắp cài cúc, ve áo gắn quân hàm đỏ hoặc phù hiệu sao vàng. Mũ cối bọc lưới hoặc mũ tai bèo vải mềm, thắt lưng da sĩ quan khóa ngôi sao, ba lô cóc và dép lốp cao su Bác Hồ.',
    promptVi: 'Phục hồi chuẩn xác quân phục Quân Đội Nhân Dân Việt Nam thời kháng chiến: Áo Tô Châu vải kaki xanh cỏ úa dày dặn, cúc áo màu xanh rêu, hai túi ngực có nắp thẳng thớm. Mũ cối bọc vải đan lưới cài huy hiệu sao vàng ở trán (hoặc mũ tai bèo vải dù). Dây thắt lưng da nâu. Giữ nguyên thần thái anh dũng, đôi mắt cương nghị, làn da khỏe khoắn dạn dày sương gió.',
    promptEn: 'Restoring historical Vietnam War People’s Army military uniform: authentic olive-drab cotton-twill To Chau combat tunic with buttoned chest flap pockets, red collar insignia with golden star. Traditional green pith helmet (Mu Coi) with mesh camouflage netting and brass star badge (or soft jungle floppy hat Mu Tai Beo). Brown leather web belt. Resolute heroic facial expression, weathered realistic military portrait.',
    keywords: ['Vietnam People Army uniform', 'olive green To Chau tunic', 'pith helmet Mu Coi', 'Mu Tai Beo jungle hat', 'historical military insignia'],
    colorPalette: [
      { name: 'Xanh cỏ úa quân nhu', hex: '#4B5320' },
      { name: 'Xanh rêu Tô Châu', hex: '#3B4D3C' },
      { name: 'Đỏ cờ quân hàm', hex: '#C8102E' },
      { name: 'Vàng sao kim loại', hex: '#FFCD00' },
    ],
    culturalNotes: 'Chiếc mũ cối và áo xanh Tô Châu là biểu tượng bất tử của tinh thần yêu nước và lịch sử quân sự Việt Nam thế kỷ 20.',
    restorationAdvice: 'Phục dựng chính xác huy hiệu quân hàm trên ve áo đỏ và ngôi sao vàng trên mũ, không để AI vẽ nhầm sang huy hiệu quân đội phương Tây.'
  },
  {
    id: 'auphuc_trithuc_vintage',
    name: 'Âu Phục Trí Thức & Công Chức Thời Xưa (1950 - 1980)',
    category: 'men_military',
    era: '1960-1975',
    eraLabel: '1950 – 1980',
    region: 'Nationwide',
    regionLabel: 'Đô thị Hà Nội & Sài Gòn',
    tagline: 'Phong cách lịch lãm của các thầy giáo, bác sĩ, nhà văn và giới trí thức xưa',
    description: 'Bộ âu phục may đo thủ công: Áo sơ mi cổ đức vải poplin trắng hoặc kẻ sọc nhỏ, áo vest nỉ dạ hoặc tweed 2 nút cổ điển, ve áo bản vừa, quần tây ống đứng ủi ly thẳng tắp. Đi kèm kính mắt gọng đồi mồi tròn, bút máy cài túi ngực và đồng hồ đeo tay cổ.',
    promptVi: 'Phục dựng trang phục âu phục nam giới trí thức Việt Nam thập niên 1960-1970: Áo sơ mi trắng may đo cổ đức thẳng thớm, cà vạt bản hẹp cổ điển, áo khoác vest dạ xám hoặc xanh navy may đo ôm phom tự nhiên. Kính mắt gọng đồi mồi tròn cổ điển, tóc chải ngôi 7/3 vuốt pomade nhẹ. Thần thái nho nhã, tri thức uyên bác.',
    promptEn: 'Restoring vintage 1960s-1970s Vietnamese scholar and gentleman tailored suit: crisp white cotton dress shirt with classic spread collar, vintage narrow tie, wool tweed tailored blazer in charcoal grey or deep navy. Round tortoiseshell spectacles, classic 7/3 side-parted retro pomade hairstyle. Dignified intellectual expression, refined vintage portrait photography.',
    keywords: ['vintage tailored suit Vietnam', 'tortoiseshell eyeglasses', '1960s gentleman portrait', 'side part vintage haircut', 'tweed wool blazer'],
    colorPalette: [
      { name: 'Xanh navy trầm', hex: '#1B263B' },
      { name: 'Xám than chì', hex: '#333333' },
      { name: 'Nâu đồi mồi', hex: '#5E3A1C' },
      { name: 'Trắng kem sơ mi', hex: '#F8F9FA' },
    ],
    culturalNotes: 'Giới trí thức Hà Nội và Sài Gòn xưa chuộng phong thái chỉn chu, đoan trang, tôn trọng lễ nghi trong từng nếp áo.',
    restorationAdvice: 'Tái tạo độ sắc nét của đường ly quần tây và đường ve áo vest may đo thủ công.'
  },
  {
    id: 'aodai_nam_nguthan',
    name: 'Áo Dài Ngũ Thân & Khăn Đóng Nam Giới (Truyền Thống)',
    category: 'men_military',
    era: '1950-1960',
    eraLabel: '1950 – 1960',
    region: 'North',
    regionLabel: 'Bắc Bộ & Cố Đô Huế',
    tagline: 'Trang phục chuẩn mực của các cụ đồ, bậc trưởng thượng trong lễ tết và gia tộc',
    description: 'Áo dài ngũ thân tay chẽn hoặc tay thụng chất liệu lụa tơ, đũi hoặc gấm vân mây chữ Thọ. Cổ đứng 4cm gài 5 nút đồng/gỗ bên phải tượng trưng cho ngũ thường (Nhân - Lễ - Nghĩa - Trí - Tín). Đội khăn đóng xếp nếp quấn tròn trên đầu, đi guốc mộc hoặc giày vải.',
    promptVi: 'Phục hồi trang phục Áo Dài Ngũ Thân Nam Giới và Khăn Đóng truyền thống: Vải gấm dệt hoa văn chữ Thọ chìm màu xanh lam thẫm hoặc đen huyền, cổ đứng cứng cáp đính 5 khuy cài bên nách phải. Khăn đóng đen vấn nhiều lớp xếp nếp đều đặn trên đầu. Thần thái tôn nghiêm, đĩnh đạc của bậc trưởng lão truyền thống Việt Nam.',
    promptEn: 'Restoring traditional historical Vietnamese male Ngu Than tunic and Khan Dong turban: rich brocade or damask silk featuring subtle woven Longevity symbols in midnight blue or black, standing 4cm mandarin collar with 5 side brass buttons. Finely wrapped black tiered fabric head turban (Khan Dong). Venerable, stately, and dignified patriarchal Vietnamese portrait.',
    keywords: ['Ao Dai Ngu Than male', 'Khan Dong turban', 'traditional Vietnamese patriarch', 'brocade silk pattern', 'five button tunic'],
    colorPalette: [
      { name: 'Xanh lam gấm thẫm', hex: '#1D2A44' },
      { name: 'Đen nhung gấm', hex: '#121212' },
      { name: 'Đồng thau khuy cài', hex: '#C5A059' },
      { name: 'Tím hoa cà cung đình', hex: '#583759' },
    ],
    culturalNotes: 'Năm cúc áo đại diện cho Ngũ Luân (Phụ tử, Quân thần, Phu phụ, Huynh đệ, Bằng hữu) và Ngũ Thường.',
    restorationAdvice: 'Cần giữ rõ chi tiết dệt hoa văn chìm trên nền vải gấm, không để AI làm bẹt màu thành áo trơn.'
  },
  {
    id: 'trangphuc_baocap_congnhan',
    name: 'Trang Phục Thời Bao Cấp & Nông Dân Chất Phác (1975 - 1985)',
    category: 'men_military',
    era: '1975-1985',
    eraLabel: '1975 – 1985',
    region: 'Nationwide',
    regionLabel: 'Toàn quốc thời kỳ Bao Cấp',
    tagline: 'Kỷ niệm thời kỳ tem phiếu, áo sơ mi bảo hộ xanh công nhân và dép tổ ong',
    description: 'Áo sơ mi vải bạt bông / kaki xanh công nhân, áo phông dệt kim Đông Xuân hoặc áo sơ mi trắng giặt sờn cổ, quần tây xanh đen sắn gấu. Mũ lưỡi trai vải bạt hoặc mũ nan, dép rọ nhựa Tiền Phong / dép tổ ong, đồng hồ Poljot hoặc Seiko chém cạnh.',
    promptVi: 'Phục hồi trang phục nam giới thời kỳ Bao Cấp Việt Nam (1975-1985): Áo sơ mi xanh bảo hộ vải kaki hoặc áo sơ mi trắng dệt sợi bông tự nhiên, ngực áo có thể cài bút máy Hồng Hà. Quần tây màu xanh tím than vải xi hoặc kaki mộc. Đeo đồng hồ cơ dây da hoặc kim loại cổ điển. Thần thái chân chất, mộc mạc và tràn đầy nghị lực.',
    promptEn: 'Restoring authentic Vietnamese Subsidy Era (Bao Cap 1975-1985) attire: worker blue utilitarian cotton work-shirt or simple woven white poplin shirt with a classic fountain pen in pocket. Navy utility twill trousers. Vintage mechanical wristwatch (Poljot / Seiko). Honest, resilient, and nostalgic portrait of everyday life in historical Vietnam.',
    keywords: ['Bao Cap subsidy era', 'vintage Vietnamese worker shirt', 'Hong Ha fountain pen', 'vintage mechanical watch', 'utilitarian cotton texture'],
    colorPalette: [
      { name: 'Xanh công nhân', hex: '#2C5E8A' },
      { name: 'Xanh tím than', hex: '#1F2438' },
      { name: 'Trắng sợi bông', hex: '#EAE6DF' },
      { name: 'Nâu sờn bạt', hex: '#6E5C4F' },
    ],
    culturalNotes: 'Thời kỳ tem phiếu gắn liền với ký ức của hàng triệu gia đình Việt Nam với đức tính tiết kiệm và cần lao.',
    restorationAdvice: 'Giữ lại chất liệu thô mộc của sợi vải cotton thời xưa, không tăng bóng quá mức.'
  },
  {
    id: 'trangphuc_congnhan_nongtruong_lamnghiep',
    name: 'Trang Phục Thanh Niên Nông Trường & Thợ Mỏ (1970 - 1985)',
    category: 'men_military',
    era: '1975-1985',
    eraLabel: '1970 – 1985',
    region: 'North',
    regionLabel: 'Khu Công Nghiệp & Nông Trường',
    tagline: 'Vẻ đẹp khỏe khoắn, tràn đầy nhiệt huyết xây dựng đất nước thời kỳ công nghiệp hóa',
    description: 'Áo khoác gió vải dù 2 lớp màu xanh rêu, áo bảo hộ thợ lò màu xanh than có phản quang sợi chỉ, găng tay sợi bạt, khăn dù rằn ri thắt cổ, mũ bảo hộ lao động hoặc mũ lưỡi trai vải bạt mộc mạc.',
    promptVi: 'Phục hồi trang phục công nhân công nghiệp / thanh niên nông trường thập niên 1970-1980: Áo bảo hộ lao động vải kaki dày màu xanh than hoặc xanh rêu, túi hộp ngực vuông vắn. Làn da ngăm rám nắng khỏe khoắn, giọt mồ hôi lấp lánh ánh sáng lao động, nụ cười rạng rỡ đầy niềm tin và lòng tự hào xây dựng quê hương.',
    promptEn: 'Restoring 1970s-1980s Vietnamese industrial worker & agricultural youth attire: heavy-duty navy blue cotton workwear tunic with dual chest utility pockets. Sun-bronzed healthy skin tone, authentic beads of honest labor sweat, bright resilient smile capturing historical nation-building pride.',
    keywords: ['Vietnamese industrial worker', '1970s blue collar portrait', 'sun-bronzed Asian skin', 'heavy duty workwear tunic', 'historical working class dignity'],
    colorPalette: [
      { name: 'Xanh than thợ mỏ', hex: '#1A2A3A' },
      { name: 'Xám khói công nghiệp', hex: '#4F5D65' },
      { name: 'Vàng đất bazan', hex: '#A0522D' },
      { name: 'Trắng khăn lau', hex: '#FAFAFA' },
    ],
    culturalNotes: 'Khắc họa tinh thần quật khởi của giai cấp công nhân và thế hệ thanh niên mở đất xây dựng các nông trường chè, cà phê, cao su.',
    restorationAdvice: 'Bảo lưu nước da ngăm khỏe khoắn và biểu cảm tự tin, chân thật của người lao động.'
  },

  // ==========================================
  // 3. ĐÁM CƯỚI XƯA & NGHI LỄ GIA TỘC (5 MẪU)
  // ==========================================
  {
    id: 'damcuoi_hanoi_baocap',
    name: 'Đám Cưới Thời Bao Cấp Hà Nội (1975 - 1985)',
    category: 'weddings_rituals',
    era: '1975-1985',
    eraLabel: '1975 – 1985',
    region: 'North',
    regionLabel: 'Hà Nội & Bắc Bộ',
    tagline: 'Cô dâu áo dài nhung/lụa trắng ôm hoa lay-ơn, chú rể âu phục vest xám đèo xe Super Cub / Phượng Hoàng',
    description: 'Bức ảnh cưới kinh điển thời bao cấp: Cô dâu mặc áo dài lụa trắng hoặc áo dài nhung đỏ đô, đầu cài voan trắng bồng bềnh, hai tay ôm bó hoa lay-ơn (hoa dơn) dài trắng/đỏ thắt nơ lụa. Chú rể mặc bộ vest xám hoặc xanh navy 2 hàng cúc, cài bông hoa hồng nhỏ ở ve áo. Phông cưới cắt chữ xốp dán khẩu hiệu "Vui Duyên Mới Không Quên Nhiệm Vụ" cùng đôi bồ câu ngậm chữ Song Hỷ.',
    promptVi: 'Phục hồi bức ảnh cưới thời Bao Cấp Hà Nội thập niên 1970-1980: Cô dâu mặc áo dài lụa trắng cổ điển cài voan cưới trắng ren tinh tế trên tóc uốn bồng, hai tay ôm bó hoa lay-ơn (hoa dơn) tươi thắt dải ruy-băng đỏ. Chú rể mặc âu phục vest màu xám than cài hoa hồng nhỏ ở ngực. Phông nền phía sau trang trí chữ xốp "Song Hỷ" và đôi chim bồ câu trắng. Giữ trọn 100% nụ cười rạng rỡ, e ấp và hạnh phúc của đôi lứa.',
    promptEn: 'Restoring authentic 1970s-1980s Hanoi Subsidy Era wedding photography: the bride wears a timeless white silk Ao Dai with delicate bridal veil lace in bouffant hair, clutching a long fresh gladiolus floral bouquet. Groom dressed in a classic charcoal wool suit with lapel rose. Vintage handmade foam "Double Happiness" backdrop with white doves. Glowing, tender, and authentic romantic nostalgic wedding portrait.',
    keywords: ['Bao Cap vintage Vietnamese wedding', 'white silk bridal Ao Dai', 'gladiolus flower bouquet', 'Double Happiness wedding backdrop', 'authentic retro couple portrait'],
    colorPalette: [
      { name: 'Trắng voan cưới', hex: '#FFFFFF' },
      { name: 'Đỏ hoa dơn', hex: '#C62828' },
      { name: 'Xám vest chú rể', hex: '#37474F' },
      { name: 'Hồng phấn phông cưới', hex: '#F8BBD0' },
    ],
    culturalNotes: 'Hoa lay-ơn và xe đạp hoa là biểu tượng lãng mạn, giản dị nhưng thiêng liêng nhất trong ký ức cưới hỏi của thế hệ cha mẹ.',
    restorationAdvice: 'Tái hiện độ tinh khôi của dải voan cưới ren mỏng trên tóc và từng cánh hoa lay-ơn tươi tắn.'
  },
  {
    id: 'damcuoi_saigon_retrowestern',
    name: 'Đám Cưới Sài Gòn Retro Tân Thời (1965 - 1975)',
    category: 'weddings_rituals',
    era: '1960-1975',
    eraLabel: '1965 – 1975',
    region: 'South',
    regionLabel: 'Sài Gòn & Đô Thị Nam Bộ',
    tagline: 'Váy cưới xòe phồng công chúa ren lúp dài, chú rể Tuxedo lịch lãm bên xe hơi cổ Citroen DS',
    description: 'Lễ cưới Sài Gòn tân thời với cô dâu diện váy soiree trắng ren xòe phồng phong cách Tây phương hoặc áo dài ren trắng đính ngọc trai, đeo găng tay lụa trắng dài qua khuỷu tay, vương miện nhỏ và lúp cưới dài thướt tha. Chú rể diện Tuxedo hoặc vest đen thắt nơ bướm, rước dâu bằng xe hoa Citroen cổ.',
    promptVi: 'Phục hồi ảnh cưới Sài Gòn Retro thập niên 1960-1970: Cô dâu mặc váy cưới soiree trắng ren xòe bồng công chúa hoặc áo dài ren trắng đính ngọc trai, găng tay ren trắng thanh lịch, vương miện cài tóc lúp cưới voan dài lộng lẫy. Chú rể mặc Tuxedo đen thắt nơ bướm lịch lãm. Thần thái sang trọng, kiêu sa chuẩn phong cách Sài Gòn Hòn Ngọc Viễn Đông.',
    promptEn: 'Restoring glamorous 1960s-1970s vintage Saigon wedding: bride wearing voluminous lace ballgown soiree (or pristine white lace Ao Dai) with sheer elbow-length lace gloves and cathedral bridal veil. Groom sharply tailored in classic black tuxedo with bowtie. Luxurious, romantic, and cinematic vintage Pearl of the Orient aesthetic.',
    keywords: ['vintage Saigon wedding soiree', 'white lace bridal gown', 'elbow lace gloves', 'tuxedo bowtie groom', 'Pearl of the Orient wedding'],
    colorPalette: [
      { name: 'Trắng ren ngà', hex: '#FFFDF9' },
      { name: 'Đen Tuxedo', hex: '#050505' },
      { name: 'Đỏ rượu Champagne', hex: '#880E4F' },
      { name: 'Vàng vương miện', hex: '#FFD54F' },
    ],
    culturalNotes: 'Giao thoa văn hóa Đông Tây tạo nên những bộ ảnh cưới Sài Gòn đầy sang trọng và phong cách thời trang vượt thời gian.',
    restorationAdvice: 'Tái tạo độ chi tiết của hoa văn ren lưới và độ lấp lánh của hạt cườm trên váy cưới.'
  },
  {
    id: 'lecuoi_truyenthong_aotathan_khanvan',
    name: 'Lễ Thành Hôn Truyền Thống Áo Gấm & Khăn Vành Cung Đình',
    category: 'weddings_rituals',
    era: '1950-1960',
    eraLabel: '1950 Trở Về Trước',
    region: 'Central',
    regionLabel: 'Cố Đô Huế & Lễ Gia Tộc 3 Miền',
    tagline: 'Cô dâu áo Nhật Bình / gấm đỏ đội khăn vành dây vàng, chú rể áo the khăn đóng trước bàn thờ gia tiên',
    description: 'Nghi lễ gia tộc truyền thống trước bàn thờ tổ tiên: Cô dâu mặc áo gấm đỏ thêu long phụng hoặc áo Nhật Bình rực rỡ, đầu đội khăn vành dây mạ vàng quấn nhiều vòng uy nghi. Chú rể mặc áo dài xanh gấm chữ Thọ đội khăn đóng đen. Hai họ làm lễ trước lư đồng chạm rồng và cặp nến rồng phượng đỏ rực.',
    promptVi: 'Phục hồi lễ cưới truyền thống Việt Nam trước bàn thờ gia tiên: Cô dâu mặc áo gấm đỏ thêu hoa văn chim phượng hoàng rực rỡ, đầu quấn khăn vành dây vàng trang trọng, đeo kiềng vàng sáng bóng. Chú rể mặc áo dài ngũ thân xanh gấm chữ Thọ khăn đóng. Khói hương trầm nghi ngút, cặp nến bái lạy long phụng màu đỏ thắm. Khung cảnh thiêng liêng, tôn kính cội nguồn gia tộc.',
    promptEn: 'Restoring traditional Vietnamese ancestral wedding ritual: bride clad in majestic crimson silk brocade embroidered with golden phoenix motifs and regal tiered gold fabric headdress (Khan Vanh Day), wearing solid gold choker ring. Groom in royal blue longevity damask tunic and Khan Dong turban. Ancestral altar with brass incense burners and red dragon-phoenix candles. Sacred, reverent historical family legacy.',
    keywords: ['traditional ancestral wedding Vietnam', 'crimson phoenix brocade', 'Khan Vanh Day headdress', 'gold choker ring', 'sacred family altar ritual'],
    colorPalette: [
      { name: 'Đỏ son phượng hoàng', hex: '#B71C1C' },
      { name: 'Vàng kim hoàng gia', hex: '#FBC02D' },
      { name: 'Xanh lam chữ Thọ', hex: '#0D47A1' },
      { name: 'Đồng thau lư hương', hex: '#A1887F' },
    ],
    culturalNotes: 'Nghi thức lạy gia tiên là cốt lõi trong hôn lễ người Việt, khắc ghi lòng hiếu thảo và sự gắn kết bền chặt của hai dòng họ.',
    restorationAdvice: 'Cần tái tạo độ sáng bóng của trang sức vàng 24K và sắc đỏ tươi của nến rồng phượng.'
  },
  {
    id: 'le_mungtho_chuctho_giatoc',
    name: 'Lễ Mừng Thọ Bát Tuần & Đại Gia Đình Quây Quần (1970 - 1990)',
    category: 'weddings_rituals',
    era: '1975-1985',
    eraLabel: '1970 – 1990',
    region: 'Nationwide',
    regionLabel: 'Toàn Quốc',
    tagline: 'Cụ ông cụ bà áo gấm thọ ngồi giữa, con cháu 3-4 thế hệ quây quần chúc phúc',
    description: 'Bức ảnh đại gia đình nhiều thế hệ: Cụ ông cụ bà mặc áo dài gấm đỏ hoặc vàng đồng dệt chữ Thọ, đội khăn đóng, ngồi trên ghế tràng kỷ gỗ gụ chạm khảm trai. Xung quanh là con cháu dâu rể đứng quây quần, tay dâng chén trà hoặc phong bao đỏ, phía sau treo bức trướng mừng thọ thêu chữ "Phúc Lộc Thọ Khang Ninh".',
    promptVi: 'Phục hồi bức ảnh Lễ Mừng Thọ Đại Gia Đình Việt Nam: Cụ ông cụ bà ngồi trang trọng chính giữa trong trang phục áo dài gấm vàng / đỏ thêu chữ Thọ, nét mặt phúc hậu tràn đầy hỷ lạc. Con cháu 3 thế hệ đứng quây quần hai bên với nụ cười hiếu thảo. Bộ bàn ghế trường kỷ gỗ chạm xà cừ cổ kính, bức trướng nhung đỏ mừng thọ rực rỡ phía sau. Cân bằng độ nét đồng đều từng khuôn mặt trong đại gia đình.',
    promptEn: 'Restoring multi-generational Vietnamese Longevity Celebration (Le Mung Tho): venerable grandparents seated center in auspicious gold/crimson longevity silk brocade tunics with radiant benevolent smiles. Three generations of children and grandchildren gathered around with affectionate filial piety. Traditional mother-of-pearl inlaid rosewood furniture and embroidered velvet celebration banner. Uniform 8K facial sharpness across all family members.',
    keywords: ['Vietnamese Longevity Celebration', 'multi-generational family portrait', 'Le Mung Tho brocade', 'mother-of-pearl inlaid furniture', 'uniform multi-face sharpness'],
    colorPalette: [
      { name: 'Vàng kim chữ Thọ', hex: '#FFD700' },
      { name: 'Đỏ nhung mừng thọ', hex: '#8B0000' },
      { name: 'Nâu xà cừ gỗ gụ', hex: '#3E2723' },
      { name: 'Trắng râu tóc tiên ông', hex: '#F5F5F5' },
    ],
    culturalNotes: 'Thể hiện truyền thống "Uống nước nhớ nguồn", kính lão đắc thọ và niềm tự hào về sự trường thịnh của dòng tộc.',
    restorationAdvice: 'Áp dụng thuật toán Uniform Face Sharpening để tất cả con cháu ở hàng sau đều rõ nét như cụ ngồi hàng đầu.'
  },
  {
    id: 'chup_hinh_tet_nguyendan_xua',
    name: 'Chụp Hình Tết Nguyên Đán & Chợ Hoa Xuân Xưa (1960 - 1985)',
    category: 'weddings_rituals',
    era: '1960-1975',
    eraLabel: '1960 – 1985',
    region: 'Nationwide',
    regionLabel: 'Chợ Hoa Hàng Lược & Chợ Hoa Nguyễn Huệ',
    tagline: 'Cành đào phai Nhật Tân, chậu mai vàng rực rỡ, bánh chưng xanh và câu đối đỏ',
    description: 'Không khí Tết cổ truyền: Thiếu nữ và trẻ em diện áo mới du xuân tại chợ hoa Hàng Lược (Hà Nội) hoặc chợ hoa Nguyễn Huệ (Sài Gòn). Tay cầm cành đào bích hồng rực hoặc cành mai vàng tươi, trên bàn thờ có mâm ngũ quả, cặp bánh chưng xanh buộc lạt giang và tràng pháo đỏ.',
    promptVi: 'Phục hồi không khí Tết Nguyên Đán Việt Nam xưa: Thiếu nữ và trẻ nhỏ diện áo dài xuân tươi tắn rạng rỡ, tay nâng cành hoa đào Nhật Tân hồng thắm hoặc cành mai vàng Nam Bộ nở rộ. Bối cảnh chợ hoa xuân nhộn nhịp hoặc phòng khách ngày Tết ấm cúng có mâm ngũ quả, cặp bánh chưng xanh thắt lạt giang và câu đối đỏ son. Ánh sáng mùa xuân ấm áp, sắc màu rực rỡ hoài niệm.',
    promptEn: 'Restoring authentic historical Vietnamese Lunar New Year (Tet) atmosphere: smiling women and children in vibrant festive spring Ao Dai holding blooming pink Nhat Tan peach blossoms or sunny yellow apricot blossoms. Nostalgic spring flower market or warm festive living room with traditional Banh Chung sticky rice cakes and red calligraphy couplets. Joyful, festive, and warm retro spring colors.',
    keywords: ['Vietnamese Tet Lunar New Year', 'Nhat Tan peach blossom', 'yellow apricot blossom Tet', 'spring festival Ao Dai', 'nostalgic festive atmosphere'],
    colorPalette: [
      { name: 'Hồng đào bích', hex: '#FF6F91' },
      { name: 'Vàng mai Tết', hex: '#FFD166' },
      { name: 'Xanh lá dong bánh chưng', hex: '#2E7D32' },
      { name: 'Đỏ câu đối xuân', hex: '#D00000' },
    ],
    culturalNotes: 'Tết là thời khắc thiêng liêng nhất để con cháu tụ hội, lưu lại những bức ảnh kỷ niệm mở đầu một năm mới an khang.',
    restorationAdvice: 'Tái tạo độ tươi thắm của cánh hoa đào/mai và màu đỏ may mắn của phong bao lì xì.'
  },

  // ==========================================
  // 4. TRANG PHỤC DÂN TỘC TÂY NGUYÊN & TÂY BẮC (4 MẪU)
  // ==========================================
  {
    id: 'thocau_hmong_hoabinh_taybac',
    name: 'Thổ Cẩm Người H’Mông & Dao Đỏ Tây Bắc',
    category: 'ethnic_minorities',
    era: '1960-1975',
    eraLabel: '1950 – 1990',
    region: 'Northwest',
    regionLabel: 'Vùng Cao Tây Bắc & Đông Bắc',
    tagline: 'Váy xòe thổ cẩm thêu tay sáp ong, xà cạp dệt chỉ ngũ sắc và kiềng bạc chạm trổ tinh xảo',
    description: 'Trang phục thiếu nữ H’Mông Hoa / H’Mông Đen và Dao Đỏ: Váy xòe dập ly may bằng vải lanh vẽ sáp ong nhuộm chàm, thêu hoa văn hình học chỉ ngũ sắc rực rỡ, yếm ngực đính đồng bạc xủng xoảng. Đội khăn trùm đầu thêu hoa hoặc khăn xếp đỏ rực rỡ đính chùm quả bông len, đeo kiềng bạc trắng nguyên chất nhiều tầng quanh cổ.',
    promptVi: 'Phục hồi trang phục truyền thống Dân Tộc H’Mông / Dao Đỏ Tây Bắc: Váy xòe vải lanh nhuộm chàm dập ly mềm mại, hoa văn thổ cẩm thêu tay chỉ ngũ sắc (đỏ, vàng, xanh lục, cam) cực kỳ sắc nét và chi tiết. Kiềng bạc trắng nguyên chất chạm khắc hoa văn cổ truyền phản chiếu ánh nắng vùng cao. Nụ cười trong trẻo, má ửng hồng nắng gió rẻo cao, ánh mắt sáng long lanh.',
    promptEn: 'Restoring authentic Northwest Vietnamese ethnic minority attire (H’Mong / Red Dao): indigo-dyed pleated hemp skirt with intricate hand-embroidered geometric brocade in vivid multi-color threads (scarlet, emerald, saffron). Multi-tiered hand-hammered pure silver torque necklaces gleaming in mountain sunlight. Rosy sun-kissed cheeks, crystal-clear joyful eyes, crisp high-altitude natural portrait.',
    keywords: ['Hmong traditional brocade dress', 'Red Dao ethnic silver torque', 'indigo-dyed pleated hemp', 'geometric embroidery pattern', 'Northwest Vietnam minority beauty'],
    colorPalette: [
      { name: 'Xanh chàm thẫm', hex: '#1A237E' },
      { name: 'Đỏ thổ cẩm', hex: '#C2185B' },
      { name: 'Bạc trắng kiềng cổ', hex: '#E0E0E0' },
      { name: 'Cam đất hoa văn', hex: '#E65100' },
    ],
    culturalNotes: 'Mỗi họa tiết thổ cẩm là một câu chuyện thần thoại về núi rừng, phản ánh bàn tay tài hoa và sự cần mẫn của người phụ nữ vùng cao.',
    restorationAdvice: 'Cần làm sắc nét từng mũi kim thêu chữ thập (cross-stitch) và độ lấp lánh của các quả chuông bạc nhỏ.'
  },
  {
    id: 'thocam_thai_den_trang_muong',
    name: 'Áo Cóm, Khăn Piêu & Váy Đen Thiếu Nữ Thái / Mường',
    category: 'ethnic_minorities',
    era: '1960-1975',
    eraLabel: '1950 – 1985',
    region: 'Northwest',
    regionLabel: 'Mường Lò, Sơn La & Hòa Bình',
    tagline: 'Áo cóm bó sát tôn đường cong thắt đáy lưng ong, hàng cúc bướm bạc và khăn Piêu thêu chỉ màu',
    description: 'Trang phục thiếu nữ Thái: Chiếc áo cóm may bằng vải lụa hoặc dệt bông ôm sát cơ thể, cổ áo viền nhỏ cài hàng cúc bạc hình con bướm/con ve sầu (hàng cúc bướm đại diện cho tình yêu son sắt). Kết hợp váy đen dài chạm gót thắt thắt lưng xanh ngọc, đầu đội khăn Piêu thêu hoa văn cút Piêu độc đáo.',
    promptVi: 'Phục hồi trang phục Áo Cóm và Khăn Piêu Thiếu Nữ Thái Tây Bắc: Áo cóm trắng hoặc xanh nhạt bó sát tôn đường cong thon thả, hàng cúc bướm bằng bạc sáng bóng cài thẳng hàng giữa ngực. Khăn Piêu đội đầu dệt vải chàm thêu chỉ màu sặc sỡ ở hai đầu khăn. Váy lụa đen chấm gót với thắt lưng xanh ngọc lục bảo. Nét mặt thanh tú, duyên dáng như đóa hoa ban rừng Tây Bắc.',
    promptEn: 'Restoring authentic Northwestern Thai ethnic minority costume: form-fitting tailored white silk Ao Com blouse with silver butterfly buttons fastened down the front. Hand-embroidered traditional Khan Pieu scarf draped over hair with intricate geometric tassels. Long flowing black sarong skirt cinched with an emerald green silk belt. Delicate, graceful Ban flower mountain elegance.',
    keywords: ['Thai ethnic Ao Com blouse', 'Khan Pieu embroidered scarf', 'silver butterfly buttons', 'emerald green sash', 'Tay Bac mountain maiden'],
    colorPalette: [
      { name: 'Trắng áo cóm', hex: '#FFFFFF' },
      { name: 'Xanh ngọc thắt lưng', hex: '#00BFA5' },
      { name: 'Bạc cúc bướm', hex: '#CFD8DC' },
      { name: 'Đen váy lụa', hex: '#111111' },
    ],
    culturalNotes: 'Hàng cúc bướm bạc chia làm số lẻ cho cô gái chưa chồng và số chẵn cho người đã lập gia đình, biểu trưng cho sự gắn kết lứa đôi.',
    restorationAdvice: 'Tái tạo độ mảnh mai tinh xảo của hàng cúc bạc và đường nét thêu tinh vi của khăn Piêu.'
  },
  {
    id: 'thocam_taynguyen_edee_gairai',
    name: 'Trang Phục Thổ Cẩm Dân Tộc Ê-đê, Ba Na & Gia Rai Tây Nguyên',
    category: 'ethnic_minorities',
    era: '1975-1985',
    eraLabel: '1960 – 1990',
    region: 'Highlands',
    regionLabel: 'Đại Ngàn Tây Nguyên',
    tagline: 'Váy quấn thổ cẩm dệt chỉ đỏ đen, hoa văn chim công mặt trời và tiếng cồng chiêng ngân vang',
    description: 'Trang phục nữ và nam Tây Nguyên (Ê Đê, Ba Na, Gia Rai): Áo chui đầu khoét cổ chữ thuyền, váy quấn thổ cẩm may bằng sợi bông tự nhiên dệt tay, họa tiết hoa văn sọc đỏ đen trắng vàng hình mắt công, cây nêu, ngọn lửa. Nam giới mặc áo cộc tay khoét nách hoặc đóng khố đuôi dài thêu hoa văn. Vòng tay đồng, chuỗi hạt cườm ngũ sắc.',
    promptVi: 'Phục hồi trang phục Thổ Cẩm Tây Nguyên (Ê Đê / Ba Na / Gia Rai): Váy quấn dệt tay sợi bông tự nhiên dày dặn, dải hoa văn thổ cẩm đỏ thắm và đen tuyền đan xen hình rùa, chim muông và mặt trời đại ngàn. Vòng đeo tay bằng đồng thau sáng mộc mạc, chuỗi cườm nhiều màu quanh cổ. Thần thái khỏe khoắn, đôi mắt hoang dại sáng ngời tự do giữa không gian nhà rông và cồng chiêng.',
    promptEn: 'Restoring authentic Central Highlands ethnic minority costume (Ede / Ba Na / Jarai): handwoven heavy cotton wrap skirt with striking crimson and jet-black geometric patterns symbolizing sunrays, river turtles, and jungle birds. Handcrafted brass wristbands and colorful bead necklaces. Spirited, sun-drenched, courageous eyes under the shadow of the communal Rong house.',
    keywords: ['Central Highlands Ede brocade', 'Jarai Ba Na traditional wrap', 'red and black tribal pattern', 'brass ethnic bracelets', 'communal Rong house background'],
    colorPalette: [
      { name: 'Đỏ lửa đại ngàn', hex: '#D50000' },
      { name: 'Đen chàm bông', hex: '#1A1A1A' },
      { name: 'Vàng nắng cao nguyên', hex: '#FFAB00' },
      { name: 'Đồng thau vòng tay', hex: '#B8860B' },
    ],
    culturalNotes: 'Văn hóa mẫu hệ của người Ê-đê thể hiện quyền lực và sự tôn kính dành cho người phụ nữ qua từng đường nét dệt trên váy áo.',
    restorationAdvice: 'Giữ lại thớ dệt sợi bông thô mộc đặc trưng của khung cửi cầm tay vùng cao nguyên.'
  },
  {
    id: 'trangphuc_champa_ninhthuan',
    name: 'Trang Phục Truyền Thống Phụ Nữ Chăm & Tháp Cổ Ninh Thuận',
    category: 'ethnic_minorities',
    era: '1960-1975',
    eraLabel: '1960 – 1985',
    region: 'South',
    regionLabel: 'Ninh Thuận & Bình Thuận',
    tagline: 'Áo dài cổ tròn xẻ ngực Aw Drah, khăn trùm đầu thêu hoa và điệu múa quạt Apsara',
    description: 'Trang phục phụ nữ Chăm: Chiếc áo dài Aw Drah kín đáo dài qua gối ôm nhẹ thân hình, viền hoa văn tinh xảo ở cổ và tay áo. Khăn trùm đầu Mat Khan bằng lụa trắng hoặc thêu chỉ kim tuyến buông dài qua vai, thắt lưng dệt thổ cẩm Talei Ka-in thắt chéo ngang hông mềm mại. Bối cảnh tháp Chàm Po Klong Garai cổ kính bằng gạch đỏ nung.',
    promptVi: 'Phục hồi trang phục truyền thống phụ nữ Chăm: Áo dài Chăm vải lụa mềm mại màu xanh lục hoặc đỏ đô, khăn đội đầu dệt tơ lụa trắng tinh tế phủ nhẹ qua vai. Dải thắt lưng thổ cẩm dệt kim tuyến thắt chéo ngang hông duyên dáng. Đôi mắt sâu thẳm đen lay láy, nụ cười bí ẩn thanh thoát như vũ nữ Apsara bên tháp Chàm rêu phong cổ kính.',
    promptEn: 'Restoring authentic Cham ethnic traditional attire (Ninh Thuan province): long flowing silk Aw Drah tunic in emerald or ruby tones, graceful white sheer head veil draping gently over shoulders. Golden metallic-threaded Talei Ka-in sash belt tied across the hip. Deep hypnotic dark eyes, serene ethereal expression reminiscent of Apsara stone carvings against antique terracotta Cham towers.',
    keywords: ['Cham ethnic traditional dress', 'Aw Drah silk tunic', 'Cham sheer head veil', 'Po Klong Garai tower', 'mystic Apsara beauty'],
    colorPalette: [
      { name: 'Xanh lục ngọc', hex: '#00796B' },
      { name: 'Đỏ gạch tháp Chàm', hex: '#C0392B' },
      { name: 'Trắng khăn trùm', hex: '#FAFAFA' },
      { name: 'Vàng kim tuyến', hex: '#FBC02D' },
    ],
    culturalNotes: 'Nghệ thuật dệt thổ cẩm Mỹ Nghiệp và gốm Bàu Trúc của người Chăm là những di sản văn hóa phi vật thể vô giá.',
    restorationAdvice: 'Tái tạo độ mềm mại của tà khăn lụa phủ trên tóc và sắc đỏ nung rực rỡ của gạch tháp cổ.'
  },

  // ==========================================
  // 5. BỐI CẢNH LỊCH SỬ & KIẾN TRÚC (5 MẪU)
  // ==========================================
  {
    id: 'setting_phoco_hanoi',
    name: 'Phố Cổ Hà Nội & Bờ Hồ Thập Niên 1950 - 1980',
    category: 'historical_settings',
    era: '1950-1960',
    eraLabel: '1950 – 1980',
    region: 'North',
    regionLabel: 'Hà Nội 36 Phố Phường',
    tagline: 'Mái ngói âm dương rêu phong, tường vôi vàng cổ kính và đường tàu điện leng keng',
    description: 'Bối cảnh phố cổ Hà Nội với những ngôi nhà ống mái ngói vảy cá phủ rêu, tường quét vôi vàng đặc trưng kiến trúc thuộc địa Pháp pha trộn bản địa, cửa gỗ sổ chớp sơn xanh lá cây ngả màu, cột đèn sắt cổ điển và tiếng chuông tàu điện Bờ Hồ.',
    promptVi: 'Tái dựng bối cảnh phố cổ Hà Nội thập niên 1960-1970: Nhà cổ mái ngói rêu phong, tường vôi vàng cổ kính bạc màu thời gian, cửa sổ chớp gỗ sơn xanh lam ngả rêu. Vỉa hè lát đá gạch chỉ, hàng cây sấu cổ thụ rợp bóng mát, xa xa có bóng tàu điện bánh sắt leng keng. Ánh sáng tự nhiên dịu nhẹ mùa thu Hà Nội.',
    promptEn: 'Restoring historical 1960s-1970s Old Quarter Hanoi streetscape: mossy terracotta tiled roofs, distressed French-colonial yellow ochre lime plaster walls, weathered teal-blue wooden louvered window shutters. Old red-brick sidewalk beneath centuries-old Dracontomelon shade trees, vintage electric tram in soft morning autumnal golden light.',
    keywords: ['Hanoi Old Quarter 1970s', 'yellow ochre French colonial walls', 'mossy terracotta roof', 'wooden louvered shutters', 'vintage Hanoi tramway'],
    colorPalette: [
      { name: 'Vàng vôi Hà Nội', hex: '#D4AF37' },
      { name: 'Xanh chớp gỗ cũ', hex: '#2C5E57' },
      { name: 'Đỏ ngói vảy cá', hex: '#A94A42' },
      { name: 'Xám rêu phong', hex: '#595F54' },
    ],
    culturalNotes: 'Tàu điện leng keng và tường vôi vàng là hai linh hồn thị giác biểu trưng cho nét trầm mặc, hoài cổ của Hà Nội thế kỷ 20.',
    restorationAdvice: 'Giữ lại độ loang lổ tự nhiên của vôi vữa và rêu bám trên tường, tránh để AI phủ sơn phẳng lì như nhà mới xây.'
  },
  {
    id: 'setting_saigon_honngocvienthai',
    name: 'Sài Gòn Hòn Ngọc Viễn Đông & Chợ Bến Thành (1960 - 1975)',
    category: 'historical_settings',
    era: '1960-1975',
    eraLabel: '1960 – 1975',
    region: 'South',
    regionLabel: 'Sài Gòn Trung Tâm & Chợ Lớn',
    tagline: 'Tháp đồng hồ Chợ Bến Thành, đại lộ Lê Lợi rợp bóng me và dòng xe Vespa cổ',
    description: 'Không gian đô thị Sài Gòn phồn hoa: Tháp đồng hồ Chợ Bến Thành bốn mặt, bùng binh Quách Thị Trang, các rạp chiếu bóng Rex, Eden, Eden Passage; dòng xe máy Vespa, Lambretta, xe xích lô máy và xe taxi cóc hai màu vàng xanh chạy tấp nập dưới hàng cây me xanh mướt.',
    promptVi: 'Phục dựng bối cảnh đường phố Sài Gòn thập niên 1960-1970: Đại lộ rợp bóng cây me xanh mát, tháp đồng hồ Chợ Bến Thành uy nghi, biển hiệu vẽ tay bằng font chữ retro cổ điển. Dòng người qua lại trong trang phục áo dài tân thời và âu phục thanh lịch, xe taxi cóc Renault 4CV hai màu xanh vàng và xe Vespa cổ điển.',
    promptEn: 'Restoring vibrant 1960s-1970s Saigon city streetscape: sunlit tamarind tree-lined Le Loi boulevard, iconic Ben Thanh market clock tower, hand-painted retro typography shop billboards. Bustling street life with women in colorful raglan Ao Dai, two-tone yellow-and-cyan vintage Renault taxis and classic Vespa scooters. Cinematic retro urban warmth.',
    keywords: ['vintage Saigon streetscape', 'Ben Thanh market clocktower', 'vintage Vespa and taxi', 'hand-painted retro billboard', 'Pearl of the Orient 1970s'],
    colorPalette: [
      { name: 'Vàng taxi Sài Gòn', hex: '#F4D03F' },
      { name: 'Xanh cyan taxi cóc', hex: '#16A085' },
      { name: 'Đỏ biển hiệu retro', hex: '#C0392B' },
      { name: 'Xanh lá me bay', hex: '#27AE60' },
    ],
    culturalNotes: 'Sự nhộn nhịp, cởi mở và phong cách thời trang dẫn đầu xu hướng làm nên danh xưng Hòn Ngọc Viễn Đông của Sài Gòn xưa.',
    restorationAdvice: 'Khôi phục độ sắc nét của các nét vẽ font chữ biển hiệu quảng cáo viết tay thời bấy giờ.'
  },
  {
    id: 'setting_langque_dongbang_bacbo',
    name: 'Làng Quê Bắc Bộ (Cây Đa, Bến Nước, Sân Đình & Giếng Làng)',
    category: 'historical_settings',
    era: '1950-1960',
    eraLabel: '1950 – 1985',
    region: 'North',
    regionLabel: 'Làng Quê Đồng Bằng Sông Hồng',
    tagline: 'Cổng làng gạch nung cổ kính, bờ ao hoa súng và luống rơm vàng óng ả mùa gặt',
    description: 'Khung cảnh làng quê Việt Nam thanh bình: Cổng làng tam quan rêu phong, cây đa cổ thụ rủ rễ buông dài bên giếng nước làng bằng đá ong; mái đình làng cong vút chạm trổ rồng mây; bờ ao hoa súng tím biếc, đống rơm vàng cao vút thơm mùi lúa mới và đàn trâu thung thăng gặm cỏ.',
    promptVi: 'Phục dựng bối cảnh Làng Quê Bắc Bộ Việt Nam xưa: Cổng làng gạch đỏ cổ kính rêu phong, cây đa cổ thụ tỏa bóng mát bên giếng đá ong trong vắt. Mái đình làng cong vút ngói đỏ, sân đình lát gạch Bát Tràng đỏ au phơi lúa vàng. Bờ ao hoa sen hoa súng nở rộ, bầu trời làng quê thanh bình trong trẻo, ánh nắng chiều tà ấm áp.',
    promptEn: 'Restoring peaceful historical Northern Vietnamese village scenery: weathered ancient brick village gate with aged banyan tree roots over a rustic laterite stone well. Sweeping curved terracotta temple roof with traditional courtyards. Serene lotus pond, golden straw mounds, tranquil countryside atmosphere in warm late-afternoon golden hour sunlight.',
    keywords: ['traditional Northern Vietnamese village', 'ancient village gate', 'banyan tree and well', 'laterite stone texture', 'golden hour countryside'],
    colorPalette: [
      { name: 'Đỏ gạch Bát Tràng', hex: '#B73A2A' },
      { name: 'Nâu đá ong', hex: '#795548' },
      { name: 'Vàng rơm rạ', hex: '#F9A825' },
      { name: 'Xanh cây đa cổ thụ', hex: '#2E7D32' },
    ],
    culturalNotes: 'Cây đa - bến nước - sân đình là biểu tượng cội nguồn tâm linh, gắn kết cộng đồng làng xã của người Việt ngàn đời.',
    restorationAdvice: 'Tái hiện chiều sâu lớp lang từ tán cây đa phía trước đến mái đình xa xa và mặt nước ao làng trong vắt.'
  },
  {
    id: 'setting_songnuoc_chonoimientay',
    name: 'Chợ Nổi Sông Nước Miền Tây & Rặng Dừa Nước (1960 - 1985)',
    category: 'historical_settings',
    era: '1960-1975',
    eraLabel: '1960 – 1985',
    region: 'South',
    regionLabel: 'Cái Răng, Ngã Bảy & Phong Điền',
    tagline: 'Ghe xuồng ba lá tấp nập, cây bẹo treo trái ngọt và rặng dừa nước soi bóng dòng kênh phù sa',
    description: 'Khung cảnh sông nước Cửu Long: Hàng trăm chiếc ghe tam bản, xuồng ba lá chở đầy dưa hấu, bưởi năm roi, chuối chín vàng tấp nập trên ngã bảy sông. Cây bẹo bằng tre treo lủng lẳng các loại nông sản chào hàng; rặng dừa nước xanh ngắt đôi bờ, dòng nước đỏ nặng hạt phù sa màu mỡ.',
    promptVi: 'Phục hồi bức tranh Chợ Nổi Sông Nước Miền Tây Nam Bộ: Xuồng ba lá và ghe tam bản bồng bềnh chở đầy hoa quả nhiệt đới tươi rói (chuối chín, dưa hấu, dừa xiêm). Cây bẹo tre treo trái ngọt buôn bán rộn ràng, người dân đội nón lá chèo xuồng với nụ cười sảng khoái đôn hậu. Dòng sông đỏ nặng hạt phù sa, rặng dừa nước xanh rì dưới nắng mai rực rỡ.',
    promptEn: 'Restoring vibrant Mekong Delta Floating Market (Cho Noi) historical scenery: traditional wooden sampan boats (Xuong Ba La) loaded with colorful tropical fruits (watermelons, pomelos, yellow bananas). Bamboo advertising poles (Cay Beo) swaying gently. Smiling boatmen in conical hats rowing through rich alluvial silt rivers bordered by lush nipa palm mangroves.',
    keywords: ['Mekong floating market Cho Noi', 'wooden sampan Xuong Ba La', 'alluvial silt river', 'tropical fruit harvest', 'nipa palm mangrove'],
    colorPalette: [
      { name: 'Nâu phù sa sông', hex: '#8D6E63' },
      { name: 'Xanh dừa nước', hex: '#1B5E20' },
      { name: 'Vàng chuối chín', hex: '#FDD835' },
      { name: 'Đỏ dưa hấu', hex: '#E53935' },
    ],
    culturalNotes: 'Văn hóa chợ nổi phản ánh cuộc sống gắn liền mật thiết với sông nước, nghĩa tình hào sảng của người dân phương Nam.',
    restorationAdvice: 'Tái tạo độ gợn sóng nước phù sa chân thực và màu sắc tươi ngon mọng nước của các loại trái cây.'
  },
  {
    id: 'setting_codohue_songhuong_kinhthanh',
    name: 'Cố Đô Huế, Cột Cờ Kỳ Đài & Sông Hương Trầm Mặc (1950 - 1975)',
    category: 'historical_settings',
    era: '1950-1960',
    eraLabel: '1950 – 1975',
    region: 'Central',
    regionLabel: 'Cố Đô Huế',
    tagline: 'Cổng Ngọ Môn sừng sững, cầu Tràng Tiền 6 vài 12 nhịp và tiếng đò ca Huế ban đêm',
    description: 'Không gian di sản cố đô: Cổng Ngọ Môn lầu Ngũ Phụng mái ngói hoàng lưu ly vàng óng, cột cờ Kỳ Đài uy nghiêm trước mặt sông Hương; cầu Tràng Tiền kết cấu thép duyên dáng soi bóng nước biếc; các ngôi nhà rường cổ kính ẩn hiện dưới bóng cây ngô đồng nở hoa tím nhạt.',
    promptVi: 'Phục hồi bối cảnh Cố Đô Huế trầm mặc cổ kính: Cổng Ngọ Môn và Kỳ Đài cổ kính rêu phong sừng sững, cầu Tràng Tiền bắc qua dòng sông Hương êm đềm trong sương sớm. Xa xa có con thuyền nan độc mộc chèo nhẹ, rặng cây ngô đồng trổ hoa tím biếc dịu dàng. Ánh sáng bảng lảng thi vị mang đậm chiều sâu lịch sử triều Nguyễn.',
    promptEn: 'Restoring poetic Imperial City of Hue heritage landscape: majestic stone Ngo Mon Gate with golden imperial glazed tile roofs, iconic steel Trang Tien bridge spanning the tranquil Perfume River in misty dawn light. A solitary wooden wooden rowing boat gliding softly, blooming purple parasol trees. Poetic, atmospheric, and regal historical Central Vietnam serenity.',
    keywords: ['Hue Imperial Citadel Ngo Mon', 'Trang Tien bridge steel frame', 'Perfume River morning mist', 'royal glazed tile roof', 'poetic historic Hue atmosphere'],
    colorPalette: [
      { name: 'Vàng lưu ly cung đình', hex: '#C5A059' },
      { name: 'Xanh sông Hương', hex: '#00838F' },
      { name: 'Tím hoa ngô đồng', hex: '#7E57C2' },
      { name: 'Xám đá thành cổ', hex: '#616161' },
    ],
    culturalNotes: 'Huế là kinh đô cuối cùng của chế độ phong kiến Việt Nam, nơi lưu giữ tinh hoa kiến trúc cung đình và nhã nhạc cung đình đỉnh cao.',
    restorationAdvice: 'Bảo lưu màu rêu phong trên các tường thành đá và độ óng của ngói hoàng lưu ly dưới ánh nắng.'
  },

  // ==========================================
  // 6. XE CỔ & ĐẠO CỤ HOÀI NIỆM (4 MẪU)
  // ==========================================
  {
    id: 'prop_xe_vespa_lambretta_cophuong',
    name: 'Xe Vespa Sprint / Super & Lambretta Cổ (1960 - 1975)',
    category: 'vehicles_props',
    era: '1960-1975',
    eraLabel: '1960 – 1975',
    region: 'Nationwide',
    regionLabel: 'Đô Thị Sài Gòn & Hà Nội',
    tagline: 'Chiếc xe tay ga huyền thoại của các cô gái tân thời và chàng trai phong trần',
    description: 'Dòng xe tay ga hai thì Piaggio Vespa Sprint 150, Vespa Super, Primavera hoặc Lambretta màu trắng sữa, xanh bạc hà, đỏ cam. Bánh xe nhỏ lốp có viền trắng, đuôi ong bầu tròn trịa, gắn thêm kính chiếu hậu tròn inox và bánh xe sơ-cua phía sau.',
    promptVi: 'Phục chế phương tiện cổ điển: Chiếc xe tay ga Vespa Sprint / Super cổ điển màu sơn bóng bẩy (trắng ngà hoặc xanh ngọc pastel), các chi tiết kim loại inox sáng loáng không bị rỉ sét. Lốp xe cao su có viền trắng cổ điển, yên xe bọc da nâu may chỉ tinh tế.',
    promptEn: 'Restoring iconic 1960s-1970s vintage Piaggio Vespa Sprint / Lambretta scooter: glossy vintage pastel mint or ivory enamel finish, sparkling chrome rearview mirrors and headlamp bezel. Classic whitewall tires, crafted tan leather double seat with authentic retro patina.',
    keywords: ['vintage Vespa Sprint', 'whitewall tires scooter', 'retro pastel scooter', 'chrome finish Vespa', '1960s urban transport'],
    colorPalette: [
      { name: 'Trắng ngà men sữa', hex: '#F9F6EE' },
      { name: 'Xanh mint pastel', hex: '#A2E8DD' },
      { name: 'Inox mạ cờ-rôm', hex: '#E5E8E8' },
      { name: 'Nâu da yên xe', hex: '#8B4513' },
    ],
    culturalNotes: 'Vespa là biểu tượng của sự tự do, phong cách sống lãng mạn và thời thượng của thanh niên Việt Nam thập niên 60-70.',
    restorationAdvice: 'Tái tạo độ bóng phản chiếu trên thân xe kim loại và chi tiết kim loại mạ chrome.'
  },
  {
    id: 'prop_xe_dap_phuonghoang_supercub',
    name: 'Xe Đạp Phượng Hoàng & Honda Super Cub 50 (1970 - 1990)',
    category: 'vehicles_props',
    era: '1975-1985',
    eraLabel: '1970 – 1990',
    region: 'Nationwide',
    regionLabel: 'Toàn quốc thời kỳ Bao Cấp & Đổi Mới',
    tagline: 'Cả một gia tài thời bao cấp: Xe đạp cánh chả Phượng Hoàng và Honda Dame/Cub 78, 81 kim vàng giọt lệ',
    description: 'Xe đạp Phượng Hoàng đen bóng nhập khẩu Trung Quốc khung võng có gắn chuông đồng reng reng, bơm tay gắn gióng xe, biển số nhôm đăng ký xe; hoặc chiếc xe máy Honda Super Cub 50cc (Cub cánh én, Cub 81 kim vàng giọt lệ, Honda Dame) màu xanh lục bảo hoặc đỏ đun.',
    promptVi: 'Phục hồi xe cộ kỷ vật thời Bao Cấp: Chiếc xe đạp Phượng Hoàng màu đen bóng có chuông đồng sáng loáng và biển kiểm soát nhôm sau chắn bùn; hoặc chiếc xe máy Honda Super Cub 81 màu xanh bích với yếm trắng đặc trưng, đèn pha tròn kim loại sáng trong.',
    promptEn: 'Restoring legendary Subsidy-era transport: vintage black Phoenix roadster bicycle with brass bell and registered aluminum license plate; or iconic Japanese Honda Super Cub 50 (Cub 81) in emerald green with white leg-shields and pristine round chrome headlamp.',
    keywords: ['Phoenix vintage bicycle', 'Honda Super Cub 81', 'Subsidy era transport Vietnam', 'vintage chrome bicycle bell', 'green vintage motorbike'],
    colorPalette: [
      { name: 'Đen bóng Phượng Hoàng', hex: '#0B0B0B' },
      { name: 'Xanh bích Super Cub', hex: '#1C3F3A' },
      { name: 'Trắng yếm xe', hex: '#F4F6F7' },
      { name: 'Vàng đồng chuông xe', hex: '#D4AF37' },
    ],
    culturalNotes: 'Thời bấy giờ một chiếc xe đạp Phượng Hoàng hay xe Honda Cub có giá trị bằng cả một căn nhà phố cổ.',
    restorationAdvice: 'Khắc họa rõ các nan hoa căm xe bằng kim loại và yếm nhựa màu trắng ngà của xe Cub.'
  },
  {
    id: 'prop_non_la_bai_tho_quat_nan',
    name: 'Nón Lá Bài Thơ Xứ Huế, Quạt Nan Tre & Ví Cầm Tay Vintage',
    category: 'vehicles_props',
    era: '1950-1960',
    eraLabel: '1950 – 1985',
    region: 'Nationwide',
    regionLabel: 'Toàn quốc',
    tagline: 'Những đạo cụ cầm tay tôn vinh nét duyên ngầm của người phụ nữ Việt',
    description: 'Nón lá bài thơ chằm chỉ cước trong suốt khi soi lên nắng thấy hình cầu Tràng Tiền và câu thơ, nón quai thao dải lụa điều, quạt nan tre xòe mềm mại, ví cầm tay đan hạt cườm thập niên 70.',
    promptVi: 'Phục chế đạo cụ truyền thống: Chiếc nón lá cọ chằm tỉ mỉ từng đường kim mũi chỉ, quai nón bằng lụa mềm màu tím hoa cà hoặc hồng đào. Quạt nan tre đan tay mộc mạc hoặc ví cầm tay thêu chỉ kim tuyến vintage. Giữ trọn vẹn nét thanh tao trong cử chỉ cầm đạo cụ.',
    promptEn: 'Restoring authentic handheld Vietnamese cultural accessories: delicate palm leaf conical Non La hat with intricate bamboo rib stitching and soft lavender silk chin strap. Rustic hand-woven bamboo folding fan or vintage embroidered clutch. Natural graceful posture holding traditional props.',
    keywords: ['Non La palm hat', 'bamboo folding fan', 'silk chin strap', 'embroidered vintage clutch', 'Vietnamese traditional accessories'],
    colorPalette: [
      { name: 'Vàng lá cọ khô', hex: '#E6D7B9' },
      { name: 'Tím quai lụa', hex: '#7D5C7B' },
      { name: 'Xanh nan tre', hex: '#6B8E23' },
      { name: 'Hồng phấn quai nón', hex: '#F4C2C2' },
    ],
    culturalNotes: 'Chiếc nón lá bài thơ là sự kết hợp tài tình giữa thủ công mỹ nghệ và thi ca cung đình Huế.',
    restorationAdvice: 'Tái hiện vân gân lá cọ tự nhiên và độ mỏng nhẹ của nón khi đón ánh sáng xuyên qua.'
  },
  {
    id: 'prop_dai_radio_cassette_national',
    name: 'Đài Radio Cassette National & Quạt Tai Voi Liên Xô (1975 - 1990)',
    category: 'vehicles_props',
    era: '1975-1985',
    eraLabel: '1975 – 1990',
    region: 'Nationwide',
    regionLabel: 'Gia Đình Thập Niên 80',
    tagline: 'Kỷ vật phòng khách gia đình thời kỳ mở cửa và giao lưu quốc tế',
    description: 'Chiếc đài cassette National vỏ nhựa đỏ/bạc với 2 hộc băng cassette, ăng-ten rút dài; quạt bàn tai voi (quạt hoa sen) của Liên Xô cánh cao su mềm màu trắng đục; ấm trà gốm Bát Tràng và phích nước Rạng Đông in hình hoa sen.',
    promptVi: 'Phục dựng đồ vật kỷ niệm gia đình Việt Nam thập niên 1980: Chiếc đài radio cassette National màu bạc với các nút bấm cơ học, ăng-ten kim loại vươn cao. Phích nước Rạng Đông in hoa sen và bộ ấm chén trà Bát Tràng tráng men ngọc đặt trên bàn gỗ gụ. Ánh sáng ấm cúng của phòng khách gia đình xưa.',
    promptEn: 'Restoring 1980s Vietnamese household heirloom items: vintage National dual-cassette boombox radio with mechanical switches and metallic telescopic antenna. Iconic Rang Dong thermos flask with floral print and traditional Bat Trang ceramic tea set on dark rosewood coffee table. Warm nostalgic family room ambiance.',
    keywords: ['vintage National cassette radio', 'Rang Dong vintage thermos', 'Bat Trang ceramic tea set', '1980s Vietnamese living room', 'nostalgic household props'],
    colorPalette: [
      { name: 'Bạc kim loại đài', hex: '#D3D3D3' },
      { name: 'Đỏ phích nước', hex: '#A82020' },
      { name: 'Nâu gỗ gụ', hex: '#4A2E18' },
      { name: 'Xanh men ngọc Bát Tràng', hex: '#7BA098' },
    ],
    culturalNotes: 'Những món đồ điện tử thời kỳ này là niềm tự hào của cả gia đình, thường được phủ khăn ren trang trọng.',
    restorationAdvice: 'Giữ lại chất cảm bề mặt nhựa và kim loại bóng mờ của thập niên 80.'
  },

  // ==========================================
  // 7. TONE MÀU PHIM ANALOG & BUỒNG TỐI (3 MẪU)
  // ==========================================
  {
    id: 'tone_kodak_tri_x_blackwhite',
    name: 'Tone Phim Đen Trắng Kodak Tri-X 400 & Giấy Bạc Muối',
    category: 'vintage_tones',
    era: '1950-1960',
    eraLabel: '1950 – 1970',
    region: 'Nationwide',
    regionLabel: 'Kỹ Thuật Buồng Tối Cổ Điển',
    tagline: 'Độ tương phản đen trắng sâu thẳm, hạt phim mịn (fine grain) và sắc độ xám mượt mà',
    description: 'Chất lượng ảnh rửa buồng tối cổ điển (Silver Gelatin Print) trên giấy bạc muối có độ sâu quang học tuyệt hảo, vùng tối đen tuyền nhưng không mất chi tiết, vùng sáng mềm mại, hạt grain mịn màng đầy chất điện ảnh.',
    promptVi: 'Phục chế theo phong cách ảnh đen trắng nghệ thuật buồng tối cổ điển (Classic Black & White Silver Gelatin Print): Sắc độ xám chuyển tầng mượt mà (rich tonal range), tương phản sâu thẳm, hạt grain phim 35mm mịn màng tự nhiên. Khử sạch toàn bộ vết mốc ố vàng nhưng giữ nguyên 100% cảm xúc hoài niệm đen trắng nguyên bản.',
    promptEn: 'Restoring in authentic masterclass Black & White Silver Gelatin print style: deep rich velvety blacks, silky smooth grayscale tonal gradient, fine analog 35mm film grain structure (Kodak Tri-X 400 look). Crisp focus on eyes and facial skin texture while maintaining timeless monochrome photographic soul.',
    keywords: ['Silver Gelatin Print style', 'Kodak Tri-X 400 film grain', 'rich black and white tonal range', 'vintage darkroom print', 'analog monochrome soul'],
    colorPalette: [
      { name: 'Đen tuyền buồng tối', hex: '#0D0D0D' },
      { name: 'Xám chì trung tính', hex: '#555555' },
      { name: 'Xám bạc ánh sáng', hex: '#B0B0B0' },
      { name: 'Trắng giấy bạc muối', hex: '#F0EFEA' },
    ],
    culturalNotes: 'Ảnh đen trắng rửa buồng tối của các nghệ sĩ nhiếp ảnh bậc thầy Việt Nam luôn có độ tương phản và chiều sâu vô cùng độc đáo.',
    restorationAdvice: 'Dành cho những người muốn giữ nguyên vẹn cảm xúc ảnh đen trắng gốc mà không muốn tô màu AI.'
  },
  {
    id: 'tone_agfacolor_kodachrome_warm',
    name: 'Tone Màu Phim Agfacolor / Kodachrome Hoài Niệm (1960 - 1975)',
    category: 'vintage_tones',
    era: '1960-1975',
    eraLabel: '1960 – 1975',
    region: 'Nationwide',
    regionLabel: 'Nhiếp Ảnh Màu Thời Kỳ Đầu',
    tagline: 'Sắc vàng ấm áp của nắng nhiệt đới, da mặt hồng hào tự nhiên và màu đỏ tươi retro',
    description: 'Tông màu của các thước phim màu kinh điển Kodachrome 64 và Agfacolor chụp tại Việt Nam thập niên 60-70: Sắc đỏ ấm, xanh lá ngả vàng mộc, bầu trời xanh ngọc dịu và làn da người Á Đông hồng hào khỏe khoắn.',
    promptVi: 'Tô màu và phục hồi theo bảng màu phim màu cổ điển Kodachrome 64 / Agfacolor thập niên 1960-1970: Tông màu ấm áp, da mặt người Việt Nam ánh hồng tự nhiên giàu sức sống. Màu sắc trang phục rực rỡ nhưng trầm ấm (muted rich colors), không bị bệt màu kỹ thuật số. Giữ độ hạt analog nhẹ nhàng.',
    promptEn: 'Colorizing and restoring with authentic 1960s-1970s Kodachrome 64 / Agfacolor vintage film color profile: warm golden undertones, glowing lifelike Asian skin tones with subtle natural blush, muted rich primary hues (vintage vermillion, emerald green, mustard yellow). Soft analog film warmth without digital oversaturation.',
    keywords: ['Kodachrome 64 vintage color profile', 'Agfacolor 1970s palette', 'natural warm Asian skin tones', 'analog color restoration', 'cinematic retro colorization'],
    colorPalette: [
      { name: 'Đỏ son Kodachrome', hex: '#C0392B' },
      { name: 'Vàng hổ phách', hex: '#D4AC0D' },
      { name: 'Xanh mòng két', hex: '#16A085' },
      { name: 'Hồng da khỏe khoắn', hex: '#F5CBA7' },
    ],
    culturalNotes: 'Những bức ảnh màu chụp Sài Gòn và Hà Nội xưa trên phim Agfa/Kodak luôn mang một vẻ đẹp ấm áp, gợi nhớ ký ức tuổi thơ.',
    restorationAdvice: 'Không để màu sắc bị rực chói (oversaturated) kiểu bộ lọc Instagram hiện đại.'
  },
  {
    id: 'tone_sepia_vintage_postcard',
    name: 'Tone Nâu Cổ Điển Sepia Bưu Thiếp Xưa (Đầu Thế Kỷ 20)',
    category: 'vintage_tones',
    era: '1950-1960',
    eraLabel: '1950 Trở Về Trước',
    region: 'Nationwide',
    regionLabel: 'Bưu Ảnh Đông Dương',
    tagline: 'Sắc nâu ấm trầm mặc, viền răng cưa bưu thiếp và chất giấy xơ cổ kính',
    description: 'Sắc độ nâu ấm Sepia gợi nhớ các tấm bưu thiếp Đông Dương cổ điển (Indochine vintage postcards). Tông màu trầm lắng tạo cảm giác tôn kính, trang trọng cho ảnh thờ gia tiên hoặc chân dung tiền nhân.',
    promptVi: 'Phục chế theo tone màu nâu ấm Sepia bưu thiếp Đông Dương cổ điển: Dải sắc độ nâu cà phê ấm áp chuyển từ tối sẫm sang sáng kem ngà. Nét mặt sắc sảo và tôn nghiêm, giữ lại cảm giác trang trọng cổ kính của bức ảnh truyền đời gia tộc. Khử nứt rách nhưng lưu giữ linh hồn thời gian.',
    promptEn: 'Restoring in timeless warm Sepia tone Indochine vintage postcard aesthetic: velvety coffee-brown shadows transitioning into soft warm ivory highlights. Dignified, ancestral portrait fidelity, sharp facial features with antique textured depth. Preserving solemn historical dignity for family heirlooms.',
    keywords: ['warm Sepia tone restoration', 'Indochine vintage postcard', 'ancestral family portrait', 'coffee brown monochrome', 'timeless heritage photography'],
    colorPalette: [
      { name: 'Nâu cà phê sẫm', hex: '#3E2723' },
      { name: 'Nâu Sepia ấm', hex: '#795548' },
      { name: 'Kem ngà giấy cổ', hex: '#D7CCC8' },
      { name: 'Trắng ánh vàng', hex: '#FFF8E1' },
    ],
    culturalNotes: 'Tone Sepia rất thích hợp cho ảnh chân dung ông bà, cụ tổ thờ phụng trên bàn thờ gia tiên của người Việt.',
    restorationAdvice: 'Đảm bảo độ nét cao ở đôi mắt để chân dung toát lên thần thái sống động dù trong gam màu đơn sắc.'
  }
];
