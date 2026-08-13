export type RestorationCategory = 'portrait' | 'group' | 'landscape' | 'document' | 'custom';

export interface MasterPromptComponents {
  action: string;
  preservation: string;
  technical: string;
  format: string;
  idPhotoOpt?: string;
  extraEnglishKeywords?: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: RestorationCategory;
  subtitle: string;
  description: string;
  promptVi: string;
  promptEn: string;
  components: MasterPromptComponents;
  englishKeywords: string[];
  sampleBefore: string;
  sampleAfter: string;
  tips: string[];
}

export interface KeywordItem {
  en: string;
  vi: string;
  description: string;
  category: string;
}

export interface DamageOption {
  id: string;
  label: string;
  description: string;
  promptSnippetVi: string;
  promptSnippetEn: string;
}

export interface PhotoAnalysisResult {
  detectedCategory: RestorationCategory;
  subjectDescription: string;
  damageTypes: string[];
  faceCount: number;
  qualityCondition: 'Severely Damaged' | 'Moderately Damaged' | 'Mildly Faded' | 'Good Condition';
  masterPromptVi: string;
  masterPromptEn: string;
  preservationAdvice: string;
  technicalNotes: string;
  printReadinessScore: number;
  recommendedResolution: string;
  upscaleSteps: string[];
}

export interface PrintSizeCalculatorInput {
  printWidthCm: number;
  printHeightCm: number;
  targetDpi: number;
}

export interface PrintSizeCalculatorResult {
  widthPixels: number;
  heightPixels: number;
  totalMegapixels: number;
  qualityTier: 'Standard' | 'Commercial Fine Art' | 'Ultra HD Large Format';
  recommendedUpscaleFactor: string;
  bestTool: string;
}
