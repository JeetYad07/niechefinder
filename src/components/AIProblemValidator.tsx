import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Target,
  ShieldAlert,
  RefreshCw,
  Lightbulb,
  Copy,
  Check,
  Flame,
  Zap,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { AIValidationResult, GeneratedProblemIdea } from '../types';
import { getSmartFallbackValidation, getSmartFallbackIdeas } from '../utils/aiFallback';

export const AIProblemValidator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'validate' | 'generate'>('validate');

  // Validation Form State
  const [problemTitle, setProblemTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [userBackground, setUserBackground] = useState('');
  const [analysisLens, setAnalysisLens] = useState<'indie' | 'b2b' | 'venture'>('indie');

  // Generation Form State
  const [genIndustry, setGenIndustry] = useState('');
  const [builderSkills, setBuilderSkills] = useState('Full-stack Web / React & Node');
  const [preferredModel, setPreferredModel] = useState('Monthly B2B SaaS ($49-$199/mo)');

  // Loading and Results
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<AIValidationResult | null>(null);
  const [generatedProblems, setGeneratedProblems] = useState<GeneratedProblemIdea[]>([]);
  const [copiedReport, setCopiedReport] = useState(false);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle.trim()) return;

    setIsLoading(true);
    setLoadingStep(1);
    setErrorMsg(null);
    setValidationResult(null);

    const stepTimer = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 700);

    try {
      const res = await fetch('/api/ai/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle,
          industry,
          targetAudience,
          userBackground: `${userBackground} (Evaluated via ${analysisLens} lens)`,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        data = await res.json();
      }

      if (res.ok && data && data.success && data.data) {
        setValidationResult(data.data);
      } else {
        setValidationResult(getSmartFallbackValidation(problemTitle, industry, targetAudience));
      }
    } catch (err: any) {
      console.warn('Validation API error, using smart fallback:', err?.message || err);
      setValidationResult(getSmartFallbackValidation(problemTitle, industry, targetAudience));
    } finally {
      clearInterval(stepTimer);
      setIsLoading(false);
      setLoadingStep(0);
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

      const contentType = res.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        data = await res.json();
      }

      if (res.ok && data && data.success && data.data?.problems) {
        setGeneratedProblems(data.data.problems);
      } else {
        setGeneratedProblems(getSmartFallbackIdeas(genIndustry, builderSkills));
      }
    } catch (err: any) {
      console.warn('Generation API error, using smart fallback:', err?.message || err);
      setGeneratedProblems(getSmartFallbackIdeas(genIndustry, builderSkills));
    } finally {
      setIsLoading(false);
    }
  };

  const quickFillSample = (sampleType: string) => {
    if (sampleType === 'subcontractor') {
      setProblemTitle('General contractor subcontractor insurance COI expiration and lien release tracker');
      setIndustry('Construction & Trades');
      setTargetAudience('Custom home builders & general contractors with 5-30 subs');
      setUserBackground('Full-stack Web developer');
    } else if (sampleType === 'dental') {
      setProblemTitle('Dental clinic amalgam and lead foil hazardous waste manifest compliance tracker');
      setIndustry('Healthcare & Dental');
      setTargetAudience('Solo dental practice owners and office managers');
      setUserBackground('React & TypeScript builder');
    } else if (sampleType === 'freight') {
      setProblemTitle('Small independent carrier shipping refund dispute and detention pay auto-filer');
      setIndustry('Logistics & Freight');
      setTargetAudience('Owner-operator truckers and 3PL shop operators');
      setUserBackground('Python & API automation developer');
    } else if (sampleType === 'machining') {
      setProblemTitle('Machine shop RFQ blueprint tolerance quoter and material cost calculator');
      setIndustry('Manufacturing & Metalwork');
      setTargetAudience('CNC machine shop owners & Estimators');
      setUserBackground('Web App Developer');
    }
  };

  const handleCopyValidationReport = () => {
    if (!validationResult) return;
    const reportText = `# NicheRadar Idea Validation Report
Problem: ${problemTitle}
Industry: ${industry || 'B2B Operations'}
Willingness to Pay Score: ${validationResult.willingnessToPayScore}/10
Verdict: ${validationResult.verdict}

## Why Customers Will Pay
${validationResult.willingnessToPayReasoning}

## Recommended Pricing
- Starter: ${validationResult.estimatedPricing.starter}
- Growth: ${validationResult.estimatedPricing.growth}
- Customer LTV: ${validationResult.estimatedPricing.expectedLTV}

## Competitor Blindspot
${validationResult.whyCompetitorsIgnore}

## 14-Day MVP Scope
${validationResult.fourteenDayMVPScope.map((item, i) => `${i + 1}. ${item}`).join('\n')}

## First 10 Customers Channel
${validationResult.firstTenCustomersChannel}

## Riskiest Assumption
${validationResult.riskiestAssumption}

## Prospect Validation Question
"${validationResult.validationQuestion}"
`;
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 5) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {/* Mode Switcher */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 text-center border border-neutral-800">
        <div className="inline-flex flex-col sm:flex-row w-full sm:w-auto p-1 rounded-xl bg-neutral-900 border border-neutral-800 gap-1">
          <button
            onClick={() => setActiveMode('validate')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'validate'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-extrabold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ⚡ Test Your Problem Idea
          </button>
          <button
            onClick={() => setActiveMode('generate')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'generate'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-extrabold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            💡 AI Unsolved Niche Generator
          </button>
        </div>
        <h2 className="mt-4 text-xl sm:text-2xl font-black text-white tracking-tight">
          {activeMode === 'validate'
            ? 'Ruthless Micro-SaaS Problem & Idea Validator'
            : 'Discover Hidden, High-Pain Problems Tailored To Your Skills'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          {activeMode === 'validate'
            ? 'Get a brutal, venture-grade evaluation on Willingness to Pay, Competitor Blindspots, 14-day MVP specs, and customer acquisition channels.'
            : 'Let AI scan obscure B2B operational pain points where incumbents overcharge and businesses are desperate for simple software.'}
        </p>
      </div>

      {activeMode === 'validate' ? (
        /* VALIDATE FORM & RESULT GRID */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Form */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-5 sm:p-6 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Idea Inputs</span>
              </h3>
              <span className="text-[11px] text-neutral-400">Quick samples:</span>
            </div>

            {/* Quick Sample Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => quickFillSample('subcontractor')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer border border-neutral-700/60"
              >
                🛠️ Sub Insurance
              </button>
              <button
                type="button"
                onClick={() => quickFillSample('dental')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer border border-neutral-700/60"
              >
                🦷 Dental Waste
              </button>
              <button
                type="button"
                onClick={() => quickFillSample('freight')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer border border-neutral-700/60"
              >
                📦 Carrier Refunds
              </button>
              <button
                type="button"
                onClick={() => quickFillSample('machining')}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer border border-neutral-700/60"
              >
                📑 CNC Quoting
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
                  className="w-full p-3 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors leading-relaxed"
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
                  placeholder="e.g. Commercial Roofing, Independent Vet Clinics, Freight"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
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
                  placeholder="e.g. Office Manager, Shop Foreman, Solo Builder"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Analysis Lens Switcher */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Evaluation Lens
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-neutral-800/60 border border-neutral-700/80">
                  <button
                    type="button"
                    onClick={() => setAnalysisLens('indie')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      analysisLens === 'indie'
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    ⚡ Solo Indie
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalysisLens('b2b')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      analysisLens === 'b2b'
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    💼 B2B SaaS
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalysisLens('venture')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      analysisLens === 'venture'
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    🔍 VC Scout
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !problemTitle.trim()}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {loadingStep === 1 && 'Scanning B2B Pain Points...'}
                      {loadingStep === 2 && 'Calculating Willingness to Pay...'}
                      {loadingStep >= 3 && 'Building 14-Day Blueprint...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Run Brutal AI Validation</span>
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
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center p-8 glass-card border border-neutral-800 rounded-2xl text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-amber-400 shadow-inner">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Awaiting Problem Submission</h4>
                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                  Enter an unsexy business pain point on the left or tap a quick sample to evaluate real willingness to pay, competitor blindspots, and 14-day MVP specs.
                </p>
              </div>
            )}

            {validationResult && (
              <div className="glass-card border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-6 text-xs text-neutral-200">
                {/* Executive Verdict & Score Gauge */}
                <div className="p-4 rounded-xl bg-neutral-800/70 border border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        Executive Verdict
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${getScoreColor(validationResult.willingnessToPayScore)}`}>
                        {validationResult.willingnessToPayScore >= 8 ? 'High Conviction Winner' : validationResult.willingnessToPayScore >= 5 ? 'Moderate Opportunity' : 'Needs Pivot'}
                      </span>
                    </div>
                    <div className="text-sm font-black text-white leading-tight">
                      {validationResult.verdict}
                    </div>
                  </div>

                  {/* Meter Gauge */}
                  <div className="flex items-center gap-2.5 bg-neutral-900 px-3.5 py-2.5 rounded-xl border border-neutral-700 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Willingness To Pay</div>
                      <div className="text-lg font-black text-emerald-400">
                        {validationResult.willingnessToPayScore} <span className="text-xs font-medium text-neutral-500">/ 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Progress Bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-neutral-400 font-semibold mb-1">
                    <span>Low Pain</span>
                    <span>Moderate</span>
                    <span className="text-emerald-400 font-bold">High-Margin Winner (8+)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden p-0.5 border border-neutral-700">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        validationResult.willingnessToPayScore >= 8
                          ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                          : validationResult.willingnessToPayScore >= 5
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${validationResult.willingnessToPayScore * 10}%` }}
                    />
                  </div>
                </div>

                {/* Reasoning */}
                <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-900/40 text-emerald-200">
                  <strong className="block text-emerald-400 font-bold mb-1 flex items-center gap-1.5 text-xs">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Why Customers Will Pull Out Their Credit Card:</span>
                  </strong>
                  <p className="leading-relaxed">{validationResult.willingnessToPayReasoning}</p>
                </div>

                {/* Pricing & Competitor Blindspot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Recommended Pricing Strategy</span>
                    </div>
                    <ul className="space-y-1.5 text-neutral-300">
                      <li>• <strong>Starter:</strong> {validationResult.estimatedPricing.starter}</li>
                      <li>• <strong>Growth:</strong> {validationResult.estimatedPricing.growth}</li>
                      <li>• <strong>Customer LTV:</strong> {validationResult.estimatedPricing.expectedLTV}</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700">
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
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>14-Day MVP Minimal Scope (Build ONLY This)</span>
                  </h4>
                  <div className="space-y-2">
                    {validationResult.fourteenDayMVPScope.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-neutral-800/50 border border-neutral-700/80 text-neutral-300 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* First 10 Customers & Riskiest Assumption */}
                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-2.5">
                  <div>
                    <span className="font-bold text-amber-400">First 10 Customers Acquisition Channel: </span>
                    <span className="text-neutral-300">{validationResult.firstTenCustomersChannel}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex items-start gap-2.5 text-amber-200">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Riskiest Assumption to Test First: </strong>
                      <span>{validationResult.riskiestAssumption}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Interview Script Question */}
                <div className="p-4 rounded-xl bg-blue-950/25 border border-blue-900/40 text-blue-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask 5 Prospects This Exact Validation Question:</span>
                  </div>
                  <p className="italic text-neutral-200">"{validationResult.validationQuestion}"</p>
                </div>

                {/* Export & Copy Report Action Bar */}
                <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
                  <span className="text-[11px] text-neutral-400">Export report for your build roadmap:</span>
                  <button
                    onClick={handleCopyValidationReport}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReport ? 'Copied Full Report' : 'Copy Validation Report'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* GENERATE IDEAS FORM & GRID */
        <div className="space-y-6">
          <form onSubmit={handleGenerate} className="glass-card border border-neutral-800 rounded-2xl p-5 sm:p-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Target Industry or Interest
                </label>
                <input
                  type="text"
                  value={genIndustry}
                  onChange={(e) => setGenIndustry(e.target.value)}
                  placeholder="e.g. Construction, Auto Repair, Dental, Logistics"
                  className="w-full p-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Your Builder Skills
                </label>
                <select
                  value={builderSkills}
                  onChange={(e) => setBuilderSkills(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="Full-stack Web / React & Node">Full-stack Web (React / Node / TS)</option>
                  <option value="Frontend UI Developer">Frontend UI Developer</option>
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
                  className="w-full p-2.5 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
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
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-extrabold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
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
                  className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between transition-all border border-neutral-800"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-amber-400" />
                        Urgency: {item.urgencyScore}/10
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 leading-snug">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mb-3">
                      <strong className="text-neutral-300">Customer:</strong> {item.targetCustomer}
                    </p>

                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-xs text-red-200 mb-3 leading-relaxed">
                      <strong className="block text-red-400 font-semibold mb-0.5">The Acute Pain:</strong>
                      <span>{item.thePain}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 text-xs text-neutral-300 mb-3 leading-relaxed">
                      <strong className="block text-amber-400 font-semibold mb-0.5">14-Day MVP Solution:</strong>
                      <span>{item.theSolutionMVP}</span>
                    </div>

                    <div className="text-xs text-neutral-400 space-y-1 leading-relaxed">
                      <div>
                        <strong className="text-neutral-300">Why Unsolved:</strong> {item.whyIncumbentsIgnore || item.whyUnsolved}
                      </div>
                      <div>
                        <strong className="text-neutral-300">Acquisition:</strong> {item.acquisitionAngle}
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
