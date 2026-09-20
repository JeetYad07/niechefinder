import React from 'react';
import { Compass, Sparkles, Calculator, BookOpen, BookmarkCheck, Users, Search, X, Flame } from 'lucide-react';

interface NavbarProps {
  activeTab: 'problems' | 'ai-validator' | 'calculator' | 'framework' | 'saved' | 'community';
  setActiveTab: (tab: 'problems' | 'ai-validator' | 'calculator' | 'framework' | 'saved' | 'community') => void;
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
    <header className="sticky top-0 z-40 glass-header border-b border-neutral-800/80 text-neutral-100 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink-0" onClick={() => setActiveTab('problems')}>
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
              <p className="text-[11px] text-neutral-400 hidden xl:block">
                Validated B2B pain points with proven willingness to pay
              </p>
            </div>
          </div>

          {/* Quick Search (Desktop & Tablet) */}
          {(activeTab === 'problems' || activeTab === 'saved') && (
            <div className="flex-1 max-w-xs md:max-w-sm relative hidden md:block">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems, trades, buyers..."
                className="w-full bg-neutral-800/80 border border-neutral-700/80 rounded-xl pl-9 pr-8 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
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

          {/* Touch-scrollable Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none shrink-0 border-l border-neutral-800/80 pl-2 md:border-l-0 md:pl-0">
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none whitespace-nowrap transition-all ${
                activeTab === 'problems'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>Problems</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-validator')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none whitespace-nowrap transition-all ${
                activeTab === 'ai-validator'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>AI Validator</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none whitespace-nowrap transition-all ${
                activeTab === 'community'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>Crowd Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none whitespace-nowrap transition-all ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 shrink-0" />
              <span>MRR Calc</span>
            </button>

            <button
              onClick={() => setActiveTab('framework')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none whitespace-nowrap transition-all ${
                activeTab === 'framework'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none whitespace-nowrap transition-all ${
                activeTab === 'saved'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
              }`}
              title="Saved Shortlist"
            >
              <BookmarkCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Shortlist</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-neutral-950 shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {(activeTab === 'problems' || activeTab === 'saved') && (
        <div className="md:hidden px-3 sm:px-4 pb-3 pt-1 border-t border-neutral-800/60 bg-neutral-900/95">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, trades, buyers..."
              className="w-full bg-neutral-800/90 border border-neutral-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
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
