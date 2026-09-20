import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, CheckCircle2, Award, Zap } from 'lucide-react';

interface RevenueCalculatorProps {
  initialPrice?: number;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ initialPrice = 79 }) => {
  const [pricePerMonth, setPricePerMonth] = useState<number>(initialPrice);
  const [customerCount, setCustomerCount] = useState<number>(35);
  const [monthlyChurnRate, setMonthlyChurnRate] = useState<number>(3); // 3% churn
  const [closeRate, setCloseRate] = useState<number>(20); // 20% close rate on discovery calls

  const mrr = pricePerMonth * customerCount;
  const arr = mrr * 12;

  // Acquisition math
  const callsNeededForGoal = Math.ceil(customerCount / (closeRate / 100));
  const monthsToGoalAt5CallsAWeek = Math.max(1, Math.ceil(callsNeededForGoal / 20));

  const milestones = [
    { target: 1000, label: 'Ramen Profitable ($1k/mo)', desc: 'Covers basic bills & servers' },
    { target: 4000, label: 'Quit Day-Job Freedom ($4k/mo)', desc: 'Replace median full-time salary' },
    { target: 10000, label: 'Solo Lifestyle Business ($10k/mo)', desc: '$120,000/year high-margin freedom' },
    { target: 20000, label: 'Scale Micro-SaaS ($20k/mo)', desc: 'Hire contract support & compound ARR' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black text-white">Interactive Micro-SaaS Revenue Simulator</h2>
        <p className="mt-1 text-xs text-neutral-400 max-w-lg mx-auto">
          See why solving unsexy B2B problems makes making money much easier: you only need 30 to 60 paying business customers to replace a full-time salary.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input */}
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Pricing & Customer Targets</span>
          </h3>

          {/* Price Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-neutral-300 font-semibold">Monthly Price Per Customer</span>
              <span className="text-base font-black text-emerald-400">${pricePerMonth}/mo</span>
            </div>
            <input
              type="range"
              min={29}
              max={399}
              step={10}
              value={pricePerMonth}
              onChange={(e) => setPricePerMonth(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>$29/mo (Starter)</span>
              <span>$99/mo (Standard B2B)</span>
              <span>$199/mo (Pro)</span>
              <span>$399/mo (High-ticket)</span>
            </div>
          </div>

          {/* Customers Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-neutral-300 font-semibold">Number of Paying Customers</span>
              <span className="text-base font-black text-amber-400">{customerCount} clients</span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={customerCount}
              onChange={(e) => setCustomerCount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>5 clients</span>
              <span>30 clients</span>
              <span>75 clients</span>
              <span>150 clients</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-2 border-t border-neutral-800">
            <span className="text-[11px] text-neutral-400 font-semibold block mb-2">
              Realistic Micro-SaaS Presets:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setPricePerMonth(49);
                  setCustomerCount(40);
                }}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 transition-colors text-center"
              >
                <div className="font-bold text-white">$49/mo × 40</div>
                <div className="text-[10px] text-neutral-400">Local Tool</div>
              </button>

              <button
                onClick={() => {
                  setPricePerMonth(99);
                  setCustomerCount(50);
                }}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 transition-colors text-center"
              >
                <div className="font-bold text-white">$99/mo × 50</div>
                <div className="text-[10px] text-neutral-400">Trade SaaS</div>
              </button>

              <button
                onClick={() => {
                  setPricePerMonth(199);
                  setCustomerCount(30);
                }}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 transition-colors text-center"
              >
                <div className="font-bold text-white">$199/mo × 30</div>
                <div className="text-[10px] text-neutral-400">High-ROI B2B</div>
              </button>
            </div>
          </div>
        </div>

        {/* Output Metrics */}
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Projected Revenue
            </span>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700">
                <div className="text-xs text-neutral-400 font-medium">Monthly (MRR)</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                  ${mrr.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">per month recurring</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700">
                <div className="text-xs text-neutral-400 font-medium">Annualized (ARR)</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                  ${arr.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">per year recurring</div>
              </div>
            </div>

            {/* Milestones Progress */}
            <div className="mt-6 space-y-2.5">
              <span className="text-xs font-bold text-white block">Financial Freedom Milestones</span>
              {milestones.map((m, idx) => {
                const achieved = mrr >= m.target;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                      achieved
                        ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
                        : 'bg-neutral-800/30 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${achieved ? 'text-emerald-400' : 'text-neutral-600'}`}
                      />
                      <div>
                        <span className={`font-bold ${achieved ? 'text-white' : 'text-neutral-400'}`}>
                          {m.label}
                        </span>
                        <div className="text-[10px] text-neutral-500">{m.desc}</div>
                      </div>
                    </div>
                    <span className="font-bold text-xs">
                      {achieved ? 'UNLOCKED' : `${Math.ceil(m.target / pricePerMonth)} clients needed`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Acquisition Roadmap Note */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200">
            <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Realistic Acquisition Roadmap:</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              At a conservative {closeRate}% sales conversion rate, landing {customerCount} customers requires approximately{' '}
              <strong className="text-amber-300">{callsNeededForGoal} discovery calls</strong> or direct demos. If you do 5 calls/demos a week, you can reach this target in approximately{' '}
              <strong className="text-emerald-400">{monthsToGoalAt5CallsAWeek} to {monthsToGoalAt5CallsAWeek + 1} months</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
