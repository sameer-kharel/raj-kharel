'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';

export default function CreditUtilizationCalculator() {
    const [totalCredit, setTotalCredit] = useState('');
    const [usedCredit, setUsedCredit] = useState('');
    const [utilization, setUtilization] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateUtilization = () => {
        const total = parseFloat(totalCredit);
        const used = parseFloat(usedCredit);

        if (isNaN(total) || isNaN(used) || total <= 0 || used < 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const util = (used / total) * 100;
        setUtilization(`${util.toFixed(2)}%`);
        setShowResult(true);
    };

    const getUtilizationMessage = () => {
        if (!utilization) return '';
        const value = parseFloat(utilization);
        if (value < 30) return '✅ Excellent! Keep it below 30%.';
        if (value < 50) return '⚠️ Good, but try to keep it below 30%.';
        return '❌ High utilization. Try to pay down balances.';
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

                .result-note {
                    color: #0284c7;
                    font-size: 14px;
                    margin-top: 12px;
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
                    <CalculatorNavigation currentPath="/calculators/credit-utilization" />

                    <div className="calculator-header">
                        <div className="calculator-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                        </div>
                        <h1 className="calculator-title">Credit Utilization</h1>
                        <p className="calculator-subtitle">Calculate your credit utilization ratio</p>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Total Credit Limit <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="10,000" value={totalCredit} onChange={(e) => setTotalCredit(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Used Credit <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="2,500" value={usedCredit} onChange={(e) => setUsedCredit(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateUtilization} className="calculate-button">Calculate Utilization</button>

                    {showResult && utilization && (
                        <div className="result-card">
                            <p className="result-label">Credit Utilization</p>
                            <p className="result-value">{utilization}</p>
                            <p className="result-note">{getUtilizationMessage()}</p>
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
