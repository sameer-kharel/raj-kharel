'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const calculators = [
  {
    name: 'Mortgage Calculator',
    path: '/calculators/mortgage',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  },
  {
    name: 'APR Calculator',
    path: '/calculators/apr-calculator',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  },
  {
    name: 'Compound Interest',
    path: '/calculators/compound-interest',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
  },
  {
    name: 'Credit Card Payoff',
    path: '/calculators/credit-card-payoff',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
  },
  {
    name: 'Credit Utilization',
    path: '/calculators/credit-utilization',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
  },
  {
    name: 'Debt Consolidation',
    path: '/calculators/debt-consolidation',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  },
  {
    name: 'Income Tax Calculator',
    path: '/calculators/income-tax',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  },
  {
    name: 'Loan Payment Calculator',
    path: '/calculators/loan-payment',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    name: 'Refinance Calculator',
    path: '/calculators/refinance',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  },
  {
    name: 'Sales Tax Calculator',
    path: '/calculators/sales-tax',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
  },
  {
    name: 'Savings Goal Calculator',
    path: '/calculators/savings-goal',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
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
