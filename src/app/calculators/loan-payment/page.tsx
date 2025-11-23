'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoanPaymentCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateLoanPayment = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;

        if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (isNaN(M) || M === Infinity || M < 0) {
            setMonthlyPayment('Invalid result');
        } else {
            setMonthlyPayment(`$${M.toFixed(2)}`);
            setShowResult(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-all hover:gap-3 gap-2 group">
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
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">💳</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                            Loan Payment Calculator
                        </h1>
                        <p className="text-gray-600 text-lg">Calculate your monthly loan payment</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Loan Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="20,000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Annual Interest Rate <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="5.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Loan Term <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="5"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateLoanPayment}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                        <span className="text-lg">Calculate Payment</span>
                    </button>

                    {showResult && monthlyPayment && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg"
                        >
                            <div className="text-center">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Monthly Payment</p>
                                <motion.p
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                                >
                                    {monthlyPayment}
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
