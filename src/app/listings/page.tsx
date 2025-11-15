'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Listing {
  _id: string;
  featuredImage: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <div className="text-center py-20 bg-gray-900 text-white">Loading Available Properties...</div>;
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
          <h1 className="text-5xl font-extrabold tracking-tight">Available Properties</h1>
          <p className="mt-4 text-lg text-gray-400">Explore our exclusive collection of homes for sale.</p>
        </motion.div>

        {listings.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {listings.map((listing) => (
              <motion.div
                key={listing._id}
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 group"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="relative w-full h-64">
                  <Image src={listing.featuredImage} alt={listing.address} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold truncate">{listing.address}</h3>
                  <div className="text-3xl font-extrabold text-blue-400 my-4">
                    ${listing.price.toLocaleString()}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700 text-sm text-gray-300">
                    <span><span className="font-bold">{listing.bedrooms}</span> Beds</span>
                    <span><span className="font-bold">{listing.bathrooms}</span> Baths</span>
                    <span><span className="font-bold">{listing.sqft.toLocaleString()}</span> sqft</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-gray-800 rounded-2xl">
            <p className="text-gray-400">No available listings at the moment. Please check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}