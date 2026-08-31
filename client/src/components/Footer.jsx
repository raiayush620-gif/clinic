import React from 'react';
import { Link } from 'react-router-dom';
import { clinicConfig } from '../config/clinicConfig';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a4332] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-2xl font-bold text-accent mb-4">
              {clinicConfig.clinicName}
            </h3>
            <p className="text-gray-300 mb-4 max-w-sm">
              Compassionate and personalized homeopathic consultation focused on your individual health and well-being.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">About Doctor</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Areas of Care</Link></li>
              <li><Link to="/book-appointment" className="text-gray-300 hover:text-accent transition-colors">Book Appointment</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-accent shrink-0" size={20} />
                <span className="text-gray-300">{clinicConfig.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-accent shrink-0" size={20} />
                <a href={`tel:+${clinicConfig.phone}`} className="text-gray-300 hover:text-accent transition-colors">
                  +91 {clinicConfig.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-accent shrink-0" size={20} />
                <a href={`mailto:${clinicConfig.email}`} className="text-gray-300 hover:text-accent transition-colors">
                  {clinicConfig.email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="mr-3 text-accent shrink-0" size={20} />
                <span className="text-gray-300">{clinicConfig.timings}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#245b45] mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {clinicConfig.clinicName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
