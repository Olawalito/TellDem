import { evaluate } from "./evaluate.js";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

const isUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export const aiCheck = async (text) => {
  const ruleBasedResult = await evaluate(text);
  const { signals, score, applicable } = ruleBasedResult;

  if (applicable === false) {
    return ruleBasedResult;
  }

  // 1. Gather Tavily Search/Extract Context
  let searchResults = "No web search results available.";
  try {
    if (isUrl(text.trim())) {
      const extracted = await tavilyClient.extract([text.trim()]);
      searchResults = JSON.stringify(extracted.results);
    } else {
      const tavilyResponse = await tavilyClient.search(text, { searchDepth: "advanced" });
      searchResults = JSON.stringify(tavilyResponse.results);
    }
  } catch (searchError) {
    console.log("Tavily call failed:", searchError.message);
  }

  // 2. Unified Master Prompt
  const prompt = `You are a media literacy assistant for Nigerian users, helping people judge if a message or claim is credible.

You will receive: the original text, a rule-based score, a verdict, a signals array from an algorithm that already checked language patterns, domain reputation, and structure, and real web search results.

Using the web search results provided, assess the plausibility of the claim and blend it with the rule-based score to produce a final credibility assessment. If the search results don't clarify things, say so rather than guessing confidently.

When text is not applicable (like mistypes, gibberish, or one-word messages), give a score of 0 and write "not applicable" where fit.

Respond ONLY with valid JSON in exactly this shape, no extra text. For the verdict, create a short 2-3 word pidgin phrase fitting the situation, similar in style to: Correct correct / Small small suspicious / Na scam be dat:
{
  "score": 0,
  "verdict": "...",
  "signals": [{ "key": "language", "title": "...", "status": "good", "note": "..." }],
  "breakdown": "<one paragraph in plain English summarizing the overall assessment>"
}

"signals" must use ONLY these exact key values: "language", "domain", "structural", "factcheck" — do not invent new keys.
"status" must be ONLY one of these exact values: "good", "warn", "bad", "none" — do not invent new statuses.

Text: "${text}"
Rule-based score: ${score}
Rule-based signals: ${JSON.stringify(signals)}
Web search results: ${searchResults}`;

  // 3. Primary Call: Gemini
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash", 
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text);
    return { ...result, source: "ai" };

  } catch (geminiError) {
    console.log("Gemini check failed, switching to Groq fallback...", geminiError.message);

    // 4. Secondary Call: Groq SDK Fallback
    try {
      const groqResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });

      const rawContent = groqResponse.choices[0]?.message?.content || "{}";
      const result = JSON.parse(rawContent);

      return { ...result, source: "groq" };

    } catch (groqError) {
      console.log("Both AI checks failed. Falling back to local rule-based result.");
      console.log("Groq Error:", groqError.message);

      return { ...ruleBasedResult, source: "rule-based" };
    }
  }
};