import React, { useState, useEffect } from 'react';
import { chatApi } from '../services/chatApi';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';

const AIAssistant = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await chatApi.getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations', err);
    }
  };

  const loadConversation = async (id) => {
    try {
      const data = await chatApi.getConversationById(id);
      setCurrentConversationId(id);
      setMessages(data.messages || []);
      if (window.innerWidth < 768) {
        setIsMobileSidebarOpen(false);
      }
    } catch (err) {
      console.error('Failed to load conversation details', err);
      setError('Could not load chat history.');
    }
  };

  const handleNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setError('');
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleDeleteConversation = async (id) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      try {
        await chatApi.deleteConversation(id);
        if (currentConversationId === id) {
          handleNewChat();
        }
        fetchConversations();
      } catch (err) {
        console.error('Failed to delete conversation', err);
      }
    }
  };

  const handleSendMessage = async (text) => {
    const tempMessages = [...messages, { role: 'user', content: text }];
    setMessages(tempMessages);
    setIsLoading(true);
    setError('');

    try {
      const res = await chatApi.sendMessage(currentConversationId, text);
      if (res.success) {
        setMessages([...tempMessages, { role: 'assistant', content: res.message }]);
        if (!currentConversationId) {
          setCurrentConversationId(res.conversationId);
          fetchConversations(); // Refresh list to get new title
        }
      }
    } catch (err) {
      console.error('Send message error:', err);
      setError(err.response?.data?.message || 'Failed to get response from AI. Please try again.');
      // Keep user message, but remove typing indicator
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelect={loadConversation}
        onNewChat={handleNewChat}
        onDelete={handleDeleteConversation}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={handleSendMessage}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />
    </div>
  );
};

export default AIAssistant;
