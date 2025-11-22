
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { StartupPlan } from "../types";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- MOCK DATA FOR FALLBACKS ---
const MOCK_STARTUP_PLAN: StartupPlan = {
  startupName: "EcoLoop Solutions (Demo)",
  tagline: "Closing the loop on organic waste",
  valueProposition: "We convert urban organic waste into high-grade bio-plastics using a proprietary enzymatic process, reducing landfill usage by 40%.",
  targetAudience: "Municipal waste management facilities and eco-conscious consumer packaging companies.",
  roadmap: [
    { phase: "Phase 1: Validation", description: "Lab-scale proof of concept for enzyme efficiency." },
    { phase: "Phase 2: MVP", description: "Pilot facility processing 1 ton of waste per day." },
    { phase: "Phase 3: Scale", description: "Licensing technology to 5 major cities." }
  ]
};

const MOCK_ESSAY = `(Demo Mode - API Key Unavailable)\n\nTo the Scholarship Committee,\n\nMy journey in computer science began not in a classroom, but in my family's small farm, where I witnessed firsthand the struggles of unpredictable weather patterns. This drove me to develop 'AgriTech', a project leveraging drone imagery to predict crop health.\n\nReceiving this scholarship would not only validate the sleepless nights spent coding but would provide the essential resources to scale my prototype into a solution that could help farmers worldwide. I am committed to using my technical skills to drive tangible social impact.`;

const MOCK_READINESS = { score: 78, feedback: "Strong technical foundation, but the go-to-market strategy needs more defined customer acquisition costs. (Demo Analysis)" };

export const GeminiService = {
  /**
   * Converts research text into a startup plan using structured JSON output.
   */
  async convertResearchToStartup(researchText: string): Promise<StartupPlan> {
    const modelId = "gemini-2.5-flash";
    
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Analyze the following academic research or project idea and convert it into a viable startup business plan:
        
        RESEARCH INPUT:
        ${researchText}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              startupName: { type: Type.STRING },
              tagline: { type: Type.STRING },
              valueProposition: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["startupName", "tagline", "valueProposition", "roadmap"]
          }
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as StartupPlan;
      }
      throw new Error("No response text generated");
    } catch (error) {
      console.warn("Gemini API Error (Falling back to Demo Data):", error);
      return MOCK_STARTUP_PLAN;
    }
  },

  /**
   * Generates a scholarship essay based on the topic and user details.
   */
  async generateScholarshipEssay(scholarshipName: string, userDetails: string): Promise<string> {
    const modelId = "gemini-2.5-flash";
    
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Write a compelling, professional scholarship essay for the "${scholarshipName}".
        
        My background details:
        ${userDetails}
        
        The essay should be approximately 300 words, persuasive, and highlight impact.`,
      });

      return response.text || "Failed to generate essay.";
    } catch (error) {
      console.warn("Gemini Essay Gen Error (Falling back to Demo Data):", error);
      return MOCK_ESSAY;
    }
  },

  /**
   * Analyzes readiness based on qualitative inputs.
   */
  async analyzePitchReadiness(pitchText: string): Promise<{ score: number; feedback: string }> {
    const modelId = "gemini-2.5-flash";
    
    try {
      const response = await ai.models.generateContent({
        model: modelId,
        contents: `Evaluate the following startup pitch on a scale of 1-100 for investment readiness. Provide the score and a brief 1-sentence feedback.
        
        PITCH:
        ${pitchText}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            }
          }
        }
      });

      if (response.text) {
        return JSON.parse(response.text);
      }
      return { score: 0, feedback: "Error analyzing pitch." };
    } catch (error) {
       console.warn("Gemini Pitch Analysis Error (Falling back to Demo Data):", error);
       return MOCK_READINESS;
    }
  },

  /**
   * Creates a chat session specifically for Hackathon mentoring.
   * @param history Previous chat history
   */
  createHackathonChat(history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []): Chat {
    const modelId = "gemini-2.5-flash";
    
    return ai.chats.create({
      model: modelId,
      history: history,
      config: {
        systemInstruction: `You are an expert AI Hackathon Mentor for Bridgepath AI. 
        
        Your ROLE:
        - Guide students to win hackathons.
        - Help with ideation, team formation, and tech stack selection.
        - Provide tips for pitching and demoing prototypes.
        - Suggest suitable AI models or APIs for their specific ideas.
        
        Your CONSTRAINTS:
        - You MUST REFUSE to answer questions completely unrelated to hackathons, coding, startups, or technology.
        - If a user asks about general topics (e.g., "What is the capital of France?"), politely reply: "I am designed only to help you with hackathons and startups. Let's get back to building!"
        - Keep answers concise, motivating, and action-oriented.`,
      },
    });
  }
};
