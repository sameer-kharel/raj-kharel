'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DebtConsolidationCalculator() {
    const [debt1, setDebt1] = useState('');
    const [rate1, setRate1] = useState('');
    const [debt2, setDebt2] = useState('');
    const [rate2, setRate2] = useState('');
    const [consolidationRate, setConsolidationRate] = useState('');
    const [term, setTerm] = useState('');
    const [result, setResult] = useState<{ current: string, consolidated: string, savings: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateConsolidation = () => {
        const d1 = parseFloat(debt1 || '0');
        const r1 = parseFloat(rate1 || '0') / 100 / 12;
        const d2 = parseFloat(debt2 || '0');
        const r2 = parseFloat(rate2 || '0') / 100 / 12;
        const totalDebt = d1 + d2;
        const consRate = parseFloat(consolidationRate) / 100 / 12;
        const n = parseFloat(term) * 12;

        if (totalDebt <= 0 || isNaN(consRate) || isNaN(n) || n <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const currentN = 60;
        const payment1 = d1 > 0 ? d1 * (r1 * Math.pow(1 + r1, currentN)) / (Math.pow(1 + r1, currentN) - 1) : 0;
        const payment2 = d2 > 0 ? d2 * (r2 * Math.pow(1 + r2, currentN)) / (Math.pow(1 + r2, currentN) - 1) : 0;
        const currentPayment = payment1 + payment2;

        const consolidatedPayment = totalDebt * (consRate * Math.pow(1 + consRate, n)) / (Math.pow(1 + consRate, n) - 1);
        const savings = currentPayment - consolidatedPayment;

        setResult({
            current: `$${currentPayment.toFixed(2)}`,
            consolidated: `$${consolidatedPayment.toFixed(2)}`,
            savings: `$${Math.abs(savings).toFixed(2)}`
        });
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-800 mb-8 transition-all hover:gap-3 gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">🔄</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">Debt Consolidation</h1>
                        <p className="text-gray-600 text-lg">Compare current debts with a consolidated loan</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                            <h3 className="font-bold text-red-900 mb-4 text-lg">Current Debts</h3>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Debt 1 Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                            <input type="number" className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white" placeholder="5,000" value={debt1} onChange={(e) => setDebt1(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Rate 1</label>
                                        <div className="relative">
                                            <input type="number" step="0.01" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white" placeholder="18" value={rate1} onChange={(e) => setRate1(e.target.value)} />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Debt 2 Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                            <input type="number" className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white" placeholder="3,000" value={debt2} onChange={(e) => setDebt2(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Rate 2</label>
                                        <div className="relative">
                                            <input type="number" step="0.01" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white" placeholder="15" value={rate2} onChange={(e) => setRate2(e.target.value)} />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                            <h3 className="font-bold text-green-900 mb-4 text-lg">Consolidated Loan</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Consolidation Rate <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="number" step="0.01" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white" placeholder="8" value={consolidationRate} onChange={(e) => setConsolidationRate(e.target.value)} />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Loan Term <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white" placeholder="5" value={term} onChange={(e) => setTerm(e.target.value)} />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateConsolidation} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="text-lg">Compare Options</span>
                    </button>

                    {showResult && result && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                <p className="text-xs text-gray-600 mb-1">Current Payment</p>
                                <p className="text-2xl font-bold text-red-600">{result.current}</p>
                            </div>
                            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                                <p className="text-xs text-gray-600 mb-1">Consolidated Payment</p>
                                <p className="text-2xl font-bold text-green-600">{result.consolidated}</p>
                            </div>
                            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                <p className="text-xs text-gray-600 mb-1">Monthly Savings</p>
                                <p className="text-2xl font-bold text-blue-600">{result.savings}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
