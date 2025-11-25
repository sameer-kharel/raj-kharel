'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';

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
            <style jsx>{`
                .calculator-page {
                    min-height: 100vh;
                    background: #ffffff;
                    padding: 40px 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }

                .calculator-container {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #3b82f6;
                    text-decoration: none;
                    font-weight: 600;
                    margin-bottom: 24px;
                    font-size: 14px;
                    transition: color 0.2s ease;
                }

                .back-link:hover {
                    color: #2563eb;
                }

                .back-icon {
                    width: 16px;
                    height: 16px;
                }

                .calculator-card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 40px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                .calculator-header {
                    text-align: center;
                    margin-bottom: 32px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #f3f4f6;
                }

                .calculator-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 64px;
                    height: 64px;
                    background: #eff6ff;
                    border-radius: 50%;
                    color: #3b82f6;
                    margin-bottom: 16px;
                }

                .calculator-icon svg {
                    width: 32px;
                    height: 32px;
                }

                .calculator-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                }

                .calculator-subtitle {
                    color: #6b7280;
                    font-size: 15px;
                    margin: 0;
                }

                .section-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 16px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #e5e7eb;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 4px;
                }

                .required {
                    color: #ef4444;
                    margin-left: 4px;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-prefix,
                .input-suffix {
                    position: absolute;
                    color: #6b7280;
                    font-weight: 500;
                    font-size: 14px;
                    pointer-events: none;
                }

                .input-prefix {
                    left: 16px;
                }

                .input-suffix {
                    right: 16px;
                }

                .form-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 16px;
                    background: #ffffff;
                    transition: all 0.2s ease;
                    outline: none;
                    color: #1f2937;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }

                .form-input:hover {
                    border-color: #9ca3af;
                }

                .form-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }

                .form-input.has-prefix {
                    padding-left: 36px;
                }

                .form-input.has-suffix {
                    padding-right: 48px;
                }

                .form-input::placeholder {
                    color: #9ca3af;
                }

                .calculate-button {
                    width: 100%;
                    padding: 16px;
                    background: #3b82f6;
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
                }

                .calculate-button:hover {
                    background: #2563eb;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.6);
                }

                .calculate-button:active {
                    transform: translateY(0);
                }

                .result-card {
                    margin-top: 32px;
                    padding: 32px;
                    background: #f0f9ff;
                    border: 1px solid #bae6fd;
                    border-radius: 16px;
                    text-align: center;
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .result-grid-3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }

                .result-item-label {
                    color: #0369a1;
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }

                .result-item-value {
                    color: #0c4a6e;
                    font-size: 24px;
                    font-weight: 700;
                }

                .result-warning {
                    margin-top: 20px;
                    padding: 12px;
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    color: #991b1b;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    grid-column: 1 / -1;
                }

                .warning-icon {
                    width: 16px;
                    height: 16px;
                }

                @media (max-width: 768px) {
                    .calculator-page {
                        padding: 20px 16px;
                    }

                    .calculator-card {
                        padding: 24px;
                    }

                    .calculator-title {
                        font-size: 24px;
                    }

                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .result-grid-3 {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                }

                @media (max-width: 480px) {
                    .calculator-card {
                        padding: 20px;
                        border-radius: 12px;
                    }

                    .calculator-icon {
                        width: 48px;
                        height: 48px;
                    }

                    .calculator-icon svg {
                        width: 24px;
                        height: 24px;
                    }
                }
            `}</style>

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
                        <div className="calculator-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <h1 className="calculator-title">Debt Consolidation</h1>
                        <p className="calculator-subtitle">Compare current debts with a consolidated loan</p>
                    </div>

                    <div>
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

                    <div>
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
                        <div className="result-card">
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
                            <div className="result-warning">
                                <svg className="warning-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>This is a rough estimate and does not include all potential costs.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
