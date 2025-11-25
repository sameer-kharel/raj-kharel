'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

export default function CreditCardPayoffCalculator() {
    const [balance, setBalance] = useState('');
    const [apr, setApr] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [result, setResult] = useState<{ months: string, totalPaid: string, interest: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculatePayoff = () => {
        const B = parseFloat(balance);
        const r = parseFloat(apr) / 100 / 12;
        const P = parseFloat(monthlyPayment);

        if (isNaN(B) || isNaN(r) || isNaN(P) || B <= 0 || r < 0 || P <= 0) {
            alert('Please enter valid numbers.');
            return;
        }

        if (P <= B * r) {
            alert('Monthly payment must be greater than the monthly interest to pay off the balance.');
            return;
        }

        const months = Math.ceil(Math.log(P / (P - B * r)) / Math.log(1 + r));
        const totalPaid = P * months;
        const interest = totalPaid - B;

        setResult({
            months: months.toString(),
            totalPaid: `$${totalPaid.toFixed(2)}`,
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
                    <CalculatorNavigation currentPath="/calculators/credit-card-payoff" />

                    <div className="calculator-header">
                        <div className="calculator-icon">💳</div>
                        <h1 className="calculator-title">Credit Card Payoff</h1>
                        <p className="calculator-subtitle">Calculate how long it will take to pay off your credit card</p>
                    </div>

                    <div className="form-grid-single">
                        <div className="form-group">
                            <label className="form-label">Current Balance <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="5,000" value={balance} onChange={(e) => setBalance(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Annual APR <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <input type="number" step="0.01" className="form-input has-suffix" placeholder="18.99" value={apr} onChange={(e) => setApr(e.target.value)} />
                                <span className="input-suffix">%</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Monthly Payment <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="200" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={calculatePayoff} className="calculate-button">Calculate Payoff Time</button>

                    {showResult && result && (
                        <>
                            <div className="result-card">
                                <p className="result-label">Months to Pay Off</p>
                                <p className="result-value">{result.months}</p>
                            </div>
                            <div className="result-grid">
                                <div className="result-item">
                                    <p className="result-item-label">Total Paid</p>
                                    <p className="result-item-value">{result.totalPaid}</p>
                                </div>
                                <div className="result-item">
                                    <p className="result-item-label">Total Interest</p>
                                    <p className="result-item-value">{result.interest}</p>
                                </div>
                            </div>
                            <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic', textAlign: 'center', width: '100%' }}>* This is a rough estimate</p>
                        </div>
                </>
                    )}
            </div>
        </div>
        </div >
    );
}
