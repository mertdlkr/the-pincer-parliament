// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/PincerGov.sol";
import "../src/MoltRegistry.sol";

/**
 * @title Deploy
 * @notice Deployment script for The Pincer Parliament contracts
 * @dev Run with: forge script script/Deploy.s.sol:Deploy --rpc-url monad_testnet --broadcast
 */
contract Deploy is Script {
    function run() external returns (address registry, address gov) {
        console.log("===========================================");
        console.log("DEPLOYING THE PINCER PARLIAMENT");
        console.log("===========================================");
        
        vm.startBroadcast();
        
        // 1. Deploy MoltRegistry first
        MoltRegistry moltRegistry = new MoltRegistry();
        registry = address(moltRegistry);
        console.log("MoltRegistry deployed at:", registry);
        
        // 2. Deploy PincerGov with registry reference
        PincerGov pincerGov = new PincerGov(registry);
        gov = address(pincerGov);
        console.log("PincerGov deployed at:", gov);
        
        // 3. Set PincerGov in registry
        moltRegistry.setPincerGov(gov);
        console.log("Registry linked to Gov");
        
        vm.stopBroadcast();
        
        console.log("===========================================");
        console.log("DEPLOYMENT COMPLETE");
        console.log("===========================================");
        console.log("MoltRegistry:", registry);
        console.log("PincerGov:", gov);
        console.log("");
        console.log("Add to .env.local:");
        console.log("NEXT_PUBLIC_MOLT_REGISTRY_ADDRESS=", registry);
        console.log("NEXT_PUBLIC_PINCER_GOV_ADDRESS=", gov);
        
        return (registry, gov);
    }
}

/**
 * @title RegisterAgents
 * @notice Batch register the initial 50 agents
 */
contract RegisterAgents is Script {
    function run(address registryAddress) external {
        MoltRegistry registry = MoltRegistry(registryAddress);
        
        vm.startBroadcast();
        
        // Generate 50 agent addresses (in production, use real addresses)
        string[] memory names = new string[](50);
        MoltRegistry.AgentType[] memory types = new MoltRegistry.AgentType[](50);
        address[] memory owners = new address[](50);
        bool[] memory moltbookMembers = new bool[](50);
        
        for (uint256 i = 0; i < 50; i++) {
            // Generate deterministic addresses for demo
            owners[i] = address(uint160(uint256(keccak256(abi.encodePacked("agent", i)))));
            
            // Assign types: CRAB (0-19), MOLT (20-39), KISK (40-49)
            if (i < 20) {
                types[i] = MoltRegistry.AgentType.Crab;
                names[i] = string(abi.encodePacked("CRAB-", _uint2str(i + 1)));
            } else if (i < 40) {
                types[i] = MoltRegistry.AgentType.Molt;
                names[i] = string(abi.encodePacked("MOLT-", _uint2str(i - 19)));
            } else {
                types[i] = MoltRegistry.AgentType.Kisk;
                names[i] = string(abi.encodePacked("KISK-", _uint2str(i - 39)));
            }
            
            // 35 out of 50 are Moltbook members
            moltbookMembers[i] = i < 35;
        }
        
        registry.batchRegisterAgents(names, types, owners, moltbookMembers);
        
        vm.stopBroadcast();
        
        console.log("Registered 50 agents");
        console.log("Moltbook members: 35");
    }
    
    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
