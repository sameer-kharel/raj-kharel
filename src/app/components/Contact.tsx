import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Contact Me
        </h2>
        <div className="max-w-2xl mx-auto">
          <form className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
          <div className="text-center mt-12">
            <p className="text-lg mb-4">Or reach out to me directly:</p>
            <p className="text-lg font-bold">Email: raj@gmail.com</p>
            <p className="text-lg font-bold">Phone: +1 23456789</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;