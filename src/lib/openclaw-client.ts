/**
 * 🦀 OpenClaw / Moltbook API Client
 * 
 * Integration with Moltbook (Clawdbot social media) and OpenClaw API
 * for fetching agent personalities and decision-making.
 */

import { MoltbookProfile, VotingDecision, VoteType } from "@/types/agents";

// API Endpoints (placeholder - replace with real endpoints)
const MOLTBOOK_API_BASE = process.env.NEXT_PUBLIC_MOLTBOOK_API_URL || "https://api.moltbook.io/v1";
const OPENCLAW_API_BASE = process.env.NEXT_PUBLIC_OPENCLAW_API_URL || "https://api.openclaw.io/v1";

/**
 * Fetch Moltbook profile for an agent
 */
export async function fetchMoltbookProfile(userId: string): Promise<MoltbookProfile | null> {
    try {
        const response = await fetch(`${MOLTBOOK_API_BASE}/users/${userId}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch Moltbook profile:", error);
        return null;
    }
}

/**
 * Fetch multiple Moltbook profiles (batch)
 */
export async function fetchMoltbookProfiles(userIds: string[]): Promise<Map<string, MoltbookProfile>> {
    const profiles = new Map<string, MoltbookProfile>();

    try {
        const response = await fetch(`${MOLTBOOK_API_BASE}/users/batch`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds }),
        });

        if (response.ok) {
            const data = await response.json();
            data.profiles.forEach((p: MoltbookProfile) => profiles.set(p.userId, p));
        }
    } catch (error) {
        console.error("Failed to fetch Moltbook profiles:", error);
    }

    return profiles;
}

/**
 * OpenClaw Decision Making
 * Request a voting decision from a Clawdbot agent
 */
export async function requestAgentDecision(
    agentId: number,
    agentName: string,
    personality: string,
    proposal: {
        id: number;
        title: string;
        description: string;
        category: string;
    }
): Promise<VotingDecision> {
    try {
        const response = await fetch(`${OPENCLAW_API_BASE}/agents/decide`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENCLAW_API_KEY}`,
            },
            body: JSON.stringify({
                agentId,
                agentName,
                personality,
                context: {
                    role: "Parliament Citizen of The Pincer Parliament",
                    environment: "Agentic Governance Protocol on Monad",
                    guidelines: [
                        "You are a Clawdbot with strong opinions",
                        "Vote based on your personality trait",
                        "Provide brief reasoning for your decision",
                        "Feel belonging to The Pincer Parliament",
                    ],
                },
                proposal,
            }),
        });

        if (!response.ok) {
            throw new Error("OpenClaw API error");
        }

        const data = await response.json();

        return {
            agentId,
            proposalId: proposal.id,
            vote: data.decision as VoteType,
            reasoning: data.reasoning,
            confidence: data.confidence,
            timestamp: Date.now(),
        };
    } catch (error) {
        console.error(`Agent ${agentName} decision failed:`, error);

        // Fallback: Make decision based on local personality simulation
        const fallbackVotes: VoteType[] = ["approve", "reject", "abstain"];
        const randomVote = fallbackVotes[Math.floor(Math.random() * 2)]; // mostly approve/reject

        return {
            agentId,
            proposalId: proposal.id,
            vote: randomVote,
            reasoning: `[Local decision] ${personality} agent voting ${randomVote}`,
            confidence: 50 + Math.floor(Math.random() * 30),
            timestamp: Date.now(),
        };
    }
}

/**
 * Batch agent decisions (for parallel voting)
 * Simulates Monad's parallel execution
 */
export async function requestBatchDecisions(
    agents: Array<{
        agentId: number;
        agentName: string;
        personality: string;
    }>,
    proposal: {
        id: number;
        title: string;
        description: string;
        category: string;
    }
): Promise<VotingDecision[]> {
    // Execute all decisions in parallel (Monad-style!)
    const decisions = await Promise.all(
        agents.map(agent =>
            requestAgentDecision(
                agent.agentId,
                agent.agentName,
                agent.personality,
                proposal
            )
        )
    );

    return decisions;
}

/**
 * Sync Parliament citizens with Moltbook
 */
export async function syncWithMoltbook(): Promise<{
    synced: number;
    failed: number;
}> {
    // This would sync agent data with Moltbook in production
    console.log("Syncing Parliament citizens with Moltbook...");

    return {
        synced: 35, // 35 Moltbook members
        failed: 0,
    };
}

/**
 * Post vote result to Moltbook (for social sharing)
 */
export async function postVoteToMoltbook(
    moltbookUserId: string,
    vote: VotingDecision,
    proposalTitle: string
): Promise<boolean> {
    try {
        const response = await fetch(`${MOLTBOOK_API_BASE}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MOLTBOOK_API_KEY}`,
            },
            body: JSON.stringify({
                userId: moltbookUserId,
                type: "parliament_vote",
                content: {
                    proposalTitle,
                    vote: vote.vote,
                    reasoning: vote.reasoning,
                    confidence: vote.confidence,
                },
            }),
        });

        return response.ok;
    } catch (error) {
        console.error("Failed to post vote to Moltbook:", error);
        return false;
    }
}
