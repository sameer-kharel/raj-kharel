'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

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

  return (
    <section
      id="contact"
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

        .contact-container {
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .info-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          padding: 32px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
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

        .info-card:hover::before {
          opacity: 1;
        }

        .info-card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.3);
        }

        .info-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .info-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .info-text {
          font-size: 16px;
          color: rgba(203, 213, 225, 0.8);
          line-height: 1.6;
        }

        .info-link {
          color: rgba(96, 165, 250, 0.9);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .info-link:hover {
          color: #60a5fa;
          text-decoration: underline;
        }

        .contact-form {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%);
          padding: 48px;
          border-radius: 24px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 16px 20px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          background: rgba(15, 23, 42, 0.8);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }

        .form-textarea {
          min-height: 150px;
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 18px 32px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .submit-btn:active {
          transform: translateY(0px);
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }

          .contact-form {
            padding: 32px 24px;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-15%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
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
            bottom: '-10%',
            left: '-15%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
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
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Start Your Journey
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready to buy or sell your property? Contact me today for a consultation.
          </motion.p>
          <motion.div
            className="section-divider"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="info-card"
              whileHover={{ y: -8 }}
              variants={itemVariants}
            >
              <div className="info-icon">
                <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="info-title">Email</h3>
              <p className="info-text">
                <a href="mailto:raj@example.com" className="info-link">
                  kharelrealty@gmail.com
                </a>
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              whileHover={{ y: -8 }}
              variants={itemVariants}
            >
              <div className="info-icon">
                <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="info-title">Phone</h3>
              <p className="info-text">
                <a href="tel:+17031234567" className="info-link">
                  (571) 244-1254o
                </a>
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              whileHover={{ y: -8 }}
              variants={itemVariants}
            >
              <div className="info-icon">
                <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="info-title">Office</h3>
              <p className="info-text">
                Fairfax, VA<br />
                DMV Realty, INC.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="(703) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your real estate needs..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;