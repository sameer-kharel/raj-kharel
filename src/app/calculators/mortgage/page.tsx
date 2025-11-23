'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MortgageCalculator() {
    const [homeValue, setHomeValue] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [propertyTax, setPropertyTax] = useState('');
    const [homeInsurance, setHomeInsurance] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateMortgage = () => {
        const P = parseFloat(homeValue) - parseFloat(downPayment);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;
        const monthlyTax = parseFloat(propertyTax || '0') / 12;
        const monthlyInsurance = parseFloat(homeInsurance || '0') / 12;

        if (isNaN(P) || isNaN(r) || isNaN(n) || P < 0 || r < 0 || n <= 0) {
            alert('Please enter valid numbers for all required fields.');
            return;
        }

        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalMonthlyPayment = M + monthlyTax + monthlyInsurance;

        if (isNaN(totalMonthlyPayment) || totalMonthlyPayment === Infinity || totalMonthlyPayment < 0) {
            setMonthlyPayment("Invalid result, check your inputs");
        } else {
            setMonthlyPayment(`$${totalMonthlyPayment.toFixed(2)}`);
            setShowResult(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-all hover:gap-3 gap-2 group">
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
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">🏠</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            Mortgage Calculator
                        </h1>
                        <p className="text-gray-600 text-lg">Calculate your estimated monthly mortgage payment</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Home Value <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="350,000"
                                    value={homeValue}
                                    onChange={(e) => setHomeValue(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Down Payment <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="70,000"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Loan Term <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="30"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">years</span>
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
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="4.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Annual Property Tax
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="3,000"
                                    value={propertyTax}
                                    onChange={(e) => setPropertyTax(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Annual Home Insurance
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="1,200"
                                    value={homeInsurance}
                                    onChange={(e) => setHomeInsurance(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateMortgage}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
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
                                <p className="text-sm text-gray-500 mt-3">Including principal, interest, taxes, and insurance</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
