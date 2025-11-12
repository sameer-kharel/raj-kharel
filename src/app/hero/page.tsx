'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        delay: 0.2,
      },
    },
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 25%, #0f1729 50%, #1e2a3f 75%, #0a0f1e 100%)',
        color: 'white',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes gradientShift {
          // 0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          min-height: 80vh;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 10px 24px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .hero-badge::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hero-badge:hover::before {
          opacity: 1;
        }

        .hero-name {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-name span {
          display: inline-block;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-name span:nth-child(2) {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 72px;
          letter-spacing: -2px;
        }

        .hero-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }

        .hero-description {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(203, 213, 225, 0.8);
          margin-bottom: 40px;
          max-width: 550px;
        }

        .hero-cta-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .hero-cta-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 16px 40px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .hero-cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .hero-cta-primary:hover::before {
          left: 100%;
        }

        .hero-cta-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6);
        }

        .hero-cta-secondary {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
          color: #60a5fa;
          padding: 16px 40px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 16px;
          border: 2px solid rgba(59, 130, 246, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-cta-secondary:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-4px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(59, 130, 246, 0.15);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(148, 163, 184, 0.8);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-image-wrapper {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        .hero-image-container {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        }

        .hero-image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), transparent);
          z-index: 1;
          mix-blend-mode: overlay;
        }

        .hero-image-glow {
          position: absolute;
          inset: -20px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.2));
          border-radius: 40px;
          filter: blur(40px);
          opacity: 0.6;
          z-index: -1;
          animation: pulse 4s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-cta-group {
            justify-content: center;
          }

          .hero-name {
            font-size: 48px;
          }

          .hero-name span:nth-child(2) {
            font-size: 56px;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 0 24px;
          }

          .hero-name {
            font-size: 40px;
          }

          .hero-name span:nth-child(2) {
            font-size: 48px;
          }

          .hero-title {
            font-size: 22px;
          }

          .hero-description {
            font-size: 16px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="hero-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ⭐ Top Rated Real Estate Agent
            </motion.div>

            <motion.h1 variants={itemVariants}>
              <div className="hero-name">
                <motion.span variants={nameVariants}>Meet</motion.span>
                <motion.span
                  variants={nameVariants}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Raj Kharel
                </motion.span>
              </div>
            </motion.h1>

            <motion.p className="hero-title" variants={itemVariants}>
              Your Trusted DMV Real Estate Expert
            </motion.p>

            <motion.p className="hero-description" variants={itemVariants}>
              With over 15 years of experience serving DC, Maryland, and Virginia, I specialize in 
              helping clients buy and sell condos, townhouses, and single-family homes. Let me turn 
              your real estate dreams into reality with personalized service and expert guidance.
            </motion.p>

            <motion.div className="hero-cta-group" variants={itemVariants}>
              <Link href="/#contact" className="hero-cta-primary">
                <span>Get Started</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/listings" className="hero-cta-secondary">
                <span>View Listings</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="stat-item">
                <div className="stat-value">500+</div>
                <div className="stat-label">Properties Sold</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4.9/5</div>
                <div className="stat-label">Client Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            className="hero-image-wrapper"
            variants={imageVariants}
          >
            <div className="hero-image-glow" />
            <div className="hero-image-container">
              <Image
                src="/image.png"
                alt="Raj Kharel - Real Estate Professional"
                width={600}
                height={700}
                priority
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;