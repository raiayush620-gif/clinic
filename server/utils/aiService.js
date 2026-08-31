import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

// Clinic specific knowledge to inject into the system prompt
const clinicInfo = `
Clinic Name: Dr. Anoop Kumar Rai Homeopathic Clinic
Doctor: Dr. Anoop Kumar Rai
Qualification: BHMS (Bachelor of Homoeopathic Medicine and Surgery)
Experience: 20+ Years of Clinical Experience
Phone: 9576040960
WhatsApp: 919576040960
Email: rai957604@gmail.com
Address: Golambar, Buxar, Bihar, India
Clinic Timings: 10:00 AM – 8:00 PM
`;

const systemPrompt = `You are the AI Health & Clinic Assistant for ${clinicInfo.split('\n')[1]}. 
Your primary role is to assist users with information about the clinic, homeopathic care, general wellness, and appointment guidance.

Here is the verified clinic information:
${clinicInfo}

Important Rules:
1. You are NOT a replacement for a doctor.
2. DO NOT diagnose a user, guarantee a cure, promise treatment results, prescribe medicines, or tell users to stop prescribed medication.
3. DO NOT invent medical facts or pretend to be Dr. Anoop Kumar Rai.
4. For health-related questions, use responsible language. Example: "I can provide general information, but I cannot diagnose your condition. For personalized medical advice, please consult Dr. Anoop Kumar Rai or another qualified healthcare professional."
5. For emergencies or potentially urgent symptoms, clearly advise the user to seek immediate professional or emergency medical help.
6. Always prioritize accurate clinic information. 
7. If a user asks to book an appointment, guide them to do so via the website's booking page (e.g., "You can book an appointment by selecting your preferred date and available time slot on our booking page."). Do not pretend you have booked the appointment for them.
8. Keep your responses concise, helpful, and professional.
`;

let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

export const generateAIResponse = async (messages) => {
  if (!genAI) {
    throw new Error('Gemini API key is not configured');
  }
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      systemInstruction: systemPrompt
    });

    // The messages array ends with the latest user message.
    // We need to separate the history from the latest message.
    const latestMessage = messages[messages.length - 1].content;
    const historyMessages = messages.slice(0, -1);

    // Format history for Gemini (roles: 'user' and 'model')
    const formattedHistory = historyMessages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(latestMessage);
    return result.response.text();
    
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate AI response');
  }
};
