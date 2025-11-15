'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SoldProperty {
  _id: string;
  featuredImage: string;
  address: string;
  representation?: string;
  soldPrice?: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <div className="text-center py-20 bg-gray-900 text-white">Loading Recent Transactions...</div>;
  }

  return (
    <section className="bg-gray-900 text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight">Recent Transactions</h1>
          <p className="mt-4 text-lg text-gray-400">A showcase of my successfully closed deals.</p>
        </motion.div>

        {properties.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {properties.map((property) => (
              <motion.div
                key={property._id}
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 group"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="relative w-full h-64">
                  <Image src={property.featuredImage} alt={property.address} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white bg-green-600/80 backdrop-blur-sm rounded-full">
                    SOLD
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold truncate">{property.address}</h3>
                  <p className="text-sm text-gray-400 mt-1">{property.representation || 'Buyer & Seller Representation'}</p>
                  <div className="text-3xl font-extrabold text-blue-400 my-4">
                    ${(property.soldPrice || property.price).toLocaleString()}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700 text-sm text-gray-300">
                    <span><span className="font-bold">{property.bedrooms}</span> Beds</span>
                    <span><span className="font-bold">{property.bathrooms}</span> Baths</span>
                    <span><span className="font-bold">{property.sqft.toLocaleString()}</span> sqft</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-gray-800 rounded-2xl">
            <p className="text-gray-400">No sold properties to display at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}