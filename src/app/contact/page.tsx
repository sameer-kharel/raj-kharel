'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    product: 'Orders',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
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
        setFormData({ 
          product: 'Orders',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
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

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
      minHeight: '100vh',
      padding: '120px 24px 80px',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes gradientFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          33% { transform: translate(30px, -30px) scale(1.1); opacity: 0.25; }
          66% { transform: translate(-20px, 20px) scale(0.95); opacity: 0.2; }
        }

        @keyframes gradientFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
          33% { transform: translate(-40px, 30px) scale(1.15); opacity: 0.22; }
          66% { transform: translate(25px, -25px) scale(0.9); opacity: 0.18; }
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }

        .page-subtitle {
          font-size: 16px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 60px;
          align-items: start;
        }

        .contact-info-section {
          background: white;
          padding: 48px 40px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .info-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }

        .info-text {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .info-link {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }

        .info-link:hover {
          color: #2563eb;
        }

        .contact-form-wrapper {
          background: white;
          padding: 48px 40px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 32px;
          letter-spacing: -0.5px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          color: #1a1a1a;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          background: white;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #9ca3af;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        .form-select option {
          background: white;
          color: #1a1a1a;
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 32px;
          background: #1a1a1a;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .submit-btn:hover {
          background: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .status-message {
          margin-top: 20px;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }

        .status-success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #6ee7b7;
        }

        .status-error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .contact-form-wrapper,
          .contact-info-section {
            padding: 32px 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      {/* Animated Background Gradients */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.15, 0.25, 0.2, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '8%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(196, 181, 253, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
          animate={{
            x: [0, -40, 25, 0],
            y: [0, 30, -25, 0],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.12, 0.22, 0.18, 0.12],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(252, 211, 77, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="contact-container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Contact us using the information below. We'll respond promptly to your inquiries and feedback
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="info-title">Raj Kharel Contact</h2>
            <p className="info-text">
              Looking to buy or sell a property in the DMV area? I'm here to help you navigate the real estate market with expertise and dedication.
            </p>
            <p className="info-text">
              As a licensed VA Realtor with{' '}
              <a href="tel:+15712441254" className="info-link">IKON Realty</a>
              , I specialize in helping clients find their dream homes and achieve their real estate goals.
            </p>
            <p className="info-text">
              Whether you're a first-time buyer, looking to upgrade, or ready to sell, I provide personalized service tailored to your unique needs.
            </p>
            <p className="info-text">
              Feel free to reach out via phone at{' '}
              <a href="tel:+15712441254" className="info-link">(571) 244-1254</a>
              {' '}or email at{' '}
              <a href="mailto:kharelrealty@gmail.com" className="info-link">kharelrealty@gmail.com</a>
            </p>
            <p className="info-text">
              Please fill out the form with your information and let me know how I can assist you with your real estate needs.
            </p>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="form-title">Send us your message now!</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Product Selection */}
              <div className="form-group">
                <label className="form-label" htmlFor="product">
                  Select Which Product
                </label>
                <select
                  id="product"
                  name="product"
                  className="form-select"
                  value={formData.product}
                  onChange={handleChange}
                  required
                >
                  <option value="Orders">Orders</option>
                  <option value="Properties">Properties</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Name Fields */}
              <div className="form-row">
                <div>
                  <label className="form-label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="(571) 244-1254"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label className="form-label" htmlFor="company">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-input"
                  placeholder="your company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="message here here"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="status-message status-success">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="status-message status-error">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;