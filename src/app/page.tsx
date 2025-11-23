
import Hero from '././hero/page';
import About from './about/page';
import Reviews from './reviews/page';
import Properties from './properties/page';
import ListingsPage from './listings/page';
import Contact from './contact/page'
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Reviews />
      <ListingsPage />
      <Properties />
      <Contact />
      <Footer />
    </main>
  );
}
