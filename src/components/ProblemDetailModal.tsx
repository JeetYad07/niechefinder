import React, { useState } from 'react';
import { ProblemOpportunity } from '../types';
import {
  X,
  Flame,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Compass,
  Target,
  FileSpreadsheet
} from 'lucide-react';

interface ProblemDetailModalProps {
  problem: ProblemOpportunity;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenCalculatorWithPrice: (price: string) => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  onClose,
  isSaved,
  onToggleSave,
  onOpenCalculatorWithPrice,
}) => {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedQuestions, setCopiedQuestions] = useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(problem.fiveMinutePitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyQuestions = () => {
    const text = problem.customerValidationQuestions
      .map((q, idx) => `${idx + 1}. ${q}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-neutral-900/95 border-b border-neutral-800 sticky top-0 z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                {problem.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Build Time: {problem.complexity}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {problem.estimatedPrice} ({problem.priceModel})
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {problem.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              {problem.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(problem.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
              title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-neutral-200">
          {/* Section 1: The Bleeding Neck & Status Quo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
              <div className="flex items-center gap-2 text-sm font-bold text-red-400 mb-2">
                <Flame className="w-4 h-4" />
                <span>The Bleeding Neck (Why They Pay Money)</span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-300">
                {problem.theBleedingNeck}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-300 mb-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span>How They Suffer Today (Status Quo)</span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                {problem.currentStatusQuo}
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-800 text-[11px] text-amber-400/90 font-medium">
                💡 <span className="text-neutral-300">Target Buyer:</span> {problem.targetBuyer}
              </div>
            </div>
          </div>

          {/* Section 2: Why Incumbents Ignore It & Market Evidence */}
          <div className="p-4 rounded-xl bg-neutral-800/30 border border-neutral-800">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Competitor Blindspot: Why Nobody Is Solving This Well</span>
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {problem.whyIncumbentsIgnore}
            </p>
            <div className="mt-3 p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2">
              <span className="text-amber-400 font-bold">Signal:</span>
              <span>{problem.evidenceSignal}</span>
            </div>
          </div>

          {/* Section 3: 14-Day MVP Architecture */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>14-Day MVP Architecture (Build Only This)</span>
              </h4>
              <span className="text-[11px] text-neutral-500 font-medium">
                Do not over-engineer
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problem.mvpFeatureSet.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Pricing Tiers & Financial Freedom Sim */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Monetization Tiers & MRR Potential</span>
              </h4>
              <button
                onClick={() => {
                  onClose();
                  onOpenCalculatorWithPrice(problem.estimatedPrice);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>Run Interactive MRR Sim</span>
                <TrendingUp className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {problem.pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      {tier.name}
                    </div>
                    <div className="text-lg font-black text-emerald-400 mt-1">
                      {tier.price}
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-neutral-300">
                      {tier.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Income freedom table */}
            <div className="mt-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Freedom Numbers:</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-300">
                <div>
                  <span className="text-neutral-400">25 Clients: </span>
                  <strong className="text-white">{problem.financialFreedomSimulation.twentyFiveClients}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">50 Clients: </span>
                  <strong className="text-emerald-400">{problem.financialFreedomSimulation.fiftyClients}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">100 Clients: </span>
                  <strong className="text-amber-400">{problem.financialFreedomSimulation.hundredClients}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: First 10 Customers Acquisition Strategy */}
          <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-800">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>How to Land First 10 Paying Customers</span>
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {problem.firstTenCustomersStrategy}
            </p>

            <div className="mt-4 p-3 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-between gap-3">
              <div className="text-xs text-neutral-300">
                <span className="text-amber-400 font-bold mr-1.5">The 5-Second Pitch:</span>
                "{problem.fiveMinutePitch}"
              </div>
              <button
                onClick={handleCopyPitch}
                className="shrink-0 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1 transition-colors"
                title="Copy pitch text"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Section 6: Validation Questions & Riskiest Assumption */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>5 Validation Questions to Ask 5 Prospects</span>
              </h4>
              <button
                onClick={handleCopyQuestions}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQuestions ? 'Copied Questions' : 'Copy All Questions'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {problem.customerValidationQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-neutral-700/60 text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>

            {/* Riskiest assumption warning */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-2.5 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">The Riskiest Assumption: </strong>
                <span>{problem.riskiestAssumption}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(problem.id)}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>Saved to Shortlist</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save to Shortlist</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="text-xs font-semibold px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-sm"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
