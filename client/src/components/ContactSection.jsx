import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { clinicConfig } from '../config/clinicConfig';

const ContactSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-8">
                Reach out to us for appointments or any queries. We are here to help you on your health journey.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p className="text-gray-600">{clinicConfig.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91 {clinicConfig.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600">{clinicConfig.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4 text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Timings</h4>
                    <p className="text-gray-600">{clinicConfig.timings}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={`tel:+91${clinicConfig.phone}`} className="btn-primary">CALL NOW</a>
                <a href={`https://wa.me/${clinicConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">WHATSAPP</a>
              </div>
            </div>
            
            <div className="bg-gray-200 h-64 md:h-auto">
               <iframe
                title="Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115049.23192231267!2d83.90566373797621!3d25.568390772241697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992764b85555555%3A0xc319dc25785f76b!2sBuxar%2C%20Bihar!5e0!3m2!1sen!2sin!4v1709214736184!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
