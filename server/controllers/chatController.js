import Conversation from '../models/Conversation.js';
import { generateAIResponse } from '../utils/aiService.js';

export const sendMessage = async (req, res) => {
  const { conversationId, message } = req.body;
  
  if (!message || message.trim() === '') {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  const maxLength = parseInt(process.env.MAX_CHAT_MESSAGE_LENGTH || '4000', 10);
  if (message.length > maxLength) {
    return res.status(400).json({ message: `Message exceeds maximum length of ${maxLength} characters` });
  }

  try {
    let conversation;

    if (conversationId) {
      conversation = await Conversation.findOne({ _id: conversationId, user: req.user._id });
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
    } else {
      // Set title based on first message
      const title = message.length > 30 ? message.substring(0, 30) + '...' : message;
      conversation = new Conversation({
        user: req.user._id,
        title: title,
        messages: []
      });
    }

    // Add user message to history
    conversation.messages.push({ role: 'user', content: message.trim() });
    
    // Call AI Service
    // We send recent context to the AI (e.g., last 10 messages) to avoid token limits
    const recentMessages = conversation.messages.slice(-10);
    const aiResponseContent = await generateAIResponse(recentMessages);

    // Add AI response to history
    conversation.messages.push({ role: 'assistant', content: aiResponseContent });
    await conversation.save();

    res.json({
      success: true,
      conversationId: conversation._id,
      message: aiResponseContent
    });
  } catch (error) {
    console.error('Chat controller error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'I am having trouble generating a response right now. Please try again in a moment.' 
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user._id })
      .select('title createdAt updatedAt')
      .sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ _id: req.params.id, user: req.user._id });
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteAllConversations = async (req, res) => {
  try {
    await Conversation.deleteMany({ user: req.user._id });
    res.json({ message: 'All conversations deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
