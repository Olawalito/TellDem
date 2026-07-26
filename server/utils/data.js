export const trustedDomains = [
    "bbc.com", "bbc.co.uk", "reuters.com", "apnews.com", "aljazeera.com",
    "punchng.com", "premiumtimesng.com", "channelstv.com", "thecable.ng",
    "vanguardngr.com", "dailytrust.com", "guardian.ng", "thisdaylive.com",
    "nairametrics.com", "tribuneonlineng.com", "leadership.ng",
    "africacheck.org", "politifact.com", "who.int", "cbn.gov.ng",
    "nan.ng", "legit.ng", "arise.tv", "businessday.ng",
];

export const untrustedDomains = [
    "worldtruth.tv", "yournewswire.com", "naturalnews.com", "beforeitsnews.com",
    "clickhole.com", "empireherald.com", "nationalreport.net",
    "abcnews.com.co", "newswatch33.com", "civictribune.com",
];

export const suspiciousDomainPatterns = [
    /\.tk$/i, /\.xyz$/i, /\.ml$/i, /\.ga$/i, /\.cf$/i,
    /bit\.ly/i, /tinyurl/i, /verify-?secure/i, /confirm-?account/i,
    /-?official-?ng/i, /cbn-?verify/i, /nnpc-?portal/i,
];