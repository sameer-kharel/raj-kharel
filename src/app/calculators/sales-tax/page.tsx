'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CalculatorNavigation from '../../components/CalculatorNavigation';
import '../calculator-styles.css';

export default function SalesTaxCalculator() {
    const [price, setPrice] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [result, setResult] = useState<{ tax: string, total: string } | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateSalesTax = () => {
        const itemPrice = parseFloat(price);
        const rate = parseFloat(taxRate);

        if (isNaN(itemPrice) || isNaN(rate) || itemPrice <= 0 || rate < 0) {
            alert('Please enter valid numbers.');
            return;
        }

        const tax = itemPrice * (rate / 100);
        const total = itemPrice + tax;

        setResult({
            tax: `$${tax.toFixed(2)}`,
            total: `$${total.toFixed(2)}`
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
                    <CalculatorNavigation currentPath="/calculators/sales-tax" />

                    <div className="calculator-header">
                        <div className="calculator-icon">🧾</div>
                        <h1 className="calculator-title">Sales Tax Calculator</h1>
                        <p className="calculator-subtitle">Calculate sales tax and total price</p>
                    </div>

                    <div className="form-grid-single">
                        <div className="form-group">
                            <label className="form-label">Item Price <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <span className="input-prefix">$</span>
                                <input type="number" step="0.01" className="form-input has-prefix" placeholder="99.99" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sales Tax Rate <span className="required">*</span></label>
                            <div className="input-wrapper">
                                <input type="number" step="0.01" className="form-input has-suffix" placeholder="8.5" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
                                <span className="input-suffix">%</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateSalesTax} className="calculate-button">Calculate Total</button>

                    {showResult && result && (
                        <div className="result-grid">
                            <div className="result-item">
                                <p className="result-item-label">Sales Tax</p>
                                <p className="result-item-value">{result.tax}</p>
                            </div>
                            <div className="result-card">
                                <p className="result-label">Total Price</p>
                                <p className="result-value">{result.total}</p>
                                <p className="result-warning" style={{ fontSize: '12px', color: '#ef4444', marginTop: '12px', fontStyle: 'italic' }}>* This is a rough estimate</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
