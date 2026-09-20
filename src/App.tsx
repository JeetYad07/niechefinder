import React, { useState, useEffect } from 'react';
import { CURATED_PROBLEMS } from './data/problems';
import { ProblemOpportunity, ProblemCategory, BuildComplexity } from './types';
import { Navbar } from './components/Navbar';
import { ProblemCard } from './components/ProblemCard';
import { ProblemDetailModal } from './components/ProblemDetailModal';
import { AIProblemValidator } from './components/AIProblemValidator';
import { RevenueCalculator } from './components/RevenueCalculator';
import { FrameworkGuide } from './components/FrameworkGuide';
import {
  Sparkles,
  Compass,
  Flame,
  BookmarkCheck,
  TrendingUp,
  Filter,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'problems' | 'ai-validator' | 'calculator' | 'framework' | 'saved'>('problems');
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory>('All');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<ProblemOpportunity | null>(null);
  const [savedProblemIds, setSavedProblemIds] = useState<string[]>([]);
  const [calcInitialPrice, setCalcInitialPrice] = useState<number>(79);

  // Load saved shortlist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nicheradar_saved_problems');
      if (stored) {
        setSavedProblemIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load saved problems:', e);
    }
  }, []);

  const toggleSaveProblem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedProblemIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('nicheradar_saved_problems', JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });
  };

  const handleOpenCalculatorWithPrice = (priceStr: string) => {
    const numMatch = priceStr.match(/\d+/);
    if (numMatch) {
      setCalcInitialPrice(parseInt(numMatch[0], 10));
    }
    setActiveTab('calculator');
  };

  // Filter problems
  const filteredProblems = CURATED_PROBLEMS.filter((prob) => {
    const matchesCategory = selectedCategory === 'All' || prob.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'All' || prob.complexity === selectedComplexity;
    
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      prob.title.toLowerCase().includes(query) ||
      prob.tagline.toLowerCase().includes(query) ||
      prob.category.toLowerCase().includes(query) ||
      prob.targetBuyer.toLowerCase().includes(query) ||
      prob.theBleedingNeck.toLowerCase().includes(query) ||
      prob.currentStatusQuo.toLowerCase().includes(query) ||
      prob.whyIncumbentsIgnore.toLowerCase().includes(query) ||
      prob.complexity.toLowerCase().includes(query) ||
      prob.mvpFeatureSet.some((feat) => feat.toLowerCase().includes(query));

    if (activeTab === 'saved') {
      return savedProblemIds.includes(prob.id) && matchesSearch;
    }

    return matchesCategory && matchesComplexity && matchesSearch;
  });

  const categories: ProblemCategory[] = [
    'All',
    'Trades & Blue Collar',
    'B2B Operations',
    'E-commerce & Logistics',
    'Healthcare & Clinics',
    'Real Estate & Property',
    'Local Services',
    'Legal & Compliance',
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-amber-500 selection:text-neutral-950">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedProblemIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Answer to User Prompt Hero Banner */}
        {activeTab === 'problems' && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 sm:p-10 shadow-2xl">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>The High-Margin Founder Playbook</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Stop looking for consumer apps. <br className="hidden sm:inline" />
                <span className="text-amber-400">Solve unsexy, expensive business headaches.</span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                The reason nobody is solving these problems is because Silicon Valley wants $10B consumer AI unicorns, while small trades and clinics suffer in Excel spreadsheets every single day.
                They don’t need complex AI agents—they gladly pay <strong>$50 - $200/month</strong> for simple software that saves them 10 hours a week or protects them from a $5,000 regulatory fine.
              </p>

              {/* Quick stats / Highlights */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60">
                  <div className="text-neutral-400 font-medium">Average B2B ACV</div>
                  <div className="text-sm font-bold text-white mt-0.5">$600 - $2,400/yr</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60">
                  <div className="text-neutral-400 font-medium">To Replace $5k/mo</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">Only 40-50 Clients</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60">
                  <div className="text-neutral-400 font-medium">Time to Build MVP</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">7 to 14 Days</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60">
                  <div className="text-neutral-400 font-medium">Competition Level</div>
                  <div className="text-sm font-bold text-blue-400 mt-0.5">Virtually Zero</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setActiveTab('ai-validator')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test Your Own Idea with AI</span>
                </button>

                <button
                  onClick={() => setActiveTab('framework')}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-all border border-neutral-700 flex items-center gap-2"
                >
                  <span>Read The 5-Point Validation Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1 & Saved: Problem Cards Explorer */}
        {(activeTab === 'problems' || activeTab === 'saved') && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer select-none transition-all ${
                      selectedCategory === cat
                        ? 'bg-neutral-100 text-neutral-900 shadow'
                        : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Complexity Dropdown */}
              <div className="flex items-center gap-2 shrink-0 text-xs">
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-400 hidden sm:inline">Build Time:</span>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Build Times</option>
                  <option value="Weekend MVP">Weekend MVP</option>
                  <option value="1-2 Weeks">1-2 Weeks</option>
                  <option value="2-3 Weeks">2-3 Weeks</option>
                </select>
              </div>
            </div>

            {/* Problem Counter & Active Search Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 pt-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span>
                  Showing <strong className="text-white">{filteredProblems.length}</strong>{' '}
                  {activeTab === 'saved' ? 'saved shortlisted opportunities' : 'high-pain opportunities'}
                </span>
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium text-[11px]">
                    <span>Search: "{searchQuery.trim()}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-white cursor-pointer p-0.5"
                      title="Clear search filter"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              {activeTab === 'saved' && filteredProblems.length === 0 && (
                <button
                  onClick={() => setActiveTab('problems')}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Explore and shortlist curated problems
                </button>
              )}
            </div>

            {/* Cards Grid */}
            {filteredProblems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProblems.map((prob) => (
                  <ProblemCard
                    key={prob.id}
                    problem={prob}
                    onSelect={(p) => setSelectedProblem(p)}
                    isSaved={savedProblemIds.includes(prob.id)}
                    onToggleSave={toggleSaveProblem}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl">
                <ShieldAlert className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">No Matching Problems Found</h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or selecting "All" categories to view all opportunities.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedComplexity('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Problem Validator & Niche Generator */}
        {activeTab === 'ai-validator' && <AIProblemValidator />}

        {/* Tab 3: MRR Calculator */}
        {activeTab === 'calculator' && (
          <RevenueCalculator initialPrice={calcInitialPrice} />
        )}

        {/* Tab 4: Framework Guide */}
        {activeTab === 'framework' && <FrameworkGuide />}
      </main>

      {/* Problem Detail Modal */}
      {selectedProblem && (
        <ProblemDetailModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          isSaved={savedProblemIds.includes(selectedProblem.id)}
          onToggleSave={toggleSaveProblem}
          onOpenCalculatorWithPrice={handleOpenCalculatorWithPrice}
        />
      )}

      {/* Simple Footer */}
      <footer className="border-t border-neutral-800/80 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>NicheRadar:</strong> Curated Unsolved B2B Problems, Micro-SaaS Blueprints & Idea Validation.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <button onClick={() => setActiveTab('problems')} className="hover:text-white transition-colors">
              Problems
            </button>
            <button onClick={() => setActiveTab('ai-validator')} className="hover:text-white transition-colors">
              AI Validator
            </button>
            <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
              MRR Calculator
            </button>
            <button onClick={() => setActiveTab('framework')} className="hover:text-white transition-colors">
              5-Point Rules
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
