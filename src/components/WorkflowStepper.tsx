import React from 'react';
import { Compass, Search, BarChart3, CheckCircle2, FlaskConical, Gavel, Hammer } from 'lucide-react';

export type WorkflowStage = 'discover' | 'research' | 'evaluate' | 'validate' | 'experiment' | 'decide' | 'build';

export interface WorkflowStageItem {
  id: WorkflowStage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const WORKFLOW_STAGES: WorkflowStageItem[] = [
  { id: 'discover', label: '1. Discover', icon: Compass, description: 'Identify unsexy B2B operational pain' },
  { id: 'research', label: '2. Research', icon: Search, description: 'Inspect raw evidence & status-quo workarounds' },
  { id: 'evaluate', label: '3. Evaluate', icon: BarChart3, description: 'Assess ACV economics & 14-day scope' },
  { id: 'validate', label: '4. Validate', icon: CheckCircle2, description: 'Test riskiest assumptions & kill criteria' },
  { id: 'experiment', label: '5. Experiment', icon: FlaskConical, description: 'Run outreach scripts & test buyer intent' },
  { id: 'decide', label: '6. Decide', icon: Gavel, description: 'Proceed, Pivot, or Kill Idea' },
  { id: 'build', label: '7. Build', icon: Hammer, description: 'Export 14-day MVP spec & tech stack' },
];

interface WorkflowStepperProps {
  currentStage: WorkflowStage;
  onSelectStage: (stage: WorkflowStage) => void;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStage,
  onSelectStage,
}) => {
  const currentIndex = WORKFLOW_STAGES.findIndex((s) => s.id === currentStage);

  return (
    <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 sm:p-4 shadow-md overflow-x-auto scrollbar-none">
      <div className="flex items-center justify-between gap-1 min-w-[640px]">
        {WORKFLOW_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = stage.id === currentStage;
          const isCompleted = idx < currentIndex;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onSelectStage(stage.id)}
                className={`group flex flex-col items-center p-2 rounded-xl text-center transition-all cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400 shadow-sm'
                    : isCompleted
                    ? 'bg-neutral-800/60 text-emerald-400 border border-neutral-700/60 hover:bg-neutral-800'
                    : 'bg-neutral-900/40 text-neutral-400 border border-neutral-800/80 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                    {stage.label}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 max-w-[90px] truncate hidden md:block">
                  {stage.description}
                </span>
              </button>

              {idx < WORKFLOW_STAGES.length - 1 && (
                <div
                  className={`h-0.5 flex-1 min-w-[12px] rounded-full transition-colors ${
                    idx < currentIndex ? 'bg-emerald-500/40' : 'bg-neutral-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
