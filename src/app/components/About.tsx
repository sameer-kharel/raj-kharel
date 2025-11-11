import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-lg text-gray-700">
              <p className="mb-6">
                I am a dedicated and passionate real estate agent at{" "}
                <span className="font-semibold text-blue-500">IKON Realty</span>.
                With years of experience in the industry, I have a proven track
                record of helping clients find their dream homes and make sound
                investment decisions.
              </p>
              <p className="mb-6">
                My mission is to provide my clients with the highest level of
                service and expertise. I am committed to understanding your
                unique needs and working tirelessly to achieve your real estate
                goals.
              </p>
              <p>
                Please feel free to reach out to me for connections, any real
                estate business questions or talks.
              </p>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 text-blue-500 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 2v-1m0 6v-1m0 2v-1"
                  />
                </svg>
                <p className="text-lg text-gray-700">
                  Expert in real estate investments
                </p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 text-blue-500 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 10h.01M15 10h.01M9 14h6"
                  />
                </svg>
                <p className="text-lg text-gray-700">Client-focused service</p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 text-blue-500 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p className="text-lg text-gray-700">Proven track record</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;