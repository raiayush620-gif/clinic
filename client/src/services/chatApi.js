import api from './api';

export const chatApi = {
  sendMessage: async (conversationId, message) => {
    const { data } = await api.post('/chat', { conversationId, message });
    return data;
  },
  
  getConversations: async () => {
    const { data } = await api.get('/chat/conversations');
    return data;
  },
  
  getConversationById: async (id) => {
    const { data } = await api.get(`/chat/conversations/${id}`);
    return data;
  },
  
  deleteConversation: async (id) => {
    const { data } = await api.delete(`/chat/conversations/${id}`);
    return data;
  },
  
  deleteAllConversations: async () => {
    const { data } = await api.delete('/chat/conversations');
    return data;
  }
};
