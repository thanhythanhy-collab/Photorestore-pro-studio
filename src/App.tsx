import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuickNavbar } from './components/QuickNavbar';
import { MasterPromptStructureCard } from './components/MasterPromptStructureCard';
import { PromptBuilder } from './components/PromptBuilder';
import { ProRestorationMastery } from './components/ProRestorationMastery';
import { PhotoAnalyzer } from './components/PhotoAnalyzer';
import { VietnamHeritageLibrary } from './components/VietnamHeritageLibrary';
import { TemplateGallery } from './components/TemplateGallery';
import { KeywordsLibrary } from './components/KeywordsLibrary';
import { PrintCalculator } from './components/PrintCalculator';
import { GuideSection } from './components/GuideSection';
import { RestorationCategory } from './types';
import { Sparkles, ShieldCheck, Printer, Heart } from 'lucide-react';
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

  const handleApplyProTechnique = (promptVi: string, promptEn: string, keywords: string[]) => {
    setInjectedPromptVi(promptVi);
    setInjectedPromptEn(promptEn);
    setInjectedKeywords(keywords);
    setActiveTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans selection:bg-amber-400 selection:text-black bg-vintage-grain flex flex-col justify-between">
      {/* Sticky Header Bar with Gold Border */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Studio Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full flex-grow">
        {/* Top Hero Master System Prompt Formula */}
        <MasterPromptStructureCard />

        {/* Quick Multi-Device Tab Switcher */}
        <QuickNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Studio Module Content */}
        <div className="transition-all duration-300">
          {activeTab === 'builder' && (
            <PromptBuilder
              initialCategory={builderCategory}
              initialPromptVi={injectedPromptVi}
              initialPromptEn={injectedPromptEn}
              initialKeywords={injectedKeywords.length > 0 ? injectedKeywords : undefined}
            />
          )}

          {activeTab === 'pro-mastery' && (
            <ProRestorationMastery
              onApplyTechnique={handleApplyProTechnique}
              onNavigateToBuilder={() => setActiveTab('builder')}
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
        </div>
      </main>

      {/* Luxury Royal Vintage Footer */}
      <footer className="bg-[#02060f] border-t border-amber-500/30 text-zinc-400 py-10 sm:py-12 mt-16 text-xs text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 space-y-4 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-sm overflow-hidden border border-amber-400/60 bg-[#061226] shrink-0 shadow-md shadow-amber-500/10">
              <img
                src={brandEmblem}
                alt="Gemini Emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-amber-200 font-bold tracking-tight text-sm uppercase font-serif-luxury">
                GEMINI PhotoRestore Pro Studio
              </h4>
              <p className="text-[11px] text-zinc-400 font-light">
                Hệ thống kiến tạo Master Prompt phục hồi ảnh cũ & di sản văn hóa Việt Nam chuẩn in ấn 8K
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-400 pt-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Không Watermark & Chữ Ký
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1 text-amber-300">
              <Printer className="w-3.5 h-3.5" /> Chuẩn In Phóng Khổ Lớn 300+ DPI
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1 text-sky-300">
              <Sparkles className="w-3.5 h-3.5" /> Gemini 3.6 Multimodal Vision
            </span>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-400 font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-2">
            <span>© Bản quyền tác giả: <strong className="text-amber-300">Trương Thành Ý</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
