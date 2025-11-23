'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CreditCardPayoffCalculator() {
    const [balance, setBalance] = useState('');
    const [apr, setApr] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [result, setResult] = useState<{ months: string, totalPaid: string, interest: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculatePayoff = () => {
        const B = parseFloat(balance);
        const r = parseFloat(apr) / 100 / 12;
        const P = parseFloat(monthlyPayment);

        if (isNaN(B) || isNaN(r) || isNaN(P) || B <= 0 || r < 0 || P <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        if (P <= B * r) {
            alert('Monthly payment must be greater than the monthly interest to pay off the balance.');
            return;
        }

        const months = Math.ceil(Math.log(P / (P - B * r)) / Math.log(1 + r));
        const totalPaid = P * months;
        const interest = totalPaid - B;

        setResult({
            months: months.toString(),
            totalPaid: `$${totalPaid.toFixed(2)}`,
            interest: `$${interest.toFixed(2)}`
        });
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-800 mb-8 transition-all hover:gap-3 gap-2 group">
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
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">💳</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                            Credit Card Payoff
                        </h1>
                        <p className="text-gray-600 text-lg">Calculate how long it will take to pay off your credit card</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Current Balance <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="5,000"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Annual APR <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="18.99"
                                    value={apr}
                                    onChange={(e) => setApr(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Monthly Payment <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="200"
                                    value={monthlyPayment}
                                    onChange={(e) => setMonthlyPayment(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculatePayoff}
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                        <span className="text-lg">Calculate Payoff Time</span>
                    </button>

                    {showResult && result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 space-y-4"
                        >
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-lg">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Months to Pay Off</p>
                                <motion.p
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: "spring" }}
                                    className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                                >
                                    {result.months}
                                </motion.p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                                    <p className="text-xs text-gray-600 mb-1">Total Amount Paid</p>
                                    <p className="text-2xl font-bold text-yellow-600">{result.totalPaid}</p>
                                </div>
                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                                    <p className="text-2xl font-bold text-red-600">{result.interest}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
