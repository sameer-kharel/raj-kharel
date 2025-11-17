'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Listing {
  _id: string;
  title: string;
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

  if (loading) {
    return <div className="text-center py-20 bg-[#0a0a23] text-white">Loading Available Properties...</div>;
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
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Find Your Dream Home</h1>
            <p className="mt-4 text-lg text-gray-400">Browse our exclusive collection of properties in the DMV area</p>
            <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {listings.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {listings.map((listing) => (
                <motion.div
                  key={listing._id}
                  className="bg-[#1c1c3a] rounded-2xl overflow-hidden border border-blue-900/50 group flex flex-col"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="relative w-full h-56">
                    {/* This code is correct. It requires a valid featuredImage URL from the database. */}
                    {listing.featuredImage && (
                      <Image 
                        src={listing.featuredImage} 
                        alt={listing.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white bg-blue-600/80 backdrop-blur-sm rounded-full">
                      FOR SALE
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      ${listing.price.toLocaleString()}
                    </div>
                    <h3 className="text-xl font-bold truncate text-white">{listing.title}</h3>
                    <p className="text-sm text-gray-400 truncate mb-4">
                      {listing.address}
                    </p>
                    <div className="mt-auto pt-4 border-t border-blue-900/50 flex justify-between items-center text-sm text-gray-300">
                      <span>{listing.bedrooms} Beds</span>
                      <span>{listing.bathrooms} Baths</span>
                      <span>{listing.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-[#1c1c3a] rounded-2xl">
              <p className="text-gray-400">No available listings at the moment. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}