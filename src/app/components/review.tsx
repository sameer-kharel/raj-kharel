import { motion } from 'framer-motion';

interface Review {
  name: string;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1] as const,
        delay: index * 0.15
      },
    },
  };

  return (
    <motion.div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: '#4a4a4a',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
            }}>
              {review.name.charAt(0)}
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#2a2a2a',
              letterSpacing: '-0.2px',
              margin: 0,
            }}>{review.name}</h3>
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < review.rating} />
            ))}
          </div>
        </div>
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#4a4a4a',
          fontWeight: 400,
          margin: 0,
        }}>{review.text}</p>
      </div>
    </motion.div>
  );
};
