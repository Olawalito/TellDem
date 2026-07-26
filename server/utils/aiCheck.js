import { evaluate } from "./evaluate.js";
import { GoogleGenAI } from "@google/genai";
import { tavily } from "@tavily/core";

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
    const { signals, score } = ruleBasedResult;

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

    const model = ai.models;
    const prompt = `You are a media literacy assistant for Nigerian users, helping people judge if a message or claim is credible.

You will receive: the original text, a rule-based score, a verdict, a signals array from an algorithm that already checked language patterns, domain reputation, and structure, and real web search results.

Using the web search results provided, assess the plausibility of the claim and blend it with the rule-based score to produce a final credibility assessment. If the search results don't clarify things, say so rather than guessing confidently.

When text that are not applicable like mistypes or gibberish or one words just give a score of 0 and write "not applicable" where fit.

Respond ONLY with valid JSON in exactly this shape, no extra text. For the verdict, create a short 2-3 word pidgin phrase fitting the situation, similar in style to: Correct correct / Small small suspicious / Na scam be dat:
{
  "score": <number 0-100>,
  "verdict": "...",
  "signals": [{ "key": "...", "title": "...", "status": "good|warn|bad|none", "note": "..." }],
  "breakdown": "<one paragraph in plain English summarizing the overall assessment>"
}

Text: "${text}"
Rule-based score: ${score}
Rule-based signals: ${JSON.stringify(signals)}
Web search results: ${searchResults}`;

    try {
        const response = await model.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const rawText = response.text;
        const jsonStart = rawText.indexOf('{');
        const jsonEnd = rawText.lastIndexOf('}');
        const cleanJson = rawText.slice(jsonStart, jsonEnd + 1);
        const result = JSON.parse(cleanJson);

        return result;
    } catch (error) {
        console.log("AI check failed. Falling back to rule-based result");
        console.log("FULL ERROR:", error);
        return ruleBasedResult;
    }
};