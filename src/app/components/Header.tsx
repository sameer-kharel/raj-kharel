'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      }}
    >
      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideDown 0.6s ease-out;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 22px;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .logo-section:hover .logo-icon {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo-name {
          font-size: 24px;
          font-weight: 800;
          color: #e2e8f0;
          letter-spacing: -0.5px;
        }

        .logo-title {
          font-size: 12px;
          color: #60a5fa;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .nav-menu {
          display: flex;
          gap: 32px;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 0;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #60a5fa;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cta-button {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          text-decoration: none;
          display: inline-block;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger span {
          width: 28px;
          height: 3px;
          background: #60a5fa;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(10px, 10px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 16px 24px;
          }

          .hamburger {
            display: flex;
          }

          .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            flex-direction: column;
            gap: 16px;
            padding: 24px;
            border-top: 1px solid rgba(59, 130, 246, 0.1);
          }

          .nav-menu.active {
            display: flex;
          }

          .logo-name {
            font-size: 20px;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
        }
      `}</style>

      <div className="header-container">
        <a href="#" className="logo-section">
          <div className="logo-icon">RK</div>
          <div className="logo-text">
            <div className="logo-name">Raj Kharel</div>
            <div className="logo-title">Real Estate Agent</div>
          </div>
        </a>

        <nav>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <a href="#hero" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#listings" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Properties
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#contact" className="cta-button">
            Contact Me
          </a>
          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;