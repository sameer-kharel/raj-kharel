'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

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
    { name: 'Mortgage Calculator', href: '/calculators/mortgage' },
    { name: 'Refinance Calculator', href: '/calculators/refinance' },
    { name: 'Loan Payment Calculator', href: '/calculators/loan-payment' },
    { name: 'APR Calculator', href: '/calculators/apr-calculator' },
    { name: 'Compound Interest', href: '/calculators/compound-interest' },
    { name: 'Credit Card Payoff', href: '/calculators/credit-card-payoff' },
    { name: 'Credit Utilization', href: '/calculators/credit-utilization' },
    { name: 'Debt Consolidation', href: '/calculators/debt-consolidation' },
    { name: 'Income Tax Calculator', href: '/calculators/income-tax' },
    { name: 'Sales Tax Calculator', href: '/calculators/sales-tax' },
    { name: 'Savings Goal Calculator', href: '/calculators/savings-goal' },
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
          margin-top: 2rem;
          padding: 2rem;
          background: rgba(15, 15, 25, 0.95);
          border-radius: 24px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
          max-width: 1300px;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        a.submenu-item {
          display: flex !important;
          align-items: center !important;
          gap: 0.875rem !important;
          padding: 1rem 1.25rem !important;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15)) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
          border-radius: 14px !important;
          color: #f0f0f0 !important;
          text-decoration: none !important;
          font-size: 0.9rem !important;
          font-weight: 600 !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          overflow: hidden !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
          cursor: pointer !important;
        }

        a.submenu-item::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.35), rgba(147, 51, 234, 0.35)) !important;
          opacity: 0 !important;
          transition: opacity 0.3s !important;
        }

        a.submenu-item:hover::before {
          opacity: 1 !important;
        }

        a.submenu-item:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5) !important;
          border-color: rgba(255, 255, 255, 0.5) !important;
          color: #ffffff !important;
        }

        .submenu-icon {
          font-size: 1.5rem !important;
          position: relative !important;
          z-index: 1 !important;
          flex-shrink: 0 !important;
        }

        .submenu-item-text {
          position: relative !important;
          z-index: 1 !important;
          white-space: nowrap !important;
        }

        @media (max-width: 1200px) {
          .tools-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .tools-submenu {
            margin-left: 1rem;
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .desktop-tools-dropdown {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .tools-grid {
            grid-template-columns: 1fr;
          }
          
          .tools-submenu {
            padding: 1rem;
          }
          
          a.submenu-item {
            font-size: 0.85rem !important;
            padding: 0.875rem 1rem !important;
          }
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

            {/* Tools Dropdown */}
            <div
              className="tools-dropdown desktop-tools-dropdown"
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <motion.button
                style={{
                  background: 'white',
                  borderRadius: '9999px',
                  padding: '0.75rem 1.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Tools
                <motion.span
                  style={{ fontSize: '0.75rem' }}
                  animate={{ rotate: isToolsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Tools Dropdown Menu */}
              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      background: 'white',
                      borderRadius: '1rem',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      minWidth: '800px',
                      maxWidth: '900px',
                      zIndex: 1000,
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.75rem',
                      overflow: 'hidden'
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {calculatorTools.map((tool, index) => (
                      <motion.div
                        key={tool.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.03,
                          ease: 'easeOut'
                        }}
                      >
                        <Link
                          href={tool.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1rem',
                            borderRadius: '0.75rem',
                            textDecoration: 'none',
                            color: '#1f2937',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            background: 'transparent',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                            e.currentTarget.style.color = '#2563eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.color = '#1f2937';
                          }}
                        >
                          <motion.span
                            style={{
                              fontSize: '1.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            📊
                          </motion.span>
                          <span>{tool.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div >
      </nav >

      {/* Full-screen Menu */}
      <AnimatePresence>
        {
          isMenuOpen && (
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

                  {/* Tools Menu Item */}
                  <motion.li
                    style={{ margin: '1rem 0' }}
                    custom={navItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <button
                      onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: 'bold',
                        color: 'white',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'transform 0.3s, color 0.3s',
                        padding: 0,
                        margin: '0 auto'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.color = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      Tools
                      <motion.span
                        style={{ fontSize: '1.5rem' }}
                        animate={{ rotate: isMobileToolsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </button>

                    {/* Mobile Tools Submenu */}
                    <AnimatePresence>
                      {isMobileToolsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            marginTop: '1rem',
                            overflow: 'hidden'
                          }}
                        >
                          {calculatorTools.map((tool, index) => (
                            <motion.div
                              key={tool.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05
                              }}
                              style={{ marginBottom: '0.75rem' }}
                            >
                              <Link
                                href={tool.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsMobileToolsOpen(false);
                                }}
                                style={{
                                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                                  color: '#d1d5db',
                                  textDecoration: 'none',
                                  display: 'block',
                                  transition: 'all 0.3s',
                                  padding: '0.5rem 0',
                                  paddingLeft: '2rem'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'white';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#d1d5db';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                }}
                              >
                                📊 {tool.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>

                </ul>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

export default Header