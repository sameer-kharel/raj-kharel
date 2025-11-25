'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

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
                        <div className="calculator-icon">📉</div>
                        <h1 className="calculator-title">Credit Utilization</h1>
                        <p className="calculator-subtitle">Calculate your credit utilization ratio</p>
                    </div>

                    <div className="form-grid-single">
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
                            <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic' }}>* This is a rough estimate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
