import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, RefreshCw, ArrowRight, Gavel } from 'lucide-react';

interface InvalidationMatrixProps {
  riskiestAssumption: string;
  invalidationCriteria: string[];
  problemTitle: string;
}

export type FounderDecision = 'proceed' | 'pivot' | 'kill' | null;

export const InvalidationMatrix: React.FC<InvalidationMatrixProps> = ({
  riskiestAssumption,
  invalidationCriteria,
  problemTitle,
}) => {
  const [decision, setDecision] = useState<FounderDecision>(null);
  const [rationale, setRationale] = useState('');
  const [savedDecision, setSavedDecision] = useState<{ decision: FounderDecision; rationale: string; date: string } | null>(null);

  const handleSaveDecision = (selectedDecision: FounderDecision) => {
    setDecision(selectedDecision);
    const newDecision = {
      decision: selectedDecision,
      rationale: rationale.trim() || 'Logged evaluation based on prospect feedback and kill criteria.',
      date: new Date().toLocaleDateString(),
    };
    setSavedDecision(newDecision);
    try {
      localStorage.setItem(`nicheradar_decision_${problemTitle}`, JSON.stringify(newDecision));
    } catch (e) {
      console.warn('Failed to save decision:', e);
    }
  };

  return (
    <div className="space-y-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Idea Invalidation & Kill Matrix</h3>
            <p className="text-xs text-neutral-400">Validate or kill this idea before writing code.</p>
          </div>
        </div>

        {savedDecision && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              savedDecision.decision === 'proceed'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : savedDecision.decision === 'pivot'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            Decision: {savedDecision.decision}
          </span>
        )}
      </div>

      {/* Riskiest Assumption Highlight Box */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>The #1 Riskiest Assumption:</span>
        </div>
        <p className="text-neutral-200 leading-relaxed font-medium pl-6">{riskiestAssumption}</p>
      </div>

      {/* Kill Criteria List */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-rose-400">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>Explicit Invalidation Triggers (When to KILL or PIVOT):</span>
        </div>
        <ul className="space-y-2 pl-6 list-disc text-rose-200/90 leading-relaxed">
          {invalidationCriteria.map((item, idx) => (
            <li key={idx}>
              <strong className="text-white">Rule {idx + 1}:</strong> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Decision Gate Form */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Gavel className="w-4 h-4 text-amber-400" />
          <span>Founder Decision Log</span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
            Validation Notes & Prospect Feedback Rationale:
          </label>
          <textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="e.g. Spoke to 4 general contractors; 3 confirmed willingness to pay $129/mo if SMS waiver works on mobile..."
            className="w-full h-20 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSaveDecision('proceed')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              decision === 'proceed' || savedDecision?.decision === 'proceed'
                ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-md font-extrabold'
                : 'bg-neutral-900 hover:bg-emerald-950/40 text-emerald-400 border-emerald-900/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Proceed to MVP</span>
          </button>

          <button
            onClick={() => handleSaveDecision('pivot')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              decision === 'pivot' || savedDecision?.decision === 'pivot'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-extrabold'
                : 'bg-neutral-900 hover:bg-amber-950/40 text-amber-400 border-amber-900/60'
            }`}
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span>Pivot Angle</span>
          </button>

          <button
            onClick={() => handleSaveDecision('kill')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              decision === 'kill' || savedDecision?.decision === 'kill'
                ? 'bg-rose-600 text-white border-rose-500 shadow-md font-extrabold'
                : 'bg-neutral-900 hover:bg-rose-950/40 text-rose-400 border-rose-900/60'
            }`}
          >
            <XCircle className="w-4 h-4 shrink-0" />
            <span>Kill Idea Early</span>
          </button>
        </div>

        {savedDecision && (
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
            <span>
              Decision saved on <strong className="text-white">{savedDecision.date}</strong>: "{savedDecision.rationale}"
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};
