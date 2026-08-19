export interface ProTechniqueGroup {
  id: string;
  number: string;
  titleVi: string;
  titleEn: string;
  tagline: string;
  badge: string;
  iconName: string;
  coreProblem: string;
  scientificPrinciple: string;
  promptVi: string;
  promptEn: string;
  keywordsEn: string[];
  recommendedSettings: {
    label: string;
    value: string;
  }[];
  comparisons: {
    bad: string;
    pro: string;
  };
}

export const PRO_RESTORATION_TECHNIQUES: ProTechniqueGroup[] = [
  {
    id: 'tech_micro_texture',
    number: '01',
    titleVi: 'Kỹ Thuật Vi Mô "Micro-Texture" (Vân Da & Lỗ Chân Lông Tự Nhiên)',
    titleEn: 'Organic Micro-Texture & Subsurface Scattering (SSS)',
    tagline: 'Chấm dứt hoàn toàn hiện tượng da bệt, mặt sáp nhựa AI giả tạo',
    badge: 'Tiêu Chuẩn Chân Thực 8K',
    iconName: 'Sparkles',
    coreProblem: 'Các mô hình AI thông thường thường làm mịn bề mặt quá mức, biến khuôn mặt người thật thành tượng sáp hoặc hình búp bê nhựa silicon vô hồn, làm mất hoàn toàn giá trị tư liệu gia đình.',
    scientificPrinciple: 'Tái tạo hiện tượng tán xạ ánh sáng dưới da (Subsurface Scattering - SSS) cho phép ánh sáng thâm nhập vào các lớp biểu bì, kết hợp lưới vi mô lỗ chân lông tự nhiên, lông tơ li ti (peach fuzz) và bảo toàn các nếp gấp biểu cảm chân thực (rãnh cười, vết chân chim).',
    promptVi: 'Phục hồi da mặt người thật với kết cấu vi mô tự nhiên (Organic Micro-Texture): Khóa 100% cấu trúc biểu bì thật, hiển thị rõ lỗ chân lông tự nhiên mịn màng, hiện tượng tán xạ ánh sáng dưới da (Subsurface Scattering - SSS) tạo độ mướt và ấm áp tự nhiên. Bảo tồn các nếp nhăn biểu cảm thật quanh khóe mắt và nụ cười. Tuyệt đối không làm mịn bệt da, không tạo hiệu ứng sáp nhựa silicon hay bóng dầu giả tạo.',
    promptEn: 'Restoring hyper-realistic human skin with organic micro-texture: preserve 100% natural epidermal pore structure, fine micro-creases, subtle peach fuzz, and lifelike subsurface scattering (SSS) for translucent warm skin luminescence. Retain authentic age-appropriate expression lines around eyes and smile. Strictly zero plastic smoothing, zero artificial airbrushed blur, and zero waxy silicone doll appearance.',
    keywordsEn: [
      'organic skin micro-texture',
      'subsurface scattering SSS',
      'fine facial pore grid',
      'translucent skin warmth',
      'no airbrushed plastic blur',
      'realistic natural age wrinkles'
    ],
    recommendedSettings: [
      { label: 'Mức độ Denoise', value: '45% (Giữ lại vi hạt da)' },
      { label: 'Cơ chế render', value: 'Subsurface Scattering v3' },
      { label: 'Tần số chi tiết', value: 'High-Frequency Skin Layer' }
    ],
    comparisons: {
      bad: 'Da mặt bị AI cà phẳng lỳ, trắng toát vô hồn, mất sạch lỗ chân lông và mất các đường nét tự nhiên của ông bà, cha mẹ.',
      pro: 'Từng nếp nhăn thời gian, lỗ chân lông và sắc da hồng hào ấm áp được phục hiện sắc sảo, tự nhiên như chụp trực tiếp.'
    }
  },
  {
    id: 'tech_eye_catchlight',
    number: '02',
    titleVi: 'Tái Tạo Đồng Tử & Đốm Sáng Giác Mạc (Catchlight & Iris Geometry)',
    titleEn: 'Iris Geometry & Optical Cornea Catchlight',
    tagline: 'Thổi bừng linh hồn và chiều sâu thần thái đôi mắt người xưa',
    badge: 'Bảo Tồn Thần Thái Mắt',
    iconName: 'Eye',
    coreProblem: 'Đôi mắt trong ảnh cũ thường bị mốc che mờ, đục ngầu, mất lòng đen hoặc khi AI vẽ lại bị lác mắt, đồng tử tròn xoe vô cảm và thiếu điểm phản quang.',
    scientificPrinciple: 'Định vị chính xác hình học mống mắt (Iris trabecular meshwork), độ cong giác mạc đón nguồn sáng tự nhiên từ cửa sổ hoặc đèn studio cổ điển (Catchlight), củng mạc trắng ngà có vi mạch máu li ti tạo độ ẩm ướt sống động.',
    promptVi: 'Phục hồi đôi mắt sống động có chiều sâu quang học: Tái tạo đồng tử sắc nét với vân mống mắt tự nhiên chi tiết, đốm sáng phản quang giác mạc (Catchlight) tự nhiên đón nguồn sáng studio. Củng mạc mắt có độ ẩm ướt chân thực và vi mạch máu li ti. Giữ trọn 100% hướng nhìn, độ sâu hốc mắt và thần thái hiền hậu nguyên bản của người chụp.',
    promptEn: 'Restoring ultra-crisp lifelike human eyes: reconstruct distinct iris geometry with intricate radial trabecular patterns, razor-sharp optical cornea catchlight reflecting soft studio keylight. Moist, natural sclera with microscopic capillary realism. 100% accurate gaze alignment, natural eye contour depth, and emotional warmth matching the original vintage archival portrait.',
    keywordsEn: [
      'sharp iris geometry',
      'cornea catchlight reflection',
      'moist lifelike sclera',
      'microscopic capillary realism',
      'preserved original eye gaze',
      'deep emotional eye soul'
    ],
    recommendedSettings: [
      { label: 'Khóa tọa độ mắt', value: 'Pupil & Iris Lock (100%)' },
      { label: 'Nguồn sáng Catchlight', value: 'Studio Softbox / Window Key' },
      { label: 'Độ sắc nét đồng tử', value: '8K Optical Precision' }
    ],
    comparisons: {
      bad: 'Mắt bị mờ đục, AI vẽ lệch hướng nhìn, mắt trợn trừng hoặc đồng tử như mắt kính áp tròng nhân tạo.',
      pro: 'Ánh mắt long lanh ấm áp, thấy rõ từng sợi vân mống mắt và đốm sáng đón ánh nắng tự nhiên đầy cảm xúc.'
    }
  },
  {
    id: 'tech_analog_grain',
    number: '03',
    titleVi: 'Bảo Tồn Hạt Phim Bạc Muối Analog (35mm Organic Film Grain)',
    titleEn: '35mm Silver Halide Film Grain & Depth',
    tagline: 'Lưu giữ chất điện ảnh hoài niệm, tránh cảm giác kỹ thuật số thô cứng',
    badge: 'Chất Cảm Phim Cổ Điển',
    iconName: 'Film',
    coreProblem: 'Sau khi khử nhiễu (Denoise) triệt để, bức ảnh trông phẳng lì như tranh vẽ vector 3D hoặc ảnh chụp điện thoại rẻ tiền, làm mất đi tính lịch sử của bức ảnh chụp phim xưa.',
    scientificPrinciple: 'Phủ một lớp cấu trúc hạt tinh thể bạc muối (Silver Halide Crystals) theo chuẩn phim Kodak Tri-X 400 hoặc Portra 160. Hạt phim phân bố theo mật độ quang học (vùng tối hạt mịn dày, vùng sáng hạt tản mềm) tạo chiều sâu quang học 3 chiều.',
    promptVi: 'Phục hồi ảnh với chất cảm phim analog bạc muối 35mm (Vintage Film Grain): Khử sạch vết mốc và rách giấy nhưng bảo lưu lớp hạt phim bạc tự nhiên mịn màng (Fine 35mm Silver Halide Grain). Tái tạo dải chuyển sáng tối mượt mà (Smooth tonal rolloff), tạo độ sâu quang học điện ảnh hoài niệm, tuyệt đối không bị hiệu ứng khử nhiễu kỹ thuật số làm bẹt hình.',
    promptEn: 'Restoring with authentic 35mm analog silver halide film grain structure: clean all physical cracks and mold while infusing organic, microscopic silver crystal grain (Kodak Tri-X / Portra 400 aesthetic). Cinematic continuous tonal transitions from velvety deep blacks to luminous highlights, eliminating all flat digital noise reduction artifacts.',
    keywordsEn: [
      '35mm organic film grain',
      'silver halide crystal structure',
      'smooth analog tonal rolloff',
      'Kodak Portra fine grain',
      'cinematic depth',
      'no digital plastic flattening'
    ],
    recommendedSettings: [
      { label: 'Cấu trúc hạt', value: 'Kodak 35mm Fine Grain (Level 2)' },
      { label: 'Dải chuyển sáng', value: 'Analog S-Curve Rolloff' },
      { label: 'Tương phản quang', value: 'Silver Gelatin Depth' }
    ],
    comparisons: {
      bad: 'Bức ảnh phẳng lì, các mảng chuyển màu bị bệt thành vệt loang kỹ thuật số (banding artifacts).',
      pro: 'Bức ảnh có chiều sâu điện ảnh sang trọng, sờ vào cảm giác như ảnh rửa phòng tối trên giấy bạc muối cao cấp.'
    }
  },
  {
    id: 'tech_fabric_weave',
    number: '04',
    titleVi: 'Kỹ Thuật Chống Cháy Sáng & Vân Vải Dệt (Fabric Weave & Anti-Clipping)',
    titleEn: 'Fabric Weave Micro-Details & Highlight Retention',
    tagline: 'Phục hồi rõ nét từng sợi tơ áo dài trắng, gấm thêu và quân phục',
    badge: 'Chi Tiết Trang Phục 8K',
    iconName: 'Layers',
    coreProblem: 'Các trang phục màu trắng (áo dài lụa, áo sơ mi, quân phục trắng) khi AI tăng sáng thường bị "cháy sáng" (blown-out highlights), biến thành một mảng trắng bóc không còn nhìn thấy đường may hay thớ vải.',
    scientificPrinciple: 'Áp dụng thuật toán bảo toàn dải tương phản động (HDR highlight compression), tái tạo kết cấu sợi dệt micro-fiber: sợi tơ tằm dệt thủ công Hà Đông, sợi kaki dệt chéo quân phục, đường gân ren thêu và nếp nhăn đổ bóng vật lý tự nhiên.',
    promptVi: 'Phục hồi chi tiết trang phục và chống cháy sáng vải trắng: Tái tạo chi tiết từng sợi dệt vi mô của vải lụa tơ tằm, vải kaki mộc hoặc len dạ. Bảo tồn 100% chi tiết trong vùng sáng cao nhất (No clipped highlights trên áo trắng/áo dài), thể hiện rõ độ rủ tự nhiên, đường may kim mũi chỉ thủ công và bóng đổ nếp gấp trang phục.',
    promptEn: 'Restoring ultra-detailed garment textures with zero clipped highlights: reconstruct microscopic fabric weave patterns for natural mulberry silk, twill cotton, or wool. Retain complete tonal nuances in pure white garments with rich micro-shadows along natural fabric folds. Crisp handmade seam stitching and authentic physical cloth drape.',
    keywordsEn: [
      'microscopic fabric weave',
      'zero clipped highlights on white',
      'mulberry silk micro-texture',
      'authentic cloth drape physics',
      'detailed seam stitching',
      'high dynamic range highlights'
    ],
    recommendedSettings: [
      { label: 'Bảo tồn vùng sáng', value: 'Highlight Recovery (+1.5 EV)' },
      { label: 'Vân sợi dệt', value: 'Micro-Fiber Weave v2' },
      { label: 'Đổ bóng nếp gấp', value: 'Raytraced Ambient Occlusion' }
    ],
    comparisons: {
      bad: 'Áo dài trắng bị cháy thành mảng trắng xóa, mất hết đường viền cổ, tà áo và đường chiết eo.',
      pro: 'Thấy rõ từng đường tơ dệt óng ánh của lụa, nếp gấp mềm mại và đường chỉ may tinh xảo ôm trọn phom dáng.'
    }
  },
  {
    id: 'tech_cmyk_proofing',
    number: '05',
    titleVi: 'Chuẩn Màu In Ấn Proofing CMYK & 300+ DPI Không Lệch Màu',
    titleEn: 'Pro CMYK Color Proofing & 300+ DPI Lab Calibration',
    tagline: 'Bảo đảm ảnh in trên giấy lụa, gỗ tráng gương giống 100% trên màn hình',
    badge: 'Chuẩn Xuất Xưởng In Lab',
    iconName: 'Printer',
    coreProblem: 'Ảnh nhìn trên màn hình điện thoại rất đẹp và rực rỡ, nhưng khi đem ra tiệm in phun hoặc in rọi Lab thì bị xỉn màu, tối đen vùng mặt hoặc ngả sang màu tím/xanh kỳ lạ.',
    scientificPrinciple: 'Chuyển đổi không gian màu RGB sang hệ màu in ấn tiêu chuẩn (FOGRA39 / Japan Color 2001 Coated), căn chỉnh bù sáng +10% ở vùng trung tính (Midtones) để triệt tiêu hiện tượng sụt sáng khi thấm mực trên giấy in ảnh Lustre/Metallic.',
    promptVi: 'Tối ưu hóa màu sắc chuẩn in ấn Lab 300+ DPI (Pro Print Proofing): Tự động bù dải màu CMYK chuyên nghiệp, nâng độ chi tiết vùng tối (Shadow lift +10%) chống bết mực khi in, da mặt cân bằng tông ấm tự nhiên chuẩn màu giấy in ảnh cao cấp. Đảm bảo độ phân giải xuất xưởng đạt 8K siêu sắc nét, 300 DPI kích thước thực.',
    promptEn: 'Optimizing for professional masterclass 300+ DPI CMYK print proofing: calibrated color gamut matching professional photo lab standards (FOGRA39/Japan Color), intelligent shadow detail lifting to prevent ink bloat on metallic/luster photo papers. True 8K render fidelity, native 300 DPI print-ready without chromatic distortion.',
    keywordsEn: [
      '300 DPI native print resolution',
      'calibrated CMYK color proofing',
      'shadow detail lift for print',
      'photo lab color accuracy',
      'luster metallic paper profile',
      'edge-to-edge 8K print master'
    ],
    recommendedSettings: [
      { label: 'Hệ màu mục tiêu', value: 'Adobe RGB (1998) / FOGRA39' },
      { label: 'Độ phân giải in', value: '300 DPI Native (Zero Upscale Blur)' },
      { label: 'Bù sáng vùng tối', value: 'Shadow Lift +12% for Paper' }
    ],
    comparisons: {
      bad: 'In ra bị tối om, mặt người thân bị ám tím sẫm, vùng tóc đen bị bết dính thành một cục mực đen.',
      pro: 'Bản in sáng trong trẻo, màu da hồng hào ấm áp, tóc tơ và từng chi tiết nhỏ sắc nét rực rỡ dưới ánh đèn phòng khách.'
    }
  }
];
