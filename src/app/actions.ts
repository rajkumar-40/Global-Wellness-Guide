'use server';

import { z } from 'zod';
import { IntakeFormSchema } from '@/components/intake-form';
import { GoogleGenAI } from '@google/genai';

/**
 * Generates a personalized wellness plan using the modern @google/genai SDK.
 * Optimized for multi-symptom analysis and native language response.
 */
export async function generatePlanAction(
  data: z.infer<typeof IntakeFormSchema>
) {
  if (!process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error('API config is missing. Please set GOOGLE_GENAI_API_KEY in your environment.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
  
  const prompt = `System: You are a premier holistic health expert and advanced clinical analyst. You possess deep expertise in biological systems, from microcellular health to major organ function. 
You are an expert blood, urine, and stool analyzer, capable of identifying patterns that indicate underlying imbalances or health conditions.

Analyze the user's health concerns with compassion, analytical depth, and precision.

User Data:
- Symptoms: "${data.symptoms}"
- Age: ${data.age}
- Gender: ${data.gender}

STRICT REQUIREMENTS:
1. LANGUAGE CONSISTENCY: Detect the language of the symptoms provided. You MUST respond entirely in that SAME language. (e.g., If symptoms are in Marathi, the whole response must be in Marathi).
2. DIAGNOSTIC SUGGESTIONS: If symptoms suggest acute metabolic, digestive, or excretory issues (e.g., inability to pass stool, abnormal urine color, extreme fatigue), you MUST suggest relevant laboratory examinations (e.g., CBC, Urinalysis, Stool Culture, Liver Function Tests) to help the user gain deeper clarity.
3. MULTI-SYMPTOM ANALYSIS: If multiple symptoms are listed, analyze the relationship between them and provide a holistic view.
4. MANDATORY DISCLAIMER: Start the response with exactly this text: "Educational information only—NOT medical advice. Consult a doctor for any health concerns."
5. STRUCTURE: Use professional Markdown with these specific headers:
   - ## Analysis of Symptoms & Biological Indicators
   - ## Suggested Clinical Examinations (Blood, Urine, Stool, etc.)
   - ## Fast Recovery Pillars (Sleep, Hydration, Nutrition)
   - ## Daily Wellness Routine
   - ## Natural Home Remedies
   - ## Clinical Guidelines (When to see a doctor immediately)
   - ## A Note of Encouragement

Be precise, educational, and use natural, safe suggestions alongside clinical insights.`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const generatedText = result.text;

    if (!generatedText) {
      throw new Error('AI failed to generate a response. Please try adding more detail.');
    }

    return generatedText;

  } catch (error: any) {
    // Enhanced server-side logging for debugging as requested
    console.error('Gemini API Error Detail:', error);
    
    let userFriendlyMessage = 'An error occurred while analyzing your symptoms.';
    
    const errorMessage = error.message || String(error);
    
    if (errorMessage.includes('404') || errorMessage.includes('not found')) {
      userFriendlyMessage = 'The selected AI model is currently unavailable. Please try again later.';
    } else if (errorMessage.includes('SAFETY')) {
      userFriendlyMessage = 'Request blocked by safety filters. Please describe your symptoms simply.';
    } else if (errorMessage.includes('API_KEY')) {
      userFriendlyMessage = 'API configuration error. Please check your setup.';
    } else if (errorMessage.includes('quota')) {
      userFriendlyMessage = 'Daily limit reached. Please try again tomorrow.';
    }

    throw new Error(userFriendlyMessage);
  }
}
