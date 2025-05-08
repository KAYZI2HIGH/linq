import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  try {
    const prompt = `
        Strictly translate this to ${targetLang} without adding greetings, emojis, or commentary.
      Preserve only the original meaning.
      
      Text: "${text}""
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text!;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
}
