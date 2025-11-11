'use client';

import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      style={{
        padding: '96px 24px',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 41, 59, 0.5) 100%)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.8s ease-out;
        }

        .section-subtitle {
          text-align: center;
          color: #94a3b8;
          margin-bottom: 64px;
          font-size: 16px;
          animation: fadeInUp 0.8s ease-out 0.1s both;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 64px;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .about-content {
          animation: slideInLeft 0.8s ease-out;
        }

        .about-features {
          animation: slideInRight 0.8s ease-out 0.1s both;
        }

        .about-text {
          font-size: 16px;
          line-height: 1.8;
          color: #cbd5e1;
          margin-bottom: 24px;
        }

        .feature-card {
          padding: 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateX(10px);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 10px 25px -3px rgba(59, 130, 246, 0.2);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feature-title {
          font-weight: 600;
          color: #e2e8f0;
        }

        .feature-desc {
          font-size: 14px;
          color: #94a3b8;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .service-card {
          padding: 32px 24px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(30, 64, 175, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.15);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s ease-out;
        }

        .service-card:nth-child(1) {
          animation-delay: 0s;
        }

        .service-card:nth-child(2) {
          animation-delay: 0.1s;
        }

        .service-card:nth-child(3) {
          animation-delay: 0.2s;
        }

        .service-card:hover {
          transform: translateY(-10px);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.2);
        }

        .service-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .service-title {
          font-size: 18px;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 12px;
        }

        .service-desc {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
        }
      `}</style>

      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Discover what makes me your ideal real estate partner
        </p>

        {/* About Grid */}
        <div className="about-grid">
          {/* Content */}
          <div className="about-content">
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#e2e8f0',
                marginBottom: '24px',
              }}
            >
              Your Real Estate Journey Starts Here
            </h3>

            <p className="about-text">
              I am a dedicated and passionate real estate professional with over 10 years
              of experience in the industry at{' '}
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>IKON Realty</span>. My
              proven track record speaks to my commitment to excellence and client
              satisfaction.
            </p>

            <p className="about-text">
              With a deep understanding of local market dynamics and comprehensive knowledge
              of residential and commercial properties, I help clients make informed decisions
              that align with their financial goals and lifestyle aspirations.
            </p>

            <p className="about-text">
              My mission is to provide personalized service with integrity, transparency, and
              expertise. Whether you're buying, selling, or investing, I'm here to guide you
              every step of the way.
            </p>

            <a
              href="#contact"
              style={{
                display: 'inline-block',
                marginTop: '24px',
                padding: '12px 32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              className="hover:scale-105 hover:shadow-lg"
            >
              Let's Connect
            </a>
          </div>

          {/* Features */}
          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div className="feature-text">
                <div className="feature-title">Client-Focused Service</div>
                <div className="feature-desc">
                  Your needs and goals drive every decision I make
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="feature-text">
                <div className="feature-title">Proven Track Record</div>
                <div className="feature-desc">
                  500+ successful transactions with 98% satisfaction rate
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="feature-text">
                <div className="feature-title">Expert Market Knowledge</div>
                <div className="feature-desc">
                  Deep insights into market trends and investment opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div
          style={{
            marginTop: '80px',
            paddingTop: '80px',
            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#e2e8f0',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            Services I Provide
          </h3>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <div className="service-title">Home Buying</div>
              <div className="service-desc">
                Find your perfect home with expert guidance and negotiation
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <div className="service-title">Property Selling</div>
              <div className="service-desc">
                Maximize your property's value with strategic marketing
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div className="service-title">Investment Advisory</div>
              <div className="service-desc">
                Strategic insights for building your real estate portfolio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;