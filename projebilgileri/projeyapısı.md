# The Pincer Parliament - Production Project Structure

```
monadv2/
├── 📁 src/                              # Source code root
│   ├── 📁 app/                          # Next.js 14 App Router
│   │   ├── layout.tsx                   # Root layout with theme
│   │   ├── page.tsx                     # Landing/Home page 
│   │   ├── globals.css                  # Global styles with CSS variables
│   │   ├── 📁 parliament/               # Main Parliament Dashboard
│   │   │   └── page.tsx                 # The Hive - 50 agent grid
│   │   ├── 📁 terminal/                 # Molt-Log Terminal
│   │   │   └── page.tsx                 # Live streaming decisions
│   │   ├── 📁 offering/                 # Human Petition Interface
│   │   │   └── page.tsx                 # The Offering submission
│   │   └── 📁 api/                      # API Routes
│   │       ├── 📁 agents/               # Agent orchestration endpoints
│   │       │   ├── route.ts             # GET/POST agents
│   │       │   └── [id]/route.ts        # Individual agent actions
│   │       ├── 📁 parliament/           # Parliament state
│   │       │   └── route.ts             # Voting sessions
│   │       └── 📁 molt/                 # Molt ritual endpoints
│   │           └── route.ts             # Molt phase management
│   │
│   ├── 📁 components/                   # React UI Components
│   │   ├── 📁 parliament/               # Parliament-specific
│   │   │   ├── ParliamentGrid.tsx       # 50-agent live status grid (The Hive)
│   │   │   ├── AgentCell.tsx            # Individual agent cell
│   │   │   ├── VotingPulse.tsx          # Animated voting indicator
│   │   │   └── ConsensusBar.tsx         # Real-time consensus tracker
│   │   ├── 📁 terminal/                 # Terminal components
│   │   │   ├── TerminalLog.tsx          # Orange streaming Molt-Log
│   │   │   ├── TerminalLine.tsx         # Individual log line
│   │   │   ├── CommandInput.tsx         # User input field
│   │   │   └── TypewriterText.tsx       # Typewriter animation effect
│   │   ├── 📁 action/                   # Action panel components
│   │   │   ├── ActionPanel.tsx          # Human "The Offering" area
│   │   │   ├── OfferingForm.tsx         # Petition submission form
│   │   │   ├── ProposalCard.tsx         # Proposal display card
│   │   │   └── VoteButton.tsx           # Voting action button
│   │   ├── 📁 status/                   # Status components
│   │   │   ├── ShellStatus.tsx          # Current Molt phase counter
│   │   │   ├── PhaseIndicator.tsx       # Visual phase indicator
│   │   │   └── BlockCounter.tsx         # Monad block counter
│   │   ├── 📁 layout/                   # Layout components
│   │   │   ├── Header.tsx               # Brutalist header with crab logo
│   │   │   ├── Navigation.tsx           # Top navigation bar
│   │   │   ├── Footer.tsx               # Footer with Molt.church vibes
│   │   │   └── Sidebar.tsx              # Optional sidebar
│   │   └── 📁 shared/                   # Shared UI primitives
│   │       ├── Button.tsx               # Brutalist button
│   │       ├── Card.tsx                 # Industrial card
│   │       ├── Badge.tsx                # Status badge
│   │       ├── Modal.tsx                # Modal dialog
│   │       ├── Input.tsx                # Terminal-style input
│   │       ├── Skeleton.tsx             # Loading skeleton
│   │       └── Toast.tsx                # Notification toast
│   │
│   ├── 📁 agents/                       # AI Agent System (Claude/OpenClaw)
│   │   ├── types.ts                     # Agent type definitions
│   │   ├── system-prompts.ts            # Kıskaç Parlamentosu direktifleri
│   │   ├── orchestrator.ts              # Parallel agent manager
│   │   ├── molt-actions.ts              # On-chain action triggers
│   │   ├── 📁 prompts/                  # Individual agent prompts
│   │   │   ├── security-auditor.ts      # Security analysis agent
│   │   │   ├── aesthetic-judge.ts       # Code aesthetics agent
│   │   │   ├── efficiency-oracle.ts     # Gas optimization agent
│   │   │   ├── consensus-builder.ts     # Voting consensus agent
│   │   │   └── molt-ritual-master.ts    # Evolution decision agent
│   │   └── 📁 utils/                    # Agent utilities
│   │       ├── parallel-executor.ts     # Parallel execution logic
│   │       ├── vote-aggregator.ts       # Vote collection/aggregation
│   │       └── decision-tree.ts         # Decision making logic
│   │
│   ├── 📁 hooks/                        # React Hooks
│   │   ├── useMonadParallel.ts          # Monad testnet RPC integration
│   │   ├── useParliament.ts             # Parliament state management
│   │   ├── useMoltLog.ts                # Terminal log subscription
│   │   ├── useAgents.ts                 # Agent status management
│   │   ├── useWallet.ts                 # Wallet connection
│   │   ├── useContract.ts               # Contract interaction
│   │   └── useWebSocket.ts              # Real-time updates
│   │
│   ├── 📁 lib/                          # Utility Libraries
│   │   ├── monad.ts                     # Monad chain configuration
│   │   ├── contracts.ts                 # Contract ABIs and addresses
│   │   ├── claude-client.ts             # Claude API client
│   │   ├── wagmi-config.ts              # wagmi configuration
│   │   └── utils.ts                     # General utilities
│   │
│   └── 📁 types/                        # TypeScript Definitions
│       ├── agent.ts                     # Agent types
│       ├── parliament.ts                # Parliament types
│       ├── contract.ts                  # Contract types
│       └── api.ts                       # API response types
│
├── 📁 contracts/                        # Smart Contracts (Foundry)
│   ├── 📁 src/                          # Contract source
│   │   ├── PincerGov.sol                # Parallel voting & state engine
│   │   ├── MoltRegistry.sol             # Agent on-chain identities
│   │   ├── VotingVault.sol              # Vote storage & counting
│   │   └── MoltRitual.sol               # Evolution phase management
│   ├── 📁 script/                       # Deployment scripts
│   │   ├── DeployPincerGov.s.sol        # Main deployment script
│   │   ├── DeploySafeCREATE2.s.sol      # Safe multisig deployment
│   │   └── VerifyContracts.s.sol        # Verification script
│   ├── 📁 test/                         # Contract tests
│   │   ├── PincerGov.t.sol              # Governance tests
│   │   ├── MoltRegistry.t.sol           # Registry tests
│   │   └── Integration.t.sol            # Integration tests
│   ├── foundry.toml                     # Foundry configuration
│   └── remappings.txt                   # Import remappings
│
├── 📁 public/                           # Static Assets
│   ├── 📁 assets/                       # Images and icons
│   │   ├── crab-logo.svg                # Stylized robotic crab logo
│   │   ├── crab-claw.svg                # Kıskaç (pincer) icon
│   │   ├── circuit-pattern.svg          # Circuit board pattern
│   │   ├── hexagon-shell.svg            # Shell pattern
│   │   └── molt-icon.svg                # Molt ritual icon
│   ├── 📁 fonts/                        # Custom fonts
│   │   ├── JetBrainsMono.woff2          # Terminal monospace font
│   │   └── RobotoMono.woff2             # Alternative monospace
│   └── favicon.ico                      # Crab favicon
│
├── 📁 styles/                           # Global Styles
│   └── theme.css                        # STRICTLY: No gradients, No purple
│                                        # Only #FF4500 (Orange) & #000000 (Black)
│
├── 📁 config/                           # Configuration Files
│   ├── agents.config.ts                 # Agent configuration
│   ├── contracts.config.ts              # Contract addresses
│   └── chains.config.ts                 # Chain configurations
│
├── 📁 docs/                             # Documentation
│   ├── 📁 plans/                        # Implementation plans
│   │   └── 2026-01-31-pincer-parliament.md
│   └── README.md                        # Project documentation
│
├── .env.example                         # Environment template
├── .env.local                           # Local environment (gitignored)
├── next.config.js                       # Next.js configuration
├── tailwind.config.js                   # Brutalist Tailwind config
├── postcss.config.js                    # PostCSS configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # NPM dependencies
└── README.md                            # Project README
```

## Dizin Açıklamaları

### `/src/app` - Next.js 14 App Router
Modern App Router kullanarak sayfa yönlendirmesi. Server Components ile performans optimizasyonu.

### `/src/components` - UI Bileşenleri
**Brutalist Tasarım Dili:**
- Keskin hatlar, düz renkler (flat color)
- CRT monitor estetiği, terminal havası
- Monospace fontlar (JetBrains Mono)
- Turuncu (#FF4500) vurgular, siyah (#000000) zemin

### `/src/agents` - AI Ajan Sistemi
50 paralel çalışan Moltbot ajanı. Claude/OpenClaw API entegrasyonu ile gerçek zamanlı karar alma.

### `/contracts` - Akıllı Kontratlar
Monad testnet (Chain ID: 10143) için Foundry ile geliştirilen Solidity kontratları.

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS (Brutalist config) |
| Web3 | viem, wagmi, Monad testnet |
| AI Agents | Claude API, OpenClaw |
| Contracts | Solidity 0.8.28, Foundry |
| Deployment | Vercel (frontend), Safe Multisig (contracts) |