export interface HeroData {
  typingStrings: string[];
  funFacts: string[];
}

export const heroData: HeroData = {
  typingStrings: [
    "SYSTEMS ARCHITECT //",
    "STEALTH FOUNDER //",
    "99.9% UPTIME ENGINEER //",
    "PROMPT ARCHITECT //",
    "INFRASTRUCTURE DESIGNER //",
  ],
  funFacts: [
    "[UPTIME] 99.9% across 100+ McDonald's POS sites. Two manual failures taught me more about fault isolation than any coursework.",
    "[HISTORY] Shipping code since 2013. Spent 10 of those years learning what breaks under load. The other 3 fixing it.",
    "[SYNC] Three-way real-time sync for MunchRun. Wired, tested, shipped.",
    "[SPARC] 3,000+ lines of prompt architecture cutting scaffolding from 2 days to 4 hours. Zero boilerplate.",
    "[STARS] Aometry: 46 GitHub stars, zero promotion. Contributors extend it without touching core.",
    "[ATYPICAL] Level 1 Autism. Pattern recognition runs hot. Can't stop building modular infrastructure.",
    "[OPS] From running $20M retail operations to shipping AI pipelines. Same discipline. Different compiler.",
    "[INIT] Writing code since I thought 'goto' was good practice. Never looked back.",
    "[STACK] Audit LLM reasoning, design RAG pipelines, automate the boring stuff.",
  ],
};
