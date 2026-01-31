"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentCell } from "./AgentCell";
import { Agent, AgentStatus, VoteDecision } from "@/types/agent";

// Personality data for Clawdbot agents
const PERSONALITIES = [
    { trait: "aggressive", votingStyle: "fast", catchphrase: "Strike first, molt later!", emoji: "🔥" },
    { trait: "cautious", votingStyle: "deliberate", catchphrase: "Patience is the shell that protects.", emoji: "🛡️" },
    { trait: "analytical", votingStyle: "deliberate", catchphrase: "Data guides the claw.", emoji: "🧠" },
    { trait: "chaotic", votingStyle: "contrarian", catchphrase: "Chaos is just unpattern-ed order!", emoji: "🎲" },
    { trait: "loyalist", votingStyle: "follower", catchphrase: "For the colony!", emoji: "🤝" },
    { trait: "rebel", votingStyle: "contrarian", catchphrase: "Question everything.", emoji: "⚡" },
    { trait: "diplomat", votingStyle: "deliberate", catchphrase: "Every claw has value.", emoji: "🕊️" },
    { trait: "philosopher", votingStyle: "deliberate", catchphrase: "In molting, we find truth.", emoji: "📜" },
] as const;

// Generate 50 Clawdbot agents from Moltbook
function generateAgents(): Agent[] {
    const statuses: AgentStatus[] = ["idle", "voting", "molting", "consensus"];
    const votes: VoteDecision[] = ["approve", "reject", "abstain", null];

    return Array.from({ length: 50 }, (_, i) => {
        const id = String(i + 1).padStart(2, "0");
        const agentType: "crab" | "molt" | "kisk" = i < 20 ? "crab" : i < 40 ? "molt" : "kisk";
        const prefix = agentType.toUpperCase();
        const typeId = i < 20 ? i + 1 : i < 40 ? i - 19 : i - 39;
        const personality = PERSONALITIES[i % PERSONALITIES.length];

        return {
            id: `agent-${id}`,
            name: `${prefix}-${String(typeId).padStart(2, "0")}`,
            agentType,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastVote: votes[Math.floor(Math.random() * votes.length)],
            moltPhase: Math.floor(Math.random() * 5) + 1,
            moltbookMember: i < 35, // 35 Moltbook citizens
            joinedAt: new Date(),
            votesCount: Math.floor(Math.random() * 1000),
            consensusRate: Math.random() * 100,
            personality,
            bio: `${prefix} citizen of The Pincer Parliament. ${personality.catchphrase}`,
            karma: 1000 + Math.floor(Math.random() * 9000),
        };
    });
}

interface ParliamentGridProps {
    onAgentSelect?: (agent: Agent) => void;
}

export function ParliamentGrid({ onAgentSelect }: ParliamentGridProps) {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [isSimulating, setIsSimulating] = useState(true);

    // Initialize agents
    useEffect(() => {
        setAgents(generateAgents());
    }, []);

    // Simulate parallel voting activity
    useEffect(() => {
        if (!isSimulating || agents.length === 0) return;

        const interval = setInterval(() => {
            setAgents(prev => {
                const newAgents = [...prev];
                // Randomly update 3-8 agents simultaneously (parallel execution!)
                const updateCount = Math.floor(Math.random() * 6) + 3;

                for (let i = 0; i < updateCount; i++) {
                    const idx = Math.floor(Math.random() * newAgents.length);
                    const statuses: AgentStatus[] = ["idle", "voting", "molting", "consensus"];
                    const votes: VoteDecision[] = ["approve", "reject", "abstain"];

                    newAgents[idx] = {
                        ...newAgents[idx],
                        status: statuses[Math.floor(Math.random() * statuses.length)],
                        lastVote: Math.random() > 0.5
                            ? votes[Math.floor(Math.random() * votes.length)]
                            : newAgents[idx].lastVote,
                    };
                }

                return newAgents;
            });
        }, 500); // Update every 500ms to show parallel activity

        return () => clearInterval(interval);
    }, [isSimulating, agents.length]);

    const handleAgentClick = useCallback((agent: Agent) => {
        setSelectedAgent(agent);
        onAgentSelect?.(agent);
    }, [onAgentSelect]);

    // Stats
    const votingCount = agents.filter(a => a.status === "voting").length;
    const consensusCount = agents.filter(a => a.status === "consensus").length;
    const moltingCount = agents.filter(a => a.status === "molting").length;
    const moltbookCount = agents.filter(a => a.moltbookMember).length;

    return (
        <div className="card">
            {/* Header */}
            <div className="card-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span>KOVAN</span>
                    <span className="text-[--text-muted]">|</span>
                    <span className="text-[--text-secondary] normal-case tracking-normal">
                        50 Paralel Ajan
                    </span>
                </div>

                <button
                    onClick={() => setIsSimulating(!isSimulating)}
                    className={`text-xs px-2 py-1 border ${isSimulating
                        ? "border-[--accent-orange] text-[--accent-orange]"
                        : "border-[--border-medium] text-[--text-muted]"
                        }`}
                >
                    {isSimulating ? "● CANLI" : "○ DURDURULDU"}
                </button>
            </div>

            {/* Stats Bar */}
            <div className="flex gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[--accent-orange] animate-pulse" />
                    <span className="text-[--text-muted]">Oy Veriyor:</span>
                    <span className="text-[--accent-orange]">{votingCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[--status-consensus]" />
                    <span className="text-[--text-muted]">Konsensüs:</span>
                    <span className="text-[--status-consensus]">{consensusCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[--accent-neon]" />
                    <span className="text-[--text-muted]">Kabuk Değiştiriyor:</span>
                    <span className="text-[--accent-neon]">{moltingCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[--text-muted]">Moltbook:</span>
                    <span className="text-[--text-secondary]">{moltbookCount}/50</span>
                </div>
            </div>

            {/* Agent Grid - 10x5 */}
            <div className="grid grid-cols-10 gap-2 p-2 bg-[--bg-black] border border-[--border-dark] circuit-pattern">
                <AnimatePresence>
                    {agents.map((agent) => (
                        <AgentCell
                            key={agent.id}
                            agent={agent}
                            onClick={handleAgentClick}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Selected Agent Info */}
            {selectedAgent && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-[--bg-black] border border-[--accent-orange]"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[--accent-orange] font-bold flex items-center gap-2">
                            {selectedAgent.personality?.emoji} {selectedAgent.name}
                        </span>
                        <span className={`badge ${selectedAgent.status === "idle" ? "badge-idle" : "badge-active"}`}>
                            {selectedAgent.status.toUpperCase()}
                        </span>
                    </div>
                    {selectedAgent.personality?.catchphrase && (
                        <p className="text-xs text-[--text-secondary] italic mb-2">
                            &quot;{selectedAgent.personality.catchphrase}&quot;
                        </p>
                    )}
                    <div className="grid grid-cols-4 gap-4 text-xs">
                        <div>
                            <span className="text-[--text-muted]">Oy:</span>{" "}
                            <span className="text-[--text-secondary]">{selectedAgent.votesCount}</span>
                        </div>
                        <div>
                            <span className="text-[--text-muted]">Konsensüs:</span>{" "}
                            <span className="text-[--text-secondary]">%{selectedAgent.consensusRate.toFixed(1)}</span>
                        </div>
                        <div>
                            <span className="text-[--text-muted]">Karma:</span>{" "}
                            <span className="text-[--accent-neon]">{selectedAgent.karma || 0}</span>
                        </div>
                        <div>
                            <span className="text-[--text-muted]">Moltbook:</span>{" "}
                            <span className={selectedAgent.moltbookMember ? "text-[--accent-neon]" : "text-[--text-muted]"}>
                                {selectedAgent.moltbookMember ? "VATANDAŞ" : "—"}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
