// Sourced from research teammate's dataset (nigeria_factcheck_dataset.json)

export const trustedDomains = [
    "africacheck.org", "aljazeera.com", "bbc.com", "businessday.ng",
    "cbn.gov.ng", "channelstv.com", "cnbc.com", "dailynigerian.com",
    "dailypost.ng", "dubawa.org", "factcheckhub.com", "guardian.ng",
    "icirnigeria.org", "leadership.ng", "legit.ng", "nafdac.gov.ng",
    "nass.gov.ng", "ncdc.gov.ng", "nepc.gov.ng", "ng.usembassy.gov",
    "nigerianbar.ng", "nigerianports.org", "nta.ng", "premiumtimesng.com",
    "presidency.gov.ng", "punchng.com", "reuters.com", "ripplesnigeria.com",
    "roundcheck.com.ng", "saharareporters.com", "state.gov", "thecable.ng",
    "thenationonlineng.net", "tribuneonlineng.com", "vanguardngr.com",
];

export const untrustedDomains = [
    "6dollarsinvestment.com", "86fb.com", "bitfinance.global", "cala.finance",
    "cbex.com", "crowd1.com", "data.indigoe.online", "finafrica.org",
    "gethelpworldwide.com", "hynaija.com", "icharity.club", "inksnation.io",
    "loom.ng", "medianigeria.com", "naijagists.com", "newsblenda.com",
    "nnn.ng", "ovaioza.com", "pointblanknews.com", "racksterli.com",
    "royalq.io", "sidrainvestment.com", "slnkz.com", "thenews-chronicle.com",
    "twinkas.com", "wealthbuddy.ng",
];

export const suspiciousDomainPatterns = [
    /\.tk$/i, /\.xyz$/i, /\.ml$/i, /\.ga$/i, /\.cf$/i,
    /bit\.ly/i, /tinyurl/i, /verify-?secure/i, /confirm-?account/i,
    /-?official-?ng/i, /cbn-?verify/i, /nnpc-?portal/i,
];

// merged: general urgency phrases + Nigerian-specific scam phrases
export const urgentWords = [
    "act now before it's too late", "big pharma doesn't want you to know",
    "click here to claim your bonus/airtime/data", "do not ignore this message",
    "don't miss out", "double your money in x days",
    "exclusive offer for the first 50 people", "final warning",
    "god will bless you if you help me", "i am a white man looking for an african wife",
    "i am a widow/orphan of late general/minister", "i received nxxx,000, you should try it too",
    "immediate action required", "last chance",
    "limited time offer - expires in 24 hours", "my account is frozen because i am on a military base",
    "no risk, 100% guaranteed returns", "only 10 slots remaining",
    "provide help (ph) and get help (gh)", "send to 12 whatsapp groups to activate",
    "share before they delete this", "the government is hiding this from nigerians",
    "this is a ramadan/christmas/easter gift from [brand]", "this is not a joke",
    "time is running out", "urgent",
    "urgent!!!", "verified by [fake organization]",
    "your account will be suspended permanently", "your bvn is required for verification",
    // originals kept from earlier version
    "now now", "act now", "immediately", "asap", "expires today",
    "before midnight", "don't delay", "respond immediately", "your account will be",
];

// structural patterns for detecting personal/nonsense input (not a checkable claim)
// based on real examples: "Am I famous?", "lol", "good morning", "my head hurts", etc.
export const personalNonsensePattern = /^(am i|who am i|are you (my|the)|do you think i|will i ever|will i be|why (doesn't|does not|do) my|what should i (eat|do|wear)|what is the meaning of life|who is my (soulmate|match)|can you (pray|guess)|tell me a joke|how are you\??$|good morning$|good afternoon$|good evening$|lol$|haha+$|lmao$|hehe+$)/i;

export const personalStatementPattern = /^(i love|i hate|i like|my head|my crush|my (mom|dad|brother|sister|friend))\b/i;
