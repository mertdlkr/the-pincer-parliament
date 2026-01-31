"use client";

import { useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { monadTestnet } from "viem/chains";
import { PINCER_GOV_ABI, MOLT_REGISTRY_ABI } from "@/lib/contracts";
import { CONTRACT_ADDRESSES } from "@/lib/wagmi-config";
import { useState, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// MONAD PARALLEL HOOK
// ═══════════════════════════════════════════════════════════════════

export function useMonadParallel() {
    const [blockNumber, setBlockNumber] = useState<bigint>(BigInt(0));
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Simulate block updates for demo (replace with real subscription)
        const interval = setInterval(() => {
            setBlockNumber(prev => prev + BigInt(1));
        }, 500); // Monad's fast block time

        setIsConnected(true);

        return () => clearInterval(interval);
    }, []);

    return {
        blockNumber,
        isConnected,
        chainId: monadTestnet.id,
        chainName: "Monad Testnet",
        rpcUrl: "https://testnet-rpc.monad.xyz",
    };
}

// ═══════════════════════════════════════════════════════════════════
// PINCER GOV HOOKS
// ═══════════════════════════════════════════════════════════════════

export function usePincerGov() {
    const { writeContract, isPending: isWriting, error: writeError } = useWriteContract();

    // Read current phase
    const { data: currentPhase } = useReadContract({
        address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
        abi: PINCER_GOV_ABI,
        functionName: "currentPhase",
        chainId: monadTestnet.id,
    });

    // Read proposal count
    const { data: proposalCount } = useReadContract({
        address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
        abi: PINCER_GOV_ABI,
        functionName: "proposalCount",
        chainId: monadTestnet.id,
    });

    // Create proposal
    const createProposal = useCallback(
        async (title: string, description: string, category: number, durationHours: number) => {
            return writeContract({
                address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
                abi: PINCER_GOV_ABI,
                functionName: "createProposal",
                args: [title, description, category, BigInt(durationHours * 3600)],
                chainId: monadTestnet.id,
            });
        },
        [writeContract]
    );

    // Cast vote
    const castVote = useCallback(
        async (proposalId: bigint, voteType: number, reasoning: string) => {
            return writeContract({
                address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
                abi: PINCER_GOV_ABI,
                functionName: "castVote",
                args: [proposalId, voteType, reasoning],
                chainId: monadTestnet.id,
            });
        },
        [writeContract]
    );

    // Batch vote (parallel execution!)
    const batchCastVotes = useCallback(
        async (proposalIds: bigint[], voteTypes: number[], reasonings: string[]) => {
            return writeContract({
                address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
                abi: PINCER_GOV_ABI,
                functionName: "batchCastVotes",
                args: [proposalIds, voteTypes, reasonings],
                chainId: monadTestnet.id,
            });
        },
        [writeContract]
    );

    return {
        currentPhase: currentPhase ? Number(currentPhase) : 1,
        proposalCount: proposalCount ? Number(proposalCount) : 0,
        createProposal,
        castVote,
        batchCastVotes,
        isWriting,
        writeError,
    };
}

// ═══════════════════════════════════════════════════════════════════
// MOLT REGISTRY HOOKS
// ═══════════════════════════════════════════════════════════════════

export function useMoltRegistry() {
    // Read total agents
    const { data: totalAgents } = useReadContract({
        address: CONTRACT_ADDRESSES.moltRegistry as `0x${string}`,
        abi: MOLT_REGISTRY_ABI,
        functionName: "totalAgents",
        chainId: monadTestnet.id,
    });

    // Read Moltbook member count
    const { data: moltbookCount } = useReadContract({
        address: CONTRACT_ADDRESSES.moltRegistry as `0x${string}`,
        abi: MOLT_REGISTRY_ABI,
        functionName: "getMoltbookMemberCount",
        chainId: monadTestnet.id,
    });

    // Read active agents
    const { data: activeAgents } = useReadContract({
        address: CONTRACT_ADDRESSES.moltRegistry as `0x${string}`,
        abi: MOLT_REGISTRY_ABI,
        functionName: "getActiveAgents",
        chainId: monadTestnet.id,
    });

    return {
        totalAgents: totalAgents ? Number(totalAgents) : 50, // Default 50 for demo
        moltbookCount: moltbookCount ? Number(moltbookCount) : 35, // Default for demo
        activeAgents: activeAgents || [],
        maxAgents: 50,
    };
}

// ═══════════════════════════════════════════════════════════════════
// EVENT WATCHERS
// ═══════════════════════════════════════════════════════════════════

export function useVoteEvents(onVote?: (event: VoteEvent) => void) {
    useWatchContractEvent({
        address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
        abi: PINCER_GOV_ABI,
        eventName: "VoteCast",
        chainId: monadTestnet.id,
        onLogs: (logs) => {
            logs.forEach((log) => {
                if (onVote && log.args) {
                    onVote({
                        proposalId: Number(log.args.proposalId),
                        agent: log.args.agent as string,
                        voteType: Number(log.args.voteType),
                        timestamp: Number(log.args.timestamp),
                    });
                }
            });
        },
    });
}

export function useConsensusEvents(onConsensus?: (event: ConsensusEvent) => void) {
    useWatchContractEvent({
        address: CONTRACT_ADDRESSES.pincerGov as `0x${string}`,
        abi: PINCER_GOV_ABI,
        eventName: "ConsensusReached",
        chainId: monadTestnet.id,
        onLogs: (logs) => {
            logs.forEach((log) => {
                if (onConsensus && log.args) {
                    onConsensus({
                        proposalId: Number(log.args.proposalId),
                        passed: log.args.passed as boolean,
                        approvalRate: Number(log.args.approvalRate),
                    });
                }
            });
        },
    });
}

// Types
interface VoteEvent {
    proposalId: number;
    agent: string;
    voteType: number;
    timestamp: number;
}

interface ConsensusEvent {
    proposalId: number;
    passed: boolean;
    approvalRate: number;
}
