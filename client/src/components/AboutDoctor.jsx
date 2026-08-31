import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import doctorImg from '../assets/doctor.jpg';

const AboutDoctor = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          
          <div className="w-full md:w-2/5">
            <img 
              src={doctorImg} 
              alt={clinicConfig.doctorName} 
              className="w-full h-auto rounded-2xl shadow-md border-4 border-white object-cover aspect-square"
            />
          </div>
          
          <div className="w-full md:w-3/5">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Meet Your Doctor
            </h2>
            <div className="w-16 h-1 bg-accent mb-6"></div>
            
            <h3 className="text-2xl font-bold text-primary mb-1">
              {clinicConfig.doctorName}
            </h3>
            <p className="text-gray-600 font-semibold mb-4">
              {clinicConfig.qualification} <br/>
              <span className="text-sm font-normal text-gray-500">{clinicConfig.qualificationFull}</span>
            </p>
            
            <div className="inline-block bg-secondary/20 text-primary px-3 py-1 rounded-md text-sm font-medium mb-6">
              {clinicConfig.experience}
            </div>
            
            <p className="text-gray-700 leading-relaxed italic border-l-4 border-accent pl-4">
              "With over two decades of clinical experience, Dr. Anoop Kumar Rai is committed to providing attentive and personalized homeopathic consultations. Every patient is approached with care, understanding, and an individual-focused approach to health and well-being."
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;
