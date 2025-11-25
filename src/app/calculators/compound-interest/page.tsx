'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

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
                        <div className="calculator-icon">📈</div>
                        <h1 className="calculator-title">Compound Interest</h1>
                        <p className="calculator-subtitle">Calculate compound interest growth</p>
                    </div>

                    <div className="form-grid-single">
                        <div className="form-group">
                            <label className="form-label">Principal Amount <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="5,000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-grid">
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
                        <div className="result-grid">
                            <div className="result-item">
                                <p className="result-item-label">Total Amount</p>
                                <p className="result-item-value">{result.total}</p>
                            </div>
                            <div className="result-item">
                                <p className="result-item-label">Interest Earned</p>
                                <p className="result-item-value">{result.interest}</p>
                            </div>
                            <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic', gridColumn: '1 / -1', textAlign: 'center' }}>* This is a rough estimate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
