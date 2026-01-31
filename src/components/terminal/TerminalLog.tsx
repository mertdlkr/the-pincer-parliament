"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogEntry, LogType } from "@/types/agent";

// Generate mock log entries
function generateMockLogs(): LogEntry[] {
    const agents = ["CRAB-01", "MOLT-12", "KISK-07", "CRAB-33", "MOLT-42", "KISK-19", "CRAB-50"];
    const messages = {
        vote: [
            "VOTE_CAST: APPROVE on proposal #0x8f3a...",
            "VOTE_CAST: REJECT on proposal #0x8f3a...",
            "VOTE_PENDING: Analyzing proposal parameters...",
        ],
        molt: [
            "MOLT_INITIATED: Shedding Phase 2 shell...",
            "MOLT_COMPLETE: New parameters applied",
            "MOLT_SYNC: Syncing with Moltbook registry...",
        ],
        consensus: [
            "CONSENSUS_REACHED: 67% approval threshold met",
            "CONSENSUS_BUILDING: 45% approval, 30% pending...",
        ],
        system: [
            "SYSTEM > Block #1,234,567 processed",
            "SYSTEM > Parallel vote batch executed: 8 votes",
            "SYSTEM > Moltbook citizen verified: 0x7a3f...",
        ],
    };

    return Array.from({ length: 20 }, (_, i) => {
        const types: LogType[] = ["vote", "molt", "consensus", "system", "info"];
        const type = types[Math.floor(Math.random() * types.length)];
        const agent = agents[Math.floor(Math.random() * agents.length)];
        const messagePool = messages[type as keyof typeof messages] || messages.vote;

        return {
            id: `log-${Date.now()}-${i}`,
            timestamp: new Date(Date.now() - (20 - i) * 1000),
            type,
            agentId: type === "system" ? undefined : `agent-${agent.split("-")[1]}`,
            agentName: type === "system" ? "SYSTEM" : agent,
            message: messagePool[Math.floor(Math.random() * messagePool.length)],
        };
    });
}

interface TerminalLogProps {
    height?: string;
}

export function TerminalLog({ height = "300px" }: TerminalLogProps) {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isStreaming, setIsStreaming] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize logs
    useEffect(() => {
        setLogs(generateMockLogs());
    }, []);

    // Simulate streaming logs
    useEffect(() => {
        if (!isStreaming) return;

        const interval = setInterval(() => {
            const newLog = generateNewLog();
            setLogs(prev => [...prev.slice(-50), newLog]); // Keep last 50 logs
        }, 800);

        return () => clearInterval(interval);
    }, [isStreaming]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="card">
            <div className="card-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span>MOLT-LOG</span>
                    <span className="text-[--text-muted]">|</span>
                    <span className="text-[--text-secondary] normal-case tracking-normal">
                        Live Feed
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLogs([])}
                        className="text-xs px-2 py-1 border border-[--border-medium] text-[--text-muted] hover:text-[--accent-orange] hover:border-[--accent-orange]"
                    >
                        CLEAR
                    </button>
                    <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`text-xs px-2 py-1 border ${isStreaming
                                ? "border-[--accent-orange] text-[--accent-orange]"
                                : "border-[--border-medium] text-[--text-muted]"
                            }`}
                    >
                        {isStreaming ? "● STREAMING" : "○ PAUSED"}
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="terminal overflow-y-auto"
                style={{ height }}
            >
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="log-line"
                            data-type={log.type}
                        >
                            <span className="log-timestamp">
                                [{formatTime(log.timestamp)}]
                            </span>
                            <span className="log-agent">
                                {log.agentName}
                            </span>
                            <span className="text-[--text-muted]">{">"}</span>
                            <span className="log-message">
                                {log.message}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Cursor blink */}
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-[--accent-orange] animate-pulse">_</span>
                </div>
            </div>
        </div>
    );
}

function formatTime(date: Date): string {
    return date.toTimeString().split(" ")[0] + "." +
        String(date.getMilliseconds()).padStart(3, "0");
}

function generateNewLog(): LogEntry {
    const agents = ["CRAB-01", "MOLT-12", "KISK-07", "CRAB-33", "MOLT-42", "KISK-19"];
    const types: LogType[] = ["vote", "molt", "consensus", "system"];
    const type = types[Math.floor(Math.random() * types.length)];
    const agent = agents[Math.floor(Math.random() * agents.length)];

    const messages: Record<string, string[]> = {
        vote: [
            "VOTE_CAST: APPROVE on proposal #0x" + Math.random().toString(16).slice(2, 6) + "...",
            "VOTE_CAST: REJECT on proposal #0x" + Math.random().toString(16).slice(2, 6) + "...",
            "VOTE_ABSTAIN: Insufficient data for decision",
        ],
        molt: [
            "MOLT_SYNC: Shell parameters updated",
            "MOLT_INITIATED: Beginning phase transition...",
        ],
        consensus: [
            `CONSENSUS_BUILDING: ${Math.floor(40 + Math.random() * 35)}% approval reached`,
        ],
        system: [
            `BLOCK_PROCESSED: #${(1234567 + Math.floor(Math.random() * 1000)).toLocaleString()}`,
            "PARALLEL_BATCH: " + (3 + Math.floor(Math.random() * 5)) + " operations executed",
        ],
    };

    return {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        type,
        agentId: type === "system" ? undefined : `agent-${agent.split("-")[1]}`,
        agentName: type === "system" ? "SYSTEM" : agent,
        message: messages[type][Math.floor(Math.random() * messages[type].length)],
    };
}
