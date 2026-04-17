'use client';
import { useState, useMemo } from 'react';

export default function RebateCalculator({ rates }: { rates: any }) {
  const [amount, setAmount] = useState(5000);

  const { monthly, annual } = useMemo(() => {
    const rate = Number(rates?.online || 0);
    const m = (amount * rate) / 100;
    return {
      monthly: m.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      annual: (m * 12).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    };
  }, [amount, rates]);

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label className="text-[11px] text-slate-400 uppercase font-bold tracking-tight block">
          Monthly Online Spend
        </label>
        <div className="text-3xl font-mono font-bold text-slate-900">
          ${amount.toLocaleString()}
        </div>
      </div>
      
      <input 
        type="range" 
        min="0" 
        max="20000" 
        step="500"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600 mb-8"
      />

      <div className="space-y-2">
        {/* Monthly Reward Row */}
        <div className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50">
          <span className="text-xs font-semibold text-slate-500 uppercase">Monthly Earn</span>
          <span className="text-xl font-bold text-slate-900">
            ${monthly} <span className="text-xs font-normal text-slate-400 ml-1 font-mono">RC</span>
          </span>
        </div>
        
        {/* Annual Savings Row - FIXED COLORS */}
        <div className="flex justify-between items-center p-4 rounded-xl bg-slate-100 border border-slate-200">
          <span className="text-xs font-bold text-slate-600 uppercase">Annual Savings</span>
          <span className="text-2xl font-black text-slate-900">
            ${annual}
          </span>
        </div>
      </div>
    </div>
  );
}