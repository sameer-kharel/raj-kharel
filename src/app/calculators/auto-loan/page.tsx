'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AutoLoanCalculator() {
    const [vehicleCost, setVehicleCost] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [tradeInValue, setTradeInValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateAutoLoan = () => {
        const P = parseFloat(vehicleCost) - parseFloat(downPayment || '0') - parseFloat(tradeInValue || '0');
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;

        if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
            alert('Please enter valid numbers for all required fields.');
            return;
        }

        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (isNaN(M) || M === Infinity || M < 0) {
            setMonthlyPayment('Invalid result, check your inputs');
        } else {
            setMonthlyPayment(`$${M.toFixed(2)}`);
            setShowResult(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-8 transition-all hover:gap-3 gap-2 group">
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
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">🚗</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
                            Auto Loan Calculator
                        </h1>
                        <p className="text-gray-600 text-lg">Calculate your estimated monthly auto loan payment</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Vehicle Cost <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="30,000"
                                    value={vehicleCost}
                                    onChange={(e) => setVehicleCost(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Down Payment
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="5,000"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Trade-In Value
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="2,000"
                                    value={tradeInValue}
                                    onChange={(e) => setTradeInValue(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Interest Rate <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="3.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Loan Term <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="5"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateAutoLoan}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                        <span className="text-lg">Calculate Monthly Payment</span>
                    </button>

                    {showResult && monthlyPayment && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg"
                        >
                            <div className="text-center">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Estimated Monthly Payment</p>
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
