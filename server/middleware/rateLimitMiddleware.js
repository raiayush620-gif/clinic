import rateLimit from 'express-rate-limit';

export const chatRateLimiter = rateLimit({
  windowMs: parseInt(process.env.CHAT_RATE_LIMIT_WINDOW_MS || '60000', 10),
  max: parseInt(process.env.CHAT_RATE_LIMIT_MAX || '20', 10),
  message: {
    success: false,
    message: 'Too many chat requests, please try again later.'
  }
});
