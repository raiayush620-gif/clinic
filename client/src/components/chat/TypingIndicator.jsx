import React from 'react';
import { Sparkles } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex w-full justify-start mb-6">
      <div className="flex max-w-[85%] sm:max-w-[75%] flex-row">
        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-sm bg-primary text-white mr-3">
          <Sparkles size={20} />
        </div>
        <div className="px-5 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm rounded-tl-none flex items-center h-[52px]">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
