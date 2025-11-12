'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ListingsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

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
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const listings = [
    {
      id: 1,
      title: 'Modern Condo in Arlington',
      location: 'Arlington, VA',
      price: '$450,000',
      beds: 2,
      baths: 2,
      sqft: '1,200',
      image: '/house1.jpg',
      category: 'condo',
      priceRange: '400k-500k',
      features: ['Parking', 'Gym', 'Pool'],
      status: 'For Sale',
    },
    {
      id: 2,
      title: 'Luxury Townhouse in Bethesda',
      location: 'Bethesda, MD',
      price: '$725,000',
      beds: 3,
      baths: 3,
      sqft: '2,100',
      image: '/house2.jpg',
      category: 'townhouse',
      priceRange: '700k-800k',
      features: ['Garage', 'Deck', 'Updated Kitchen'],
      status: 'For Sale',
    },
    {
      id: 3,
      title: 'Spacious Single Family in Fairfax',
      location: 'Fairfax, VA',
      price: '$650,000',
      beds: 4,
      baths: 3,
      sqft: '2,800',
      image: '/house3.jpg',
      category: 'house',
      priceRange: '600k-700k',
      features: ['Backyard', 'Finished Basement', 'Garage'],
      status: 'For Sale',
    },
    {
      id: 4,
      title: 'Contemporary Condo in DC',
      location: 'Washington, DC',
      price: '$585,000',
      beds: 2,
      baths: 2,
      sqft: '1,400',
      image: '/house4.jpg',
      category: 'condo',
      priceRange: '500k-600k',
      features: ['Rooftop Terrace', 'Concierge', 'Gym'],
      status: 'For Sale',
    },
    {
      id: 5,
      title: 'Elegant Townhouse in Alexandria',
      location: 'Alexandria, VA',
      price: '$795,000',
      beds: 3,
      baths: 3,
      sqft: '2,300',
      image: '/house1.jpg',
      category: 'townhouse',
      priceRange: '700k-800k',
      features: ['Patio', 'Fireplace', 'Walk to Metro'],
      status: 'For Sale',
    },
    {
      id: 6,
      title: 'Beautiful Single Family in Rockville',
      location: 'Rockville, MD',
      price: '$850,000',
      beds: 5,
      baths: 4,
      sqft: '3,500',
      image: '/house2.jpg',
      category: 'house',
      priceRange: '800k+',
      features: ['Pool', 'Large Lot', 'Gourmet Kitchen'],
      status: 'For Sale',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Properties', icon: '🏘️' },
    { id: 'condo', name: 'Condos', icon: '🏢' },
    { id: 'townhouse', name: 'Townhouses', icon: '🏘️' },
    { id: 'house', name: 'Single Family', icon: '🏡' },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '400k-500k', name: '$400K - $500K' },
    { id: '500k-600k', name: '$500K - $600K' },
    { id: '600k-700k', name: '$600K - $700K' },
    { id: '700k-800k', name: '$700K - $800K' },
    { id: '800k+', name: '$800K+' },
  ];

  const filteredListings = listings.filter((listing) => {
    const categoryMatch = selectedCategory === 'all' || listing.category === selectedCategory;
    const priceMatch = selectedPriceRange === 'all' || listing.priceRange === selectedPriceRange;
    return categoryMatch && priceMatch;
  });

  return (
    <section
      id="listings"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #1a2332 25%, #0f1729 50%, #1e2a3f 75%, #0a0f1e 100%)',
        color: 'white',
        padding: '120px 32px 100px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .listings-container {
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

        .filters-section {
          display: flex;
          gap: 24px;
          margin-bottom: 60px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-button {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
          border: 2px solid rgba(59, 130, 246, 0.2);
          color: rgba(203, 213, 225, 0.9);
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-button:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1));
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .filter-button.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-color: #3b82f6;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .listing-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.04));
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          cursor: pointer;
        }

        .listing-card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.2);
        }

        .listing-image-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }

        .listing-image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 15, 30, 0.8) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .listing-card:hover .listing-image-wrapper::after {
          opacity: 1;
        }

        .listing-status {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .listing-content {
          padding: 24px;
        }

        .listing-price {
          font-size: 28px;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .listing-title {
          font-size: 20px;
          font-weight: 700;
          color: rgba(226, 232, 240, 0.95);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .listing-location {
          font-size: 14px;
          color: rgba(148, 163, 184, 0.8);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .listing-specs {
          display: flex;
          gap: 20px;
          padding: 16px 0;
          border-top: 1px solid rgba(59, 130, 246, 0.1);
          border-bottom: 1px solid rgba(59, 130, 246, 0.1);
          margin-bottom: 16px;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: rgba(203, 213, 225, 0.8);
          font-weight: 500;
        }

        .listing-features {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .feature-tag {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          color: rgba(96, 165, 250, 0.9);
          font-weight: 600;
        }

        .results-count {
          text-align: center;
          font-size: 16px;
          color: rgba(148, 163, 184, 0.8);
          margin-top: 40px;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .listings-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }

          .filters-section {
            flex-direction: column;
          }

          .filter-group {
            justify-content: center;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
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
            bottom: '15%',
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
        className="listings-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
            Featured Listings
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Dream Home
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Browse our exclusive collection of properties in the DMV area
          </motion.p>
          <motion.div
            className="section-divider"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Filters */}
        <motion.div className="filters-section" variants={itemVariants}>
          <div className="filter-group">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          <div className="filter-group">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                className={`filter-button ${selectedPriceRange === range.id ? 'active' : ''}`}
                onClick={() => setSelectedPriceRange(range.id)}
              >
                {range.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Listings Grid */}
        <motion.div className="listings-grid" variants={containerVariants}>
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              className="listing-card"
              variants={itemVariants}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <div className="listing-image-wrapper">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="listing-status">{listing.status}</div>
              </div>

              <div className="listing-content">
                <div className="listing-price">{listing.price}</div>
                <h3 className="listing-title">{listing.title}</h3>
                <div className="listing-location">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {listing.location}
                </div>

                <div className="listing-specs">
                  <div className="spec-item">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12H7v-2h5v2zm5-4H7V8h10v2z"/>
                    </svg>
                    {listing.beds} beds
                  </div>
                  <div className="spec-item">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 2v2H7v2h10V4h-2V2h2v8h2V2h-2zm-2 8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2H7z"/>
                    </svg>
                    {listing.baths} baths
                  </div>
                  <div className="spec-item">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H5V4h14v14z"/>
                    </svg>
                    {listing.sqft} sqft
                  </div>
                </div>

                <div className="listing-features">
                  {listing.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredListings.length === 0 && (
          <motion.p
            className="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No properties found matching your criteria. Try adjusting your filters.
          </motion.p>
        )}

        {filteredListings.length > 0 && (
          <motion.p
            className="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Showing {filteredListings.length} of {listings.length} properties
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};

export default ListingsPage;