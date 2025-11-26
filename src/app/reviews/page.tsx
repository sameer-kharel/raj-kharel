'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Saurav Devkota',
    rating: 5,
    text: 'Raj went above and beyond — showing me multiple home options across Northern Virginia and even helping explore vacation home possibilities. His professionalism, patience, and genuine care made the entire experience smooth and enjoyable. Highly recommend Raj to anyone looking for a dedicated, knowledgeable realtor!',
  },
  {
    name: 'leeban abdillahi',
    rating: 5,
    text: 'Great Realtor, very knowledgeable. Helped my family get situated in our dream home and Raj made the process go smoothly. Definitely recommend for anyone looking in the DMV area.',
  },
  {
    name: 'Abhinav Joshi',
    rating: 5,
    text: 'Raj was very helpful when I was looking to buy a property. He has good market knowledge and will negotiate with the sellers for you. I highly recommend working with him!',
  },
  {
    name: 'Suson Sapkota',
    rating: 5,
    text: 'Exceptional realtor for anyone looking for new home!',
  },
];

export default function ReviewsPage() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f5f5f5 100%)',
      padding: '100px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes gradient-slide {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reviews-section-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 48px;
          font-weight: 900;
          color: #1a1a1a;
          letter-spacing: -2px;
          margin: 0 0 16px 0;
          text-transform: uppercase;
        }

        .section-subtitle {
          font-size: 18px;
          color: #64748b;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .review-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 8px 30px rgba(66, 153, 225, 0.12);
          border: 2px solid rgba(66, 153, 225, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          animation: fade-in-up 0.8s ease-out;
        }

        .review-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #4299e1 0%, #3182ce 50%, #2b6cb0 100%);
          background-size: 200% auto;
          animation: gradient-slide 4s linear infinite;
        }

        .review-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 16px 50px rgba(66, 153, 225, 0.25);
          border-color: rgba(66, 153, 225, 0.4);
        }

        .quote-icon {
          font-size: 70px;
          color: rgba(66, 153, 225, 0.1);
          font-family: Georgia, serif;
          line-height: 1;
          margin-bottom: -25px;
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }

        .reviewer-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          color: white;
          box-shadow: 0 6px 20px rgba(66, 153, 225, 0.4);
          border: 4px solid white;
          flex-shrink: 0;
        }

        .reviewer-info {
          flex: 1;
        }

        .reviewer-name {
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .star-rating {
          display: flex;
          gap: 6px;
        }

        .star {
          color: #4299e1;
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(66, 153, 225, 0.3));
        }

        .review-text {
          font-size: 16px;
          line-height: 1.9;
          color: #4a5568;
          margin: 0;
          font-weight: 400;
          flex: 1;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float-gentle 10s ease-in-out infinite;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(66, 153, 225, 0.25) 0%, transparent 70%);
          top: -150px;
          right: -150px;
        }

        .shape-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(49, 130, 206, 0.2) 0%, transparent 70%);
          bottom: -120px;
          left: -120px;
          animation-delay: 3s;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(66, 153, 225, 0.15) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 6s;
        }

        @media (max-width: 1200px) {
          .reviews-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }

          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .review-card {
            padding: 32px;
          }

          .reviewer-avatar {
            width: 52px;
            height: 52px;
            font-size: 22px;
          }

          .reviewer-name {
            font-size: 18px;
          }

          .review-text {
            font-size: 15px;
          }
        }

        @media (max-width: 600px) {
          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .review-card {
            padding: 28px 24px;
          }

          .section-title {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .review-card {
            padding: 24px 20px;
          }

          .reviewer-avatar {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .quote-icon {
            font-size: 60px;
          }
        }
      `}</style>

      {/* Floating background shapes */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>

      <div className="reviews-section-container">
        <div className="section-header">
          <h2 className="section-title">What the buyer says</h2>
          <p className="section-subtitle">Trusted by Homeowners</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="quote-icon">"</div>
              <div className="review-header">
                <div className="reviewer-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="star-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
