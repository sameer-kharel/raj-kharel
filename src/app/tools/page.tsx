'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const cardClass =
  'bg-[#141432] border border-blue-900/40 rounded-2xl p-6 flex flex-col gap-6 shadow-xl shadow-blue-950/30';

const toolCards = [
  { title: 'Mortgage Calculator', slug: 'mortgage', blurb: 'Estimate monthly payments based on price, down payment, rate, and term.' },
  { title: 'APR Calculator', slug: 'apr-calculator', blurb: 'See the true annual percentage rate once closing costs and fees are included.' },
  { title: 'Auto Loan Calculator', slug: 'auto-loan', blurb: 'Project vehicle payments and compare loan offers side by side.' },
  { title: 'Compound Interest', slug: 'compound-interest', blurb: 'Track how savings grow with recurring deposits and compounding.' },
  { title: 'Credit Card Payoff', slug: 'credit-card-payoff', blurb: 'Build an accelerated payoff strategy to clear revolving balances faster.' },
  { title: 'Credit Utilization', slug: 'credit-utilization', blurb: 'Calculate how balances influence your revolving utilization ratio.' },
  { title: 'Debt Consolidation', slug: 'debt-consolidation', blurb: 'Compare consolidation options and potential interest savings.' },
  { title: 'Income Tax Estimator', slug: 'income-tax', blurb: 'Forecast annual federal tax liability with current deductions.' },
  { title: 'Loan Payment Calculator', slug: 'loan-payment', blurb: 'Work out amortized payments for any fixed-rate installment loan.' },
  { title: 'Refinance Analyzer', slug: 'refinance', blurb: 'Evaluate break-even timelines on proposed refinance scenarios.' },
  { title: 'Sales Tax Calculator', slug: 'sales-tax', blurb: 'Quickly total purchase costs with state and local sales tax.' },
  { title: 'Savings Goal Tracker', slug: 'savings-goal', blurb: 'Set a target and see how monthly contributions get you there.' },
];

export default function ToolsPage() {
  const [mortgage, setMortgage] = useState({ price: 450000, down: 90000, rate: 6.5, term: 30 });
  const [afford, setAfford] = useState({ income: 120000, debts: 800, rate: 6.5, term: 30 });
  const [rentBuy, setRentBuy] = useState({ rent: 2600, homePrice: 520000, years: 5 });

  const monthlyMortgage = useMemo(() => {
    const principal = mortgage.price - mortgage.down;
    const monthlyRate = mortgage.rate / 100 / 12;
    const n = mortgage.term * 12;
    if (principal <= 0 || n <= 0) return 0;
    if (monthlyRate === 0) return principal / n;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  }, [mortgage]);

  const affordability = useMemo(() => {
    const monthlyIncome = afford.income / 12;
    const frontEnd = monthlyIncome * 0.28;
    const backEnd = monthlyIncome * 0.36 - afford.debts;
    const monthlyBudget = Math.max(0, Math.min(frontEnd, backEnd));
    const monthlyRate = afford.rate / 100 / 12;
    const n = afford.term * 12;
    if (monthlyBudget <= 0 || n <= 0) return 0;
    if (monthlyRate === 0) return monthlyBudget * n;
    const factor = (Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n));
    return monthlyBudget * factor;
  }, [afford]);

  const rentVsBuy = useMemo(() => {
    const rentCost = rentBuy.rent * 12 * rentBuy.years;
    const buyDown = rentBuy.homePrice * 0.2;
    return { rentCost, buyDown };
  }, [rentBuy]);

  return (
    <div className="bg-[#08081c] text-white min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-purple-900/40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-6 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-300/80">Financial Toolkit</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">All the calculators you need to plan every move</h1>
            <p className="text-lg text-blue-100/80">
              Run quick estimates or dive deep with the full calculator library. Every tool is designed to give you clarity before you negotiate, refinance, or make your next offer.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="rounded-2xl border border-blue-900/40 bg-[#11112a] py-6 px-4">
              <p className="text-sm uppercase tracking-wide text-blue-200/80">Mortgage Insights</p>
              <p className="mt-2 text-3xl font-semibold text-blue-300">3 core tools</p>
            </div>
            <div className="rounded-2xl border border-purple-900/40 bg-[#11112a] py-6 px-4">
              <p className="text-sm uppercase tracking-wide text-purple-200/80">Debt Planning</p>
              <p className="mt-2 text-3xl font-semibold text-purple-200">5 payoff models</p>
            </div>
            <div className="rounded-2xl border border-cyan-900/40 bg-[#11112a] py-6 px-4">
              <p className="text-sm uppercase tracking-wide text-cyan-200/80">Wealth Building</p>
              <p className="mt-2 text-3xl font-semibold text-cyan-200">4 growth guides</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={cardClass}>
          <div>
            <h2 className="text-2xl font-semibold">Mortgage Snapshot</h2>
            <p className="text-sm text-gray-300">Estimate principal and interest before lender quotes arrive.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-gray-400">Home Price ($)</span>
              <input
                type="number"
                value={mortgage.price}
                min={50000}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setMortgage({ ...mortgage, price: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Down Payment ($)</span>
              <input
                type="number"
                value={mortgage.down}
                min={0}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setMortgage({ ...mortgage, down: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Interest Rate (%)</span>
              <input
                type="number"
                step={0.05}
                value={mortgage.rate}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setMortgage({ ...mortgage, rate: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Term (years)</span>
              <input
                type="number"
                value={mortgage.term}
                min={5}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setMortgage({ ...mortgage, term: Number(e.target.value) })}
              />
            </label>
          </div>
          <div className="bg-[#10102b] border border-blue-900/40 rounded-2xl px-5 py-4">
            <p className="text-sm text-gray-300">Estimated Monthly Payment</p>
            <p className="text-3xl font-bold text-blue-300 mt-1">${monthlyMortgage ? monthlyMortgage.toFixed(0) : '0'}</p>
            <p className="text-xs text-gray-500 mt-2">Principal &amp; interest only. Taxes, insurance, and HOA fees not included.</p>
          </div>
          <Link href="/calculators/mortgage" className="text-sm text-blue-300 font-semibold hover:text-blue-200 transition-colors">
            Open full mortgage calculator →
          </Link>
        </div>

        <div className={cardClass}>
          <div>
            <h2 className="text-2xl font-semibold">Affordability Estimator</h2>
            <p className="text-sm text-gray-300">Balance income, debts, and lender ratios to set a purchase ceiling.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-gray-400">Gross Income ($/yr)</span>
              <input
                type="number"
                value={afford.income}
                min={0}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setAfford({ ...afford, income: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Monthly Debts ($)</span>
              <input
                type="number"
                value={afford.debts}
                min={0}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setAfford({ ...afford, debts: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Interest Rate (%)</span>
              <input
                type="number"
                step={0.05}
                value={afford.rate}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setAfford({ ...afford, rate: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Term (years)</span>
              <input
                type="number"
                value={afford.term}
                min={5}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setAfford({ ...afford, term: Number(e.target.value) })}
              />
            </label>
          </div>
          <div className="bg-[#10102b] border border-blue-900/40 rounded-2xl px-5 py-4">
            <p className="text-sm text-gray-300">Suggested Purchase Price</p>
            <p className="text-3xl font-bold text-green-300 mt-1">${affordability ? affordability.toFixed(0) : '0'}</p>
            <p className="text-xs text-gray-500 mt-2">Uses standard 28/36 DTI guidelines. Consult a lender for personalized approval.</p>
          </div>
          <Link href="/calculators/loan-payment" className="text-sm text-blue-300 font-semibold hover:text-blue-200 transition-colors">
            Explore full affordability tools →
          </Link>
        </div>

        <div className={cardClass}>
          <div>
            <h2 className="text-2xl font-semibold">Rent vs. Buy Analysis</h2>
            <p className="text-sm text-gray-300">Test how long it takes to break even compared with continuing to rent.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <label className="space-y-2">
              <span className="text-gray-400">Rent ($/mo)</span>
              <input
                type="number"
                value={rentBuy.rent}
                min={0}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setRentBuy({ ...rentBuy, rent: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Home Price ($)</span>
              <input
                type="number"
                value={rentBuy.homePrice}
                min={0}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setRentBuy({ ...rentBuy, homePrice: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-gray-400">Time Horizon (years)</span>
              <input
                type="number"
                value={rentBuy.years}
                min={1}
                className="w-full bg-[#0d0d24] border border-blue-900/50 rounded-xl px-4 py-2 outline-none"
                onChange={(e) => setRentBuy({ ...rentBuy, years: Number(e.target.value) })}
              />
            </label>
            <div className="space-y-2">
              <span className="text-gray-400 block">Assumptions</span>
              <div className="bg-[#0d0d24] border border-blue-900/40 rounded-xl px-4 py-2 text-xs text-gray-400">
                • 20% down payment<br />
                • Rent increases ignored<br />
                • Equity growth not included
              </div>
            </div>
          </div>
          <div className="bg-[#10102b] border border-blue-900/40 rounded-2xl px-5 py-4 space-y-2">
            <div>
              <p className="text-sm text-gray-300">Total Rent Paid</p>
              <p className="text-2xl font-semibold text-blue-200">${rentVsBuy.rentCost.toLocaleString()}</p>
            </div>
            <div className="border-t border-blue-900/30 pt-3">
              <p className="text-sm text-gray-300">Upfront Cost to Buy</p>
              <p className="text-2xl font-semibold text-blue-200">${rentVsBuy.buyDown.toLocaleString()}</p>
            </div>
            <p className="text-xs text-gray-500">
              Compare liquidity today versus long-term wealth. Share these numbers with your financial advisor.
            </p>
          </div>
          <Link href="/calculators/savings-goal" className="text-sm text-blue-300 font-semibold hover:text-blue-200 transition-colors">
            Review rent vs. buy scenarios →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">Full calculator library</h2>
          <p className="text-sm text-gray-400">Browse by topic and launch the dedicated experience in seconds.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCards.map((tool) => (
            <Link
              key={tool.slug}
              href={`/calculators/${tool.slug}`}
              className="group h-full rounded-2xl border border-blue-900/40 bg-[#11112a] px-5 py-6 transition transform hover:-translate-y-2 hover:border-blue-500/60"
            >
              <div className="flex flex-col gap-4 h-full">
                <div>
                  <p className="text-xs uppercase tracking-widest text-blue-300/70">Calculator</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{tool.title}</h3>
                </div>
                <p className="text-sm text-gray-400 flex-1">{tool.blurb}</p>
                <span className="text-sm font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                  Launch calculator →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}