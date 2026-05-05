import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import NetworkCards from '../components/NetworkCards';
import Events from '../components/Events';
import Media from '../components/Media';
import TeamGrid from '../components/TeamGrid';
import Sponsors from '../components/Sponsors';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import MouseFollower from '../components/MouseFollower';

function HomePage() {
  return (
    <div className="app">
      <MouseFollower />
      <Navbar />
      <main>
        <Hero />
        {/* <Marquee /> */}
        <About />
        <NetworkCards />
        <Events />
        <Media />
        <Sponsors />
        <TeamGrid />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
