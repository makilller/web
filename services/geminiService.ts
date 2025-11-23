import { GoogleGenAI, Type } from "@google/genai";
import { MoodType, ContentCategory, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveContent = async (
  mood: MoodType,
  category: ContentCategory,
  partnerName: string = "亲爱的"
): Promise<GeneratedContent> => {
  
  const modelId = 'gemini-2.5-flash';

  let prompt = "";
  
  switch (category) {
    case ContentCategory.LOVE_NOTE:
      prompt = `Write a short, sweet, and charming love note (max 2 sentences) in Chinese (Simpified Chinese) for my girlfriend who is feeling ${mood.toLowerCase()}. Call her '${partnerName}'. Be supportive and loving.`;
      break;
    case ContentCategory.DATE_IDEA:
      prompt = `Suggest one unique, romantic date idea (max 40 words) in Chinese (Simpified Chinese) suitable for a couple who is feeling ${mood.toLowerCase()}. Make it actionable.`;
      break;
    case ContentCategory.JOKE:
      prompt = `Tell a cute, wholesome, and lighthearted joke (max 40 words) in Chinese (Simpified Chinese) to make my girlfriend smile. She is feeling ${mood.toLowerCase()}.`;
      break;
    case ContentCategory.POEM:
      prompt = `Write a very short haiku or 4-line poem in Chinese (Simpified Chinese) about how much I love her, acknowledging that she is feeling ${mood.toLowerCase()}.`;
      break;
    default:
      prompt = "Say something nice in Chinese.";
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: "The generated text content in Chinese" },
            emoji: { type: Type.STRING, description: "A single relevant emoji representing the mood of the message" }
          },
          required: ["message", "emoji"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No content generated");
    }

    const parsed = JSON.parse(jsonText);

    return {
      text: parsed.message,
      category: category,
      emoji: parsed.emoji
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "我对你的爱无法言喻，即使网络断开也连着我的心 ❤️",
      category: ContentCategory.LOVE_NOTE,
      emoji: "❤️"
    };
  }
};

export const generateDailyAffirmation = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Write one short, powerful, and beautiful daily affirmation for a woman to feel loved and confident, in Simplified Chinese. Max 20 words.",
    });
    return response.text || "你是独一无二的，值得被这世界温柔以待。";
  } catch (e) {
    return "你是照亮我世界的那束光。";
  }
};