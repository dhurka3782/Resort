import Navbar from '@/components/Navbar';
import ParallaxHero from '@/components/ParallaxHero';
import Villas from '@/components/Villas';
import Experiences from '@/components/Experiences';
import Dining from '@/components/Dining';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import ContactForm from '@/components/ContactForm';
import BookingWidget from '@/components/BookingWidget';
import ThemeToggle from '@/components/ThemeToggle';
import LiveChat from '@/components/LiveChat';
import ScrollProgress from '@/components/ScrollProgress';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ScrollProgress />
      <Navbar />
      <ParallaxHero />
      <Villas />
      <Experiences />
      <Dining />
      <Gallery />
      <Testimonials />
      <AvailabilityCalendar />
      <ContactForm />
      <BookingWidget />
      <ThemeToggle />
      <LiveChat />
      <Footer />
    </div>
  );
}
