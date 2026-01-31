// PincerGov ABI - Parallel Voting & State Management Engine
export const PINCER_GOV_ABI = [
    // Read Functions
    {
        inputs: [],
        name: "admin",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "currentPhase",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "proposalCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "CONSENSUS_THRESHOLD",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
        name: "getProposal",
        outputs: [
            {
                components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    { internalType: "string", name: "title", type: "string" },
                    { internalType: "string", name: "description", type: "string" },
                    { internalType: "uint8", name: "category", type: "uint8" },
                    { internalType: "address", name: "proposer", type: "address" },
                    { internalType: "uint256", name: "createdAt", type: "uint256" },
                    { internalType: "uint256", name: "votingEndsAt", type: "uint256" },
                    { internalType: "uint8", name: "status", type: "uint8" },
                    { internalType: "uint256", name: "votesFor", type: "uint256" },
                    { internalType: "uint256", name: "votesAgainst", type: "uint256" },
                    { internalType: "uint256", name: "votesAbstain", type: "uint256" },
                ],
                internalType: "struct PincerGov.Proposal",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
        name: "getApprovalRate",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },

    // Write Functions
    {
        inputs: [
            { internalType: "string", name: "_title", type: "string" },
            { internalType: "string", name: "_description", type: "string" },
            { internalType: "uint8", name: "_category", type: "uint8" },
            { internalType: "uint256", name: "_votingDuration", type: "uint256" },
        ],
        name: "createProposal",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_proposalId", type: "uint256" },
            { internalType: "uint8", name: "_voteType", type: "uint8" },
            { internalType: "string", name: "_reasoning", type: "string" },
        ],
        name: "castVote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256[]", name: "_proposalIds", type: "uint256[]" },
            { internalType: "uint8[]", name: "_voteTypes", type: "uint8[]" },
            { internalType: "string[]", name: "_reasonings", type: "string[]" },
        ],
        name: "batchCastVotes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
        name: "finalizeProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },

    // Events
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "proposalId", type: "uint256" },
            { indexed: false, internalType: "string", name: "title", type: "string" },
            { indexed: true, internalType: "address", name: "proposer", type: "address" },
            { indexed: false, internalType: "uint8", name: "category", type: "uint8" },
        ],
        name: "ProposalCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "proposalId", type: "uint256" },
            { indexed: true, internalType: "address", name: "agent", type: "address" },
            { indexed: false, internalType: "uint8", name: "voteType", type: "uint8" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "VoteCast",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "proposalId", type: "uint256" },
            { indexed: false, internalType: "bool", name: "passed", type: "bool" },
            { indexed: false, internalType: "uint256", name: "approvalRate", type: "uint256" },
        ],
        name: "ConsensusReached",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "uint8", name: "fromPhase", type: "uint8" },
            { indexed: false, internalType: "uint8", name: "toPhase", type: "uint8" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "MoltPhaseAdvanced",
        type: "event",
    },
] as const;

// MoltRegistry ABI - Agent Identity Management
export const MOLT_REGISTRY_ABI = [
    // Read Functions
    {
        inputs: [],
        name: "totalAgents",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MAX_AGENTS",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_agentAddress", type: "address" }],
        name: "getAgent",
        outputs: [
            {
                components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    { internalType: "string", name: "name", type: "string" },
                    { internalType: "uint8", name: "agentType", type: "uint8" },
                    { internalType: "uint8", name: "status", type: "uint8" },
                    { internalType: "address", name: "owner", type: "address" },
                    { internalType: "bool", name: "moltbookMember", type: "bool" },
                    { internalType: "uint256", name: "registeredAt", type: "uint256" },
                    { internalType: "uint256", name: "lastMoltAt", type: "uint256" },
                    { internalType: "uint256", name: "moltCount", type: "uint256" },
                    { internalType: "uint256", name: "votesCount", type: "uint256" },
                    { internalType: "uint256", name: "consensusHits", type: "uint256" },
                ],
                internalType: "struct MoltRegistry.Agent",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "agent", type: "address" }],
        name: "isRegisteredAgent",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMoltbookMemberCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_agentAddress", type: "address" }],
        name: "getConsensusRate",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getActiveAgents",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
    },

    // Events
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "agentId", type: "uint256" },
            { indexed: false, internalType: "string", name: "name", type: "string" },
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: false, internalType: "bool", name: "moltbookMember", type: "bool" },
        ],
        name: "AgentRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "agentId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "moltCount", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "AgentMolted",
        type: "event",
    },
] as const;
