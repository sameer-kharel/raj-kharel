'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

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
        <div className="calculator-page">
            <div className="calculator-container">
                <Link href="/" className="back-link">
                    <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Home</span>
                </Link>

                <div className="calculator-card">
                    <CalculatorNavigation currentPath="/calculators/refinance" />

                    <div className="calculator-header">
                        <div className="calculator-icon">💰</div>
                        <h1 className="calculator-title">Refinance Calculator</h1>
                        <p className="calculator-subtitle">Compare your current loan with a refinanced loan</p>
                    </div>

                    <div className="section-box">
                        <h3 className="section-title">Current Loan</h3>
                        <div className="form-grid-single">
                            <div className="form-group">
                                <label className="form-label">Current Loan Balance <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-prefix">$</span>
                                    <input type="number" className="form-input has-prefix" placeholder="250,000" value={currentLoanBalance} onChange={(e) => setCurrentLoanBalance(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Interest Rate <span className="required">*</span></label>
                                    <div className="input-wrapper">
                                        <input type="number" step="0.01" className="form-input has-suffix" placeholder="5.5" value={currentInterestRate} onChange={(e) => setCurrentInterestRate(e.target.value)} />
                                        <span className="input-suffix">%</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Remaining Term <span className="required">*</span></label>
                                    <div className="input-wrapper">
                                        <input type="number" className="form-input has-suffix" placeholder="25" value={currentRemainingTerm} onChange={(e) => setCurrentRemainingTerm(e.target.value)} />
                                        <span className="input-suffix">years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section-box">
                        <h3 className="section-title">New Loan</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">New Interest Rate <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input type="number" step="0.01" className="form-input has-suffix" placeholder="3.5" value={newInterestRate} onChange={(e) => setNewInterestRate(e.target.value)} />
                                    <span className="input-suffix">%</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">New Loan Term <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input type="number" className="form-input has-suffix" placeholder="30" value={newLoanTerm} onChange={(e) => setNewLoanTerm(e.target.value)} />
                                    <span className="input-suffix">years</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateRefinance} className="calculate-button">Compare Loans</button>

                    {showResult && result && (
                        <div className="result-grid-3">
                            <div className="result-item">
                                <p className="result-item-label">Current Payment</p>
                                <p className="result-item-value">{result.current}</p>
                            </div>
                            <div className="result-item">
                                <p className="result-item-label">New Payment</p>
                                <p className="result-item-value">{result.new}</p>
                            </div>
                            <div className="result-item">
                                <p className="result-item-label">Monthly Savings</p>
                                <p className="result-item-value">{result.savings}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
