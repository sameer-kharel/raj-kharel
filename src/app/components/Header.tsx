'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Properties', href: '/properties', id: 'properties' },
    { name: 'Listings', href: '/listings', id: 'listings' },
    { name: 'Contact', href: '/contact', id: 'contact' },
    { name: 'Tools', href: '/tools', id: 'tools' },
    { name: 'Reviews', href: '/reviews', id: 'reviews' },
  ];

  return (
    <motion.header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        opacity: headerOpacity,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
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

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5); }
        }

        .header-wrapper {
          background: linear-gradient(135deg, rgba(10, 15, 30, 0.95) 0%, rgba(26, 35, 50, 0.95) 50%, rgba(15, 23, 41, 0.95) 100%);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(59, 130, 246, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .header-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          animation: shimmer 3s infinite;
        }

        .header-wrapper.scrolled {
          background: linear-gradient(135deg, rgba(10, 15, 30, 0.98) 0%, rgba(26, 35, 50, 0.98) 50%, rgba(15, 23, 41, 0.98) 100%);
          border-bottom: 1px solid rgba(59, 130, 246, 0.25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 10;
          transition: padding 0.3s ease;
        }

        .header-wrapper.scrolled .header-container {
          padding: 16px 48px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          position: relative;
        }

        .logo-icon-wrapper {
          position: relative;
        }

        .logo-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 900;
          font-size: 24px;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .logo-icon::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          filter: blur(8px);
        }

        .logo-section:hover .logo-icon::before {
          opacity: 0.6;
          animation: glow 2s infinite;
        }

        .logo-section:hover .logo-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
        }

        .header-wrapper.scrolled .logo-icon {
          width: 48px;
          height: 48px;
          font-size: 20px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .logo-name {
          font-size: 26px;
          font-weight: 900;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          transition: all 0.3s ease;
        }

        .header-wrapper.scrolled .logo-name {
          font-size: 24px;
        }

        .logo-title {
          font-size: 11px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .nav-menu {
          display: flex;
          gap: 8px;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: rgba(203, 213, 225, 0.9);
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          padding: 10px 20px;
          cursor: pointer;
          display: block;
          border-radius: 10px;
          letter-spacing: 0.3px;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:hover {
          color: #60a5fa;
          transform: translateY(-2px);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after {
          width: calc(100% - 40px);
        }

        .nav-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .cta-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 12px 32px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          text-decoration: none;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .cta-button:active {
          transform: translateY(-1px);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 10px;
          cursor: pointer;
          padding: 10px;
          transition: all 0.3s ease;
        }

        .hamburger:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15));
          border-color: rgba(59, 130, 246, 0.5);
        }

        .hamburger span {
          width: 24px;
          height: 2.5px;
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 999;
        }

        .mobile-menu-overlay.active {
          display: block;
        }

        @media (max-width: 1024px) {
          .header-container {
            padding: 20px 32px;
          }

          .nav-menu {
            gap: 4px;
          }

          .nav-link {
            padding: 10px 16px;
            font-size: 14px;
          }
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
            position: fixed;
            top: 0;
            right: 0;
            width: 320px;
            height: 100vh;
            background: linear-gradient(135deg, rgba(10, 15, 30, 0.98) 0%, rgba(26, 35, 50, 0.98) 100%);
            backdrop-filter: blur(20px);
            flex-direction: column;
            gap: 0;
            padding: 100px 32px 32px;
            border-left: 2px solid rgba(59, 130, 246, 0.2);
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
            animation: slideInRight 0.4s ease-out;
            overflow-y: auto;
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .nav-menu.active {
            display: flex;
          }

          .nav-item {
            width: 100%;
          }

          .nav-link {
            width: 100%;
            padding: 16px 20px;
            font-size: 16px;
            border-radius: 12px;
          }

          .nav-link::after {
            display: none;
          }

          .logo-name {
            font-size: 22px;
          }

          .logo-icon {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .cta-button {
            padding: 10px 24px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link href="/" className="logo-section">
            <div className="logo-text">
              <div className="logo-name">Raj Kharel</div>
              <div className="logo-title">Real Estate Expert</div>
            </div>
          </Link>

          <nav>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="nav-item"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </motion.header>
  );
};

export default Header;