import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto relative flex items-end bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all pr-12">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type your message here..."
          className="w-full max-h-32 bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-gray-800 text-[15px]"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="absolute right-2 bottom-2 p-2 rounded-xl bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500 hover:bg-[#1a4332] transition-colors"
        >
          <Send size={18} className={message.trim() && !disabled ? "translate-x-0.5 -translate-y-0.5 transition-transform" : ""} />
        </button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[11px] text-gray-400">
          AI Assistant can make mistakes. For personal medical advice, please consult Dr. Anoop Kumar Rai.
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
