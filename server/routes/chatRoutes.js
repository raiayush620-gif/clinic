import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { chatRateLimiter } from '../middleware/rateLimitMiddleware.js';
import { 
  sendMessage, 
  getConversations, 
  getConversationById, 
  deleteConversation, 
  deleteAllConversations 
} from '../controllers/chatController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.post('/', chatRateLimiter, sendMessage);
router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversationById);
router.delete('/conversations/:id', deleteConversation);
router.delete('/conversations', deleteAllConversations);

export default router;
