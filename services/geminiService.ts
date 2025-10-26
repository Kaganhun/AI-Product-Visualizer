
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates or edits an image using the Gemini API.
 * @param baseImageBase64 The base64 encoded string of the source image.
 * @param mimeType The MIME type of the source image.
 * @param prompt The text prompt for generation or editing.
 * @returns A promise that resolves to the base64 string of the generated image.
 */
export async function generateImage(
  baseImageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: baseImageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model failed to generate an image. Please check your input and try again.");
  }
}
