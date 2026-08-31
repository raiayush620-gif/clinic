import React from 'react';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import AboutDoctor from '../components/AboutDoctor';
import Services from '../components/Services';
import AppointmentCTA from '../components/AppointmentCTA';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <Hero />
      <TrustSection />
      <AboutDoctor />
      <Services />
      <AppointmentCTA />
      <Gallery />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
};

export default Home;
