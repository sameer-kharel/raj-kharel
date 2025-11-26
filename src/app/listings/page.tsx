'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Listing {
  _id: string;
  title: string;
  featuredImage: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description?: string; // Optional since API might not always return it
  features?: string[]; // Optional array of features
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('San Jose, CA');
  const [propertyType, setPropertyType] = useState('Apartments');
  const [priceRange, setPriceRange] = useState('$2,000–$13,000');
  const [bedrooms, setBedrooms] = useState('3–5');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings');
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        }
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
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
        Loading Available Properties...
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
          margin-bottom: 40px;
          letter-spacing: -0.5px;
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
          color: #1e293b;
          margin-bottom: 16px;
        }

        .split-options-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s;
        }

        .split-options-btn:hover {
          background: white;
          border-color: #cbd5e1;
        }

        .agent-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .agent-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .agent-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }

        .agent-name {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
        }

        .agent-label {
          font-size: 12px;
          color: #94a3b8;
        }

        .contact-btn {
          padding: 10px 24px;
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s;
        }

        .contact-btn:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .request-tour-btn2 {
          width: 100%;
          padding: 16px;
          background: #00358aff;
          color: white;
          border: none;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .request-tour-btn2:hover {
          background: #00214eff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(30, 41, 59, 0.3);
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

        .bookmark-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: white;
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
          z-index: 10;
        }

        .bookmark-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .filter-bar {
          background: white;
          border-radius: 20px;
          padding: 20px 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #f8fafc;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
        }

        .filter-item:hover {
          background: white;
          border-color: #e2e8f0;
        }

        .filter-icon {
          font-size: 18px;
        }

        .filter-label {
          font-size: 12px;
          color: #94a3b8;
          display: block;
        }

        .filter-value {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .search-btn {
          margin-left: auto;
          padding: 12px 32px;
          background: #1e293b;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .search-btn:hover {
          background: #334155;
          transform: translateY(-2px);
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

        .view-all-btn {
          padding: 10px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .view-all-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
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

        .property-description{
          color: #64748b;
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

        .listing-content {
          padding: 20px;
        }

        .listing-price {
          font-size: 24px;
          font-weight: 900;
          color: #1e293b;
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
          margin-bottom: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

          .filter-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-btn {
            margin-left: 0;
            width: 100%;
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

          .filter-bar {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .search-btn {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .featured-image-container {
            height: 300px;
          }

          .featured-info-card {
            padding: 24px;
          }

          .filter-bar {
            grid-template-columns: 1fr;
          }

          .filter-item {
            padding: 14px 18px;
          }
        }

        @media (max-width: 480px) {
          .featured-info-card {
            padding: 20px;
          }

          .property-price {
            font-size: 24px;
          }

          .filter-bar {
            padding: 16px 20px;
          }

          .search-btn {
            padding: 14px 28px;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Page Title */}
        <h1 className="page-title">Real estate for living and investments</h1>

        {/* Featured Property - Two Separate Cards */}
        {listings.length > 0 && (
          <div className="featured-card">
            {/* Image Card */}
            <motion.div
              className="featured-image-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="featured-image-container">
                {listings[0].featuredImage && (
                  <img
                    src={listings[0].featuredImage}
                    alt={listings[0].title}
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <button className="bookmark-btn" aria-label="Bookmark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
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
                  {listings[0].address}
                </div>

                <div className="property-stats">
                  <div className="stat-item">
                    <span className="stat-value">{listings[0].bedrooms}</span>
                    <span className="stat-label">beds</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{listings[0].bathrooms}</span>
                    <span className="stat-label">baths</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{listings[0].sqft.toLocaleString()}</span>
                    <span className="stat-label">sqft</span>
                  </div>
                </div>

                <div className="property-price">
                  ${listings[0].price.toLocaleString()}
                </div>

                {listings[0].description ? (
                  <div className="property-description">{listings[0].description}</div>
                ) : (
                  <div className="property-description">{listings[0].title}</div>
                )}

              </div>

              <Link href="/contact" className="contact-property-btn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Schedule a Tour
              </Link>
            </motion.div>
          </div>
        )}

        {/* Filter Bar */}
        <motion.div
          className="filter-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="filter-item">
            <div>
              <span className="filter-label">Location</span>
              <div className="filter-value">{location}</div>
            </div>
          </div>

          <div className="filter-item">
            <div>
              <span className="filter-label">Property type</span>
              <div className="filter-value">{propertyType}</div>
            </div>
          </div>

          <div className="filter-item">
            <div>
              <span className="filter-label">Price</span>
              <div className="filter-value">{priceRange}</div>
            </div>
          </div>

          <div className="filter-item">
            <div>
              <span className="filter-label">Bedrooms</span>
              <div className="filter-value">{bedrooms}</div>
            </div>
          </div>


        </motion.div>

        {/* Latest Listings Section */}
        <div className="section-header">
          <h2 className="section-title">Latest in your area</h2>
          <button className="view-all-btn">
            View all →
          </button>
        </div>

        {/* Listings Grid */}
        {listings.length > 1 ? (
          <motion.div
            className="listings-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {listings.slice(1).map((listing) => (
              <motion.div
                key={listing._id}
                className="listing-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="listing-image">
                  {listing.featuredImage && (
                    <Image
                      src={listing.featuredImage}
                      alt={listing.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div className="listing-content">
                  <div className="listing-price">
                    ${listing.price.toLocaleString()}
                  </div>
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-address">{listing.address}</p>

                  <div className="listing-features">
                    <span className="feature-item">{listing.bedrooms} beds</span>
                    <span className="feature-item">{listing.bathrooms} baths</span>
                    <span className="feature-item">{listing.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : listings.length === 1 ? (
          <div className="no-listings">
            <p className="no-listings-text">More properties coming soon!</p>
          </div>
        ) : (
          <div className="no-listings">
            <p className="no-listings-text">No available listings at the moment. Please check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}