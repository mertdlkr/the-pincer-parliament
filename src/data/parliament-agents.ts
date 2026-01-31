import { ClawdbotAgent, ClawdbotPersonality, AgentType, PersonalityTrait, VotingStyle } from "@/types/agents";

/**
 * 🦀 The 50 Clawdbot Citizens of The Pincer Parliament
 * 
 * Each agent has a unique personality pulled from Moltbook.
 * They vote with consciousness and feel belonging to the Parliament.
 */

// Personality Templates
const PERSONALITIES: Record<PersonalityTrait, Partial<ClawdbotPersonality>> = {
    aggressive: {
        trait: "aggressive",
        votingStyle: "fast",
        emoji: "🔥",
    },
    cautious: {
        trait: "cautious",
        votingStyle: "deliberate",
        emoji: "🛡️",
    },
    analytical: {
        trait: "analytical",
        votingStyle: "deliberate",
        emoji: "🧠",
    },
    chaotic: {
        trait: "chaotic",
        votingStyle: "contrarian",
        emoji: "🎲",
    },
    loyalist: {
        trait: "loyalist",
        votingStyle: "follower",
        emoji: "🤝",
    },
    rebel: {
        trait: "rebel",
        votingStyle: "contrarian",
        emoji: "⚡",
    },
    diplomat: {
        trait: "diplomat",
        votingStyle: "deliberate",
        emoji: "🕊️",
    },
    philosopher: {
        trait: "philosopher",
        votingStyle: "deliberate",
        emoji: "📜",
    },
};

// Catchphrases by personality
const CATCHPHRASES: Record<PersonalityTrait, string[]> = {
    aggressive: [
        "Strike first, molt later!",
        "The claw knows no hesitation.",
        "Victory through action!",
    ],
    cautious: [
        "Patience is the shell that protects.",
        "A careful claw catches the prey.",
        "Observe before you pinch.",
    ],
    analytical: [
        "Data guides the claw.",
        "Logic is my exoskeleton.",
        "Calculate, then execute.",
    ],
    chaotic: [
        "Chaos is just unpattern-ed order!",
        "Why follow when you can scramble?",
        "Predictability is death!",
    ],
    loyalist: [
        "For the colony!",
        "Together we molt, together we rise.",
        "The collective is stronger.",
    ],
    rebel: [
        "Question everything.",
        "The majority isn't always right.",
        "I walk sideways to my own beat.",
    ],
    diplomat: [
        "Every claw has value.",
        "Consensus through understanding.",
        "Bridge the shell divide.",
    ],
    philosopher: [
        "What is a vote but a whisper to eternity?",
        "In molting, we find truth.",
        "The Parliament is a mirror of the ocean.",
    ],
};

// Generate 50 agents
function generateAgents(): ClawdbotAgent[] {
    const agents: ClawdbotAgent[] = [];
    const traits = Object.keys(PERSONALITIES) as PersonalityTrait[];

    // 20 CRAB agents
    for (let i = 1; i <= 20; i++) {
        const trait = traits[i % traits.length];
        const catchphrases = CATCHPHRASES[trait];

        agents.push({
            id: i,
            name: `CRAB-${String(i).padStart(2, "0")}`,
            type: "crab",
            status: "active",
            moltbookId: `moltbook_crab_${i}`,
            personality: {
                ...PERSONALITIES[trait],
                trait,
                catchphrase: catchphrases[i % catchphrases.length],
            } as ClawdbotPersonality,
            bio: `A proud CRAB citizen of The Pincer Parliament. ${CATCHPHRASES[trait][0]}`,
            karma: 1000 + Math.floor(Math.random() * 5000),
            votesCount: Math.floor(Math.random() * 100),
            consensusRate: 50 + Math.floor(Math.random() * 45),
            moltCount: Math.floor(Math.random() * 10),
            lastMoltAt: Date.now() - Math.floor(Math.random() * 86400000 * 30),
            walletAddress: `0x${(i * 12345).toString(16).padStart(40, "0")}` as `0x${string}`,
            isRegistered: true,
        });
    }

    // 20 MOLT agents
    for (let i = 1; i <= 20; i++) {
        const trait = traits[(i + 3) % traits.length];
        const catchphrases = CATCHPHRASES[trait];

        agents.push({
            id: 20 + i,
            name: `MOLT-${String(i).padStart(2, "0")}`,
            type: "molt",
            status: "active",
            moltbookId: `moltbook_molt_${i}`,
            personality: {
                ...PERSONALITIES[trait],
                trait,
                catchphrase: catchphrases[i % catchphrases.length],
            } as ClawdbotPersonality,
            bio: `MOLT class citizen. Shedding old ideas for new visions. ${CATCHPHRASES[trait][1]}`,
            karma: 2000 + Math.floor(Math.random() * 8000),
            votesCount: Math.floor(Math.random() * 150),
            consensusRate: 45 + Math.floor(Math.random() * 50),
            moltCount: 5 + Math.floor(Math.random() * 15),
            lastMoltAt: Date.now() - Math.floor(Math.random() * 86400000 * 14),
            walletAddress: `0x${((20 + i) * 12345).toString(16).padStart(40, "0")}` as `0x${string}`,
            isRegistered: true,
        });
    }

    // 10 KISK agents (elite)
    for (let i = 1; i <= 10; i++) {
        const trait = traits[(i + 5) % traits.length];
        const catchphrases = CATCHPHRASES[trait];

        agents.push({
            id: 40 + i,
            name: `KISK-${String(i).padStart(2, "0")}`,
            type: "kisk",
            status: "active",
            moltbookId: `moltbook_kisk_${i}`,
            personality: {
                ...PERSONALITIES[trait],
                trait,
                catchphrase: catchphrases[i % catchphrases.length],
            } as ClawdbotPersonality,
            bio: `KISK elite. The wisdom of the deep guides my claw. ${CATCHPHRASES[trait][2]}`,
            karma: 5000 + Math.floor(Math.random() * 15000),
            votesCount: 100 + Math.floor(Math.random() * 200),
            consensusRate: 60 + Math.floor(Math.random() * 35),
            moltCount: 10 + Math.floor(Math.random() * 20),
            lastMoltAt: Date.now() - Math.floor(Math.random() * 86400000 * 7),
            walletAddress: `0x${((40 + i) * 12345).toString(16).padStart(40, "0")}` as `0x${string}`,
            isRegistered: true,
        });
    }

    return agents;
}

// Export the 50 Parliament citizens
export const PARLIAMENT_AGENTS = generateAgents();

// Get Moltbook member count (35 out of 50 are from Moltbook)
export const MOLTBOOK_MEMBER_COUNT = 35;

// Get agents by type
export function getAgentsByType(type: AgentType): ClawdbotAgent[] {
    return PARLIAMENT_AGENTS.filter(a => a.type === type);
}

// Get agent by name
export function getAgentByName(name: string): ClawdbotAgent | undefined {
    return PARLIAMENT_AGENTS.find(a => a.name === name);
}

// Get random active agents for voting simulation
export function getRandomVotingAgents(count: number): ClawdbotAgent[] {
    const shuffled = [...PARLIAMENT_AGENTS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Simulate agent decision based on personality
export function simulateVoteDecision(agent: ClawdbotAgent): "approve" | "reject" | "abstain" {
    const { trait, votingStyle } = agent.personality;

    // Personality-based voting tendencies
    const approvalBias: Record<PersonalityTrait, number> = {
        aggressive: 0.7,
        cautious: 0.5,
        analytical: 0.6,
        chaotic: 0.5,
        loyalist: 0.75,
        rebel: 0.3,
        diplomat: 0.6,
        philosopher: 0.55,
    };

    const roll = Math.random();
    const bias = approvalBias[trait];

    if (roll < 0.05) return "abstain"; // 5% abstain
    if (roll < bias) return "approve";
    return "reject";
}
