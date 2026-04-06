'use client';
import { useMortgageCalculator } from '@/hooks';
import { formatPrice } from '@/utils';

export function MortgageCalculator({ defaultPrice }: { defaultPrice?: number }) {
  const { input, setInput, result } = useMortgageCalculator({ homePrice: defaultPrice });

  function update(key: string, val: number) { setInput(i => ({ ...i, [key]: val })); }

  const downPct = Math.round((input.downPayment / input.homePrice) * 100);

  return (
    <div className="space-y-5">
      <SliderField label="Home Price" value={input.homePrice} min={200000} max={5000000} step={10000}
        display={formatPrice(input.homePrice)} onChange={v => update('homePrice', v)} />
      <SliderField label={`Down Payment — ${downPct}%`} value={input.downPayment} min={Math.round(input.homePrice * 0.05)} max={input.homePrice * 0.8} step={5000}
        display={formatPrice(input.downPayment)} onChange={v => update('downPayment', v)} />
      <SliderField label="Interest Rate" value={input.interestRate} min={1} max={12} step={0.1}
        display={`${input.interestRate.toFixed(1)}%`} onChange={v => update('interestRate', v)} />
      <SliderField label="Amortization" value={input.amortization} min={5} max={30} step={5}
        display={`${input.amortization} years`} onChange={v => update('amortization', v)} />

      <div className="pt-4 border-t border-slate-700 space-y-3">
        <ResultRow label="Monthly Payment" value={formatPrice(result.monthlyPayment)} highlight />
        <ResultRow label="Loan Amount" value={formatPrice(result.loanAmount)} />
        <ResultRow label="Total Interest" value={formatPrice(result.totalInterest)} />
        <ResultRow label="Total Cost" value={formatPrice(result.totalPayment)} />
      </div>
    </div>
  );
}

function SliderField({ label, value, min, max, step, display, onChange }: {
  label: string; value: number; min: number; max: number; step: number; display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-brand-gold">{display}</span>
      </div>
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, #c8a97e ${pct}%, #334155 ${pct}%)` }}
        />
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={highlight ? 'text-xl font-bold text-brand-gold' : 'text-sm font-semibold text-white'}>{value}</span>
    </div>
  );
}
