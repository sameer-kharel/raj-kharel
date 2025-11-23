'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RefinanceCalculator() {
    const [currentLoanBalance, setCurrentLoanBalance] = useState('');
    const [currentInterestRate, setCurrentInterestRate] = useState('');
    const [currentRemainingTerm, setCurrentRemainingTerm] = useState('');
    const [newInterestRate, setNewInterestRate] = useState('');
    const [newLoanTerm, setNewLoanTerm] = useState('');
    const [result, setResult] = useState<{ current: string, new: string, savings: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateRefinance = () => {
        const P = parseFloat(currentLoanBalance);
        const r1 = parseFloat(currentInterestRate) / 100 / 12;
        const n1 = parseFloat(currentRemainingTerm) * 12;
        const r2 = parseFloat(newInterestRate) / 100 / 12;
        const n2 = parseFloat(newLoanTerm) * 12;

        if (isNaN(P) || isNaN(r1) || isNaN(n1) || isNaN(r2) || isNaN(n2) || P <= 0) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        const currentPayment = P * (r1 * Math.pow(1 + r1, n1)) / (Math.pow(1 + r1, n1) - 1);
        const newPayment = P * (r2 * Math.pow(1 + r2, n2)) / (Math.pow(1 + r2, n2) - 1);
        const savings = currentPayment - newPayment;

        setResult({
            current: `$${currentPayment.toFixed(2)}`,
            new: `$${newPayment.toFixed(2)}`,
            savings: `$${Math.abs(savings).toFixed(2)}`
        });
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-8 transition-all hover:gap-3 gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">💰</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-3">
                            Refinance Calculator
                        </h1>
                        <p className="text-gray-600 text-lg">Compare your current loan with a refinanced loan</p>
                    </div>

                    <div className="space-y-8 mb-8">
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-4 text-lg">Current Loan</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Current Loan Balance <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                        <input type="number" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white" placeholder="250,000" value={currentLoanBalance} onChange={(e) => setCurrentLoanBalance(e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Interest Rate <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="number" step="0.01" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white" placeholder="5.5" value={currentInterestRate} onChange={(e) => setCurrentInterestRate(e.target.value)} />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Remaining Term <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="number" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white" placeholder="25" value={currentRemainingTerm} onChange={(e) => setCurrentRemainingTerm(e.target.value)} />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                            <h3 className="font-bold text-green-900 mb-4 text-lg">New Loan</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">New Interest Rate <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="number" step="0.01" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white" placeholder="3.5" value={newInterestRate} onChange={(e) => setNewInterestRate(e.target.value)} />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">New Loan Term <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="number" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white" placeholder="30" value={newLoanTerm} onChange={(e) => setNewLoanTerm(e.target.value)} />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateRefinance} className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="text-lg">Compare Loans</span>
                    </button>

                    {showResult && result && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid md:grid-cols-3 gap-4">
                            <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                                <p className="text-xs text-gray-600 mb-1">Current Payment</p>
                                <p className="text-2xl font-bold text-blue-600">{result.current}</p>
                            </div>
                            <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                                <p className="text-xs text-gray-600 mb-1">New Payment</p>
                                <p className="text-2xl font-bold text-green-600">{result.new}</p>
                            </div>
                            <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
                                <p className="text-xs text-gray-600 mb-1">Monthly Savings</p>
                                <p className="text-2xl font-bold text-yellow-600">{result.savings}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
