import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON body parsing with high limit for base64 photo upload
app.use(express.json({ limit: '25mb' }));

// Helper to get initialized GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiKeyAvailable: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Photo Analysis & Auto-Prompt Generation Endpoint (Multimodal Gemini 3.6 Flash)
app.post('/api/analyze-photo', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userNotes = '' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body.' });
    }

    // Clean base64 string if data URI scheme was attached
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const ai = getGenAI();

    const analysisPrompt = `
    Bạn là Chuyên gia Phục hồi Ảnh Cũ và Kỹ sư AI Image Prompt Chuyên nghiệp.
    Hãy phân tích cẩn thận hình ảnh cũ/hỏng được gửi lên và thực hiện các việc sau:

    1. Nhận diện thể loại ảnh: 'portrait' (chân dung/ảnh thẻ/ảnh thờ), 'group' (ảnh tập thể/nhiều người), 'landscape' (phong cảnh/kiến trúc cổ), hoặc 'document' (giấy tờ cũ/bằng khen/tư liệu).
    2. Mô tả ngắn gọn chủ thể chính và bối cảnh trong ảnh.
    3. Đếm số lượng khuôn mặt phát hiện trong ảnh (nếu có).
    4. Xác định các tổn hại của ảnh (chọn từ các nhãn: Vệt xước phím, Ố vàng/Đốm mốc, Mốc kính/Mờ đục, Nếp nát/Gập gãy, Nhòe mất nét, Phai màu đen trắng, Nhiễu hạt film grain).
    5. Đánh giá tình trạng tổn hại: 'Severely Damaged', 'Moderately Damaged', 'Mildly Faded', hoặc 'Good Condition'.
    6. XÂY DỰNG MASTER PROMPT PHỤC HỒI CHUẨN 4 THÀNH PHẦN (bằng tiếng Việt):
       - [Hành động chính]: Thể hiện rõ phục hồi, nâng cấp hay tô màu cho thể loại ảnh này.
       - [Bảo tồn chi tiết gốc]: Nhấn mạnh giữ 100% thần thái, nét mặt, cấu trúc gốc không biến dạng.
       - [Xử lý kỹ thuật AI]: Chi tiết khắc phục đúng các tổn hại đã phát hiện ở trên, làm nét mắt/tóc/trang phục, giữ skin texture tự nhiên không nhựa.
       - [Định dạng & In ấn]: Xuất file 8K siêu nét, chuẩn in ấn chuyên nghiệp, tuyệt đối không chèn watermark, không logo, không chữ ký, ảnh sạch nguyên bản 100%.
    7. Dịch Master Prompt đó sang Tiếng Anh chuẩn kỹ thuật AI (masterPromptEn) và bắt buộc có các từ khóa 'clean output, no watermark, no logo, no signature, borderless'.
    8. Đưa ra lời khuyên bảo tồn (preservationAdvice) và ghi chú kỹ thuật (technicalNotes).
    9. Chấm điểm sẵn sàng in ấn (printReadinessScore từ 0 đến 100).
    10. Gợi ý độ phân giải tối ưu và các bước upscale in khổ lớn.

    ${userNotes ? `Ghi chú thêm từ người dùng: ${userNotes}` : ''}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: analysisPrompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedCategory: {
              type: Type.STRING,
              description: "Must be one of: 'portrait', 'group', 'landscape', 'document', 'custom'",
            },
            subjectDescription: { type: Type.STRING },
            damageTypes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            faceCount: { type: Type.INTEGER },
            qualityCondition: {
              type: Type.STRING,
              description: "Must be one of: 'Severely Damaged', 'Moderately Damaged', 'Mildly Faded', 'Good Condition'",
            },
            masterPromptVi: { type: Type.STRING },
            masterPromptEn: { type: Type.STRING },
            preservationAdvice: { type: Type.STRING },
            technicalNotes: { type: Type.STRING },
            printReadinessScore: { type: Type.INTEGER },
            recommendedResolution: { type: Type.STRING },
            upscaleSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'detectedCategory',
            'subjectDescription',
            'damageTypes',
            'qualityCondition',
            'masterPromptVi',
            'masterPromptEn',
            'preservationAdvice',
            'technicalNotes',
            'printReadinessScore',
          ],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error('Gemini did not return any text response.');
    }

    const resultData = JSON.parse(jsonText);
    return res.json({ success: true, analysis: resultData });
  } catch (error: any) {
    console.error('Error in /api/analyze-photo:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failure during photo analysis.',
    });
  }
});

// Enhanced AI Prompt Generator Endpoint
app.post('/api/generate-prompt', async (req, res) => {
  try {
    const { category, damageList, userDescription, extraKeywords, idPhotoOption, noWatermarkOption = true } = req.body;

    const ai = getGenAI();

    const systemPrompt = `
    Bạn là Kỹ sư Master Prompt AI chuyên về Phục Hồi Ảnh Cũ (Photo Restoration Master Prompt Engineer).
    Hãy tạo một Bộ Master Prompt chuẩn 4 thành phần cho việc phục hồi ảnh cũ theo các thông tin sau:
    - Thể loại: ${category || 'portrait'}
    - Các tổn hại cần xử lý: ${Array.isArray(damageList) ? damageList.join(', ') : damageList || 'Xước, ố vàng, nhòe'}
    - Mô tả từ người dùng: ${userDescription || 'Ảnh chụp người thân gia đình từ xưa'}
    - Từ khóa kỹ thuật bổ sung: ${Array.isArray(extraKeywords) ? extraKeywords.join(', ') : extraKeywords || ''}
    - Tùy chỉnh ảnh thẻ (nếu có): ${idPhotoOption ? 'Có tùy chỉnh ảnh thẻ studio' : 'Không'}
    - Yêu cầu xuất ảnh sạch không watermark: ${noWatermarkOption ? 'BẮT BUỘC: Không chèn watermark, không logo, không chữ ký, ảnh sạch nguyên bản 100% (clean output, no watermark, no text, no logo, no signature, borderless)' : 'Bình thường'}

    Yêu cầu trả về JSON gồm 2 bản Master Prompt:
    1. masterPromptVi: Bản tiếng Việt chuẩn 4 thành phần [Hành động chính] + [Bảo tồn nét gốc] + [Xử lý kỹ thuật AI] + [Định dạng & In ấn 8K], có câu lệnh cam kết không dính watermark/logo.
    2. masterPromptEn: Bản tiếng Anh chuyên sâu chèn các từ khóa AI render chuẩn như 8K, ultra-sharp detail, preserve 100% facial features, no plastic skin texture, print-ready, clean output, no watermark, no logo, no signature.
    3. breakdown: Các thành phần phân rã (action, preservation, technical, format).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            masterPromptVi: { type: Type.STRING },
            masterPromptEn: { type: Type.STRING },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING },
                preservation: { type: Type.STRING },
                technical: { type: Type.STRING },
                format: { type: Type.STRING },
              },
            },
            keyRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['masterPromptVi', 'masterPromptEn', 'breakdown'],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error('Gemini failed to generate prompt.');
    }

    return res.json({ success: true, data: JSON.parse(jsonText) });
  } catch (error: any) {
    console.error('Error in /api/generate-prompt:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Prompt generation failed.',
    });
  }
});

async function startServer() {
  // Setup Vite middleware for development or static server for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gemini PhotoRestore Pro Studio running on http://localhost:${PORT}`);
  });
}

startServer();
