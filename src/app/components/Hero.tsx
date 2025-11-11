import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="hero" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Raj Kharel
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Your Trusted Real Estate Agent at IKON Realty
          </p>
          <a
            href="#contact"
            className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <Image
              src="/raj-kharel.jpg"
              alt="Raj Kharel"
              width={400}
              height={400}
              className="rounded-full shadow-2xl animate-float"
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-400 opacity-25 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;