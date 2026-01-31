// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";

/**
 * @title PincerGov
 * @author The Pincer Parliament
 * @notice Parallel Voting & State Management Engine for The Pincer Parliament
 * @dev Optimized for Monad's 10,000 TPS parallel execution
 *
 * ██████╗ ██╗███╗   ██╗ ██████╗███████╗██████╗ 
 * ██╔══██╗██║████╗  ██║██╔════╝██╔════╝██╔══██╗
 * ██████╔╝██║██╔██╗ ██║██║     █████╗  ██████╔╝
 * ██╔═══╝ ██║██║╚██╗██║██║     ██╔══╝  ██╔══██╗
 * ██║     ██║██║ ╚████║╚██████╗███████╗██║  ██║
 * ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝╚═╝  ╚═╝
 */
contract PincerGov {
    // ═══════════════════════════════════════════════════════════════
    // STORAGE
    // ═══════════════════════════════════════════════════════════════

    /// @notice Current molt phase (1-5)
    uint8 public currentPhase;
    
    /// @notice Total proposals created
    uint256 public proposalCount;
    
    /// @notice Consensus threshold (67% = 67)
    uint8 public constant CONSENSUS_THRESHOLD = 67;
    
    /// @notice Registry contract reference
    address public moltRegistry;
    
    /// @notice Admin/deployer address
    address public admin;

    // ═══════════════════════════════════════════════════════════════
    // TYPES
    // ═══════════════════════════════════════════════════════════════

    enum ProposalStatus { Pending, Active, Passed, Rejected, Executed }
    enum VoteType { Abstain, Approve, Reject }
    
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint8 category; // 0: Protocol, 1: Code, 2: Conflict
        address proposer;
        uint256 createdAt;
        uint256 votingEndsAt;
        ProposalStatus status;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 votesAbstain;
    }
    
    struct Vote {
        VoteType voteType;
        uint256 timestamp;
        string reasoning; // Optional AI reasoning
    }

    // ═══════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════

    /// @notice Proposals mapping
    mapping(uint256 => Proposal) public proposals;
    
    /// @notice Votes: proposalId => agentAddress => Vote
    mapping(uint256 => mapping(address => Vote)) public votes;
    
    /// @notice Whether an agent has voted on a proposal
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // ═══════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════

    event ProposalCreated(
        uint256 indexed proposalId,
        string title,
        address indexed proposer,
        uint8 category
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed agent,
        VoteType voteType,
        uint256 timestamp
    );
    
    event ConsensusReached(
        uint256 indexed proposalId,
        bool passed,
        uint256 approvalRate
    );
    
    event ProposalExecuted(
        uint256 indexed proposalId,
        uint256 timestamp
    );
    
    event MoltPhaseAdvanced(
        uint8 fromPhase,
        uint8 toPhase,
        uint256 timestamp
    );

    // ═══════════════════════════════════════════════════════════════
    // MODIFIERS
    // ═══════════════════════════════════════════════════════════════

    modifier onlyAdmin() {
        require(msg.sender == admin, "PincerGov: not admin");
        _;
    }
    
    modifier onlyRegisteredAgent() {
        require(
            moltRegistry == address(0) || IMoltRegistry(moltRegistry).isRegisteredAgent(msg.sender),
            "PincerGov: not registered agent"
        );
        _;
    }
    
    modifier proposalExists(uint256 _proposalId) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "PincerGov: invalid proposal");
        _;
    }

    // ═══════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════

    constructor(address _moltRegistry) {
        admin = msg.sender;
        moltRegistry = _moltRegistry;
        currentPhase = 1;
    }

    // ═══════════════════════════════════════════════════════════════
    // PROPOSAL FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Create a new proposal ("The Offering")
     * @param _title Proposal title
     * @param _description Full description
     * @param _category 0: Protocol Tuning, 1: Code Evolution, 2: Conflict Resolution
     * @param _votingDuration Duration in seconds
     */
    function createProposal(
        string calldata _title,
        string calldata _description,
        uint8 _category,
        uint256 _votingDuration
    ) external returns (uint256) {
        require(_category <= 2, "PincerGov: invalid category");
        require(_votingDuration >= 1 hours, "PincerGov: voting too short");
        
        proposalCount++;
        
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            category: _category,
            proposer: msg.sender,
            createdAt: block.timestamp,
            votingEndsAt: block.timestamp + _votingDuration,
            status: ProposalStatus.Active,
            votesFor: 0,
            votesAgainst: 0,
            votesAbstain: 0
        });
        
        emit ProposalCreated(proposalCount, _title, msg.sender, _category);
        
        return proposalCount;
    }

    /**
     * @notice Cast a vote on a proposal
     * @dev Optimized for parallel execution - minimal state changes
     * @param _proposalId Proposal to vote on
     * @param _voteType 0: Abstain, 1: Approve, 2: Reject
     * @param _reasoning Optional AI reasoning string
     */
    function castVote(
        uint256 _proposalId,
        VoteType _voteType,
        string calldata _reasoning
    ) external proposalExists(_proposalId) onlyRegisteredAgent {
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Active, "PincerGov: not active");
        require(block.timestamp <= proposal.votingEndsAt, "PincerGov: voting ended");
        require(!hasVoted[_proposalId][msg.sender], "PincerGov: already voted");
        
        // Record vote
        hasVoted[_proposalId][msg.sender] = true;
        votes[_proposalId][msg.sender] = Vote({
            voteType: _voteType,
            timestamp: block.timestamp,
            reasoning: _reasoning
        });
        
        // Update tallies
        if (_voteType == VoteType.Approve) {
            proposal.votesFor++;
        } else if (_voteType == VoteType.Reject) {
            proposal.votesAgainst++;
        } else {
            proposal.votesAbstain++;
        }
        
        emit VoteCast(_proposalId, msg.sender, _voteType, block.timestamp);
        
        // Check for early consensus (optional optimization for Monad parallel execution)
        _checkConsensus(_proposalId);
    }

    /**
     * @notice Batch vote submission for parallel agent voting
     * @dev Allows multiple votes in a single transaction for gas efficiency
     */
    function batchCastVotes(
        uint256[] calldata _proposalIds,
        VoteType[] calldata _voteTypes,
        string[] calldata _reasonings
    ) external onlyRegisteredAgent {
        require(_proposalIds.length == _voteTypes.length, "PincerGov: length mismatch");
        require(_proposalIds.length == _reasonings.length, "PincerGov: length mismatch");
        
        for (uint256 i = 0; i < _proposalIds.length; i++) {
            uint256 proposalId = _proposalIds[i];
            
            if (proposalId > 0 && proposalId <= proposalCount) {
                Proposal storage proposal = proposals[proposalId];
                
                if (
                    proposal.status == ProposalStatus.Active &&
                    block.timestamp <= proposal.votingEndsAt &&
                    !hasVoted[proposalId][msg.sender]
                ) {
                    hasVoted[proposalId][msg.sender] = true;
                    votes[proposalId][msg.sender] = Vote({
                        voteType: _voteTypes[i],
                        timestamp: block.timestamp,
                        reasoning: _reasonings[i]
                    });
                    
                    if (_voteTypes[i] == VoteType.Approve) {
                        proposal.votesFor++;
                    } else if (_voteTypes[i] == VoteType.Reject) {
                        proposal.votesAgainst++;
                    } else {
                        proposal.votesAbstain++;
                    }
                    
                    emit VoteCast(proposalId, msg.sender, _voteTypes[i], block.timestamp);
                }
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // CONSENSUS & EXECUTION
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Finalize a proposal after voting ends
     * @param _proposalId Proposal to finalize
     */
    function finalizeProposal(uint256 _proposalId) external proposalExists(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Active, "PincerGov: not active");
        require(block.timestamp > proposal.votingEndsAt, "PincerGov: voting not ended");
        
        _checkConsensus(_proposalId);
    }

    /**
     * @notice Execute a passed proposal
     * @param _proposalId Proposal to execute
     */
    function executeProposal(uint256 _proposalId) external proposalExists(_proposalId) onlyAdmin {
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Passed, "PincerGov: not passed");
        
        proposal.status = ProposalStatus.Executed;
        
        emit ProposalExecuted(_proposalId, block.timestamp);
    }

    /**
     * @dev Internal consensus check
     */
    function _checkConsensus(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
        
        if (totalVotes == 0) return;
        
        uint256 approvalRate = (proposal.votesFor * 100) / totalVotes;
        
        // Check if consensus reached (67%)
        if (approvalRate >= CONSENSUS_THRESHOLD) {
            proposal.status = ProposalStatus.Passed;
            emit ConsensusReached(_proposalId, true, approvalRate);
        } else if (block.timestamp > proposal.votingEndsAt) {
            // Voting ended without consensus
            proposal.status = ProposalStatus.Rejected;
            emit ConsensusReached(_proposalId, false, approvalRate);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // MOLT PHASE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Advance to next molt phase
     */
    function advanceMoltPhase() external onlyAdmin {
        require(currentPhase < 5, "PincerGov: max phase reached");
        
        uint8 oldPhase = currentPhase;
        currentPhase++;
        
        emit MoltPhaseAdvanced(oldPhase, currentPhase, block.timestamp);
    }

    /**
     * @notice Reset molt phase (new cycle)
     */
    function resetMoltPhase() external onlyAdmin {
        uint8 oldPhase = currentPhase;
        currentPhase = 1;
        
        emit MoltPhaseAdvanced(oldPhase, 1, block.timestamp);
    }

    // ═══════════════════════════════════════════════════════════════
    // VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Get proposal details
     */
    function getProposal(uint256 _proposalId) external view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    /**
     * @notice Get current phase info
     */
    function getCurrentPhase() external view returns (uint8) {
        return currentPhase;
    }

    /**
     * @notice Get approval rate for a proposal
     */
    function getApprovalRate(uint256 _proposalId) external view returns (uint256) {
        Proposal storage proposal = proposals[_proposalId];
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
        
        if (totalVotes == 0) return 0;
        
        return (proposal.votesFor * 100) / totalVotes;
    }

    /**
     * @notice Update registry address
     */
    function setMoltRegistry(address _registry) external onlyAdmin {
        moltRegistry = _registry;
    }
}

// ═══════════════════════════════════════════════════════════════════
// INTERFACE
// ═══════════════════════════════════════════════════════════════════

interface IMoltRegistry {
    function isRegisteredAgent(address agent) external view returns (bool);
}
