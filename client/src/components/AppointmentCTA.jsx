import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

const AppointmentCTA = () => {
  return (
    <section className="py-16 bg-[#1a4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Health Journey?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          Book a personalized consultation today and take the first step towards natural and holistic well-being.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/book-appointment" className="bg-accent text-[#1a4332] px-8 py-3 rounded-lg font-bold hover:bg-[#d4b47d] transition-colors w-full sm:w-auto">
            Book an Appointment
          </Link>
          <a href={`tel:+91${clinicConfig.phone}`} className="flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#1a4332] transition-colors w-full sm:w-auto font-bold">
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
