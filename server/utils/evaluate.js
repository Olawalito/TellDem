import { searchFactCheck } from "./factCheck.js";
import {
    trustedDomains,
    untrustedDomains,
    suspiciousDomainPatterns,
    urgentWords,
    personalNonsensePattern,
    personalStatementPattern,
} from "./data.js";

// expanded using real scam message phrasing from friend's dataset
const moneyRequestPattern = /send.*(account|bank details|bvn|otp|pin|password)|account number|verify.*bvn|western union|gift card|moneygram|crypto wallet|send.*fee|processing fee|activation fee|clearance fee|pay (a )?n?\d|deposit n?\d|customs (clearance )?fee|starter kit|application (processing )?fee|aptitude test|fast-?track|provide (your )?(card|account) details|forward (this|the) code|verification code|send your bvn/i;

const tooGoodPattern = /you('ve| have) (won|been selected)|congratulations.*(prize|winner|selected)|free.*(gift|money|iphone|laptop|scholarship)|claim your (prize|reward|winnings)|guaranteed( returns| profit| income)?!?|double your money|risk-?free investment|no risk|100% (tested|guaranteed)|cashed out|pays \d+% (monthly|daily|weekly)|randomly selected|cash grant|watch your money grow|earn \$?\d+ (weekly|daily)|selected to receive|won n?\d/i;

const fakeAuthorityPattern = /from (your bank|cbn|nnpc|nysc|efcc|npower|fg|federal government)|official (notice|message|alert) from|on behalf of (the|our) (bank|government|ministry)|this is (cbn|nnpc|nysc|efcc)|(gtbank|access bank|first bank|zenith bank|\bmtn\b|\bglo\b|airtel|unicef|dangote|shell nigeria|amazon|coca-cola).{0,40}(alert|security|recruiting|foundation|refinery|giveaway|selected|winner|blocked|suspended|deactivated)/i;

const poorGrammarPattern = /\b(kindly|do the needful|revert back|as soon as possible urgently)\b|!!!|[A-Z]{6,}/;

const romanceScamPattern = /i (love|fell in love with) you (already|so much)|i('m| am) (a widow|widower|army officer|oil rig)|i (need|require) your (help|assistance) (financially|with money)|meet.*(overseas|abroad).*love|stationed in|military base|customs clearance fee|felt an instant connection|can't bear to be without you/i;

const sourcePattern = /source|according to|reuters|punch|premium times|bbc/i;

export let applicable = true;

export const evaluate = async (input) => {
    const lower = input.toLowerCase();

    // --- GUARD: catch personal/nonsense input BEFORE any scoring logic runs ---
    const wordCount = input.trim().split(/\s+/).length;
    const looksPersonalOrNonsense =
        personalNonsensePattern.test(lower) || personalStatementPattern.test(lower);
    const tooShortToBeAClaim = wordCount <= 2;

    if (looksPersonalOrNonsense || tooShortToBeAClaim) {
        applicable = false;

        return {
            score: 0,
            verdict: "Not applicable",
            signals: [
                {
                    key: "structural",
                    title: "Wetin dey here?",
                    status: "warn",
                    note: "This isn't a checkable factual claim — try pasting an actual message, headline, or news snippet.",
                },
            ],
        };


    }
    // --- end guard ---

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
        redFlagCount++;
    }
    signals.push({
        title: "language",
        key: "language",
        status: hasUrgency ? "warn" : "good",
        note: hasUrgency ? "Uses urgency/pressure language." : "Tone is calm, no rush tactics.",
    });

    const isTrustedDomain = trustedDomains.some((d) => lower.includes(d));
    const isUntrustedDomain = untrustedDomains.some((d) => lower.includes(d));
    const hasSuspiciousPattern = suspiciousDomainPatterns.some((p) => p.test(lower));
    const hasSuspiciousLink = isUntrustedDomain || hasSuspiciousPattern;

    if (hasSuspiciousLink) { score -= 25; redFlagCount++; }
    if (isTrustedDomain) score += 10;

    signals.push({
        title: "domain",
        key: "domain",
        status: hasSuspiciousLink ? "bad" : isTrustedDomain ? "good" : "warn",
        note: hasSuspiciousLink
            ? "Contains a known scam domain or suspicious link pattern."
            : isTrustedDomain
            ? "Matches a known trusted Nigerian/international source."
            : "No shady link detected, but source isn't in our known list either.",
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

    return { score, verdict, signals, applicable };
};
