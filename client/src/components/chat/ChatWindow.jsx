import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';
import { Menu } from 'lucide-react';

const ChatWindow = ({ messages, isLoading, error, onSendMessage, onOpenMobileSidebar }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F7F5EF] relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h2 className="font-heading font-bold text-lg text-primary">AI Assistant</h2>
        <button onClick={onOpenMobileSidebar} className="p-2 text-gray-600 hover:text-primary rounded-md">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
        {messages.length === 0 ? (
          <SuggestedQuestions onSelectQuestion={onSendMessage} />
        ) : (
          <div className="max-w-4xl mx-auto pb-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} content={msg.content} />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            {error && (
              <div className="flex justify-center my-4">
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100 shadow-sm">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
