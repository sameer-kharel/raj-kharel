'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CreditUtilizationCalculator() {
    const [totalCredit, setTotalCredit] = useState('');
    const [usedCredit, setUsedCredit] = useState('');
    const [utilization, setUtilization] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateUtilization = () => {
        const total = parseFloat(totalCredit);
        const used = parseFloat(usedCredit);

        if (isNaN(total) || isNaN(used) || total <= 0 || used < 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const util = (used / total) * 100;
        setUtilization(`${util.toFixed(2)}%`);
        setShowResult(true);
    };

    const getUtilizationColor = () => {
        if (!utilization) return '';
        const value = parseFloat(utilization);
        if (value < 30) return 'from-green-600 to-emerald-600';
        if (value < 50) return 'from-yellow-600 to-orange-600';
        return 'from-red-600 to-pink-600';
    };

    const getUtilizationMessage = () => {
        if (!utilization) return '';
        const value = parseFloat(utilization);
        if (value < 30) return '✅ Excellent! Keep it below 30%.';
        if (value < 50) return '⚠️ Good, but try to keep it below 30%.';
        return '❌ High utilization. Try to pay down balances.';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-violet-600 hover:text-violet-800 mb-8 transition-all hover:gap-3 gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">📉</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">Credit Utilization</h1>
                        <p className="text-gray-600 text-lg">Calculate your credit utilization ratio</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Total Credit Limit <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input type="number" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all bg-gray-50 hover:bg-white" placeholder="10,000" value={totalCredit} onChange={(e) => setTotalCredit(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Used Credit <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input type="number" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all bg-gray-50 hover:bg-white" placeholder="2,500" value={usedCredit} onChange={(e) => setUsedCredit(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateUtilization} className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="text-lg">Calculate Utilization</span>
                    </button>

                    {showResult && utilization && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 space-y-4">
                            <div className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Credit Utilization</p>
                                    <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${getUtilizationColor()} bg-clip-text text-transparent`}>{utilization}</motion.p>
                                    <p className="text-lg text-gray-700 mt-4 font-semibold">{getUtilizationMessage()}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-gray-700"><strong>💡 Tip:</strong> Keeping your credit utilization below 30% is generally recommended for a healthy credit score.</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
