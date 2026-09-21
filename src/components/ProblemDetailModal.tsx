import React, { useState } from 'react';
import { ProblemOpportunity, EvidenceItem } from '../types';
import { OutreachGeneratorModal } from './OutreachGeneratorModal';
import { TechStackRecommender } from './TechStackRecommender';
import { WorkflowStepper, WorkflowStage } from './WorkflowStepper';
import { EvidenceInspector } from './EvidenceInspector';
import { InvalidationMatrix } from './InvalidationMatrix';
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
  FileSpreadsheet,
  ExternalLink,
  ShieldAlert,
  Sparkles,
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
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const [activeStage, setActiveStage] = useState<WorkflowStage>('discover');

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
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] sm:max-h-[92vh] flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-neutral-900/95 border-b border-neutral-800 sticky top-0 z-10 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {problem.category}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Build Time: {problem.complexity}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {problem.estimatedPrice} ({problem.priceModel})
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {problem.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                  {problem.tagline}
                </p>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={() => onToggleSave(problem.id)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                  }`}
                  title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* 7-Stage Workflow Stepper Controls */}
            <WorkflowStepper currentStage={activeStage} onSelectStage={(s) => setActiveStage(s)} />
          </div>

          {/* Scrollable Body - Rendered by activeStage */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 text-neutral-200">
            {/* Stage 1: Discover & Problem Overview */}
            {(activeStage === 'discover' || activeStage === 'evaluate') && (
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
            )}

            {/* Stage 2: Research & Raw Evidence Inspector */}
            {(activeStage === 'research' || activeStage === 'discover') && (
              <EvidenceInspector
                evidenceItems={problem.evidenceItems}
                evidenceSignal={problem.evidenceSignal}
                whyIncumbentsIgnore={problem.whyIncumbentsIgnore}
              />
            )}

            {/* Stage 3: Evaluate & Financial Feasibility */}
            {(activeStage === 'evaluate' || activeStage === 'discover') && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Monetization Tiers & Unit Economics</span>
                  </h4>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCalculatorWithPrice(problem.estimatedPrice);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Run Interactive MRR Sim</span>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

                {/* Freedom numbers */}
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Freedom Target:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-neutral-300">
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
            )}

            {/* Stage 4: Validate & Riskiest Assumptions / Invalidation Matrix */}
            {(activeStage === 'validate' || activeStage === 'decide' || activeStage === 'discover') && (
              <InvalidationMatrix
                riskiestAssumption={problem.riskiestAssumption}
                invalidationCriteria={problem.invalidationCriteria}
                problemTitle={problem.title}
              />
            )}

            {/* Customer Validation Questions */}
            {(activeStage === 'validate' || activeStage === 'discover') && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span>5 Validation Interview Questions to Ask Prospects</span>
                  </h4>
                  <button
                    onClick={handleCopyQuestions}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedQuestions ? 'Copied' : 'Copy Questions'}</span>
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
              </div>
            )}

            {/* Stage 5: Experiment & Cold Outreach Pitch Generator */}
            {(activeStage === 'experiment' || activeStage === 'discover') && (
              <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Cold Pitch & Script Experiment Generator</span>
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Test buyer demand with cold email, phone, and LinkedIn scripts.</p>
                  </div>
                  <button
                    onClick={() => setShowOutreachModal(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Outreach Scripts</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-neutral-300">
                    <span className="text-amber-400 font-bold mr-1.5">5-Second Cold Pitch:</span>
                    "{problem.fiveMinutePitch}"
                  </div>
                  <button
                    onClick={handleCopyPitch}
                    className="shrink-0 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Copy pitch text"
                  >
                    {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPitch ? 'Copied' : 'Copy Pitch'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stage 7: Build & 14-Day MVP Architecture */}
            {(activeStage === 'build' || activeStage === 'discover') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>14-Day MVP Architecture (Build Only This)</span>
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-medium hidden sm:inline">
                    Strict 14-day scope boundary
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

                {/* Recommended Tech Stack Card */}
                <TechStackRecommender category={problem.category} />
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between gap-3">
            <button
              onClick={() => onToggleSave(problem.id)}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
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
              className="text-xs font-semibold px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-sm cursor-pointer"
            >
              Close Blueprint
            </button>
          </div>
        </div>
      </div>

      {/* Outreach Pitch Generator Modal */}
      {showOutreachModal && (
        <OutreachGeneratorModal
          problemTitle={problem.title}
          targetBuyer={problem.targetBuyer}
          theBleedingNeck={problem.theBleedingNeck}
          priceStr={problem.estimatedPrice}
          onClose={() => setShowOutreachModal(false)}
        />
      )}
    </>
  );
};
