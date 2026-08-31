import OpenAI from 'openai';
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

let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export const generateAIResponse = async (messages) => {
  if (!openai) {
    throw new Error('OpenAI API key is not configured');
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate AI response');
  }
};
