'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Properties', href: '/properties', id: 'properties' },
    { name: 'Listings', href: '/listings', id: 'listings' },
    { name: 'Contact', href: '/contact', id: 'contact' },
    { name: 'Reviews', href: '/reviews', id: 'reviews' },
  ];

  const calculatorTools = [
    { name: 'Mortgage Calculator', href: '/calculators/mortgage', icon: '🏠' },
    { name: 'Auto Loan Calculator', href: '/calculators/auto-loan', icon: '🚗' },
    { name: 'Refinance Calculator', href: '/calculators/refinance', icon: '💰' },
    { name: 'Loan Payment Calculator', href: '/calculators/loan-payment', icon: '💳' },
    { name: 'APR Calculator', href: '/calculators/apr-calculator', icon: '📊' },
    { name: 'Compound Interest', href: '/calculators/compound-interest', icon: '📈' },
    { name: 'Credit Card Payoff', href: '/calculators/credit-card-payoff', icon: '💳' },
    { name: 'Credit Utilization', href: '/calculators/credit-utilization', icon: '📉' },
    { name: 'Debt Consolidation', href: '/calculators/debt-consolidation', icon: '🔄' },
    { name: 'Income Tax Calculator', href: '/calculators/income-tax', icon: '💵' },
    { name: 'Sales Tax Calculator', href: '/calculators/sales-tax', icon: '🧾' },
    { name: 'Savings Goal Calculator', href: '/calculators/savings-goal', icon: '🎯' },
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      x: 0,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    open: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: custom * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }
    })
  };

  return (
    <>
      <style jsx>{`
        .tools-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          padding: 0.5rem;
          min-width: 280px;
          max-width: 320px;
          z-index: 1000;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          color: #1f2937;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background: #f3f4f6;
          transform: translateX(4px);
        }

        .dropdown-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .tools-button {
          position: relative;
          cursor: pointer;
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: bold;
          color: white;
          display: inline-block;
          transition: transform 0.3s, color 0.3s;
        }

        .tools-button:hover {
          transform: translateX(8px);
          color: #e5e7eb;
        }

        .tools-indicator {
          display: inline-block;
          margin-left: 0.5rem;
          transition: transform 0.3s;
        }

        .tools-indicator.open {
          transform: rotate(180deg);
        }

        .tools-submenu {
          margin-left: 2rem;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .submenu-item {
          font-size: clamp(1.25rem, 2.5vw, 1.5rem);
          font-weight: 600;
          color: #9ca3af;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s;
          padding: 0.5rem 0;
        }

        .submenu-item:hover {
          color: white;
          transform: translateX(8px);
        }

        .submenu-icon {
          font-size: 1.5rem;
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: '1.5rem 2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827',
              textDecoration: 'none',
              letterSpacing: '-0.025em',
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            RAJ KHAREL
          </Link>

          {/* Hamburger Button */}
          {(!isMenuOpen) && <button
            style={{
              background: 'white',
              borderRadius: '9999px',
              padding: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 0.3s'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
            aria-label="Toggle menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '1.5rem' }}>
              <span style={{
                display: 'block',
                height: '2px',
                background: '#111827',
                borderRadius: '9999px',
                transition: 'all 0.3s',
                transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
              }}></span>
              <span style={{
                display: 'block',
                height: '2px',
                background: '#111827',
                borderRadius: '9999px',
                transition: 'all 0.3s',
                opacity: isMenuOpen ? 0 : 1
              }}></span>
              <span style={{
                display: 'block',
                height: '2px',
                background: '#111827',
                borderRadius: '9999px',
                transition: 'all 0.3s',
                transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
              }}></span>
            </div>
          </button>}
        </div>
      </nav>

      {/* Full-screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              height: '100vh',
              background: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              overflow: 'auto',
              overflowX: "hidden"
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close Button */}
            <button
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'white',
                borderRadius: '9999px',
                padding: '1rem',
                boxShadow: '0 10px 15px -3px rgba(255, 255, 255, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                zIndex: 1000
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 255, 255, 0.1)';
              }}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div style={{
              padding: '2rem',
              width: '100%',
              maxHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'center',
                width: '100%'
              }}>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    style={{ margin: '1rem 0' }}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.href}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: 'bold',
                        color: 'white',
                        textDecoration: 'none',
                        display: 'inline-block',
                        transition: 'transform 0.3s, color 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.color = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.color = 'white';
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}

                {/* Tools Dropdown */}
                <motion.li
                  style={{ margin: '1rem 0' }}
                  custom={navItems.length}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div
                    className="tools-button"
                    onClick={() => setIsToolsOpen(!isToolsOpen)}
                  >
                    Tools
                    <span className={`tools-indicator ${isToolsOpen ? 'open' : ''}`}>
                      ▼
                    </span>
                  </div>

                  <AnimatePresence>
                    {isToolsOpen && (
                      <motion.div
                        className="tools-submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {calculatorTools.map((tool, idx) => (
                          <motion.div
                            key={tool.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              href={tool.href}
                              className="submenu-item"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span className="submenu-icon">{tool.icon}</span>
                              {tool.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>

                <motion.li
                  style={{ marginTop: '2rem' }}
                  custom={navItems.length + 1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-block',
                      padding: '1rem 2.5rem',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'black',
                      background: 'white',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
