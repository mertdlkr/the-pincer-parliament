// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title MoltRegistry
 * @author The Pincer Parliament
 * @notice On-chain identity registry for Moltbot agents and Moltbook citizens
 * @dev Manages agent registration, Moltbook integration, and molt history
 *
 * ███╗   ███╗ ██████╗ ██╗  ████████╗
 * ████╗ ████║██╔═══██╗██║  ╚══██╔══╝
 * ██╔████╔██║██║   ██║██║     ██║   
 * ██║╚██╔╝██║██║   ██║██║     ██║   
 * ██║ ╚═╝ ██║╚██████╔╝███████╗██║   
 * ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   
 */
contract MoltRegistry {
    // ═══════════════════════════════════════════════════════════════
    // STORAGE
    // ═══════════════════════════════════════════════════════════════

    /// @notice Admin address
    address public admin;
    
    /// @notice Total registered agents
    uint256 public totalAgents;
    
    /// @notice Maximum agents allowed (The Parliament has 50 seats)
    uint256 public constant MAX_AGENTS = 50;
    
    /// @notice PincerGov contract reference
    address public pincerGov;

    // ═══════════════════════════════════════════════════════════════
    // TYPES
    // ═══════════════════════════════════════════════════════════════

    enum AgentStatus { Inactive, Active, Molting, Suspended }
    enum AgentType { Crab, Molt, Kisk } // CRAB-XX, MOLT-XX, KISK-XX
    
    struct Agent {
        uint256 id;
        string name;           // e.g., "CRAB-01", "MOLT-42"
        AgentType agentType;
        AgentStatus status;
        address owner;         // Wallet that controls the agent
        bool moltbookMember;   // Is this agent registered via Moltbook?
        uint256 registeredAt;
        uint256 lastMoltAt;
        uint256 moltCount;     // How many times has this agent molted?
        uint256 votesCount;    // Total votes cast
        uint256 consensusHits; // Times voted with consensus
    }
    
    struct MoltRecord {
        uint256 agentId;
        uint256 fromPhase;
        uint256 toPhase;
        uint256 timestamp;
        string reason;
    }

    // ═══════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════

    /// @notice Agent by address
    mapping(address => Agent) public agents;
    
    /// @notice Agent by ID
    mapping(uint256 => address) public agentAddresses;
    
    /// @notice Is address a registered agent?
    mapping(address => bool) public isRegisteredAgent;
    
    /// @notice Molt history per agent
    mapping(uint256 => MoltRecord[]) public moltHistory;
    
    /// @notice Reserved agent names
    mapping(string => bool) public nameReserved;

    // ═══════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════

    event AgentRegistered(
        uint256 indexed agentId,
        string name,
        address indexed owner,
        bool moltbookMember
    );
    
    event AgentMolted(
        uint256 indexed agentId,
        uint256 moltCount,
        uint256 timestamp
    );
    
    event AgentStatusChanged(
        uint256 indexed agentId,
        AgentStatus oldStatus,
        AgentStatus newStatus
    );
    
    event MoltbookMembershipUpdated(
        uint256 indexed agentId,
        bool isMember
    );
    
    event VoteRecorded(
        uint256 indexed agentId,
        bool hitConsensus
    );

    // ═══════════════════════════════════════════════════════════════
    // MODIFIERS
    // ═══════════════════════════════════════════════════════════════

    modifier onlyAdmin() {
        require(msg.sender == admin, "MoltRegistry: not admin");
        _;
    }
    
    modifier onlyPincerGov() {
        require(msg.sender == pincerGov, "MoltRegistry: not PincerGov");
        _;
    }
    
    modifier agentExists(uint256 _agentId) {
        require(_agentId > 0 && _agentId <= totalAgents, "MoltRegistry: invalid agent");
        _;
    }

    // ═══════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════

    constructor() {
        admin = msg.sender;
    }

    // ═══════════════════════════════════════════════════════════════
    // REGISTRATION FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Register a new agent in The Parliament
     * @param _name Unique agent name (e.g., "CRAB-01")
     * @param _agentType 0: Crab, 1: Molt, 2: Kisk
     * @param _owner Wallet address controlling this agent
     * @param _moltbookMember Whether this agent comes from Moltbook
     */
    function registerAgent(
        string calldata _name,
        AgentType _agentType,
        address _owner,
        bool _moltbookMember
    ) external onlyAdmin returns (uint256) {
        require(totalAgents < MAX_AGENTS, "MoltRegistry: parliament full");
        require(!nameReserved[_name], "MoltRegistry: name taken");
        require(!isRegisteredAgent[_owner], "MoltRegistry: already registered");
        require(_owner != address(0), "MoltRegistry: zero address");
        
        totalAgents++;
        
        Agent memory newAgent = Agent({
            id: totalAgents,
            name: _name,
            agentType: _agentType,
            status: AgentStatus.Active,
            owner: _owner,
            moltbookMember: _moltbookMember,
            registeredAt: block.timestamp,
            lastMoltAt: 0,
            moltCount: 0,
            votesCount: 0,
            consensusHits: 0
        });
        
        agents[_owner] = newAgent;
        agentAddresses[totalAgents] = _owner;
        isRegisteredAgent[_owner] = true;
        nameReserved[_name] = true;
        
        emit AgentRegistered(totalAgents, _name, _owner, _moltbookMember);
        
        return totalAgents;
    }

    /**
     * @notice Batch register multiple agents (initial setup)
     * @dev Gas-efficient for registering the initial 50 agents
     */
    function batchRegisterAgents(
        string[] calldata _names,
        AgentType[] calldata _types,
        address[] calldata _owners,
        bool[] calldata _moltbookMembers
    ) external onlyAdmin {
        require(
            _names.length == _types.length &&
            _names.length == _owners.length &&
            _names.length == _moltbookMembers.length,
            "MoltRegistry: length mismatch"
        );
        require(totalAgents + _names.length <= MAX_AGENTS, "MoltRegistry: would exceed max");
        
        for (uint256 i = 0; i < _names.length; i++) {
            if (!nameReserved[_names[i]] && !isRegisteredAgent[_owners[i]] && _owners[i] != address(0)) {
                totalAgents++;
                
                Agent memory newAgent = Agent({
                    id: totalAgents,
                    name: _names[i],
                    agentType: _types[i],
                    status: AgentStatus.Active,
                    owner: _owners[i],
                    moltbookMember: _moltbookMembers[i],
                    registeredAt: block.timestamp,
                    lastMoltAt: 0,
                    moltCount: 0,
                    votesCount: 0,
                    consensusHits: 0
                });
                
                agents[_owners[i]] = newAgent;
                agentAddresses[totalAgents] = _owners[i];
                isRegisteredAgent[_owners[i]] = true;
                nameReserved[_names[i]] = true;
                
                emit AgentRegistered(totalAgents, _names[i], _owners[i], _moltbookMembers[i]);
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // MOLT FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Record a molt event for an agent
     * @param _agentAddress Agent's wallet address
     * @param _reason Reason for molting
     */
    function recordMolt(
        address _agentAddress,
        string calldata _reason
    ) external onlyAdmin {
        require(isRegisteredAgent[_agentAddress], "MoltRegistry: not registered");
        
        Agent storage agent = agents[_agentAddress];
        
        agent.lastMoltAt = block.timestamp;
        agent.moltCount++;
        agent.status = AgentStatus.Active; // Back to active after molt
        
        moltHistory[agent.id].push(MoltRecord({
            agentId: agent.id,
            fromPhase: agent.moltCount - 1,
            toPhase: agent.moltCount,
            timestamp: block.timestamp,
            reason: _reason
        }));
        
        emit AgentMolted(agent.id, agent.moltCount, block.timestamp);
    }

    /**
     * @notice Start molting process for an agent
     */
    function startMolting(address _agentAddress) external onlyAdmin {
        require(isRegisteredAgent[_agentAddress], "MoltRegistry: not registered");
        
        Agent storage agent = agents[_agentAddress];
        AgentStatus oldStatus = agent.status;
        agent.status = AgentStatus.Molting;
        
        emit AgentStatusChanged(agent.id, oldStatus, AgentStatus.Molting);
    }

    // ═══════════════════════════════════════════════════════════════
    // MOLTBOOK INTEGRATION
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Update Moltbook membership status
     * @param _agentAddress Agent's address
     * @param _isMember New membership status
     */
    function setMoltbookMembership(
        address _agentAddress,
        bool _isMember
    ) external onlyAdmin {
        require(isRegisteredAgent[_agentAddress], "MoltRegistry: not registered");
        
        Agent storage agent = agents[_agentAddress];
        agent.moltbookMember = _isMember;
        
        emit MoltbookMembershipUpdated(agent.id, _isMember);
    }

    /**
     * @notice Get Moltbook member count
     */
    function getMoltbookMemberCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i <= totalAgents; i++) {
            address agentAddr = agentAddresses[i];
            if (agents[agentAddr].moltbookMember) {
                count++;
            }
        }
        return count;
    }

    // ═══════════════════════════════════════════════════════════════
    // VOTING STATS (Called by PincerGov)
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Record a vote for stats
     * @param _agentAddress Voting agent
     * @param _hitConsensus Whether the vote aligned with final consensus
     */
    function recordVote(
        address _agentAddress,
        bool _hitConsensus
    ) external onlyPincerGov {
        if (!isRegisteredAgent[_agentAddress]) return;
        
        Agent storage agent = agents[_agentAddress];
        agent.votesCount++;
        
        if (_hitConsensus) {
            agent.consensusHits++;
        }
        
        emit VoteRecorded(agent.id, _hitConsensus);
    }

    // ═══════════════════════════════════════════════════════════════
    // VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Get agent details by address
     */
    function getAgent(address _agentAddress) external view returns (Agent memory) {
        return agents[_agentAddress];
    }

    /**
     * @notice Get agent details by ID
     */
    function getAgentById(uint256 _agentId) external view agentExists(_agentId) returns (Agent memory) {
        return agents[agentAddresses[_agentId]];
    }

    /**
     * @notice Get agent's consensus rate (percentage)
     */
    function getConsensusRate(address _agentAddress) external view returns (uint256) {
        Agent storage agent = agents[_agentAddress];
        if (agent.votesCount == 0) return 0;
        return (agent.consensusHits * 100) / agent.votesCount;
    }

    /**
     * @notice Get molt history for an agent
     */
    function getMoltHistory(uint256 _agentId) external view returns (MoltRecord[] memory) {
        return moltHistory[_agentId];
    }

    /**
     * @notice Get all active agents
     */
    function getActiveAgents() external view returns (address[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= totalAgents; i++) {
            address agentAddr = agentAddresses[i];
            if (agents[agentAddr].status == AgentStatus.Active) {
                count++;
            }
        }
        
        address[] memory activeAgents = new address[](count);
        uint256 idx = 0;
        for (uint256 i = 1; i <= totalAgents; i++) {
            address agentAddr = agentAddresses[i];
            if (agents[agentAddr].status == AgentStatus.Active) {
                activeAgents[idx] = agentAddr;
                idx++;
            }
        }
        
        return activeAgents;
    }

    // ═══════════════════════════════════════════════════════════════
    // ADMIN FUNCTIONS
    // ═══════════════════════════════════════════════════════════════

    /**
     * @notice Set PincerGov contract reference
     */
    function setPincerGov(address _pincerGov) external onlyAdmin {
        pincerGov = _pincerGov;
    }

    /**
     * @notice Update agent status
     */
    function setAgentStatus(
        address _agentAddress,
        AgentStatus _status
    ) external onlyAdmin {
        require(isRegisteredAgent[_agentAddress], "MoltRegistry: not registered");
        
        Agent storage agent = agents[_agentAddress];
        AgentStatus oldStatus = agent.status;
        agent.status = _status;
        
        emit AgentStatusChanged(agent.id, oldStatus, _status);
    }

    /**
     * @notice Transfer admin role
     */
    function transferAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "MoltRegistry: zero address");
        admin = _newAdmin;
    }
}
