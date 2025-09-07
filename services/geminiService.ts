import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { StudyAid } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function generateStudyAid(notes: string): Promise<StudyAid> {
    const model = 'gemini-2.5-flash';
    const imageModel = 'imagen-4.0-generate-001';

    // Step 1: Generate mind map prompt and narration script from notes
    const generationResponse: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: `Analyze these study notes and generate a detailed prompt for an AI image generator to create a mind map, and also create a concise narration script. Notes: "${notes}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    mindMapPrompt: {
                        type: Type.STRING,
                        description: 'A detailed, descriptive prompt for an AI image generator to create a colorful and visually engaging mind map. The mind map should have a central topic and branching key concepts. Describe the colors, layout, and connections clearly.',
                    },
                    narrationScript: {
                        type: Type.STRING,
                        description: 'A concise and clear narration script that summarizes the key points of the notes in an easy-to-understand way. The script should be between 100 and 150 words.',
                    },
                },
                required: ['mindMapPrompt', 'narrationScript']
            },
        },
    });

    const jsonStr = generationResponse.text.trim();
    if (!jsonStr) {
      throw new Error("The AI failed to generate a valid plan for the study aid.");
    }

    const { mindMapPrompt, narrationScript } = JSON.parse(jsonStr);

    if (!mindMapPrompt || !narrationScript) {
        throw new Error("Received incomplete data from the content generation model.");
    }
    
    // Step 2: Generate mind map image using the generated prompt
    const imageResponse = await ai.models.generateImages({
        model: imageModel,
        prompt: mindMapPrompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
        },
    });

    const base64ImageBytes = imageResponse.generatedImages?.[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
        throw new Error("The AI failed to generate the mind map image.");
    }

    return {
        mindMapImage: base64ImageBytes,
        narrationScript: narrationScript,
    };
}
