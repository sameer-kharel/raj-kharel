'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SoldProperty {
  _id: string;
  title: string;
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

  if (loading) {
    return <div className="text-center py-20 bg-[#0a0a23] text-white">Loading Recent Transactions...</div>;
  }

  return (
    <div className="bg-[#0a0a23] text-white min-h-screen">
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Recent Transactions</h1>
            <p className="mt-4 text-lg text-gray-400">A showcase of my successfully closed deals.</p>
            <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {properties.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {properties.map((property) => (
                <motion.div
                  key={property._id}
                  className="bg-[#1c1c3a] rounded-2xl overflow-hidden border border-blue-900/50 group flex flex-col"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="relative w-full h-56">
                    <Image 
                      src={property.featuredImage} 
                      alt={property.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white bg-green-600/80 backdrop-blur-sm rounded-full">
                      SOLD
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold truncate text-white">{property.title}</h3>
                    <p className="text-sm text-gray-400 truncate mb-2">
                      {property.representation || 'Represented Buyer/Seller'}
                    </p>
                    <div className="text-3xl font-bold text-blue-400 my-2">
                      ${(property.soldPrice || property.price).toLocaleString()}
                    </div>
                    <div className="mt-auto pt-4 border-t border-blue-900/50 flex justify-between items-center text-sm text-gray-300">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-[#1c1c3a] rounded-2xl">
              <p className="text-gray-400">No sold properties to display at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}