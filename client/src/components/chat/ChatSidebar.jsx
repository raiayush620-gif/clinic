import React from 'react';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';

const ChatSidebar = ({ conversations, currentConversationId, onSelect, onNewChat, onDelete, isMobileOpen, onCloseMobile }) => {
  return (
    <div className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-[#1a4332] text-white transition-transform duration-300 ease-in-out transform
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 flex flex-col h-full border-r border-[#1a4332]/20
    `}>
      <div className="p-4 border-b border-[#245B45]">
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="font-heading font-bold text-xl text-accent">AI Assistant</h2>
          <button onClick={onCloseMobile} className="text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-transparent border border-accent/50 text-accent hover:bg-accent hover:text-[#1a4332] py-2 px-4 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-xs font-semibold text-[#A8BFA8] uppercase tracking-wider mb-2 mt-4 px-2">
          Previous Conversations
        </div>
        {conversations.length === 0 ? (
          <div className="text-sm text-gray-400 px-2 py-4 italic">No previous chats</div>
        ) : (
          <ul className="space-y-1">
            {conversations.map((conv) => (
              <li key={conv._id} className="group relative">
                <button
                  onClick={() => onSelect(conv._id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors
                    ${currentConversationId === conv._id ? 'bg-[#245B45] text-white' : 'text-gray-300 hover:bg-[#245B45]/50'}`}
                >
                  <MessageSquare size={16} className="shrink-0 opacity-70" />
                  <span className="truncate pr-6">{conv.title}</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(conv._id); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-[#1a4332]"
                  title="Delete chat"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
