import { searchFactCheck } from "./factCheck.js";

const urgentWords = [
    "urgent", "now now", "act now", "immediately", "asap", "expires today",
    "last chance", "final notice", "24 hours", "before midnight",
    "don't delay", "respond immediately", "your account will be",
];

const moneyRequestPattern = /send.*(account|bank details|bvn|otp|pin|password)|account number|verify.*bvn|western union|gift card|moneygram|crypto wallet|send.*fee|processing fee|activation fee|clearance fee/i;

const tooGoodPattern = /you('ve| have) (won|been selected)|congratulations.*(prize|winner|selected)|free.*(gift|money|iphone|laptop|scholarship)|claim your (prize|reward|winnings)|guaranteed (returns|profit|income)|double your money|risk-?free investment/i;

const fakeAuthorityPattern = /from (your bank|cbn|nnpc|nysc|efcc|npower|fg|federal government)|official (notice|message|alert) from|on behalf of (the|our) (bank|government|ministry)|this is (cbn|nnpc|nysc|efcc)/i;

const poorGrammarPattern = /\b(kindly|do the needful|revert back|as soon as possible urgently)\b|!!!|[A-Z]{6,}/;

const romanceScamPattern = /i (love|fell in love with) you (already|so much)|i('m| am) (a widow|widower|army officer|oil rig)|i (need|require) your (help|assistance) (financially|with money)|meet.*(overseas|abroad).*love/i;

const suspiciousLinkPattern = /\.tk|\.xyz|bit\.ly|verify-secure/i;

const sourcePattern = /source|according to|reuters|punch|premium times|bbc/i;

export const evaluate = async (input) => {
    const lower = input.toLowerCase();
    const signals = [];
    let score = 78;
    let redFlagCount = 0;

const hasMoneyRequest = moneyRequestPattern.test(lower);
if (hasMoneyRequest) { score -= 30; redFlagCount++; }

const hasTooGood = tooGoodPattern.test(lower);
if (hasTooGood) { score -= 25; redFlagCount++; }

const hasFakeAuthority = fakeAuthorityPattern.test(lower);
if (hasFakeAuthority) { score -= 20; redFlagCount++; }

const hasPoorGrammar = poorGrammarPattern.test(input);
if (hasPoorGrammar) { score -= 10; redFlagCount++; }

const hasRomanceScam = romanceScamPattern.test(lower);
if (hasRomanceScam) { score -= 25; redFlagCount++; }

    const claims = await searchFactCheck(input);
    if (claims.length > 0) {
        const topClaim = claims[0];
        const rating = topClaim.claimReview?.textualRating || "Unclear";

        signals.push({
            title: "factcheck",
            key: "factcheck",
            status: "warn",
            note: `A fact-checker rated a similar claim: "${rating}"`,
        });
    } else {
        signals.push({
            title: "factcheck",
            key: "factcheck",
            status: "none",
            note: "No matching fact-check found — not proof of truth, just no record.",
        });
    }

    const hasUrgency = urgentWords.some((w) => lower.includes(w));
    if (hasUrgency) {
        score -= 28;
        redFlagCount++
    }
    signals.push({
        title: "language",
        key: "language",
        status: hasUrgency ? "warn" : "good",
        note: hasUrgency ? "Uses urgency/pressure language." : "Tone is calm, no rush tactics.",
    });

    const hasSuspiciousLink = suspiciousLinkPattern.test(lower);
    if (hasSuspiciousLink) score -= 25;
    signals.push({
        title: "domain",
        key: "domain",
        status: hasSuspiciousLink ? "bad" : "good",
        note: hasSuspiciousLink ? "Contains a suspicious/shortened link pattern." : "No shady link detected.",
    });

    const hasSource = sourcePattern.test(lower);
    signals.push({
        title: "structural",
        key: "structural",
        status: hasSource ? "good" : "warn",
        note: hasSource ? "References a source." : "No named source or byline.",
    });

     if (redFlagCount >= 3) score -= 20;
    if (redFlagCount >= 5) score -= 15;

    score = Math.max(4, Math.min(96, score));

    let verdict = "Correct correct";
    if (score < 40) verdict = "Na scam be dat";
    else if (score < 70) verdict = "Small small suspicious";
   

    return { score, verdict, signals };
};