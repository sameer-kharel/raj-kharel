'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [frequency, setFrequency] = useState('12');
    const [result, setResult] = useState<{ total: string, interest: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateCompoundInterest = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(time);
        const n = parseFloat(frequency);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P <= 0 || r < 0 || t <= 0 || n <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const A = P * Math.pow((1 + r / n), n * t);
        const interest = A - P;

        setResult({
            total: `$${A.toFixed(2)}`,
            interest: `$${interest.toFixed(2)}`
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

                .form-input, .form-select {
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

                .form-input:hover, .form-select:hover {
                    border-color: #9ca3af;
                }

                .form-input:focus, .form-select:focus {
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

                .result-label {
                    color: #0369a1;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }

                .result-value {
                    color: #0c4a6e;
                    font-size: 48px;
                    font-weight: 800;
                    margin: 0;
                    line-height: 1;
                    letter-spacing: -1px;
                }

                .result-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    margin-top: 24px;
                    padding-top: 24px;
                    border-top: 1px solid #bae6fd;
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

                    .result-value {
                        font-size: 36px;
                    }
                    
                    .result-grid {
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
                    <CalculatorNavigation currentPath="/calculators/compound-interest" />

                    <div className="calculator-header">
                        <div className="calculator-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h1 className="calculator-title">Compound Interest</h1>
                        <p className="calculator-subtitle">Calculate compound interest growth</p>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Principal Amount <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="5,000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Annual Interest Rate <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <input type="number" step="0.01" className="form-input has-suffix" placeholder="5" value={rate} onChange={(e) => setRate(e.target.value)} />
                                <span className="input-suffix">%</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Time Period <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <input type="number" className="form-input has-suffix" placeholder="10" value={time} onChange={(e) => setTime(e.target.value)} />
                                <span className="input-suffix">years</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Compounding Frequency</label>
                            <select className="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                                <option value="1">Annually</option>
                                <option value="2">Semi-annually</option>
                                <option value="4">Quarterly</option>
                                <option value="12">Monthly</option>
                                <option value="365">Daily</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={calculateCompoundInterest} className="calculate-button">Calculate</button>

                    {showResult && result && (
                        <div className="result-card">
                            <p className="result-label">Total Amount</p>
                            <p className="result-value">{result.total}</p>

                            <div className="result-grid">
                                <div className="result-item">
                                    <p className="result-item-label">Interest Earned</p>
                                    <p className="result-item-value">{result.interest}</p>
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
