import React from 'react';
import { Leaf, Wind, Activity, Heart, Smile, Sparkles, Sun, Shield } from 'lucide-react';

const Services = () => {
  const areasOfCare = [
    { title: "Skin & Hair Concerns", icon: <Sparkles className="w-8 h-8 text-primary" /> },
    { title: "Allergies & Seasonal Concerns", icon: <Wind className="w-8 h-8 text-primary" /> },
    { title: "Digestive Concerns", icon: <Activity className="w-8 h-8 text-primary" /> },
    { title: "Headache & Migraine Support", icon: <Sun className="w-8 h-8 text-primary" /> },
    { title: "Joint & General Wellness", icon: <Shield className="w-8 h-8 text-primary" /> },
    { title: "Women's Wellness", icon: <Heart className="w-8 h-8 text-primary" /> },
    { title: "Children's Wellness", icon: <Smile className="w-8 h-8 text-primary" /> },
    { title: "Lifestyle & General Health", icon: <Leaf className="w-8 h-8 text-primary" /> },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Areas of Care</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Personalized consultation for individual health concerns. We focus on holistic well-being and natural approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areasOfCare.map((area, index) => (
            <div key={index} className="bg-background p-6 rounded-2xl hover:bg-secondary/10 transition-colors border border-gray-100 shadow-sm flex flex-col items-center text-center group cursor-pointer">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                {area.icon}
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg">{area.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
