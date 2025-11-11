import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tight">Raj Kharel</a>
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-lg hover:text-blue-400 transition-colors duration-300">About</a>
          <a href="#listings" className="text-lg hover:text-blue-400 transition-colors duration-300">Listings</a>
          <a href="#contact" className="text-lg hover:text-blue-400 transition-colors duration-300">Contact</a>
        </nav>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;