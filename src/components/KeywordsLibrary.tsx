import React, { useState } from 'react';
import { TECHNICAL_KEYWORDS } from '../data/promptsData';
import { BookOpen, Search, Copy, Check, Filter } from 'lucide-react';

export const KeywordsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedKw, setCopiedKw] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(TECHNICAL_KEYWORDS.map((k) => k.category)))];

  const filteredKeywords = TECHNICAL_KEYWORDS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (enText: string) => {
    navigator.clipboard.writeText(enText);
    setCopiedKw(enText);
    setTimeout(() => setCopiedKw(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-zinc-400" />
          <span>Bảng Từ Khóa Kỹ Thuật Tiếng Anh Chuẩn (English Keywords Library)</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-1 font-light">
          Kết hợp các từ khóa chuyên sâu tiếng Anh để Gemini và các mô hình AI xử lý độ nét, màu da, khử nhiễu chính xác hơn 100%.
        </p>
      </div>

      {/* Search & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d0d0d] border border-zinc-800 p-4 rounded-sm">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm từ khóa tiếng Anh hoặc tiếng Việt..."
            className="w-full bg-[#141414] border border-zinc-800 rounded-sm pl-10 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 font-light"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-zinc-100 text-black font-bold'
                  : 'bg-[#141414] border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Keyword Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKeywords.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0d0d0d] border border-zinc-800 hover:border-zinc-700 rounded-sm p-4 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-zinc-400 bg-[#141414] px-2 py-0.5 rounded-sm border border-zinc-800 uppercase tracking-widest">
                  {item.category}
                </span>
                <button
                  onClick={() => handleCopy(item.en)}
                  className="p-1.5 bg-[#141414] hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-sm text-xs transition-all cursor-pointer"
                  title="Sao chép từ khóa tiếng Anh"
                >
                  {copiedKw === item.en ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <h3 className="font-mono text-xs font-bold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                "{item.en}"
              </h3>
              <p className="text-xs font-semibold text-zinc-300 mb-1.5">
                🇻🇳 {item.vi}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
