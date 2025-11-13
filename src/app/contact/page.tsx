'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [activeTab, setActiveTab] = useState<'message' | 'meeting'>('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', preferredDate: '', preferredTime: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: 'white',
        padding: '120px 32px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes slideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .contact-container {
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #60a5fa;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .section-title {
          font-size: 56px;
          font-weight: 900;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
          line-height: 1.1;
        }

        .section-subtitle {
          font-size: 19px;
          color: #cbd5e1;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 80px;
          align-items: start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.03) 100%);
          padding: 36px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .info-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .info-card:hover::before {
          opacity: 1;
        }

        .info-card:hover {
          transform: translateY(-6px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.06) 100%);
        }

        .info-icon-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 16px;
        }

        .info-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
          flex-shrink: 0;
        }

        .info-title {
          font-size: 22px;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.5px;
        }

        .info-text {
          font-size: 17px;
          color: #94a3b8;
          line-height: 1.7;
          padding-left: 80px;
        }

        .info-link {
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .info-link:hover {
          color: #3b82f6;
          text-decoration: underline;
        }

        .contact-form {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(37, 99, 235, 0.03) 100%);
          padding: 56px;
          border-radius: 28px;
          border: 1px solid rgba(59, 130, 246, 0.15);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
        }

        .tab-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          background: rgba(15, 23, 42, 0.5);
          padding: 8px;
          border-radius: 16px;
          border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .tab-btn {
          flex: 1;
          padding: 16px 24px;
          background: transparent;
          border: none;
          border-radius: 12px;
          color: #94a3b8;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .tab-btn:not(.active):hover {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
        }

        .form-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 24px;
          color: #f1f5f9;
          letter-spacing: -0.5px;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 55px;
          margin-bottom: 2px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 18px 24px;
          background: rgba(15, 23, 42, 0.7);
          border: 2px solid rgba(59, 130, 246, 0.15);
          border-radius: 14px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
          background: rgba(15, 23, 42, 0.9);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #64748b;
        }

        .form-select {
          cursor: pointer;
        }

        .form-select option {
          background: #0f172a;
          color: white;
        }

        .form-textarea {
          min-height: 140px;
          resize: vertical;
        }

        .schedule-notice {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 28px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .schedule-notice svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .schedule-notice-text {
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .submit-btn {
          width: 100%;
          padding: 20px 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 17px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
        }

        .submit-btn:active {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .submit-btn span {
          position: relative;
          z-index: 1;
        }

        .status-message {
          margin-top: 20px;
          padding: 16px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          animation: slideIn 0.3s ease;
        }

        .status-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #4ade80;
        }

        .status-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .section-title {
            font-size: 44px;
          }

          .form-group-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }

          .contact-form {
            padding: 36px 28px;
          }

          .info-text {
            padding-left: 0;
            margin-top: 12px;
          }

          .info-icon-wrapper {
            flex-direction: column;
            align-items: flex-start;
          }

          .tab-btn {
            font-size: 13px;
            padding: 14px 16px;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.25, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.05) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
            opacity: 0.3,
          }}
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
        <div className="section-header">
          <motion.div
            className="section-badge"
            variants={itemVariants}
          >
            Get in Touch
          </motion.div>
          <motion.h2
            className="section-title"
            variants={itemVariants}
          >
            Let's Work Together
          </motion.h2>
          <motion.p
            className="section-subtitle"
            variants={itemVariants}
          >
            Ready to buy or sell your property? Send me a message or schedule a consultation.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            variants={itemVariants}
          >
            <motion.div
              className="info-card"
              whileHover={{ y: -6 }}
            >
              <div className="info-icon-wrapper">
                <div className="info-icon">
                  <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <h3 className="info-title">Email</h3>
              </div>
              <p className="info-text">
                <a href="mailto:kharelrealty@gmail.com" className="info-link">
                  kharelrealty@gmail.com
                </a>
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              whileHover={{ y: -6 }}
            >
              <div className="info-icon-wrapper">
                <div className="info-icon">
                  <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <h3 className="info-title">Phone</h3>
              </div>
              <p className="info-text">
                <a href="tel:+15712441254" className="info-link">
                  (571) 244-1254
                </a>
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              whileHover={{ y: -6 }}
            >
              <div className="info-icon-wrapper">
                <div className="info-icon">
                  <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <h3 className="info-title">Office</h3>
              </div>
              <p className="info-text">
                Fairfax, VA<br />
                DMV Realty, INC.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form with Tabs */}
          <motion.div variants={itemVariants}>
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Tab Buttons */}
              <div className="tab-buttons">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'message' ? 'active' : ''}`}
                  onClick={() => setActiveTab('message')}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  Send Message
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'meeting' ? 'active' : ''}`}
                  onClick={() => setActiveTab('meeting')}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  Schedule Meeting
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'message' ? (
                  <motion.div
                    key="message"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="form-title">Send Me a Message</h3>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        placeholder="kharel realty"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="your@email.com"
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
                        placeholder="(123) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Your Message *</label>
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
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="meeting"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="form-title">Schedule Your Consultation</h3>
                    
                    <div className="schedule-notice">
                      <svg width="20" height="20" fill="#60a5fa" viewBox="0 0 24 24">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                      <p className="schedule-notice-text">
                        I'll review your request and send you a Google Calendar invite to confirm the meeting.
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        placeholder="kharel realty"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="your@email.com"
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
                        placeholder="(123) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="preferredDate">Preferred Date *</label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          className="form-input"
                          min={today}
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="preferredTime">Preferred Time *</label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          className="form-select"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select time</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Message / Property Details *</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        placeholder="Tell me about your real estate needs and what you'd like to discuss..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span>{isSubmitting ? 'Scheduling...' : 'Request Meeting'}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {submitStatus === 'success' && (
                <div className="status-message status-success">
                  {activeTab === 'message' 
                    ? '✓ Message sent successfully! I\'ll get back to you soon.'
                    : '✓ Meeting request sent! You\'ll receive a Google Calendar invite soon.'
                  }
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message status-error">
                  ✗ Failed to send. Please try again or contact directly.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;