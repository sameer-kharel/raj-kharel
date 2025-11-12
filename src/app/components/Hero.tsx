'use client';

import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        marginTop: '100px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: 'white',
        padding: '80px 32px 120px',
        overflow: 'hidden',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes textGlide {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes textGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2);
          }
        }

        @keyframes badgeFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          animation: fadeInLeft 0.8s ease-out;
        }

        .hero-content h1 {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .hero-name {
          display: flex;
          align-items: baseline;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-name span:first-child {
          color: #cbd5e1;
          animation: textGlide 0.8s ease-out 0s;
          display: inline-block;
        }

        .hero-name span:last-child {
          background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 56px;
          font-weight: 900;
          animation: textGlide 0.8s ease-out 0.2s both, textGradientShift 4s linear infinite 0.8s;
          display: inline-block;
        }

        .hero-divider {
          width: 80px;
          height: 5px;
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%);
          border-radius: 3px;
          margin: 24px 0 32px 0;
          animation: slideInUp 0.8s ease-out 0.4s both;
        }

        .hero-title {
          font-size: 28px;
          font-weight: 300;
          background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          line-height: 1.4;
          animation: slideInUp 0.8s ease-out 0.5s both;
        }

        .hero-title strong {
          color: #60a5fa;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 16px;
          color: #94a3b8;
          line-height: 1.8;
          margin-bottom: 40px;
          max-width: 500px;
          animation: slideInUp 0.8s ease-out 0.6s both;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .stat-item {
          animation: slideInUp 0.8s ease-out;
        }

        .stat-item:nth-child(1) {
          animation-delay: 0.7s;
        }

        .stat-item:nth-child(2) {
          animation-delay: 0.8s;
        }

        .stat-item:nth-child(3) {
          animation-delay: 0.9s;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: slideInUp 0.8s ease-out 1s both;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          padding: 16px 40px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #60a5fa;
          color: #60a5fa;
          padding: 14px 38px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary:hover {
          background: #60a5fa;
          color: white;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(96, 165, 250, 0.3);
        }

        .hero-image-container {
          position: relative;
          animation: fadeInRight 0.8s ease-out 0.3s both;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .image-wrapper {
          position: relative;
          width: 380px;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(59, 130, 246, 0.2);
          border: 2px solid rgba(59, 130, 246, 0.3);
          position: relative;
          animation: scaleIn 0.8s ease-out 0.4s both, glowPulse 3s ease-in-out infinite 0.8s;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .available-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 12px 18px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          z-index: 20;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
          animation: badgeFloat 3s ease-in-out infinite;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: bounce-soft 2s ease-in-out infinite;
        }

        .scroll-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .scroll-icon {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
          color: #60a5fa;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-image-container {
            order: -1;
          }

          .image-wrapper {
            width: 320px;
            height: 420px;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 40px;
          }

          .hero-name span:last-child {
            font-size: 40px;
          }

          .hero-title {
            font-size: 22px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .image-wrapper {
            width: 280px;
            height: 380px;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-30%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-30%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(30, 64, 175, 0.02) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      <div className="hero-container">
        {/* Text Content */}
        <div className="hero-content">
          <h1>
            <div className="hero-name">
              <span>Meet</span>
              <span>Raj Kharel</span>
            </div>
          </h1>
          <div className="hero-divider"></div>

          <h2 className="hero-title">
            Your Trusted Real Estate Partner at <strong>IKON Realty</strong>
          </h2>

          <p className="hero-description">
            With over 10 years of industry experience, I'm dedicated to helping you navigate the real estate market with confidence. Whether you're buying, selling, or investing, I'm here to guide you every step of the way.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Successful Sales</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>

          <div className="hero-buttons">
            <a href="#listings" className="btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              View Properties
            </a>
            <a href="#contact" className="btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="hero-image-container">
          <div className="image-wrapper">
            <div className="hero-image">
              <Image
                src="/image.png"
                alt="Raj Kharel - Professional Real Estate Agent"
                width={400}
                height={500}
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="available-badge">
              <span className="badge-dot"></span>
              Available Now
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">SCROLL TO EXPLORE</div>
        <div className="scroll-icon">↓</div>
      </div>
    </section>
  );
};

export default Hero;