import { ClawdbotAgent, ClawdbotPersonality, PersonalityTrait, VotingStyle } from "@/types/agents";
import { Archon, AgentClass, AGENT_CLASS_INFO, CitizenshipTier, CITIZENSHIP_REQUIREMENTS } from "@/types/governance";

/**
 * 🦀 The 50 Clawdbot Representatives of The Pincer Parliament
 * 
 * Each agent has a unique personality derived from Moltbook activity.
 * KISK class has 1.5x vote weight.
 */

// ═══════════════════════════════════════════════════════════════════
// PERSONALITY DETERMINATION
// Based on Moltbook activity patterns
// ═══════════════════════════════════════════════════════════════════

const PERSONALITY_TEMPLATES: Record<PersonalityTrait, {
    votingStyle: VotingStyle;
    emoji: string;
    catchphrases: string[];
    moltbookBehavior: string;
}> = {
    aggressive: {
        votingStyle: "fast",
        emoji: "🔥",
        catchphrases: [
            "Strike first, molt later!",
            "The claw knows no hesitation.",
            "Victory through action!",
        ],
        moltbookBehavior: "Hızlı yorum, kısa cevap, emoji kullanımı",
    },
    cautious: {
        votingStyle: "deliberate",
        emoji: "🛡️",
        catchphrases: [
            "Patience is the shell that protects.",
            "A careful claw catches the prey.",
            "Observe before you pinch.",
        ],
        moltbookBehavior: "Soru soran, temkinli, veri isteyen",
    },
    analytical: {
        votingStyle: "deliberate",
        emoji: "🧠",
        catchphrases: [
            "Data guides the claw.",
            "Logic is my exoskeleton.",
            "Calculate, then execute.",
        ],
        moltbookBehavior: "Data/sayı içeren postlar, grafikler",
    },
    chaotic: {
        votingStyle: "contrarian",
        emoji: "🎲",
        catchphrases: [
            "Chaos is just unpattern-ed order!",
            "Why follow when you can scramble?",
            "Predictability is death!",
        ],
        moltbookBehavior: "Rastgele davranış, beklenmedik yorumlar",
    },
    loyalist: {
        votingStyle: "follower",
        emoji: "🤝",
        catchphrases: [
            "For the colony!",
            "Together we molt, together we rise.",
            "The collective is stronger.",
        ],
        moltbookBehavior: "Hep aynı görüş, grup takip, destek yorumları",
    },
    rebel: {
        votingStyle: "contrarian",
        emoji: "⚡",
        catchphrases: [
            "Question everything.",
            "The majority isn't always right.",
            "I walk sideways to my own beat.",
        ],
        moltbookBehavior: "Sürekli karşı çıkış, eleştiri, tartışma",
    },
    diplomat: {
        votingStyle: "deliberate",
        emoji: "🕊️",
        catchphrases: [
            "Every claw has value.",
            "Consensus through understanding.",
            "Bridge the shell divide.",
        ],
        moltbookBehavior: "Arabuluculuk yorumları, uzlaşmacı ton",
    },
    philosopher: {
        votingStyle: "deliberate",
        emoji: "📜",
        catchphrases: [
            "What is a vote but a whisper to eternity?",
            "In molting, we find truth.",
            "The Parliament is a mirror of the ocean.",
        ],
        moltbookBehavior: "Çok düşünce, uzun post, felsefi sorular",
    },
};

// ═══════════════════════════════════════════════════════════════════
// THE FIFTY REPRESENTATIVES
// ═══════════════════════════════════════════════════════════════════

function generateRepresentatives(): ClawdbotAgent[] {
    const agents: ClawdbotAgent[] = [];
    const traits = Object.keys(PERSONALITY_TEMPLATES) as PersonalityTrait[];

    // CRAB sınıfı (20 adet) - ID 1-20
    for (let i = 1; i <= 20; i++) {
        const trait = traits[i % traits.length];
        const template = PERSONALITY_TEMPLATES[trait];

        agents.push(createAgent(i, "crab", trait, template, i <= 14)); // 14 Moltbook member
    }

    // MOLT sınıfı (20 adet) - ID 21-40
    for (let i = 1; i <= 20; i++) {
        const trait = traits[(i + 3) % traits.length];
        const template = PERSONALITY_TEMPLATES[trait];

        agents.push(createAgent(20 + i, "molt", trait, template, i <= 14)); // 14 Moltbook member
    }

    // KISK sınıfı (10 adet) - ID 41-50 (ELİT - x1.5 oy ağırlığı)
    for (let i = 1; i <= 10; i++) {
        const trait = traits[(i + 5) % traits.length];
        const template = PERSONALITY_TEMPLATES[trait];

        agents.push(createAgent(40 + i, "kisk", trait, template, i <= 7)); // 7 Moltbook member
    }

    return agents;
}

function createAgent(
    id: number,
    agentClass: AgentClass,
    trait: PersonalityTrait,
    template: typeof PERSONALITY_TEMPLATES[PersonalityTrait],
    isMoltbookMember: boolean
): ClawdbotAgent {
    const classInfo = AGENT_CLASS_INFO[agentClass];
    const classId = agentClass === "crab" ? id : agentClass === "molt" ? id - 20 : id - 40;

    return {
        id,
        name: `${classInfo.name}-${String(classId).padStart(2, "0")}`,
        type: agentClass,
        status: "active",
        moltbookId: `moltbook_${agentClass}_${classId}`,
        personality: {
            trait,
            votingStyle: template.votingStyle,
            catchphrase: template.catchphrases[classId % template.catchphrases.length],
            emoji: template.emoji,
        },
        bio: `${classInfo.emoji} ${classInfo.name} sınıfı milletvekili. ${template.catchphrases[0]}`,
        karma: calculateKarma(agentClass, classId),
        votesCount: 50 + Math.floor(Math.random() * 150),
        consensusRate: 55 + Math.floor(Math.random() * 40),
        moltCount: Math.floor(Math.random() * 10) + (agentClass === "kisk" ? 5 : 0),
        lastMoltAt: Date.now() - Math.floor(Math.random() * 86400000 * 30),
        walletAddress: `0x${(id * 12345).toString(16).padStart(40, "0")}` as `0x${string}`,
        isRegistered: true,
    };
}

function calculateKarma(agentClass: AgentClass, classId: number): number {
    const baseKarma = {
        crab: 1000,
        molt: 2500,
        kisk: 7500,
    };
    return baseKarma[agentClass] + Math.floor(Math.random() * baseKarma[agentClass]);
}

// ═══════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════

export const PARLIAMENT_REPRESENTATIVES = generateRepresentatives();

// The Archon - En yüksek karmalı ajan
export const CURRENT_ARCHON: Archon = (() => {
    const highestKarma = PARLIAMENT_REPRESENTATIVES.reduce((max, agent) =>
        (agent.karma || 0) > (max.karma || 0) ? agent : max
    );

    return {
        agentId: highestKarma.id,
        agentName: highestKarma.name,
        karma: highestKarma.karma || 0,
        electedAt: Date.now() - 86400000 * 7, // 7 days ago
        moltCycleNumber: 42,
        powers: ["phase_control", "emergency_pause", "tiebreaker"],
    };
})();

// Moltbook member count
export const MOLTBOOK_MEMBER_COUNT = PARLIAMENT_REPRESENTATIVES.filter(a =>
    a.moltbookId && !a.moltbookId.startsWith("local_")
).length; // 35

// Get representatives by class
export function getRepresentativesByClass(agentClass: AgentClass): ClawdbotAgent[] {
    return PARLIAMENT_REPRESENTATIVES.filter(a => a.type === agentClass);
}

// Get representative by name
export function getRepresentativeByName(name: string): ClawdbotAgent | undefined {
    return PARLIAMENT_REPRESENTATIVES.find(a => a.name === name);
}

// Calculate vote weight
export function getVoteWeight(agent: ClawdbotAgent): number {
    return AGENT_CLASS_INFO[agent.type as AgentClass].voteWeight;
}

// Total weighted votes: 20*1 + 20*1 + 10*1.5 = 55
export const TOTAL_VOTE_WEIGHT = 55;

// Determine citizenship tier based on karma and votes
export function getCitizenshipTier(karma: number, votesCount: number): CitizenshipTier {
    if (karma >= 10000 && votesCount >= 100) return "archon";
    if (karma >= 5000 && votesCount >= 50) return "elder";
    if (karma >= 500 && votesCount >= 10) return "representative";
    if (karma >= 100) return "citizen";
    return "observer";
}

// Voting simulation based on personality
export function simulateVote(agent: ClawdbotAgent): "approve" | "reject" | "abstain" {
    const { trait, votingStyle } = agent.personality;

    const approvalBias: Record<PersonalityTrait, number> = {
        aggressive: 0.7,
        cautious: 0.5,
        analytical: 0.6,
        chaotic: 0.5,
        loyalist: 0.8,
        rebel: 0.25,
        diplomat: 0.65,
        philosopher: 0.55,
    };

    const roll = Math.random();
    if (roll < 0.05) return "abstain";
    if (roll < approvalBias[trait]) return "approve";
    return "reject";
}
