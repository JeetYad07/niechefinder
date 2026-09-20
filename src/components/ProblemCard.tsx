import React from 'react';
import { ProblemOpportunity } from '../types';
import { ArrowRight, Flame, Bookmark, BookmarkCheck, DollarSign, Clock, Users } from 'lucide-react';

interface ProblemCardProps {
  problem: ProblemOpportunity;
  onSelect: (problem: ProblemOpportunity) => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onSelect,
  isSaved,
  onToggleSave,
}) => {
  return (
    <div
      onClick={() => onSelect(problem)}
      className="group relative bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60">
              {problem.category}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {problem.complexity}
            </span>
          </div>

          <button
            onClick={(e) => onToggleSave(problem.id, e)}
            className="text-neutral-400 hover:text-amber-400 p-1 rounded-md transition-colors"
            title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug">
          {problem.title}
        </h3>
        <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
          {problem.tagline}
        </p>

        {/* The Bleeding Neck Summary */}
        <div className="mt-4 p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-red-200/90 leading-relaxed">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1">
            <Flame className="w-3.5 h-3.5" />
            <span>The Urgent Pain & Financial Drain:</span>
          </div>
          <p className="line-clamp-2">{problem.theBleedingNeck}</p>
        </div>

        {/* Target Buyer & Market Signals */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-neutral-300">
            <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              <strong className="text-neutral-200">Buyer:</strong> {problem.targetBuyer}
            </span>
          </div>
          <div className="flex items-start gap-2 text-neutral-300">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-neutral-200">Pricing:</strong>{' '}
              <span className="text-emerald-400 font-semibold">{problem.estimatedPrice}</span> ({problem.priceModel})
            </span>
          </div>
        </div>
      </div>

      {/* Footer Metrics & CTA */}
      <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[10px] uppercase font-semibold text-neutral-500">Urgency</div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
              <Flame className="w-3 h-3 fill-amber-400" />
              {problem.urgencyRating}/10
            </div>
          </div>
          <div className="h-6 w-px bg-neutral-800" />
          <div>
            <div className="text-[10px] uppercase font-semibold text-neutral-500">At 50 Clients</div>
            <div className="text-xs font-bold text-emerald-400">
              {problem.financialFreedomSimulation.fiftyClients.split(' ')[0]} /mo
            </div>
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
          <span>Inspect Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
