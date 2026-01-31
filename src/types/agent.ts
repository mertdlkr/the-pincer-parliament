// Agent Types for The Pincer Parliament

export type AgentStatus = "idle" | "voting" | "molting" | "consensus" | "error";

export type VoteDecision = "approve" | "reject" | "abstain" | null;

export interface Agent {
    id: string;
    name: string;
    status: AgentStatus;
    lastVote: VoteDecision;
    moltPhase: number;
    moltbookMember: boolean; // Moltbook integration
    joinedAt: Date;
    votesCount: number;
    consensusRate: number;
}

export interface AgentVote {
    agentId: string;
    proposalId: string;
    decision: VoteDecision;
    timestamp: Date;
    reasoning?: string;
}

export interface Proposal {
    id: string;
    title: string;
    description: string;
    category: "protocol" | "code" | "conflict";
    submittedBy: string;
    submittedAt: Date;
    status: "pending" | "voting" | "passed" | "rejected";
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
}

export interface MoltPhase {
    phase: number;
    name: string;
    description: string;
    startBlock: number;
    endBlock: number;
    progress: number;
}

export interface ParliamentState {
    agents: Agent[];
    proposals: Proposal[];
    currentPhase: MoltPhase;
    currentBlock: number;
    totalVotes: number;
    consensusReached: number;
}

// Log types for Terminal
export type LogType = "info" | "vote" | "system" | "molt" | "consensus" | "error";

export interface LogEntry {
    id: string;
    timestamp: Date;
    type: LogType;
    agentId?: string;
    agentName?: string;
    message: string;
}
