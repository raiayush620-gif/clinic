import React from 'react';
import { MessageCircle } from 'lucide-react';

const SuggestedQuestions = ({ onSelectQuestion }) => {
  const questions = [
    "How can I book an appointment?",
    "What are the clinic timings?",
    "Where is the clinic located?",
    "What services are available?",
    "What is homeopathic consultation?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto p-4 animate-fade-in-up">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center w-full mb-8">
        <h2 className="text-2xl font-heading font-bold text-[#245B45] mb-2">AI Health & Clinic Assistant</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Ask questions about the clinic, appointments, general wellness, or homeopathic care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q)}
            className="flex items-center text-left p-4 bg-white border border-gray-100 rounded-xl hover:border-accent hover:shadow-sm transition-all text-sm text-gray-700 group"
          >
            <MessageCircle size={16} className="mr-3 text-accent group-hover:text-primary transition-colors shrink-0" />
            <span>{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
