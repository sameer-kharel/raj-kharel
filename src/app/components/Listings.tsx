'use client';

import React from 'react';

const listings = [
  {
    id: 1,
    title: 'Modern Downtown Loft',
    description: 'Stunning modern apartment with high ceilings, floor-to-ceiling windows, and premium finishes in the heart of downtown.',
    price: '$1,250,000',
    beds: 3,
    baths: 2,
    sqft: '2,400',
    image: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  },
  {
    id: 2,
    title: 'Suburban Family Estate',
    description: 'Spacious family home with a large backyard, modern updates, excellent schools, and a peaceful neighborhood setting.',
    price: '$850,000',
    beds: 4,
    baths: 3,
    sqft: '3,500',
    image: 'linear-gradient(135deg, #2563eb, #1e40af)',
  },
  {
    id: 3,
    title: 'Luxury Penthouse Suite',
    description: 'Ultra-luxury penthouse with panoramic city views, high-end smart home features, and exclusive amenities.',
    price: '$2,750,000',
    beds: 4,
    baths: 4,
    sqft: '4,200',
    image: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
  },
  {
    id: 4,
    title: 'Waterfront Villa',
    description: 'Exquisite waterfront property with private beach access, infinity pool, and breathtaking ocean views.',
    price: '$3,200,000',
    beds: 5,
    baths: 4,
    sqft: '5,100',
    image: 'linear-gradient(135deg, #3b82f6, #1e40af)',
  },
  {
    id: 5,
    title: 'Historic Townhouse',
    description: 'Charming historic townhouse featuring original architecture, modern renovations, and prime location near restaurants and shops.',
    price: '$1,450,000',
    beds: 3,
    baths: 2,
    sqft: '2,800',
    image: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
  },
  {
    id: 6,
    title: 'Contemporary Minimalist Home',
    description: 'Stunning contemporary home with open floor plan, smart home automation, and eco-friendly sustainable features.',
    price: '$1,650,000',
    beds: 4,
    baths: 3,
    sqft: '3,200',
    image: 'linear-gradient(135deg, #1e40af, #0f172a)',
  },
];

const Listings = () => {
  return (
    <section
      id="listings"
      style={{
        padding: '96px 24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 41, 59, 0.3) 100%)',
        borderTop: '1px solid rgba(59, 130, 246, 0.1)',
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

        .listings-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .listings-title {
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

        .listings-subtitle {
          text-align: center;
          color: #94a3b8;
          margin-bottom: 64px;
          font-size: 16px;
          animation: fadeInUp 0.8s ease-out 0.1s both;
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .listing-card {
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(30, 64, 175, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.15);
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s ease-out;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .listing-card:nth-child(1) {
          animation-delay: 0s;
        }

        .listing-card:nth-child(2) {
          animation-delay: 0.1s;
        }

        .listing-card:nth-child(3) {
          animation-delay: 0.2s;
        }

        .listing-card:nth-child(4) {
          animation-delay: 0.3s;
        }

        .listing-card:nth-child(5) {
          animation-delay: 0.4s;
        }

        .listing-card:nth-child(6) {
          animation-delay: 0.5s;
        }

        .listing-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%);
          box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.3);
        }

        .listing-image {
          width: 100%;
          height: 240px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }

        .listing-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%);
        }

        .listing-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .listing-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .listing-title {
          font-size: 18px;
          font-weight: 700;
          color: #e2e8f0;
          margin: 0;
        }

        .listing-description {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
        }

        .listing-features {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          padding: 16px 0;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .feature {
          text-align: center;
        }

        .feature-value {
          font-size: 18px;
          font-weight: 700;
          color: #60a5fa;
        }

        .feature-label {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }

        .listing-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .listing-price {
          font-size: 20px;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .listing-button {
          padding: 10px 20px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }

        .listing-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .listings-cta {
          text-align: center;
          margin-top: 64px;
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .listings-cta a {
          padding: 16px 48px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px -3px rgba(59, 130, 246, 0.3);
        }

        .listings-cta a:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 15px 35px -3px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
      `}</style>

      <div className="listings-container">
        <h2 className="listings-title">Featured Properties</h2>
        <p className="listings-subtitle">
          Explore carefully curated premium real estate opportunities
        </p>

        <div className="listings-grid">
          {listings.map((listing, index) => (
            <div key={listing.id} className="listing-card">
              <div
                className="listing-image"
                style={{ background: listing.image }}
              >
                <div className="listing-tag">
                  {index < 3 ? 'Featured' : 'Available'}
                </div>
              </div>

              <div className="listing-content">
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-description">{listing.description}</p>

                <div className="listing-features">
                  <div className="feature">
                    <div className="feature-value">{listing.beds}</div>
                    <div className="feature-label">Bedrooms</div>
                  </div>
                  <div className="feature">
                    <div className="feature-value">{listing.baths}</div>
                    <div className="feature-label">Bathrooms</div>
                  </div>
                  <div className="feature">
                    <div className="feature-value">{listing.sqft}</div>
                    <div className="feature-label">Sq Ft</div>
                  </div>
                </div>

                <div className="listing-footer">
                  <div className="listing-price">{listing.price}</div>
                  <a href="#contact" className="listing-button">
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="listings-cta">
          <a href="#contact">View All Properties →</a>
        </div>
      </div>
    </section>
  );
};

export default Listings;