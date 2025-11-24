'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const calculators = [
    { name: 'Mortgage Calculator', path: '/calculators/mortgage', icon: '🏠' },
    { name: 'APR Calculator', path: '/calculators/apr-calculator', icon: '📊' },
    { name: 'Compound Interest', path: '/calculators/compound-interest', icon: '📈' },
    { name: 'Credit Card Payoff', path: '/calculators/credit-card-payoff', icon: '💳' },
    { name: 'Credit Utilization', path: '/calculators/credit-utilization', icon: '📉' },
    { name: 'Debt Consolidation', path: '/calculators/debt-consolidation', icon: '🔄' },
    { name: 'Income Tax Calculator', path: '/calculators/income-tax', icon: '💵' },
    { name: 'Loan Payment Calculator', path: '/calculators/loan-payment', icon: '💰' },
    { name: 'Refinance Calculator', path: '/calculators/refinance', icon: '🔁' },
    { name: 'Sales Tax Calculator', path: '/calculators/sales-tax', icon: '🧾' },
    { name: 'Savings Goal Calculator', path: '/calculators/savings-goal', icon: '🎯' },
];

interface CalculatorNavigationProps {
    currentPath: string;
}

export default function CalculatorNavigation({ currentPath }: CalculatorNavigationProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const currentCalculator = calculators.find(calc => calc.path === currentPath);

    const handleNavigate = (path: string) => {
        router.push(path);
        setIsOpen(false);
    };

    return (
        <div className="calculator-navigation">
            <style>{`
        .calculator-navigation {
          margin-bottom: 24px;
        }

        .nav-dropdown {
          position: relative;
          width: 100%;
        }

        .nav-button {
          width: 100%;
          padding: 14px 16px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
        }

        .nav-button:hover {
          border-color: #3b82f6;
          background: #f9fafb;
        }

        .nav-button-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-icon {
          font-size: 20px;
        }

        .nav-arrow {
          font-size: 12px;
          transition: transform 0.2s ease;
        }

        .nav-arrow.open {
          transform: rotate(180deg);
        }

        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 8px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          max-height: 400px;
          overflow-y: auto;
          z-index: 50;
          display: none;
        }

        .nav-dropdown-menu.open {
          display: block;
        }

        .nav-item {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.2s ease;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
          color: #4b5563;
        }

        .nav-item:last-child {
          border-bottom: none;
        }

        .nav-item:hover {
          background: #f9fafb;
          color: #3b82f6;
        }

        .nav-item.active {
          background: #eff6ff;
          color: #3b82f6;
          font-weight: 600;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .nav-button {
            font-size: 14px;
          }
        }
      `}</style>

            <div className="nav-label">Calculator</div>
            <div className="nav-dropdown">
                <button
                    className="nav-button"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                    <div className="nav-button-content">
                        <span className="nav-icon">{currentCalculator?.icon}</span>
                        <span>{currentCalculator?.name || 'Select Calculator'}</span>
                    </div>
                    <span className={`nav-arrow ${isOpen ? 'open' : ''}`}>▼</span>
                </button>

                <div className={`nav-dropdown-menu ${isOpen ? 'open' : ''}`}>
                    {calculators.map((calc) => (
                        <div
                            key={calc.path}
                            className={`nav-item ${calc.path === currentPath ? 'active' : ''}`}
                            onClick={() => handleNavigate(calc.path)}
                        >
                            <span className="nav-icon">{calc.icon}</span>
                            <span>{calc.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
