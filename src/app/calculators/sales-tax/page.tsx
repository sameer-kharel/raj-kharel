'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SalesTaxCalculator() {
    const [price, setPrice] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [result, setResult] = useState<{ tax: string, total: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateSalesTax = () => {
        const itemPrice = parseFloat(price);
        const rate = parseFloat(taxRate);

        if (isNaN(itemPrice) || isNaN(rate) || itemPrice <= 0 || rate < 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const tax = itemPrice * (rate / 100);
        const total = itemPrice + tax;

        setResult({
            tax: `$${tax.toFixed(2)}`,
            total: `$${total.toFixed(2)}`
        });
        setShowResult(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-8 transition-all hover:gap-3 gap-2 group">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
                            <span className="text-4xl">🧾</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">Sales Tax Calculator</h1>
                        <p className="text-gray-600 text-lg">Calculate sales tax and total price</p>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Item Price <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input type="number" step="0.01" className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-white" placeholder="99.99" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Sales Tax Rate <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type="number" step="0.01" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-50 hover:bg-white" placeholder="8.5" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateSalesTax} className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <span className="text-lg">Calculate Total</span>
                    </button>

                    {showResult && result && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
                            <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
                                <p className="text-xs text-gray-600 mb-1">Sales Tax</p>
                                <p className="text-2xl font-bold text-orange-600">{result.tax}</p>
                            </div>
                            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Price</p>
                                    <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{result.total}</motion.p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
