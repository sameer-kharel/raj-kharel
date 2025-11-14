
import Header from './components/Header';
import Hero from '././hero/page';
import About from './about/page';
import Properties from './properties/page';
import ListingsPage from './listings/page';
import Contact from './contact/page'
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Properties />
      <ListingsPage />
      <Contact />
      <Footer />
    </main>
  );
}
