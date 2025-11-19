'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });

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
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const stats = [
    { icon: '🏠', value: '50+', label: 'Properties Sold', color: '#3b82f6' },
    { icon: '⭐', value: '5/5', label: 'Client Rating', color: '#f59e0b' },
    { icon: '👥', value: '50+', label: 'Happy Clients', color: '#10b981' },
    { icon: '🏆', value: '2+', label: 'Years Experience', color: '#8b5cf6' },
  ];

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
        color: '#1e293b',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .floating-shape {
          position: absolute;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: float 8s ease-in-out infinite;
        }

        .section-badge {
          display: inline-block;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 2px solid #3b82f6;
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1e40af;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }

        .section-title {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          margin: 20px 0;
          color: #4b7af6;
        }

        .section-subtitle {
          font-size: 18px;
          color: #64748b;
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.8;
        }

        .content-card {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .content-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .content-text {
          font-size: 17px;
          line-height: 1.9;
          color: #475569;
          margin-bottom: 24px;
        }

        .content-text strong {
          color: #3b82f6;
          font-weight: 700;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(59, 130, 246, 0.25);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-container:hover {
          transform: scale(1.02) rotate(1deg);
          box-shadow: 0 35px 90px rgba(59, 130, 246, 0.35);
        }

        .image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .image-container:hover::before {
          opacity: 1;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-container:hover img {
          transform: scale(1.05);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-top: 80px;
        }

        .stat-card {
          background: white;
          padding: 40px 32px;
          border-radius: 20px;
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--card-color) 0%, transparent 100%);
          opacity: 0.05;
          transition: opacity 0.4s;
        }

        .stat-card:hover::before {
          opacity: 0.15;
        }

        .stat-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: var(--card-color);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          font-size: 56px;
          margin-bottom: 20px;
          display: inline-block;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
          transition: transform 0.4s;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.2) rotate(10deg);
        }

        .stat-value {
          font-size: 40px;
          font-weight: 900;
          color: var(--card-color);
          margin-bottom: 12px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .decorative-line {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%);
          background-size: 200% auto;
          border-radius: 10px;
          margin: 32px auto;
          animation: gradient-shift 3s ease infinite;
          box-shadow: 0 2px 15px rgba(59, 130, 246, 0.4);
        }

        @media (max-width: 768px) {
          .content-card {
            padding: 32px 24px;
          }

          .image-container {
            height: 400px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Floating Background Shapes with Parallax */}
      <motion.div
        className="floating-shape"
        style={{
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(147, 197, 253, 0.05))',
          y: smoothY1,
        }}
      />
      <motion.div
        className="floating-shape"
        style={{
          bottom: '15%',
          left: '8%',
          width: '250px',
          height: '250px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(196, 181, 253, 0.04))',
          y: smoothY2,
          animationDelay: '2s',
        }}
      />
      <motion.div
        className="floating-shape"
        style={{
          top: '50%',
          right: '15%',
          width: '180px',
          height: '180px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(110, 231, 183, 0.04))',
          y: y3,
          animationDelay: '4s',
        }}
      />

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 32px 80px', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div style={{ textAlign: 'center', marginBottom: '80px' }} variants={itemVariants}>
            <motion.div
              className="section-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              About Me
            </motion.div>
            <motion.h1
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Trusted Real Estate Partner
            </motion.h1>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              With over 2 years of experience in the DMV area, I'm dedicated to helping you find your dream home.
            </motion.p>
            <motion.div
              className="decorative-line"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '100px', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          {/* Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>
            {/* Text Content */}
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="content-card">
                <p className="content-text">
                  Hi, I'm <strong>Raj Kharel</strong>, a dedicated real estate professional serving the DMV area 
                  (DC, Maryland, and Virginia). With over 2 years of experience in the industry, I specialize in 
                  helping clients buy and sell condos, townhouses, and single-family homes.
                </p>
                <p className="content-text">
                  My approach is simple: I listen to your needs, provide expert guidance, and work tirelessly to 
                  ensure you achieve your real estate goals. Whether you're a first-time homebuyer, looking to upgrade, 
                  or selling your property, I'm here to make the process smooth and stress-free.
                </p>
                <p className="content-text" style={{ marginBottom: 0 }}>
                  What sets me apart is my deep knowledge of the local market, strong negotiation skills, and commitment 
                  to providing personalized service. I believe that buying or selling a home is more than just a 
                  transaction—it's about building lasting relationships and helping you make one of the most important 
                  decisions of your life.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ y: y3 }}
            >
              <div className="image-container">
                <Image
                  src="/image.png"
                  alt="Raj Kharel - Real Estate Agent"
                  width={600}
                  height={600}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                style={{ '--card-color': stat.color } as React.CSSProperties}
                variants={itemVariants}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
