'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        color: '#cbd5e1',
        padding: '64px 32px 32px',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-section {
          animation: fadeInUp 0.8s ease-out;
        }

        .footer-section:nth-child(1) {
          animation-delay: 0s;
        }

        .footer-section:nth-child(2) {
          animation-delay: 0.1s;
        }

        .footer-section:nth-child(3) {
          animation-delay: 0.2s;
        }

        .footer-section:nth-child(4) {
          animation-delay: 0.3s;
        }

        .footer-title {
          font-size: 14px;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .footer-link {
          display: block;
          color: #94a3b8;
          text-decoration: none;
          margin-bottom: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: #60a5fa;
          transform: translateX(4px);
        }

        .footer-brand {
          margin-bottom: 16px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .logo-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo-name {
          font-weight: 700;
          font-size: 16px;
          color: #e2e8f0;
        }

        .logo-title {
          font-size: 11px;
          color: #60a5fa;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .footer-description {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-color: #3b82f6;
          color: white;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
          margin: 32px 0;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 24px;
          border-top: 1px solid rgba(59, 130, 246, 0.1);
        }

        .footer-copyright {
          font-size: 14px;
          color: #64748b;
        }

        .footer-legal {
          display: flex;
          gap: 24px;
          font-size: 14px;
        }

        .footer-legal a {
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-legal a:hover {
          color: #60a5fa;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-legal {
            width: 100%;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="footer-container">
        {/* Footer Content */}
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">RK</div>
              <div className="logo-text-wrapper">
                <div className="logo-name">Raj Kharel</div>
                <div className="logo-title">IKON Realty</div>
              </div>
            </div>
            <p className="footer-description">
              Premier real estate agent dedicated to helping you find your dream home and make smart investments with professional expertise.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="LinkedIn" title="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.84v8.37h2.84v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.84M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook" title="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram" title="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <div className="footer-title">Services</div>
            <a href="#listings" className="footer-link">
              Home Buying
            </a>
            <a href="#listings" className="footer-link">
              Property Selling
            </a>
            <a href="#listings" className="footer-link">
              Investment Advisory
            </a>
            <a href="#listings" className="footer-link">
              Market Analysis
            </a>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <div className="footer-title">Company</div>
            <a href="#about" className="footer-link">
              About Me
            </a>
            <a href="#listings" className="footer-link">
              Featured Properties
            </a>
            <a href="#contact" className="footer-link">
              Get in Touch
            </a>
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <div className="footer-title">Contact</div>
            <a href="mailto:raj@ikonrealty.com" className="footer-link">
              raj@ikonrealty.com
            </a>
            <a href="tel:+15551234567" className="footer-link">
              +1 (555) 123-4567
            </a>
            <p className="footer-link" style={{ margin: '12px 0' }}>
              San Francisco, CA
            </p>
            <p className="footer-link" style={{ margin: '12px 0', fontSize: '12px' }}>
              Mon - Fri: 9am - 6pm
            </p>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Raj Kharel at IKON Realty. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;