'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

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
        <div className="calculator-page">
            <div className="calculator-container">
                <Link href="/" className="back-link">
                    <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Home</span>
                </Link>

                <div className="calculator-card">
                    <CalculatorNavigation currentPath="/calculators/loan-payment" />

                    <div className="calculator-header">
                        <div className="calculator-icon">💳</div>
                        <h1 className="calculator-title">Loan Payment Calculator</h1>
                        <p className="calculator-subtitle">Calculate your monthly loan payment</p>
                    </div>

                    <div className="form-grid-single">
                        <div className="form-group">
                            <label className="form-label">Loan Amount <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="20,000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Annual Interest Rate <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <input type="number" step="0.01" className="form-input has-suffix" placeholder="5.5" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                                <span className="input-suffix">%</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Loan Term <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <input type="number" className="form-input has-suffix" placeholder="5" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
                                <span className="input-suffix">years</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateLoanPayment} className="calculate-button">Calculate Payment</button>

                    {showResult && monthlyPayment && (
                        <div className="result-card">
                            <p className="result-label">Monthly Payment</p>
                            <p className="result-value">{monthlyPayment}</p>
                            <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic' }}>* This is a rough estimate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
