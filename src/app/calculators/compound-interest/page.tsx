'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [frequency, setFrequency] = useState('12');
    const [result, setResult] = useState<{ total: string, interest: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateCompoundInterest = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(time);
        const n = parseFloat(frequency);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P <= 0 || r < 0 || t <= 0 || n <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const A = P * Math.pow((1 + r / n), n * t);
        const interest = A - P;

        setResult({
            total: `$${A.toFixed(2)}`,
            interest: `$${interest.toFixed(2)}`
        });
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-8 transition-all hover:gap-3 gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">📈</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">Compound Interest</h1>
                        <p className="text-gray-600 text-lg">Calculate compound interest growth</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Principal Amount <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input type="number" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white" placeholder="5,000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Annual Interest Rate <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="number" step="0.01" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white" placeholder="5" value={rate} onChange={(e) => setRate(e.target.value)} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Time Period <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="number" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white" placeholder="10" value={time} onChange={(e) => setTime(e.target.value)} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Compounding Frequency</label>
                            <select className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                                <option value="1">Annually</option>
                                <option value="2">Semi-annually</option>
                                <option value="4">Quarterly</option>
                                <option value="12">Monthly</option>
                                <option value="365">Daily</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={calculateCompoundInterest} className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="text-lg">Calculate</span>
                    </button>

                    {showResult && result && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid md:grid-cols-2 gap-4">
                            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Amount</p>
                                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{result.total}</p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Interest Earned</p>
                                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{result.interest}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
