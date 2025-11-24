'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

export default function DebtConsolidationCalculator() {
    const [debt1, setDebt1] = useState('');
    const [rate1, setRate1] = useState('');
    const [debt2, setDebt2] = useState('');
    const [rate2, setRate2] = useState('');
    const [consolidationRate, setConsolidationRate] = useState('');
    const [term, setTerm] = useState('');
    const [result, setResult] = useState<{ current: string, consolidated: string, savings: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateConsolidation = () => {
        const d1 = parseFloat(debt1 || '0');
        const r1 = parseFloat(rate1 || '0') / 100 / 12;
        const d2 = parseFloat(debt2 || '0');
        const r2 = parseFloat(rate2 || '0') / 100 / 12;
        const totalDebt = d1 + d2;
        const consRate = parseFloat(consolidationRate) / 100 / 12;
        const n = parseFloat(term) * 12;

        if (totalDebt <= 0 || isNaN(consRate) || isNaN(n) || n <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const currentN = 60;
        const payment1 = d1 > 0 ? d1 * (r1 * Math.pow(1 + r1, currentN)) / (Math.pow(1 + r1, currentN) - 1) : 0;
        const payment2 = d2 > 0 ? d2 * (r2 * Math.pow(1 + r2, currentN)) / (Math.pow(1 + r2, currentN) - 1) : 0;
        const currentPayment = payment1 + payment2;

        const consolidatedPayment = totalDebt * (consRate * Math.pow(1 + consRate, n)) / (Math.pow(1 + consRate, n) - 1);
        const savings = currentPayment - consolidatedPayment;

        setResult({
            current: `$${currentPayment.toFixed(2)}`,
            consolidated: `$${consolidatedPayment.toFixed(2)}`,
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
                    <CalculatorNavigation currentPath="/calculators/debt-consolidation" />

                    <div className="calculator-header">
                        <div className="calculator-icon">🔄</div>
                        <h1 className="calculator-title">Debt Consolidation</h1>
                        <p className="calculator-subtitle">Compare current debts with a consolidated loan</p>
                    </div>

                    <div className="section-box">
                        <h3 className="section-title">Current Debts</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Debt 1 Amount</label>
                                <div className="input-wrapper">
                                    <span className="input-prefix">$</span>
                                    <input type="number" className="form-input has-prefix" placeholder="5,000" value={debt1} onChange={(e) => setDebt1(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Rate 1</label>
                                <div className="input-wrapper">
                                    <input type="number" step="0.01" className="form-input has-suffix" placeholder="18" value={rate1} onChange={(e) => setRate1(e.target.value)} />
                                    <span className="input-suffix">%</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Debt 2 Amount</label>
                                <div className="input-wrapper">
                                    <span className="input-prefix">$</span>
                                    <input type="number" className="form-input has-prefix" placeholder="3,000" value={debt2} onChange={(e) => setDebt2(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Rate 2</label>
                                <div className="input-wrapper">
                                    <input type="number" step="0.01" className="form-input has-suffix" placeholder="15" value={rate2} onChange={(e) => setRate2(e.target.value)} />
                                    <span className="input-suffix">%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section-box">
                        <h3 className="section-title">Consolidated Loan</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Consolidation Rate <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input type="number" step="0.01" className="form-input has-suffix" placeholder="8" value={consolidationRate} onChange={(e) => setConsolidationRate(e.target.value)} />
                                    <span className="input-suffix">%</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Loan Term <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input type="number" className="form-input has-suffix" placeholder="5" value={term} onChange={(e) => setTerm(e.target.value)} />
                                    <span className="input-suffix">years</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateConsolidation} className="calculate-button">Compare Options</button>

                    {showResult && result && (
                        <div className="result-grid-3">
                            <div className="result-item">
                                <p className="result-item-label">Current Payment</p>
                                <p className="result-item-value">{result.current}</p>
                            </div>
                            <div className="result-item">
                                <p className="result-item-label">Consolidated Payment</p>
                                <p className="result-item-value">{result.consolidated}</p>
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
