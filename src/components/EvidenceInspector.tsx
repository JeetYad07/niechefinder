import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import { ExternalLink, ShieldCheck, Sparkles, Filter, CheckCircle2, MessageSquare } from 'lucide-react';

interface EvidenceInspectorProps {
  evidenceItems?: EvidenceItem[];
  evidenceSignal: string;
  whyIncumbentsIgnore: string;
}

export const EvidenceInspector: React.FC<EvidenceInspectorProps> = ({
  evidenceItems = [],
  evidenceSignal,
  whyIncumbentsIgnore,
}) => {
  const [filter, setFilter] = useState<'all' | 'raw' | 'ai'>('all');

  return (
    <div className="space-y-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Header with Badges & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>[Source Evidence Grounded]</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>[AI Synthesis Tagged]</span>
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white">Market Evidence & Incumbent Blindspot Log</h3>
          <p className="text-xs text-neutral-400">Verifiable customer evidence logs paired with structural market analysis.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
              filter === 'all'
                ? 'bg-neutral-800 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setFilter('raw')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
              filter === 'raw'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-neutral-400 hover:text-emerald-400'
            }`}
          >
            Raw Evidence ({evidenceItems.length})
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer select-none transition-all ${
              filter === 'ai'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-amber-400'
            }`}
          >
            AI Analysis (2)
          </button>
        </div>
      </div>

      {/* Raw Verbatim Customer Evidence Section */}
      {(filter === 'all' || filter === 'raw') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Verbatim Customer Quotes & Origin Links</span>
            </span>
            <span className="text-[11px] text-neutral-500">100% Un-fabricated</span>
          </div>

          {evidenceItems.length > 0 ? (
            <div className="space-y-3">
              {evidenceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-neutral-900 border border-emerald-500/25 space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase text-[10px]">
                        [Source Evidence]
                      </span>
                      <span className="font-bold text-white">{item.sourceTitle}</span>
                    </div>

                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 border border-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inspect Raw Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-neutral-200 italic leading-relaxed bg-neutral-950/60 p-3 rounded-lg border border-neutral-800/80">
                    "{item.verbatimQuote}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    {item.authorRole && (
                      <span>Author Role: <strong className="text-neutral-200 font-semibold">{item.authorRole}</strong></span>
                    )}
                    <span>Verified: {item.verifiedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 text-center">
              No raw evidence links attached yet. Submit customer discovery notes or evidence URLs to populate.
            </div>
          )}
        </div>
      )}

      {/* Structured AI Analysis Section */}
      {(filter === 'all' || filter === 'ai') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>AI Structured Synthesis & Market Blindspots</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-neutral-900 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase text-[10px]">
                  [AI Analysis]
                </span>
                <h4 className="text-xs font-bold text-white">Competitor Blindspot</h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">{whyIncumbentsIgnore}</p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase text-[10px]">
                  [AI Analysis]
                </span>
                <h4 className="text-xs font-bold text-white">Demand Signal Synthesis</h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">{evidenceSignal}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
