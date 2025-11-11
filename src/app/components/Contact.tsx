'use client';

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.9) 100%), radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.08) 0%, transparent 50%)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-ring {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(59, 130, 246, 0);
          }
        }

        .contact-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 80px;
          animation: fadeInUp 0.8s ease-out;
        }

        .contact-subtitle {
          font-size: 14px;
          color: #60a5fa;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: inline-block;
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #e2e8f0;
          margin-bottom: 20px;
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .contact-description {
          font-size: 18px;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .contact-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 2rem;
          }

          .contact-content {
            gap: 40px;
          }
        }

        /* Left Column - Contact Info */
        .contact-info-column {
          animation: slideInLeft 0.8s ease-out 0.1s both;
        }

        .info-box {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          padding: 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }

        .info-box:hover {
          transform: translateX(8px);
          border-color: rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .info-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .info-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .info-label {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .info-value {
          font-size: 18px;
          font-weight: 700;
          color: #e2e8f0;
          display: block;
        }

        .info-value-link {
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .info-value-link:hover {
          color: #3b82f6;
          text-decoration: underline;
        }

        /* Right Column - Form */
        .contact-form-column {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .contact-form {
          padding: 40px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(30, 64, 175, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .success-message {
          padding: 18px 20px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%);
          border: 1.5px solid rgba(16, 185, 129, 0.4);
          color: #86efac;
          text-align: center;
          font-weight: 600;
          font-size: 15px;
          animation: slideInUp 0.4s ease-out;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #e2e8f0;
          font-size: 14px;
          letter-spacing: 0.3px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 28px;
          }
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 18px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.6);
          border: 1.5px solid rgba(59, 130, 246, 0.2);
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          transition: all 0.3s ease;
          resize: vertical;
          min-height: auto;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #64748b;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.6);
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(59, 130, 246, 0.2);
        }

        .form-textarea {
          min-height: 140px;
          padding: 14px 18px;
          line-height: 1.5;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="contact-wrapper">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-subtitle">Get In Touch</div>
          <h2 className="contact-title">Let's Connect & Explore Your Real Estate Goals</h2>
          <p className="contact-description">
            Ready to find your dream home or discuss your property needs? Reach out to me directly, and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* Content */}
        <div className="contact-content">
          {/* Left Column - Contact Information */}
          <div className="contact-info-column">
            <div className="info-box">
              <div className="info-icon">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Email Address</span>
                <a href="mailto:raj@ikonrealty.com" className="info-value info-value-link">
                  raj@ikonrealty.com
                </a>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Phone Number</span>
                <a href="tel:+15551234567" className="info-value info-value-link">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Office Hours</span>
                <span className="info-value">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div className="info-content">
                <span className="info-label">Quick Response</span>
                <span className="info-value">Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form-column">
            <form onSubmit={handleSubmit} className="contact-form">
              {submitted && (
                <div className="success-message">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Message sent successfully! I'll be in touch soon.
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your real estate needs, timeline, and any specific questions you have..."
                  className="form-textarea"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;