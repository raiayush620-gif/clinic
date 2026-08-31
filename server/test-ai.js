import dotenv from 'dotenv';
dotenv.config();
import { generateAIResponse } from './utils/aiService.js';

const test = async () => {
  try {
    const messages = [
      { role: 'user', content: 'What are the clinic timings?' }
    ];
    const res = await generateAIResponse(messages);
    console.log('SUCCESS:', res);
  } catch (e) {
    console.error('FAILED:', e);
  }
};

test();
