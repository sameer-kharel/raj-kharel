'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

export default function SavingsGoalCalculator() {
    const [goalAmount, setGoalAmount] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [result, setResult] = useState<{ months: string, years: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateSavingsGoal = () => {
        const goal = parseFloat(goalAmount);
        const current = parseFloat(currentSavings || '0');
        const monthly = parseFloat(monthlyContribution);
        const rate = parseFloat(interestRate || '0') / 100 / 12;

        if (isNaN(goal) || isNaN(monthly) || goal <= 0 || monthly <= 0) {
            alert('Please enter valid numbers for goal and monthly contribution.');
            return;
        }

        if (current >= goal) {
            setResult({ months: '0', years: '0' });
            setShowResult(true);
            return;
        }

        const remaining = goal - current;

        if (rate === 0) {
            const months = Math.ceil(remaining / monthly);
            setResult({
                months: months.toString(),
                years: (months / 12).toFixed(1)
            });
        } else {
            let months = 0;
            let balance = current;

            while (balance < goal && months < 1200) {
                balance = balance * (1 + rate) + monthly;
                months++;
            }

            setResult({
                months: months.toString(),
                years: (months / 12).toFixed(1)
            });
        }
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
                    <CalculatorNavigation currentPath="/calculators/savings-goal" />

                    <div className="calculator-header">
                        <div className="calculator-icon">🎯</div>
                        <h1 className="calculator-title">Savings Goal Calculator</h1>
                        <p className="calculator-subtitle">Calculate how long it will take to reach your savings goal</p>
                    </div>

                    <div className="form-grid-single">
                        <div className="form-group">
                            <label className="form-label">Savings Goal <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="20,000" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Current Savings</label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="5,000" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Monthly Contribution <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" className="form-input has-prefix" placeholder="500" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Annual Interest Rate (Optional)</label>
                            <div className="input-wrapper">
                                <input type="number" step="0.01" className="form-input has-suffix" placeholder="3" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                                <span className="input-suffix">%</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateSavingsGoal} className="calculate-button">Calculate Timeline</button>

                    {showResult && result && (
                        <div className="result-card">
                            <p className="result-label">Time to Reach Goal</p>
                            <p className="result-value">{result.months} months</p>
                            <p className="result-note">({result.years} years)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
