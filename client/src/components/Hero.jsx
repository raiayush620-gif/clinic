import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clinicConfig } from '../config/clinicConfig';
import doctorImg from '../assets/doctor.jpg';

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="inline-block bg-white text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm border border-secondary">
              {clinicConfig.experience}
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Natural Healing.<br />
              <span className="text-primary">Personal Care.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Compassionate and personalized homeopathic consultation focused on your individual health and well-being.
            </p>
            
            <div className="space-y-3 mb-8">
              {[
                '20+ Years of Clinical Experience',
                'Personalized Consultation',
                'Patient-Focused Care'
              ].map((point, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-appointment" className="btn-primary text-center">
                BOOK APPOINTMENT
              </Link>
              <a href={`tel:+91${clinicConfig.phone}`} className="btn-secondary text-center">
                CALL NOW
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <div className="absolute inset-0 bg-primary opacity-10"></div>
              <img 
                src={doctorImg} 
                alt={clinicConfig.doctorName} 
                className="w-full h-auto object-cover object-top aspect-[4/5] sm:aspect-[3/4] md:aspect-square"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-heading font-bold text-xl">{clinicConfig.doctorName}</p>
                <p className="text-accent text-sm">{clinicConfig.qualification}</p>
              </div>
            </div>
            
            <div className="absolute -z-10 top-1/2 right-[-10%] w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -z-10 top-[-10%] left-[-10%] w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
