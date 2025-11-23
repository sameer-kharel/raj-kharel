'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SavingsGoalCalculator() {
    const [goalAmount, setGoalAmount] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [result, setResult] = useState<{ months: string, years: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateSavingsGoal = () => {
        const goal = parseFloat(goalAmount);
        const current = parseFloat(currentSavings || '0');
        const monthly = parseFloat(monthlyContribution);
        const rate = parseFloat(interestRate || '0') / 100 / 12;

        if (isNaN(goal) || isNaN(monthly) || goal <= 0 || monthly <= 0) {
            alert('Please enter valid numbers for goal and monthly contribution.');
            return;
        }

        if (current >= goal) {
            setResult({ months: '0', years: '0' });
            setShowResult(true);
            return;
        }

        const remaining = goal - current;

        if (rate === 0) {
            const months = Math.ceil(remaining / monthly);
            setResult({
                months: months.toString(),
                years: (months / 12).toFixed(1)
            });
        } else {
            let months = 0;
            let balance = current;

            while (balance < goal && months < 1200) {
                balance = balance * (1 + rate) + monthly;
                months++;
            }

            setResult({
                months: months.toString(),
                years: (months / 12).toFixed(1)
            });
        }
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-8 transition-all hover:gap-3 gap-2 group">
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
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">🎯</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                            Savings Goal Calculator
                        </h1>
                        <p className="text-gray-600 text-lg">Calculate how long it will take to reach your savings goal</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Savings Goal <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="20,000"
                                    value={goalAmount}
                                    onChange={(e) => setGoalAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Current Savings
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="5,000"
                                    value={currentSavings}
                                    onChange={(e) => setCurrentSavings(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Monthly Contribution <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="500"
                                    value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Annual Interest Rate (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white"
                                    placeholder="3"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateSavingsGoal}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                        <span className="text-lg">Calculate Timeline</span>
                    </button>

                    {showResult && result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg"
                        >
                            <div className="text-center">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Time to Reach Goal</p>
                                <motion.p
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                                >
                                    {result.months} months
                                </motion.p>
                                <p className="text-xl text-gray-600 mt-2">({result.years} years)</p>
                                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        <strong>💡 Tip:</strong> Increasing your monthly contribution or finding a higher interest rate can help you reach your goal faster!
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
