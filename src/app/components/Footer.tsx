'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 25%, #0f1729 50%, #1e2a3f 75%, #0a0f1e 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5); }
        }

        .footer-wrapper {
          position: relative;
          border-top: 1px solid rgba(59, 130, 246, 0.15);
        }

        .footer-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
          animation: shimmer 3s infinite;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 48px 32px;
          position: relative;
          z-index: 10;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand {
          max-width: 380px;
        }

        .footer-logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .footer-logo-icon {
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

        .footer-logo-icon::before {
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

        .footer-brand:hover .footer-logo-icon::before {
          opacity: 0.6;
          animation: glow 2s infinite;
        }

        .footer-brand:hover .footer-logo-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-logo {
          font-size: 28px;
          font-weight: 900;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .footer-logo-subtitle {
          font-size: 11px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .footer-description {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(203, 213, 225, 0.7);
          margin-bottom: 28px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-link {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: rgba(203, 213, 225, 0.8);
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .social-link:hover {
          border-color: #3b82f6;
          color: white;
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }

        .social-link:hover svg {
          transform: scale(1.1);
        }

        .footer-column h4 {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-column h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          border-radius: 2px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-link {
          color: rgba(203, 213, 225, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          position: relative;
          padding-left: 20px;
        }

        .footer-link::before {
          content: '→';
          position: absolute;
          left: 0;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          color: #60a5fa;
        }

        .footer-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-link:hover {
          color: #60a5fa;
          transform: translateX(8px);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
          margin: 40px 0;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          padding-top: 32px;
          border-top: 2px solid rgba(59, 130, 246, 0.1);
        }

        .copyright {
          font-size: 14px;
          color: rgba(148, 163, 184, 0.7);
          font-weight: 500;
        }

        .footer-bottom-links {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }

        .footer-bottom-link {
          font-size: 14px;
          color: rgba(148, 163, 184, 0.7);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-bottom-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          transition: width 0.3s ease;
        }

        .footer-bottom-link:hover::after {
          width: 100%;
        }

        .footer-bottom-link:hover {
          color: #60a5fa;
        }

        @media (max-width: 1024px) {
          .footer-container {
            padding: 60px 32px 32px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 60px 24px 32px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-brand {
            max-width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .footer-bottom-links {
            flex-direction: column;
            gap: 16px;
          }

          .footer-link {
            padding-left: 0;
          }

          .footer-link::before {
            display: none;
          }

          .footer-link:hover {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-10%',
            width: '35%',
            height: '35%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.15, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="footer-wrapper">
        <motion.div
          className="footer-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="footer-grid">
            {/* Brand Section */}
            <motion.div className="footer-brand" variants={itemVariants}>
              <div className="footer-logo-section">
                <motion.div
                  className="footer-logo-icon"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  RK
                </motion.div>
                <div className="footer-logo-text">
                  <div className="footer-logo">Raj Kharel</div>
                  <div className="footer-logo-subtitle">Real Estate Expert</div>
                </div>
              </div>
              <p className="footer-description">
                Your trusted real estate professional in the DMV area. Specializing in condos, 
                townhouses, and single-family homes with personalized service and local expertise.
              </p>
              <div className="social-links">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="footer-column" variants={itemVariants}>
              <h4>Quick Links</h4>
              <div className="footer-links">
                <Link href="/" className="footer-link">Home</Link>
                <Link href="/#about" className="footer-link">About</Link>
                <Link href="/#properties" className="footer-link">Properties</Link>
                <Link href="/listings" className="footer-link">Listings</Link>
                <Link href="/#contact" className="footer-link">Contact</Link>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div className="footer-column" variants={itemVariants}>
              <h4>Services</h4>
              <div className="footer-links">
                <Link href="/listings" className="footer-link">Buy a Home</Link>
                <Link href="/#contact" className="footer-link">Sell a Home</Link>
                <Link href="/#contact" className="footer-link">Market Analysis</Link>
                <Link href="/#contact" className="footer-link">Consultation</Link>
                <Link href="/#contact" className="footer-link">Property Valuation</Link>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="footer-column" variants={itemVariants}>
              <h4>Contact</h4>
              <div className="footer-links">
                <a href="tel:+17031234567" className="footer-link">(703) 123-4567</a>
                <a href="mailto:raj@dmvrealty.com" className="footer-link">raj@dmvrealty.com</a>
                <span className="footer-link" style={{ cursor: 'default', paddingLeft: 0 }}>Fairfax, VA 22030</span>
                <span className="footer-link" style={{ cursor: 'default', paddingLeft: 0 }}>DMV Realty, INC.</span>
              </div>
            </motion.div>
          </div>

          <div className="footer-divider" />

          {/* Bottom Bar */}
          <motion.div
            className="footer-bottom"
            variants={itemVariants}
          >
            <p className="copyright">
              © {currentYear} Raj Kharel. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
              <Link href="/sitemap" className="footer-bottom-link">Sitemap</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;