'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function IncomeTaxCalculator() {
    const [income, setIncome] = useState('');
    const [deductions, setDeductions] = useState('');
    const [result, setResult] = useState<{ taxable: string, tax: string, effective: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateTax = () => {
        const grossIncome = parseFloat(income);
        const totalDeductions = parseFloat(deductions || '0');

        if (isNaN(grossIncome) || grossIncome <= 0) {
            alert('Please enter a valid income.');
            return;
        }

        const taxableIncome = Math.max(0, grossIncome - totalDeductions);

        let tax = 0;
        if (taxableIncome <= 11000) {
            tax = taxableIncome * 0.10;
        } else if (taxableIncome <= 44725) {
            tax = 1100 + (taxableIncome - 11000) * 0.12;
        } else if (taxableIncome <= 95375) {
            tax = 5147 + (taxableIncome - 44725) * 0.22;
        } else if (taxableIncome <= 182100) {
            tax = 16290 + (taxableIncome - 95375) * 0.24;
        } else if (taxableIncome <= 231250) {
            tax = 37104 + (taxableIncome - 182100) * 0.32;
        } else if (taxableIncome <= 578125) {
            tax = 52832 + (taxableIncome - 231250) * 0.35;
        } else {
            tax = 174238.25 + (taxableIncome - 578125) * 0.37;
        }

        const effectiveRate = (tax / grossIncome) * 100;

        setResult({
            taxable: `$${taxableIncome.toFixed(2)}`,
            tax: `$${tax.toFixed(2)}`,
            effective: `${effectiveRate.toFixed(2)}%`
        });
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-8 transition-all hover:gap-3 gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">💵</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-3">Income Tax Calculator</h1>
                        <p className="text-gray-600 text-lg">Estimate your federal income tax (2024 rates)</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Gross Annual Income <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input type="number" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all bg-gray-50 hover:bg-white" placeholder="75,000" value={income} onChange={(e) => setIncome(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Total Deductions</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input type="number" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all bg-gray-50 hover:bg-white" placeholder="13,850 (standard deduction)" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateTax} className="w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="text-lg">Calculate Tax</span>
                    </button>

                    {showResult && result && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                    <p className="text-xs text-gray-600 mb-1">Taxable Income</p>
                                    <p className="text-2xl font-bold text-blue-600">{result.taxable}</p>
                                </div>
                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                    <p className="text-xs text-gray-600 mb-1">Estimated Tax</p>
                                    <p className="text-2xl font-bold text-red-600">{result.tax}</p>
                                </div>
                                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                                    <p className="text-xs text-gray-600 mb-1">Effective Rate</p>
                                    <p className="text-2xl font-bold text-purple-600">{result.effective}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-xs text-gray-600"><strong>⚠️ Note:</strong> This is a simplified calculation using 2024 federal tax brackets for single filers. Actual tax may vary based on filing status, credits, and other factors.</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
