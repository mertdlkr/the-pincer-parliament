"use client";

import { motion } from "framer-motion";
import { Agent, AgentStatus } from "@/types/agent";

interface AgentCellProps {
    agent: Agent;
    onClick?: (agent: Agent) => void;
}

export function AgentCell({ agent, onClick }: AgentCellProps) {
    return (
        <motion.div
            className="agent-cell"
            data-status={agent.status}
            onClick={() => onClick?.(agent)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            {/* Status LED */}
            <div className={`status-led ${agent.status === "idle" ? "idle" : "active"}`} />

            {/* Agent Icon - Stylized Crab */}
            <div className="text-xl mb-1">
                <AgentIcon status={agent.status} />
            </div>

            {/* Agent ID */}
            <span className="agent-id">{agent.name}</span>

            {/* Moltbook badge */}
            {agent.moltbookMember && (
                <div className="absolute bottom-1 left-1">
                    <div className="w-2 h-2 bg-[--accent-neon] rounded-full" title="Moltbook Member" />
                </div>
            )}

            {/* Vote indicator */}
            {agent.lastVote && (
                <div className="absolute bottom-1 right-1 text-[0.5rem]">
                    {agent.lastVote === "approve" && <span className="text-green-500">✓</span>}
                    {agent.lastVote === "reject" && <span className="text-red-500">✗</span>}
                    {agent.lastVote === "abstain" && <span className="text-gray-500">○</span>}
                </div>
            )}
        </motion.div>
    );
}

function AgentIcon({ status }: { status: AgentStatus }) {
    // SVG claw icon that changes based on status
    const getColor = () => {
        switch (status) {
            case "voting": return "var(--accent-orange)";
            case "molting": return "var(--accent-neon)";
            case "consensus": return "#00FF88";
            case "error": return "#FF3333";
            default: return "var(--text-muted)";
        }
    };

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: getColor() }}
        >
            {/* Stylized claw/pincer */}
            <path
                d="M12 4L18 8V14L12 18L6 14V8L12 4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="miter"
            />
            <path
                d="M6 8L3 6L2 9L5 11"
                stroke="currentColor"
                strokeWidth="1"
                fill="currentColor"
                fillOpacity="0.5"
            />
            <path
                d="M18 8L21 6L22 9L19 11"
                stroke="currentColor"
                strokeWidth="1"
                fill="currentColor"
                fillOpacity="0.5"
            />
            <circle cx="10" cy="10" r="1" fill="currentColor" />
            <circle cx="14" cy="10" r="1" fill="currentColor" />
        </svg>
    );
}
