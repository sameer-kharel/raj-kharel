import { motion } from 'framer-motion';
import { ReviewCard } from '../components/review';

const reviews = [
  {
    name: 'Saurav Devkota',
    reviewCount: '5 reviews',
    rating: 5,
    time: '4 weeks ago',
    text: 'Raj went above and beyond — showing me multiple home options across Northern Virginia and even helping explore vacation home possibilities. His professionalism, patience, and genuine care made the entire experience smooth and enjoyable. Highly recommend Raj to anyone looking for a dedicated, knowledgeable realtor!',
  },
  {
    name: 'leeban abdillahi',
    reviewCount: '3 reviews',
    rating: 5,
    time: '4 weeks ago',
    text: 'Great Realtor, very knowledgeable. Helped my family get situated in our dream home and Raj made the process go smoothly. Definitely recommend for anyone looking in the DMV area.',
  },
  {
    name: 'Abhinav Joshi',
    reviewCount: '3 reviews',
    rating: 5,
    time: '4 weeks ago',
    text: 'Raj was very helpful when I was looking to buy a property. He has good market knowledge and will negotiate with the sellers for you. I highly recommend working with him!',
  },
  {
    name: 'Suson Sapkota',
    reviewCount: '1 review',
    rating: 5,
    time: '4 weeks ago',
    text: 'Exceptional realtor for anyone looking for new home!',
  },
];

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
              Trusted by Homeowners
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear directly from clients who found their dream homes with me.
            </p>
            <div className="mt-6 w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
