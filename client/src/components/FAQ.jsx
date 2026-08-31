import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment easily through our website by creating an account and selecting 'Book Appointment'. Alternatively, you can call us or send a message on WhatsApp."
    },
    {
      question: "How will my appointment be confirmed?",
      answer: "Once you submit an appointment request, you will receive a pending status email. Our clinic will review the request and you will receive a confirmation email once it's approved."
    },
    {
      question: "What are the clinic timings?",
      answer: "The clinic is open from 10:00 AM to 8:00 PM. Please check the booking calendar for available time slots."
    },
    {
      question: "Can I book a follow-up consultation?",
      answer: "Yes, when booking an appointment, you can select 'Follow-up Consultation' as the consultation type."
    },
    {
      question: "What information is required for booking?",
      answer: "We require your full name, phone number, email address, and a brief description of your health concern."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden bg-background"
            >
              <button
                className="w-full flex justify-between items-center p-4 md:p-6 focus:outline-none text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="text-primary flex-shrink-0 ml-4" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-4 md:p-6 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
