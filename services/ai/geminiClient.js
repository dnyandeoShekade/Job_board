const { GoogleGenAI } = require("@google/genai");

let aiInstance = null;

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[GeminiClient] Warning: GEMINI_API_KEY is not defined in environment variables.");
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

/**
 * Extracts and parses JSON from raw model output, removing markdown code fences if present.
 */
function parseJSONFromText(rawText) {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty or non-string response received from AI model.");
  }
  let clean = rawText.trim();
  // Strip markdown code fences if model enclosed JSON
  if (clean.startsWith("```json")) {
    clean = clean.replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
  } else if (clean.startsWith("```")) {
    clean = clean.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  return JSON.parse(clean.trim());
}

/**
 * Generates structured, validated JSON using Gemini with schema enforcement.
 * 
 * @param {object} options
 * @param {string} options.systemInstruction - Strict system rules & persona
 * @param {string} options.prompt - Feature-specific prompt grounded in input data
 * @param {import('zod').ZodType} [options.zodSchema] - Zod schema to validate against
 * @param {function} [options.fallbackGenerator] - Deterministic fallback if AI is unavailable
 * @returns {Promise<object>} Parsed & validated JSON
 */
async function generateStructuredJSON({
  systemInstruction,
  prompt,
  zodSchema,
  fallbackGenerator,
}) {
  const ai = getAIClient();
  const candidateModels = [
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.5-flash",
  ];

  if (ai) {
    for (const model of candidateModels) {
      try {
        console.log(`[GeminiClient] Invoking model: ${model}`);
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction: systemInstruction || "You are an elite Career Intelligence AI. Return strictly valid JSON adhering to the specified schema without conversational prose or markdown wrap.",
            responseMimeType: "application/json",
            temperature: 0.2, // Low temperature for high factual precision
          },
        });

        const rawText = response.text;
        const parsed = parseJSONFromText(rawText);

        if (zodSchema) {
          const validated = zodSchema.safeParse(parsed);
          if (validated.success) {
            console.log(`[GeminiClient] Successfully generated & validated with model ${model}`);
            return validated.data;
          } else {
            console.warn(`[GeminiClient] Model ${model} returned JSON but failed Zod validation:`, validated.error.format());
            // Attempt to repair or continue to next model/fallback
          }
        } else {
          return parsed;
        }
      } catch (err) {
        console.warn(`[GeminiClient] Model ${model} call failed: ${err.message}`);
      }
    }
  }

  // If AI unavailable or all models failed, execute deterministic fallback generator
  if (typeof fallbackGenerator === "function") {
    console.log("[GeminiClient] Using deterministic evidence-based fallback generator.");
    const fallbackData = fallbackGenerator();
    if (zodSchema) {
      const validatedFallback = zodSchema.safeParse(fallbackData);
      if (validatedFallback.success) {
        return validatedFallback.data;
      } else {
        console.error("[GeminiClient] Fallback data failed Zod validation:", validatedFallback.error.format());
      }
    }
    return fallbackData;
  }

  throw new Error("AI service unavailable and no fallback generator was provided.");
}

module.exports = {
  getAIClient,
  generateStructuredJSON,
  parseJSONFromText,
};
