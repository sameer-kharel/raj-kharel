'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
        delay: 0.3,
      },
    },
  };


  const name = "Raj Kharel".split("");
  const subtitle = "Your Trusted DMV Real Estate Expert".split("");


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
          50% { transform: translateY(-30px) rotate(8deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes morphing {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes slideInLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes scaleUp {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
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

        .hero-name-wrapper {
          margin-bottom: 10px;
          overflow: hidden;
        }

        .hero-greeting {
          font-size: 56px;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-bottom: -55px;
          animation: slideInLeft 0.8s ease-out 0.3s both;
        }

        .hero-name {
          font-size: 80px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -3px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .hero-name-letter {
          display: inline-block;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .hero-name-letter::after {
          content: attr(data-letter);
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform: translateY(-100%);
          transition: all 0.3s ease;
        }

        .hero-name-letter:hover::after {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 32px;
          display: inline-flex;
          flex-wrap: wrap;
          gap: 0;
        }

        .hero-title-letter {
          display: inline-block;
          background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }

        .hero-title-letter:hover {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: translateY(-4px);
        }

        .hero-description {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(203, 213, 225, 0.85);
          margin-bottom: 48px;
          max-width: 550px;
          animation: slideInLeft 0.8s ease-out 0.5s both;
        }

        .hero-cta-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          animation: slideInLeft 0.8s ease-out 0.7s both;
        }

        .hero-cta-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 18px 48px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(59, 130, 246, 0.5);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .hero-cta-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .hero-cta-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .hero-cta-primary:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.7);
        }

        .hero-cta-primary span {
          position: relative;
          z-index: 1;
        }

        .hero-cta-primary svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .hero-cta-primary:hover svg {
          transform: translateX(5px);
        }

        .hero-cta-secondary {
          background: transparent;
          color: #60a5fa;
          padding: 18px 48px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 16px;
          border: 3px solid rgba(59, 130, 246, 0.4);
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .hero-cta-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2));
          transition: left 0.4s ease;
        }

        .hero-cta-secondary:hover::before {
          left: 0;
        }

        .hero-cta-secondary:hover {
          border-color: #3b82f6;
          transform: translateY(-6px);
          box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
        }

        .hero-cta-secondary span,
        .hero-cta-secondary svg {
          position: relative;
          z-index: 1;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 60px;
          padding-top: 30px;
          border-top: 2px solid rgba(59, 130, 246, 0.2);
          animation: slideInLeft 0.8s ease-out 0.9s both;
        }

        .stat-item {
          text-align: center;
          position: relative;
          padding: 20px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.02));
          border: 1px solid rgba(59, 130, 246, 0.15);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.2);
        }

        .stat-value {
          font-size: 48px;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          display: block;
        }

        .stat-label {
          font-size: 13px;
          color: rgba(148, 163, 184, 0.9);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-image-wrapper {
          position: relative;
          perspective: 1500px;
        }

        .hero-image-container {
          position: relative;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
          transform-style: preserve-3d;
          animation: float 8s ease-in-out infinite;
        }

        .hero-image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 197, 253, 0.2));
          z-index: 1;
          mix-blend-mode: overlay;
        }

        .hero-image-container::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 40px;
          background: linear-gradient(45deg, #3b82f6, #2563eb, #1e40af, #60a5fa);
          background-size: 300% 300%;
          animation: gradientShift 5s ease infinite;
          z-index: -1;
        }

        .hero-image-glow {
          position: absolute;
          inset: -40px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.3));
          border-radius: 60px;
          filter: blur(60px);
          opacity: 0.7;
          z-index: -2;
          animation: pulse 5s ease-in-out infinite, morphing 10s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-cta-group {
            justify-content: center;
          }

          .hero-name {
            font-size: 60px;
            justify-content: center;
          }

          .hero-greeting {
            font-size: 44px;
          }

          .hero-title {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 0 24px;
          }

          .hero-name {
            font-size: 48px;
          }

          .hero-greeting {
            font-size: 36px;
          }

          .hero-title {
            font-size: 20px;
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
            padding: 16px 32px;
          }
        }
      `}</style>

      {/* Enhanced Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {/* Animated gradient orbs */}
        <motion.div
          style={{
            position: 'absolute',
            top: '5%',
            right: '-5%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '-5%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.25, 1],
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: 0.5,
          }}
        />
      </div>

      <motion.div
        className="hero-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ y, opacity }}
      >
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-name-wrapper">
              <span className="hero-greeting">Meet</span>
              <motion.h1 className="hero-name" variants={containerVariants}>
                {name.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="hero-name-letter"
                    data-letter={letter}
                    variants={letterVariants}
                    custom={index}
                    transition={{ delay: index * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.div className="hero-title" variants={containerVariants}>
              {subtitle.map((letter, index) => (
                <motion.span
                  key={index}
                  className="hero-title-letter"
                  variants={letterVariants}
                  custom={index}
                  transition={{ delay: 0.5 + index * 0.02 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

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

            <motion.div className="hero-stats" variants={containerVariants}>
              {[
                { value: '500+', label: 'Properties Sold' },
                { value: '4.9/5', label: 'Client Rating' },
                { value: '15+', label: 'Years Experience' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            className="hero-image-wrapper"
            variants={imageVariants}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.5 }}
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