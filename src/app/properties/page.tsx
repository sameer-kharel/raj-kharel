'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Properties = () => {
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

  const properties = [
    {
      id: 1,
      image: '/house1.jpg',
      address: '8302 Wallace Ln',
      status: 'Sold',
      representation: 'Represented Seller',
      price: '$510,000',
      beds: 4,
      baths: 3.5,
      sqft: '2,026',
      type: 'sold',
    },
    {
      id: 2,
      image: '/house2.jpg',
      address: '8645 Beck Ln',
      status: 'Sold',
      representation: 'Represented Buyer',
      price: '$695,000',
      beds: 4,
      baths: 3.5,
      sqft: '2,390',
      type: 'sold',
    },
    {
      id: 3,
      image: '/house3.jpg',
      address: '8645 Sudley Rd',
      status: 'Sold',
      representation: 'Represented Buyer',
      price: '$275,000',
      beds: 2,
      baths: 2,
      sqft: '1,248',
      type: 'sold',
    },
    {
      id: 4,
      image: '/house4.jpg',
      address: '14507 London Ln',
      status: 'Sold',
      representation: 'Represented Buyer',
      price: '$803,700',
      beds: 4,
      baths: 3.5,
      sqft: '3,040',
      type: 'sold',
    },
  ];

  return (
    <section
      id="properties"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0f1729 0%, #1a2332 50%, #0a0f1e 100%)',
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
          50% { transform: translateY(-15px); }
        }

        .properties-container {
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

        .section-divider {
          width: 80px;
          height: 5px;
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 30%, #1e40af 50%, #2563eb 70%, #3b82f6 100%);
          background-size: 200% auto;
          border-radius: 3px;
          margin: 24px 0 60px 0;
          animation: gradientShift 3s ease infinite;
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .property-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.4s ease;
          position: relative;
        }

        .property-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          background: linear-gradient(135deg, #3b82f6, #2563eb, #1e40af);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .property-card:hover::before {
          opacity: 0.3;
        }

        .property-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .property-image-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }

        .property-image-wrapper img {
          transition: transform 0.6s ease;
        }

        .property-card:hover .property-image-wrapper img {
          transform: scale(1.1);
        }

        .property-status {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .status-sold {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9));
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }

        .status-available {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .property-content {
          padding: 24px;
        }

        .property-address {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .property-representation {
          font-size: 13px;
          color: rgba(148, 163, 184, 0.9);
          margin-bottom: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .property-price {
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .property-details {
          display: flex;
          gap: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
        }

        .property-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-value {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .detail-label {
          font-size: 12px;
          color: rgba(148, 163, 184, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .stats-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 60px;
          padding: 40px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%);
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: rgba(148, 163, 184, 0.9);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .properties-grid {
            grid-template-columns: 1fr;
          }

          .stats-summary {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 24px;
          }

          .section-title {
            font-size: 36px;
          }

          .stat-number {
            font-size: 28px;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '-10%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="properties-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
            Portfolio
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Recent Transactions
          </motion.h2>
          <motion.div
            className="section-divider"
            style={{ margin: '24px auto 40px' }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Stats Summary */}
        <motion.div
          className="stats-summary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Closed Sales</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$2.3M</div>
            <div className="stat-label">Total Value</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$275K - $803.7K</div>
            <div className="stat-label">Price Range</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$570.9K</div>
            <div className="stat-label">Average Price</div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div className="properties-grid" variants={containerVariants}>
          {properties.map((property) => (
            <motion.div
              key={property.id}
              className="property-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="property-image-wrapper">
                <Image
                  src={property.image}
                  alt={property.address}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={`property-status ${property.type === 'sold' ? 'status-sold' : 'status-available'}`}>
                  {property.status}
                </div>
              </div>

              <div className="property-content">
                <h3 className="property-address">{property.address}</h3>
                <p className="property-representation">{property.representation}</p>
                <div className="property-price">{property.price}</div>

                <div className="property-details">
                  <div className="property-detail">
                    <span className="detail-value">{property.beds}</span>
                    <span className="detail-label">Beds</span>
                  </div>
                  <div className="property-detail">
                    <span className="detail-value">{property.baths}</span>
                    <span className="detail-label">Baths</span>
                  </div>
                  <div className="property-detail">
                    <span className="detail-value">{property.sqft}</span>
                    <span className="detail-label">Sq Ft</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Properties;