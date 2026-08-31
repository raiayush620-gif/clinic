import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      text: "I have been consulting Dr. Anoop Kumar Rai for a few months now. His personalized approach to my health concerns has been wonderful.",
      name: "Sample Patient Feedback"
    },
    {
      text: "The clinic environment is peaceful, and the doctor is very attentive. He takes the time to listen and understand.",
      name: "Sample Patient Feedback"
    },
    {
      text: "I highly appreciate the care and detailed consultation provided. Booking an appointment online was also very easy.",
      name: "Sample Patient Feedback"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Patient Reviews</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="text-accent text-4xl font-heading absolute top-4 left-4 opacity-30">"</div>
              <p className="text-gray-600 italic relative z-10 mb-6 pt-4">{review.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">Verified Patient</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
