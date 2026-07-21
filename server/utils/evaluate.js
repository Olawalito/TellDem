import { searchFactCheck } from "./factCheck.js";

const urgentWords = ["urgent", "now now", "act now", "immediately", "congratulations", "click this link"];
const suspiciousLinkPattern = /\.tk|\.xyz|bit\.ly|verify-secure/i;
const sourcePattern = /source|according to|reuters|punch|premium times|bbc/i;

export const evaluate = async (input) => {
    const lower = input.toLowerCase();
    const signals = [];
    let score = 78;

    const claims = await searchFactCheck(input);
    if (claims.length > 0) {
        const topClaim = claims[0];
        const rating = topClaim.claimReview?.textualRating || "Unclear";

        signals.push({
            key: "factcheck",
            status: "warn",
            note: `A fact-checker rated a similar claim: "${rating}"`,
        });
    } else {
        signals.push({
            key: "factcheck",
            status: "none",
            note: "No matching fact-check found — not proof of truth, just no record.",
        });
    }

    const hasUrgency = urgentWords.some((w) => lower.includes(w));
    if (hasUrgency) score -= 28;
    signals.push({
        key: "language",
        status: hasUrgency ? "warn" : "good",
        note: hasUrgency ? "Uses urgency/pressure language." : "Tone is calm, no rush tactics.",
    });

    const hasSuspiciousLink = suspiciousLinkPattern.test(lower);
    if (hasSuspiciousLink) score -= 25;
    signals.push({
        key: "domain",
        status: hasSuspiciousLink ? "bad" : "good",
        note: hasSuspiciousLink ? "Contains a suspicious/shortened link pattern." : "No shady link detected.",
    });

    const hasSource = sourcePattern.test(lower);
    signals.push({
        key: "structural",
        status: hasSource ? "good" : "warn",
        note: hasSource ? "References a source." : "No named source or byline.",
    });

    score = Math.max(4, Math.min(96, score));

    let verdict = "Correct correct";
    if (score < 40) verdict = "Na scam be dat";
    else if (score < 70) verdict = "Small small suspicious";

    return { score, verdict, signals };
};