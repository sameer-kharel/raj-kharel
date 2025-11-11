import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Add social media icon paths here */}
            </svg>
          </a>
          {/* Repeat for other social media icons */}
        </div>
        <p className="text-gray-500">&copy; 2024 Raj Kharel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;