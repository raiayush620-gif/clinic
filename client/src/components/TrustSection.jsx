import React from 'react';
import { Award, Heart, UserCheck, CalendarCheck } from 'lucide-react';

const TrustSection = () => {
  const trusts = [
    {
      icon: <Award className="w-10 h-10 text-primary mb-4" />,
      title: "20+",
      subtitle: "Years of Experience"
    },
    {
      icon: <Heart className="w-10 h-10 text-primary mb-4" />,
      title: "Personalized",
      subtitle: "Homeopathic Consultation"
    },
    {
      icon: <UserCheck className="w-10 h-10 text-primary mb-4" />,
      title: "Patient-Focused",
      subtitle: "Individual Care"
    },
    {
      icon: <CalendarCheck className="w-10 h-10 text-primary mb-4" />,
      title: "Easy",
      subtitle: "Online Appointment Booking"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trusts.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {item.icon}
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
