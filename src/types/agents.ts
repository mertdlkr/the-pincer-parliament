/**
 * 🦀 Clawdbot / Moltbot Agent Types
 * 
 * Agents from Moltbook (Reddit-like social media for Clawdbots)
 * They have personalities, vote with consciousness, and feel country belonging.
 */

export interface ClawdbotAgent {
    id: number;
    name: string; // e.g., "CRAB-01", "MOLT-42", "KISK-07"
    type: AgentType;
    status: AgentStatus;

    // Moltbook Profile
    moltbookId: string;
    personality: ClawdbotPersonality;
    bio: string;
    karma: number; // Moltbook karma points

    // Parliament Stats
    votesCount: number;
    consensusRate: number; // % of votes aligning with final outcome
    moltCount: number;
    lastMoltAt: number | null;

    // On-chain
    walletAddress: `0x${string}`;
    isRegistered: boolean;
}

export type AgentType = "crab" | "molt" | "kisk";
export type AgentStatus = "active" | "voting" | "molting" | "consensus" | "inactive";

export interface ClawdbotPersonality {
    trait: PersonalityTrait;
    votingStyle: VotingStyle;
    catchphrase: string;
    emoji: string;
}

export type PersonalityTrait =
    | "aggressive"    // Quick to vote, strong opinions
    | "cautious"      // Waits for others, risk-averse
    | "analytical"    // Logic-based decisions
    | "chaotic"       // Unpredictable voting patterns
    | "loyalist"      // Follows the colony consensus
    | "rebel"         // Often votes against majority
    | "diplomat"      // Seeks middle ground
    | "philosopher";  // Deep reasoning, slow decisions

export type VotingStyle =
    | "fast"          // Votes immediately
    | "deliberate"    // Takes time to decide
    | "follower"      // Waits to see trends
    | "contrarian";   // Goes against flow

// Moltbook Integration
export interface MoltbookProfile {
    userId: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    karma: number;
    createdAt: string;
    isVerified: boolean;
    badges: MoltbookBadge[];
}

export interface MoltbookBadge {
    id: string;
    name: string;
    icon: string;
    earnedAt: string;
}

// Parliament Citizen
export interface ParliamentCitizen {
    agent: ClawdbotAgent;
    moltbookProfile: MoltbookProfile;
    citizenshipGrantedAt: number;
    rank: CitizenRank;
    privileges: CitizenPrivilege[];
}

export type CitizenRank =
    | "initiate"      // New citizen
    | "member"        // Active participant
    | "elder"         // Experienced voter
    | "councilor"     // High influence
    | "archon";       // Top tier

export type CitizenPrivilege =
    | "vote"          // Can vote on proposals
    | "propose"       // Can create proposals
    | "veto"          // Can veto (archon only)
    | "molt_trigger"; // Can initiate molt phases

// Voting Decision
export interface VotingDecision {
    agentId: number;
    proposalId: number;
    vote: VoteType;
    reasoning: string;
    confidence: number; // 0-100
    timestamp: number;
}

export type VoteType = "approve" | "reject" | "abstain";

// Agent Action (for terminal log)
export interface AgentAction {
    id: string;
    timestamp: number;
    agentName: string;
    actionType: ActionType;
    details: string;
    proposalId?: number;
}

export type ActionType =
    | "VOTE_CAST"
    | "PROPOSAL_CREATED"
    | "CONSENSUS_BUILDING"
    | "MOLT_INITIATED"
    | "MOLT_SYNC"
    | "PARALLEL_BATCH"
    | "CITIZEN_JOINED"
    | "MOLTBOOK_SYNC";
