import React, { useState } from 'react';
import { Header } from './components/Header';
import { MasterPromptStructureCard } from './components/MasterPromptStructureCard';
import { PromptBuilder } from './components/PromptBuilder';
import { PhotoAnalyzer } from './components/PhotoAnalyzer';
import { VietnamHeritageLibrary } from './components/VietnamHeritageLibrary';
import { TemplateGallery } from './components/TemplateGallery';
import { KeywordsLibrary } from './components/KeywordsLibrary';
import { PrintCalculator } from './components/PrintCalculator';
import { GuideSection } from './components/GuideSection';
import { RestorationCategory } from './types';
import { Sparkles } from 'lucide-react';
import brandEmblem from './assets/images/gemini_restore_emblem_1786650826371.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('builder');
  const [builderCategory, setBuilderCategory] = useState<RestorationCategory>('portrait');
  const [injectedPromptVi, setInjectedPromptVi] = useState<string>('');
  const [injectedPromptEn, setInjectedPromptEn] = useState<string>('');
  const [injectedKeywords, setInjectedKeywords] = useState<string[]>([]);

  const handleUseTemplateInBuilder = (cat: RestorationCategory) => {
    setBuilderCategory(cat);
    setActiveTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyHeritagePrompt = (promptVi: string, promptEn: string, keywords: string[]) => {
    setInjectedPromptVi(promptVi);
    setInjectedPromptEn(promptEn);
    setInjectedKeywords(keywords);
    setActiveTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-zinc-100 selection:text-black">
      {/* Header Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Top Master System Prompt Structure Explanation Banner */}
        <MasterPromptStructureCard />

        {/* Dynamic Tab Content */}
        {activeTab === 'builder' && (
          <PromptBuilder
            initialCategory={builderCategory}
            initialPromptVi={injectedPromptVi}
            initialPromptEn={injectedPromptEn}
            initialKeywords={injectedKeywords.length > 0 ? injectedKeywords : undefined}
          />
        )}

        {activeTab === 'analyzer' && <PhotoAnalyzer />}

        {activeTab === 'vietnam-heritage' && (
          <VietnamHeritageLibrary
            onApplyPrompt={handleApplyHeritagePrompt}
            onNavigateToBuilder={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'templates' && (
          <TemplateGallery onUseTemplate={handleUseTemplateInBuilder} />
        )}

        {activeTab === 'keywords' && <KeywordsLibrary />}

        {activeTab === 'calculator' && <PrintCalculator />}

        {activeTab === 'guide' && <GuideSection />}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-zinc-800 text-zinc-400 py-10 mt-16 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 rounded-sm overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
              <img
                src={brandEmblem}
                alt="Gemini Emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-zinc-200 font-medium tracking-tight">
              GEMINI PhotoRestore Pro Studio • Bộ Prompt Phục Hồi Ảnh Cũ Chuẩn AI
            </span>
          </div>
          <p className="text-zinc-500 font-light max-w-2xl mx-auto">
            Tối ưu hóa trọn vẹn chi tiết gốc, thần thái nét mặt, khử nhiễu và hỗ trợ xuất file in ấn 8K 300+ DPI sạch 100% không watermark.
          </p>
          <div className="pt-4 border-t border-zinc-800/80 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
            © Bản quyền Trương Thành Ý
          </div>
        </div>
      </footer>
    </div>
  );
}
