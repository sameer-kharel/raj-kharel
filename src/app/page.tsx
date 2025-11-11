import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Listings from "./components/Listings";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Listings />
      <Contact />
      <Footer />
    </main>
  );
}
