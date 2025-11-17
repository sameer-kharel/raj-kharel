import { motion } from 'framer-motion';

interface Review {
  name: string;
  reviewCount: string;
  rating: number;
  time: string;
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
    className={`h-5 w-5 ${filled ? 'text-star-filled' : 'text-star-empty'}`}
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] as const,
        delay: index * 0.1 
      },
    },
  };

  return (
    <motion.div
      className="bg-review-card border border-review-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-primary/50"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-avatar flex items-center justify-center text-xl font-bold text-foreground">
          {review.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-foreground">{review.name}</h3>
              <p className="text-sm text-muted-foreground">{review.reviewCount}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.time}</p>
            </div>
          </div>
          <p className="mt-4 text-foreground/90 leading-relaxed">{review.text}</p>
        </div>
      </div>
    </motion.div>
  );
};
