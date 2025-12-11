'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#ffffff',
      color: '#111827',
      paddingTop: '80px',
      paddingBottom: '40px',
      borderTop: '1px solid #f3f4f6',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      <style>{`
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }
        
        .footer-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 48px;
          margin-bottom: 60px;
        }

        /* Desktop Layout */
        @media (min-width: 1024px) {
          .footer-container {
            padding: 0 48px;
          }
          .footer-content-wrapper {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 60px;
          }
          
          .brand-section {
            flex: 0 0 400px;
          }
          
          .links-section {
            display: flex;
            gap: 80px;
          }
        }

        /* Mobile/Tablet Layout */
        @media (max-width: 1023px) {
          .brand-section {
            width: 100%;
          }
          .links-section {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .links-section {
            grid-template-columns: 1fr;
          }
        }
        
        .social-icon {
          color: #000000;
          transition: transform 0.2s ease, color 0.2s ease;
          display: inline-flex;
        }
        .social-icon:hover {
          color: #4b5563;
          transform: translateY(-4px);
        }

        .footer-link {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #000000;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid #f3f4f6;
          text-align: center;
        }

        .footer-column-title {
          font-weight: 700;
          margin-bottom: 24px;
          font-size: 15px;
          margin-top: 0;
        }
        
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #6b7280;
          transition: color 0.2s ease;
        }

        .contact-item:hover {
          color: #000000;
        }
      `}</style>

      <div className="footer-container">
        <div className="footer-content-wrapper">
          {/* Brand Section */}
          <div className="brand-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                RK
              </div>
              <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.025em' }}>Raj Kharel</span>
            </div>
            <p style={{
              color: '#6b7280',
              fontSize: '15px',
              lineHeight: '1.625',
              maxWidth: '384px',
              margin: 0
            }}>
              Your trusted real estate professional in the DMV area. Specializing in condos, townhouses, and single-family homes with personalized service and local expertise.
            </p>

            <div style={{ display: 'flex', gap: '20px', paddingTop: '8px' }}>
              <a
                href="https://www.facebook.com/profile.php?id=61577176485106"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <Facebook size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/rajkharelrealty/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/raj-kharel-3954471b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="links-section">
            <div className="footer-column">
              <h4 className="footer-column-title">Quick Links</h4>
              <ul className="footer-list">
                <li><Link href="/" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Home</Link></li>
                <li><Link href="/about" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>About</Link></li>
                <li><Link href="/properties" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Properties</Link></li>
                <li><Link href="/listings" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Listings</Link></li>
                <li><Link href="/contact" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Services</h4>
              <ul className="footer-list">
                <li><Link href="/listings" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Buy a Home</Link></li>
                <li><Link href="/contact" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Sell a Home</Link></li>
                <li><Link href="/contact" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Market Analysis</Link></li>
                <li><Link href="/contact" className="footer-link" style={{ fontSize: '14px', fontWeight: '500' }}>Consultation</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Get in Touch</h4>
              <ul className="footer-list">
                <li>
                  <a href="tel:+1 (571) 244-1254" className="footer-link contact-item" style={{ fontSize: '14px', fontWeight: '500' }}>
                    <Phone size={16} />
                    <span>(571) 244  c  - 1254</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:kharelrealty@gmail.com" className="footer-link contact-item" style={{ fontSize: '14px', fontWeight: '500' }}>
                    <Mail size={16} />
                    <span>kharelrealty@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', margin: 0 }}>
            © {currentYear} Raj Kharel. All rights reserved.
          </p>
        </div>
      </div>

      {/* Background Watermark (Subtle) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 33%)',
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: 0.02,
        whiteSpace: 'nowrap'
      }}>
        <span style={{ fontSize: '20vw', fontWeight: 'bold', lineHeight: 1 }}>RAJ KHAREL</span>
      </div>
    </footer>
  );
};

export default Footer;