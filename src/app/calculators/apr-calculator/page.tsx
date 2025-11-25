'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';

export default function APRCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [fees, setFees] = useState('');
    const [apr, setApr] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateAPR = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 100;
        const n = parseFloat(loanTerm);
        const f = parseFloat(fees || '0');

        if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const totalCost = (P * r * n) + f;
        const calculatedAPR = (totalCost / P / n) * 100;

        setApr(`${calculatedAPR.toFixed(2)}%`);
        setShowResult(true);
    };

    return (
        <div className="calculator-page">
            <style>{`
                .calculator-page { min-height: 100vh; background: #ffffff; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
                .calculator-container { max-width: 800px; margin: 0 auto; }
                .back-link { display: inline-flex; align-items: center; gap: 8px; color: #3b82f6; text-decoration: none; font-weight: 600; margin-bottom: 24px; font-size: 14px; transition: color 0.2s ease; }
                .back-link:hover { color: #2563eb; }
                .back-icon { width: 16px; height: 16px; }
                .calculator-card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
                .calculator-header { text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #f3f4f6; }
                .calculator-icon { font-size: 48px; margin-bottom: 16px; }
                .calculator-title { font-size: 28px; font-weight: 700; color: #1f2937; margin: 0 0 8px 0; }
                .calculator-subtitle { color: #6b7280; font-size: 15px; margin: 0; }
                .form-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 24px; }
                .form-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .form-group { display: flex; flex-direction: column; gap: 8px; }
                .form-label { font-size: 14px; font-weight: 600; color: #374151; }
                .required { color: #ef4444; }
                .input-wrapper { position: relative; }
                .input-prefix, .input-suffix { position: absolute; top: 50%; transform: translateY(-50%); color: #9ca3af; font-weight: 500; font-size: 14px; }
                .input-prefix { left: 12px; }
                .input-suffix { right: 12px; }
                .form-input { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 15px; background: #f9fafb; transition: all 0.2s ease; outline: none; color: #1f2937; }
                .form-input:hover { background: white; border-color: #9ca3af; }
                .form-input:focus { background: white; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
                .form-input.has-prefix { padding-left: 32px; }
                .form-input.has-suffix { padding-right: 60px; }
                .form-input::placeholder { color: #9ca3af; font-size: 14px; }
                .calculate-button { width: 100%; padding: 14px; background: #3b82f6; color: white; font-size: 16px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; }
                .calculate-button:hover { background: #2563eb; }
                .calculate-button:active { transform: scale(0.98); }
                .result-card { margin-top: 24px; padding: 24px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; text-align: center; }
                .result-label { color: #1e40af; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
                .result-value { color: #1e3a8a; font-size: 36px; font-weight: 700; margin: 0; }
                @media (max-width: 768px) {
                    .calculator-card { padding: 24px; }
                    .calculator-title { font-size: 24px; }
                    .form-grid-2 { grid-template-columns: 1fr; }
                    .result-value { font-size: 32px; }
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
                    <CalculatorNavigation currentPath="/calculators/apr-calculator" />

                    <div className="calculator-header">
                        <div className="calculator-icon">📊</div>
                        <h1 className="calculator-title">APR Calculator</h1>
                        <p className="calculator-subtitle">Calculate the Annual Percentage Rate</p>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Loan Amount <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="10,000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label className="form-label">Interest Rate <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input type="number" step="0.01" className="form-input has-suffix" placeholder="6.5" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                                    <span className="input-suffix">%</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Loan Term <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <input type="number" className="form-input has-suffix" placeholder="3" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
                                    <span className="input-suffix">years</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Fees</label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="500" value={fees} onChange={(e) => setFees(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateAPR} className="calculate-button">Calculate APR</button>

                    {showResult && apr && (
                        <div className="result-card">
                            <p className="result-label">Annual Percentage Rate (APR)</p>
                            <p className="result-value">{apr}</p>
                            <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic' }}>* This is a rough estimate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
