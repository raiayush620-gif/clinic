import React from 'react';
import ReactMarkdown from 'react-markdown';
import { clinicConfig } from '../../config/clinicConfig';
import { User, Sparkles } from 'lucide-react';

const ChatMessage = ({ role, content }) => {
  const isAi = role === 'assistant';

  return (
    <div className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-sm 
          ${isAi ? 'bg-primary text-white mr-3' : 'bg-accent text-[#1a4332] ml-3'}`}>
          {isAi ? <Sparkles size={20} /> : <User size={20} />}
        </div>
        
        {/* Message Bubble */}
        <div className={`px-5 py-4 rounded-2xl ${
          isAi 
            ? 'bg-white border border-gray-100 shadow-sm rounded-tl-none text-gray-800' 
            : 'bg-[#245B45] text-white rounded-tr-none shadow-sm'
        }`}>
          {isAi && content.toLowerCase().includes('hello! 👋') ? (
            // Special rendering for the initial welcome message to make it look nicer
            <div className="whitespace-pre-line text-[15px] leading-relaxed font-body">
              {content}
            </div>
          ) : (
            <div className={`prose prose-sm max-w-none font-body text-[15px] leading-relaxed ${isAi ? 'prose-p:text-gray-800' : 'prose-p:text-white prose-strong:text-white'}`}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
