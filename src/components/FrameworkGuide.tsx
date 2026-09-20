import React, { useState } from 'react';
import { PAIN_TO_PROFIT_FRAMEWORK_RULES } from '../data/problems';
import { BookOpen, CheckCircle, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const FrameworkGuide: React.FC = () => {
  const [checkedRules, setCheckedRules] = useState<Record<number, boolean>>({});

  const toggleCheck = (step: number) => {
    setCheckedRules((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const score = Object.values(checkedRules).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black text-white">The "Pain-to-Profit" 5-Question Framework</h2>
        <p className="mt-1 text-xs text-neutral-400 max-w-xl mx-auto">
          Why do 90% of indie builders fail? They build solutions looking for a problem. Use this 5-question test to instantly eliminate ideas with zero willingness to pay.
        </p>
      </div>

      {/* Comparison Matrix: What Fails vs What Makes Money */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Trap (Zero Willingness to Pay) */}
        <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <XCircle className="w-5 h-5" />
            <span>The Indie Trap (Zero Willingness to Pay)</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Projects builders make because they are easy to code, but nobody pulls out a credit card for:
          </p>
          <ul className="space-y-2 text-xs text-red-200/90">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>AI note-taker / bookmark organizer:</strong> Free alternatives exist everywhere; people switch every 3 weeks.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>Generic social media post scheduler:</strong> Red ocean of 200+ venture-funded apps charging $9/mo.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>"LinkedIn for Dog Walkers" (Two-sided marketplaces):</strong> Requires millions in ad spend to get supply and demand simultaneously.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span><strong>Habit trackers / personal todo lists:</strong> Consumers will cancel the moment the $3 trial ends.</span>
            </li>
          </ul>
        </div>

        {/* The Goldmine (High Willingness to Pay) */}
        <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle className="w-5 h-5" />
            <span>The Goldmine (High Willingness to Pay)</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Unsexy B2B problems where saving time or avoiding fines directly puts thousands of dollars in the client’s pocket:
          </p>
          <ul className="space-y-2 text-xs text-emerald-200/90">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Subcontractor Insurance & Lien Verification:</strong> Protects general contractors from $50,000 personal injury liability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>E-commerce Carrier Refund Auto-Filer:</strong> Literally recovers $2,000/mo of lost cash for the store owner.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Medical Biohazard Manifest Audit:</strong> Prevents $5,000 surprise OSHA and state environmental fines for dental clinics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Machine Shop RFQ Blueprint Quoter:</strong> Turns 4 hours of tedious PDF tolerance squinting into 10 minutes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive 5-Point Test Checklist */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Interactive Idea Viability Test</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Select an idea you are considering and test it against all 5 rules below:
            </p>
          </div>
          <div className="flex items-center gap-2 bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700">
            <span className="text-xs text-neutral-400">Viability Score:</span>
            <span className={`text-sm font-black ${score >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {score} / 5 Rules Met
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {PAIN_TO_PROFIT_FRAMEWORK_RULES.map((rule) => {
            const isChecked = !!checkedRules[rule.step];
            return (
              <div
                key={rule.step}
                onClick={() => toggleCheck(rule.step)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-950/20 border-emerald-900/50'
                    : 'bg-neutral-800/30 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-neutral-600 flex items-center justify-center text-[10px] text-neutral-400 font-bold">
                        {rule.step}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{rule.title}</h4>
                      <span className="text-[11px] text-neutral-400">— {rule.subtitle}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{rule.description}</p>
                    <div className="pt-1.5 text-xs text-amber-400 font-medium">
                      🎯 Test Question: <span className="text-neutral-200 italic">"{rule.checkQuestion}"</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verdict on Checked Score */}
        <div className="mt-6 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 text-xs">
          {score === 5 && (
            <div className="text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span><strong>Goldmine Opportunity:</strong> All 5 criteria met. You have a high probability of charging $50-$200/mo and landing 20+ clients quickly.</span>
            </div>
          )}
          {score >= 3 && score < 5 && (
            <div className="text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span><strong>Promising with Friction:</strong> Ensure you have a clear answer for the unchecked criteria before writing code.</span>
            </div>
          )}
          {score < 3 && (
            <div className="text-neutral-400 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span><strong>High Risk of Abandonment:</strong> Fewer than 3 criteria met. You risk building something nobody wants to pay for.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
