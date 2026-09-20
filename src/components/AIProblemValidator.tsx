import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, CheckCircle, AlertCircle, DollarSign, Target, ShieldAlert, RefreshCw, Lightbulb } from 'lucide-react';
import { AIValidationResult, GeneratedProblemIdea } from '../types';

export const AIProblemValidator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'validate' | 'generate'>('validate');

  // Validation Form State
  const [problemTitle, setProblemTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [userBackground, setUserBackground] = useState('');

  // Generation Form State
  const [genIndustry, setGenIndustry] = useState('');
  const [builderSkills, setBuilderSkills] = useState('Full-stack Web / React');
  const [preferredModel, setPreferredModel] = useState('Monthly B2B SaaS');

  // Loading and Results
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<AIValidationResult | null>(null);
  const [generatedProblems, setGeneratedProblems] = useState<GeneratedProblemIdea[]>([]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setValidationResult(null);

    try {
      const res = await fetch('/api/ai/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle,
          industry,
          targetAudience,
          userBackground,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to validate problem');
      }

      setValidationResult(data.data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Validation service encountered an error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setGeneratedProblems([]);

    try {
      const res = await fetch('/api/ai/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: genIndustry,
          builderSkills,
          preferredModel,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate ideas');
      }

      setGeneratedProblems(data.data?.problems || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Generation service encountered an error.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickFillSample = (sampleType: string) => {
    if (sampleType === 'dental') {
      setProblemTitle('Dental clinic amalgam and lead foil hazardous waste manifest tracking');
      setIndustry('Dental & Healthcare');
      setTargetAudience('Solo dental practice owners and office managers');
      setUserBackground('Web developer with React and Node.js');
    } else if (sampleType === 'solar') {
      setProblemTitle('Residential solar permit packager for local small installers');
      setIndustry('Clean Energy & Trade Contractors');
      setTargetAudience('Small regional solar contractors doing 5-20 installs/month');
      setUserBackground('Full-stack builder');
    } else if (sampleType === 'freight') {
      setProblemTitle('Small independent trucking factoring invoice dispute and detention pay claimer');
      setIndustry('Logistics & Freight');
      setTargetAudience('Owner-operator truckers with 1-5 trucks');
      setUserBackground('Python & API automation developer');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Mode Switcher */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
        <div className="inline-flex p-1 rounded-xl bg-neutral-800 border border-neutral-700">
          <button
            onClick={() => setActiveMode('validate')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'validate'
                ? 'bg-amber-500 text-neutral-950 shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Test Your Problem Idea
          </button>
          <button
            onClick={() => setActiveMode('generate')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'generate'
                ? 'bg-amber-500 text-neutral-950 shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            AI Unsolved Niche Generator
          </button>
        </div>
        <h2 className="mt-4 text-xl font-black text-white">
          {activeMode === 'validate'
            ? 'Ruthless Micro-SaaS Problem & Idea Validator'
            : 'Discover Hidden, High-Pain Problems Tailored To Your Skills'}
        </h2>
        <p className="mt-1 text-xs text-neutral-400 max-w-xl mx-auto">
          {activeMode === 'validate'
            ? 'Get a brutal, venture-grade evaluation on Willingness to Pay, Competitor Blindspots, 14-day MVP specs, and customer acquisition channels.'
            : 'Let AI scan obscure B2B operational pain points where incumbents overcharge and businesses are desperate for simple software.'}
        </p>
      </div>

      {activeMode === 'validate' ? (
        /* VALIDATE FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Idea Inputs</span>
              </h3>
              <div className="text-[11px] text-neutral-400">Quick samples:</div>
            </div>

            {/* Quick Sample Buttons */}
            <div className="flex items-center gap-1.5 mb-4 flex-wrap">
              <button
                type="button"
                onClick={() => quickFillSample('dental')}
                className="text-[10px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Dental Waste
              </button>
              <button
                type="button"
                onClick={() => quickFillSample('solar')}
                className="text-[10px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Solar Permits
              </button>
              <button
                type="button"
                onClick={() => quickFillSample('freight')}
                className="text-[10px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Freight Detention
              </button>
            </div>

            <form onSubmit={handleValidate} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  The Problem or Pain Point <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  placeholder="e.g. Small plumbing subcontractors don't track warranty callback slips and lose $15k/yr in unpaid repairs..."
                  className="w-full p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Target Industry or Niche
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Commercial Roofing, Independent Vet Clinics, Shopify Brands"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Target Buyer / Decision Maker
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Office Manager, Shop Foreman, Solo Founder"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Your Builder Skills & Background
                </label>
                <input
                  type="text"
                  value={userBackground}
                  onChange={(e) => setUserBackground(e.target.value)}
                  placeholder="e.g. React & TypeScript developer, or No-code Airtable builder"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !problemTitle.trim()}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Market Demand...</span>
                  </>
                ) : (
                  <>
                    <span>Run Brutal Validation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Validation Result Output */}
          <div className="lg:col-span-7">
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Error evaluating problem:</strong>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {!validationResult && !isLoading && !errorMsg && (
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center p-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl text-center">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-amber-400 mb-3">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Awaiting Problem Submission</h4>
                <p className="mt-1 text-xs text-neutral-400 max-w-sm">
                  Enter an unsexy pain point on the left or select a sample to test whether people will pay real money for a solution.
                </p>
              </div>
            )}

            {validationResult && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 text-xs text-neutral-200">
                {/* Top Verdict & Score */}
                <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Executive Verdict</span>
                    <div className="text-sm font-black text-white mt-0.5">{validationResult.verdict}</div>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-700 shrink-0">
                    <span className="text-[11px] text-neutral-400 font-semibold">Willingness to Pay:</span>
                    <span className="text-base font-black text-emerald-400">
                      {validationResult.willingnessToPayScore}/10
                    </span>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-200">
                  <strong className="block text-emerald-400 font-bold mb-1">
                    Why They Will Pull Out Their Credit Card:
                  </strong>
                  <p className="leading-relaxed">{validationResult.willingnessToPayReasoning}</p>
                </div>

                {/* Pricing & Competitor Blindspot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-neutral-800/50 border border-neutral-700">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Recommended Pricing Tiers</span>
                    </div>
                    <ul className="space-y-1 text-neutral-300">
                      <li>• <strong>Starter:</strong> {validationResult.estimatedPricing.starter}</li>
                      <li>• <strong>Growth:</strong> {validationResult.estimatedPricing.growth}</li>
                      <li>• <strong>Customer LTV:</strong> {validationResult.estimatedPricing.expectedLTV}</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-800/50 border border-neutral-700">
                    <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-2">
                      <Target className="w-4 h-4" />
                      <span>Competitor Blindspot</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">
                      {validationResult.whyCompetitorsIgnore}
                    </p>
                  </div>
                </div>

                {/* 14-Day MVP Scope */}
                <div>
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>14-Day MVP Minimal Scope (Build ONLY This)</span>
                  </h4>
                  <div className="space-y-1.5">
                    {validationResult.fourteenDayMVPScope.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-neutral-800/40 border border-neutral-800 text-neutral-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* First 10 Customers & Riskiest Assumption */}
                <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-2">
                  <div>
                    <span className="font-bold text-amber-400">First 10 Customers Acquisition Channel: </span>
                    <span className="text-neutral-300">{validationResult.firstTenCustomersChannel}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex items-start gap-2 text-amber-200">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Riskiest Assumption to Test: </strong>
                      <span>{validationResult.riskiestAssumption}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Interview Question */}
                <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/30 text-blue-200">
                  <strong className="block text-blue-300 font-bold mb-1">
                    Ask 5 Prospects This Exact Validation Question:
                  </strong>
                  <p className="italic">"{validationResult.validationQuestion}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* GENERATE IDEAS FORM */
        <div className="space-y-6">
          <form onSubmit={handleGenerate} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Target Industry or Interest
                </label>
                <input
                  type="text"
                  value={genIndustry}
                  onChange={(e) => setGenIndustry(e.target.value)}
                  placeholder="e.g. Construction, Auto Repair, Pet Care, Dental, Real Estate"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Your Builder Skills
                </label>
                <select
                  value={builderSkills}
                  onChange={(e) => setBuilderSkills(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Full-stack Web / React & Node">Full-stack Web (React / Node / TypeScript)</option>
                  <option value="Frontend only / UI Developer">Frontend UI Developer</option>
                  <option value="Python / Scraping / Automation">Python & Data Automation</option>
                  <option value="No-code / Bubble / Airtable">No-code (Airtable / Zapier / Softr)</option>
                  <option value="Mobile App Developer">Mobile App Developer (Flutter / React Native)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Preferred Business Model
                </label>
                <select
                  value={preferredModel}
                  onChange={(e) => setPreferredModel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Monthly B2B SaaS ($49-$199/mo)">Monthly B2B SaaS ($49 - $199/mo)</option>
                  <option value="Transaction Fee / Contingency Cut">Transaction Fee / Found Money Cut</option>
                  <option value="High-Ticket Micro-Tool ($299-$499/mo)">High-Ticket Tool ($299 - $499/mo)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning High-Pain Niches...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate 3 Unsolved Opportunities</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {generatedProblems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {generatedProblems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">
                        Urgency: {item.urgencyScore}/10
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mb-3">
                      <strong>Customer:</strong> {item.targetCustomer}
                    </p>

                    <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-red-200 mb-3">
                      <strong className="block text-red-400 font-semibold mb-0.5">The Acute Pain:</strong>
                      <span>{item.thePain}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 text-xs text-neutral-300 mb-3">
                      <strong className="block text-amber-400 font-semibold mb-0.5">14-Day MVP Solution:</strong>
                      <span>{item.theSolutionMVP}</span>
                    </div>

                    <div className="text-xs text-neutral-400 space-y-1">
                      <div>
                        <strong>Why Unsolved:</strong> {item.whyUnsolved}
                      </div>
                      <div>
                        <strong>Acquisition:</strong> {item.acquisitionAngle}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-neutral-500">Price</span>
                      <div className="text-xs font-bold text-emerald-400">{item.monthlyPrice}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-neutral-500">Build Speed</span>
                      <div className="text-xs font-semibold text-neutral-300">{item.speedToBuild}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
