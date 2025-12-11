'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SoldProperty {
  _id: string;
  title: string;
  featuredImage: string;
  address: string;
  price: number;
  soldPrice?: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  representation?: string;
  description?: string;
  features?: string[];
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<SoldProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const res = await fetch('/api/sold-properties');
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error('Failed to fetch sold properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoldProperties();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e8f0f7 100%)',
        fontSize: '18px',
        color: '#64748b'
      }}>
        Loading Recent Transactions...
      </div>
    );
  }

  return (
    <section style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #e8f0f7 50%, #f1f5f9 100%)',
      minHeight: '100vh',
      padding: '120px 24px 60px',
      position: 'relative'
    }}>
      <style>{`
        .page-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 40px;
        }

        .featured-card {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 28px;
          margin-bottom: 48px;
        }

        .featured-image-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(59, 130, 246, 0.1);
          position: relative;
        }

        .featured-image-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(59, 130, 246, 0.15);
        }

        .featured-image-container {
          position: relative;
          height: 400px;
          overflow: hidden;
        }

        .featured-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .featured-image-card:hover .featured-image-container img {
          transform: scale(1.05);
        }

        .sold-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 8px 20px;
          background: #10b981;
          color: white;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .featured-info-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(59, 130, 246, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .featured-info-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(59, 130, 246, 0.15);
        }

        .property-address {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .property-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 24px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 900;
          color: #1e293b;
          display: block;
        }

        .stat-label {
          font-size: 13px;
          color: #64748b;
          text-transform: lowercase;
          margin-top: 4px;
        }

        .property-price {
          font-size: 36px;
          font-weight: 900;
          color: #10b981;
          margin-bottom: 8px;
        }

        .original-price {
          font-size: 18px;
          color: #94a3b8;
          text-decoration: line-through;
          margin-bottom: 16px;
        }

        .representation-badge {
          display: inline-block;
          padding: 6px 14px;
          background: #f1f5f9;
          border-radius: 16px;
          font-size: 12px;
          color: #475569;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .property-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .contact-property-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
        }

        .contact-property-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(59, 130, 246, 0.4);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .listing-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 1px solid rgba(59, 130, 246, 0.05);
        }

        .listing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.12);
        }

        .listing-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .listing-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .listing-card:hover .listing-image img {
          transform: scale(1.08);
        }

        .small-sold-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 14px;
          background: #10b981;
          color: white;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .listing-content {
          padding: 20px;
        }

        .listing-price {
          font-size: 24px;
          font-weight: 900;
          color: #10b981;
          margin-bottom: 4px;
        }

        .listing-original-price {
          font-size: 14px;
          color: #94a3b8;
          text-decoration: line-through;
          margin-bottom: 8px;
        }

        .listing-title {
          font-size: 16px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listing-address {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listing-representation {
          display: inline-block;
          padding: 4px 10px;
          background: #f1f5f9;
          border-radius: 12px;
          font-size: 11px;
          color: #475569;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .listing-features {
          display: flex;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .feature-item {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .no-listings {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .no-listings-text {
          font-size: 16px;
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .featured-card {
            grid-template-columns: 1fr;
          }

          .featured-image-container {
            height: 350px;
          }
        }

        @media (max-width: 768px) {
          .property-stats {
            gap: 20px;
          }

          .stat-value {
            font-size: 24px;
          }

          .property-price {
            font-size: 28px;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .featured-image-container {
            height: 300px;
          }

          .featured-info-card {
            padding: 24px;
          }

          .property-stats {
            gap: 16px;
          }

          .stat-value {
            font-size: 20px;
          }

          .stat-label {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .featured-info-card {
            padding: 20px;
          }

          .property-price {
            font-size: 24px;
          }

          .listing-card {
            border-radius: 16px;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Page Title */}
        <h1 className="page-title">Recent Transactions</h1>
        <p className="page-subtitle">A showcase of my successfully closed deals</p>

        {/* Featured Sold Property */}
        {properties.length > 0 && (
          <div className="featured-card">
            {/* Image Card */}
            <motion.div
              className="featured-image-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="featured-image-container">
                {properties[0].featuredImage && (
                  <img
                    src={properties[0].featuredImage}
                    alt={properties[0].title}
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className="sold-badge">SOLD</div>
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              className="featured-info-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <div className="property-address">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {properties[0].address}
                </div>

                <div className="property-stats">
                  <div className="stat-item">
                    <span className="stat-value">{properties[0].bedrooms}</span>
                    <span className="stat-label">beds</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{properties[0].bathrooms}</span>
                    <span className="stat-label">baths</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{properties[0].sqft.toLocaleString()}</span>
                    <span className="stat-label">sqft</span>
                  </div>
                </div>

                <div className="property-price">
                  ${(properties[0].soldPrice || properties[0].price).toLocaleString()}
                </div>
                {properties[0].soldPrice && properties[0].soldPrice !== properties[0].price && (
                  <div className="original-price">
                    Original: ${properties[0].price.toLocaleString()}
                  </div>
                )}

                {properties[0].representation && (
                  <div className="representation-badge">
                    {properties[0].representation}
                  </div>
                )}

                {properties[0].description ? (
                  <div className="property-description">{properties[0].description}</div>
                ) : (
                  <div className="property-description">{properties[0].title}</div>
                )}
              </div>


            </motion.div>
          </div>
        )}

        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">More Recent Sales</h2>
        </div>

        {/* Properties Grid */}
        {properties.length > 1 ? (
          <motion.div
            className="listings-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {properties.slice(1).map((property) => (
              <motion.div
                key={property._id}
                className="listing-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="listing-image">
                  {property.featuredImage && (
                    <Image
                      src={property.featuredImage}
                      alt={property.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <div className="small-sold-badge">SOLD</div>
                </div>

                <div className="listing-content">
                  <div className="listing-price">
                    ${(property.soldPrice || property.price).toLocaleString()}
                  </div>
                  {property.soldPrice && property.soldPrice !== property.price && (
                    <div className="listing-original-price">
                      Original: ${property.price.toLocaleString()}
                    </div>
                  )}
                  <h3 className="listing-title">{property.title}</h3>
                  <p className="listing-address">{property.address}</p>

                  {property.representation && (
                    <div className="listing-representation">
                      {property.representation}
                    </div>
                  )}

                  {property.description && (
                    <div className="property-description" style={{ fontSize: '13px', marginBottom: '12px', lineHeight: '1.5' }}>
                      {property.description}
                    </div>
                  )}

                  <div className="listing-features">
                    <span className="feature-item">{property.bedrooms} beds</span>
                    <span className="feature-item">{property.bathrooms} baths</span>
                    <span className="feature-item">{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : properties.length === 1 ? (
          <div className="no-listings">
            <p className="no-listings-text">More sold properties coming soon!</p>
          </div>
        ) : (
          <div className="no-listings">
            <p className="no-listings-text">No sold properties to display at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}