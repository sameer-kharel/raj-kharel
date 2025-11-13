'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const stats = [
    { icon: '🏠', value: '50+', label: 'Properties Sold' },
    { icon: '⭐', value: '5/5', label: 'Client Rating' },
    { icon: '👥', value: '50+', label: 'Happy Clients' },
    { icon: '🏆', value: '2+', label: 'Years Experience' },
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 25%, #0f1729 50%, #1e2a3f 75%, #0a0f1e 100%)',
        color: 'white',
        padding: '100px 32px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        :root {
          --rotation: 15deg;
        }

        .about-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .section-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 18px;
          color: rgba(203, 213, 225, 0.8);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .section-divider {
          width: 80px;
          height: 5px;
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 30%, #1e40af 50%, #2563eb 70%, #3b82f6 100%);
          background-size: 200% auto;
          border-radius: 3px;
          margin: 24px auto 60px;
          animation: gradientShift 3s ease infinite;
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 80px;
        }

        .content-text {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(203, 213, 225, 0.8);
          margin-bottom: 24px;
        }

        .content-text strong {
          color: rgba(96, 165, 250, 0.9);
          font-weight: 700;
        }

        /* Exact CSS from provided code with increased rotation */
        .hover-img-container {
          position: relative;
          width: 100%;
          height: 700px;
          perspective: 1000px;
          transition: transform .2s;
          margin-top: 5px;
          filter: drop-shadow(0 20px 80px rgba(59, 130, 246, 0.4));
        }

        .hover-img-container:hover {
          transform: scale(1.02);
        }

        .hover-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 12px;
          transition: transform .7s cubic-bezier(0,0,0,1);
        }

        .hover-img-container div {
          position: absolute;
          width: 50%;
          height: 50%;
          z-index: 2;
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: opacity .4s;
        }

        .hover-img-container .top-left {
          top: 0;
          left: 0;
        }

        .hover-img-container .top-left:hover ~ img {
          transform: rotate3d(-1, 1, 0, var(--rotation));
        }

        .hover-img-container .top-right {
          top: 0;
          right: 0;
        }

        .hover-img-container .top-right:hover ~ img {
          transform: rotate3d(-1, -1, 0, var(--rotation));
        }

        .hover-img-container .bottom-left {
          bottom: 0;
          left: 0;
        }

        .hover-img-container .bottom-left:hover ~ img {
          transform: rotate3d(1, 1, 0, var(--rotation));
        }

        .hover-img-container .bottom-right {
          bottom: 0;
          right: 0;
        }

        .hover-img-container .bottom-right:hover ~ img {
          transform: rotate3d(1, -1, 0, var(--rotation));
        }

        .hover-img-container .top-middle {
          top: 0;
          bottom: 50%;
          inset-inline: 35%;
          width: unset;
          height: unset;
        }

        .hover-img-container .top-middle:hover ~ img {
          transform: rotate3d(-1, 0, 0, var(--rotation));
        }

        .hover-img-container .bottom-middle {
          top: 50%;
          bottom: 0;
          inset-inline: 35%;
          width: unset;
          height: unset;
        }

        .hover-img-container .bottom-middle:hover ~ img {
          transform: rotate3d(1, 0, 0, var(--rotation));
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 60px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          padding: 32px 24px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.3);
        }

        .stat-icon {
          font-size: 48px;
          margin-bottom: 16px;
          filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3));
        }

        .stat-value {
          font-size: 32px;
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

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .hover-img-container {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .hover-img-container {
            height: 400px;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
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
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
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
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="about-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: '60px' }} variants={itemVariants}>
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Trusted Real Estate Partner
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            With over 15 years of experience in the DMV area, I'm dedicated to helping you find your dream home.
          </motion.p>
          <motion.div
            className="section-divider"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="content-grid">
          <motion.div variants={itemVariants}>
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
            <p className="content-text">
              What sets me apart is my deep knowledge of the local market, strong negotiation skills, and commitment 
              to providing personalized service. I believe that buying or selling a home is more than just a 
              transaction—it's about building lasting relationships and helping you make one of the most important 
              decisions of your life.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="hover-img-container">
              <div className="top-left"></div>
              <div className="top-right"></div>
              <div className="bottom-left"></div>
              <div className="bottom-right"></div>
              <div className="top-middle"></div>
              <div className="bottom-middle"></div>
              <Image
                src="/image.png"
                alt="Raj Kharel - Real Estate Agent"
                width={600}
                height={700}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
