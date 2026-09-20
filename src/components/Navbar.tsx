import React from 'react';
import { Compass, Sparkles, Calculator, BookOpen, BookmarkCheck, Search, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'problems' | 'ai-validator' | 'calculator' | 'framework' | 'saved';
  setActiveTab: (tab: 'problems' | 'ai-validator' | 'calculator' | 'framework' | 'saved') => void;
  savedCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-900 border-b border-neutral-800 text-neutral-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none shrink-0" onClick={() => setActiveTab('problems')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">NicheRadar</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Unsolved
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden lg:block">
                Validated B2B pain points with proven willingness to pay
              </p>
            </div>
          </div>

          {/* Quick Search (Desktop & Tablet) */}
          {(activeTab === 'problems' || activeTab === 'saved') && (
            <div className="flex-1 max-w-xs sm:max-w-sm relative hidden sm:block">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems, trades, buyers..."
                className="w-full bg-neutral-800/80 border border-neutral-700 rounded-lg pl-9 pr-8 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 rounded-full cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
                activeTab === 'problems'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Curated</span> Problems
            </button>

            <button
              onClick={() => setActiveTab('ai-validator')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
                activeTab === 'ai-validator'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Validator</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">MRR</span> Calc
            </button>

            <button
              onClick={() => setActiveTab('framework')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
                activeTab === 'framework'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pain-to-Profit</span> Rules
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
                activeTab === 'saved'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
              title="Saved Shortlist"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Shortlist</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-neutral-950">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Search Bar (visible on mobile < sm when in problems or saved tab) */}
      {(activeTab === 'problems' || activeTab === 'saved') && (
        <div className="sm:hidden px-4 pb-3 pt-1 border-t border-neutral-800/60 bg-neutral-900/95">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, trades, buyers..."
              className="w-full bg-neutral-800/90 border border-neutral-700 rounded-lg pl-9 pr-8 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
