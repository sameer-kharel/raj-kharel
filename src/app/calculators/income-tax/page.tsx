'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

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
        <div className="calculator-page">
            <div className="calculator-container">
                <Link href="/" className="back-link">
                    <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Home</span>
                </Link>

                <div className="calculator-card">
                    <CalculatorNavigation currentPath="/calculators/income-tax" />

                    <div className="calculator-header">
                        <div className="calculator-icon">💵</div>
                        <h1 className="calculator-title">Income Tax Calculator</h1>
                        <p className="calculator-subtitle">Estimate your federal income tax (2024 rates)</p>
                    </div>

                    <div className="form-grid-single">
                        <div className="form-group">
                            <label className="form-label">Gross Annual Income <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="75,000" value={income} onChange={(e) => setIncome(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Total Deductions</label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="13,850" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateTax} className="calculate-button">Calculate Tax</button>

                    {showResult && result && (
                        <div className="result-grid-3">
                            <div className="result-item">
                                <p className="result-item-label">Taxable Income</p>
                                <p className="result-item-value">{result.taxable}</p>
                            </div>
                            <div className="result-item">
                                <p className="result-item-label">Estimated Tax</p>
                                <p className="result-item-value">{result.tax}</p>
                            </div>
                            <div className="result-item">
                                <p className="result-item-label">Effective Rate</p>
                                <p className="result-item-value">{result.effective}</p>
                            </div>
                            <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic', gridColumn: '1 / -1', textAlign: 'center' }}>* This is a rough estimate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
