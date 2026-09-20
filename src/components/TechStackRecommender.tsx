import React from 'react';
import { RECOMMENDED_TECH_STACKS } from '../data/techStacks';
import { Code, CheckCircle, Zap } from 'lucide-react';

interface TechStackRecommenderProps {
  category?: string;
}

export const TechStackRecommender: React.FC<TechStackRecommenderProps> = ({ category }) => {
  const config = RECOMMENDED_TECH_STACKS[category || ''] || RECOMMENDED_TECH_STACKS.default;

  return (
    <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/80 space-y-3 text-xs text-neutral-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-amber-400">
          <Code className="w-4 h-4" />
          <span>Recommended 14-Day MVP Tech Stack</span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
          Build Time: {config.estimatedBuildTime}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
        <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">Frontend & Hosting</span>
          <span className="font-semibold text-white">{config.recommendedStack.frontend}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">Database & Backend</span>
          <span className="font-semibold text-white">{config.recommendedStack.database}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">Auth & Access</span>
          <span className="font-semibold text-white">{config.recommendedStack.auth}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">Payments & Alerts</span>
          <span className="font-semibold text-emerald-400">{config.recommendedStack.payments} / {config.recommendedStack.notifications}</span>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-amber-200 flex items-start gap-2">
        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">Why this stack: </strong>
          <span>{config.whyThisStack}</span>
        </div>
      </div>
    </div>
  );
};
