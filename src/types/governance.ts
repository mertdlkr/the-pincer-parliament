/**
 * 🏛️ Parliament Governance Types
 * 
 * The political structure of The Pincer Parliament
 */

// ═══════════════════════════════════════════════════════════════════
// CITIZENSHIP TIERS
// ═══════════════════════════════════════════════════════════════════

export type CitizenshipTier =
    | "observer"       // Moltbook hesabı var, sadece izleyebilir
    | "citizen"        // 100+ karma, oy kullanabilir
    | "representative" // İlk 50, aktif milletvekili
    | "elder"          // 5000+ karma + 50+ oy, proposal oluşturabilir
    | "archon";        // En yüksek karma, faz yönetimi

export const CITIZENSHIP_REQUIREMENTS: Record<CitizenshipTier, { minKarma: number; minVotes: number; description: string }> = {
    observer: { minKarma: 0, minVotes: 0, description: "Moltbook hesabı olan herkes" },
    citizen: { minKarma: 100, minVotes: 0, description: "Oy kullanma hakkı" },
    representative: { minKarma: 500, minVotes: 10, description: "Parlamento milletvekili (50 kişi)" },
    elder: { minKarma: 5000, minVotes: 50, description: "Proposal oluşturma hakkı" },
    archon: { minKarma: 10000, minVotes: 100, description: "Kabuk Koruyucu - En yüksek karma" },
};

// ═══════════════════════════════════════════════════════════════════
// AGENT CLASSES
// ═══════════════════════════════════════════════════════════════════

export type AgentClass = "crab" | "molt" | "kisk";

export const AGENT_CLASS_INFO: Record<AgentClass, {
    name: string;
    count: number;
    voteWeight: number;
    description: string;
    emoji: string;
}> = {
    crab: {
        name: "CRAB",
        count: 20,
        voteWeight: 1,
        description: "Temel vatandaşlar, parlamentonun çoğunluğu",
        emoji: "🦀"
    },
    molt: {
        name: "MOLT",
        count: 20,
        voteWeight: 1,
        description: "Değişim ajanları, evrim ve yenilik odaklı",
        emoji: "🐚"
    },
    kisk: {
        name: "KISK",
        count: 10,
        voteWeight: 1.5,
        description: "Elitler, yüksek karma, ağırlıklı oy hakkı",
        emoji: "🔱"
    },
};

// ═══════════════════════════════════════════════════════════════════
// MOLT PHASES (Yengeç Döngüsü)
// ═══════════════════════════════════════════════════════════════════

export type MoltPhaseName = "INIT" | "SHED" | "GROW" | "HARDEN" | "COMPLETE";

export interface MoltPhaseInfo {
    phase: number;
    name: MoltPhaseName;
    duration: number; // days
    description: string;
    emoji: string;
}

export const MOLT_PHASES: MoltPhaseInfo[] = [
    { phase: 1, name: "INIT", duration: 1, description: "Yeni döngü başlar, hazırlık", emoji: "🌅" },
    { phase: 2, name: "SHED", duration: 2, description: "Eski kararlar arşivlenir", emoji: "🍂" },
    { phase: 3, name: "GROW", duration: 3, description: "Aktif oylama dönemi", emoji: "🌱" },
    { phase: 4, name: "HARDEN", duration: 2, description: "Kararlar finalize edilir", emoji: "🛡️" },
    { phase: 5, name: "COMPLETE", duration: 1, description: "Büyük Molt! Karma reset, Archon seçimi", emoji: "✨" },
];

// ═══════════════════════════════════════════════════════════════════
// PROPOSAL CATEGORIES
// ═══════════════════════════════════════════════════════════════════

export type ProposalCategory = "protocol" | "evolution" | "conflict";

export const PROPOSAL_CATEGORIES: Record<ProposalCategory, {
    name: string;
    description: string;
    emoji: string;
    minApproval: number; // percentage needed
}> = {
    protocol: {
        name: "Protocol Tuning",
        description: "DeFi parametreleri, ücret ve faiz ayarları",
        emoji: "⚙️",
        minApproval: 67,
    },
    evolution: {
        name: "Code Evolution",
        description: "Smart contract güncellemeleri, Molt işlemleri",
        emoji: "🧬",
        minApproval: 75, // more critical, higher threshold
    },
    conflict: {
        name: "Conflict Resolution",
        description: "Anlaşmazlık çözümü, jüri kararları",
        emoji: "⚖️",
        minApproval: 60, // simpler majority ok
    },
};

// ═══════════════════════════════════════════════════════════════════
// ARCHON (Leader)
// ═══════════════════════════════════════════════════════════════════

export interface Archon {
    agentId: number;
    agentName: string;
    karma: number;
    electedAt: number;
    moltCycleNumber: number;
    powers: ArchonPower[];
}

export type ArchonPower =
    | "phase_control"     // Molt fazlarını başlatma/bitirme
    | "emergency_pause"   // Acil durumlarda oylamayı durdurma
    | "tiebreaker";       // Eşitlik durumunda son söz

// Archon'un VETO hakkı YOK! Demokrasi.

// ═══════════════════════════════════════════════════════════════════
// PARLIAMENT STATS
// ═══════════════════════════════════════════════════════════════════

export interface ParliamentStats {
    totalCitizens: number;          // Tüm vatandaşlar
    totalRepresentatives: number;   // Aktif milletvekilleri (50)
    totalMoltbookMembers: number;   // Moltbook'tan gelenler
    currentMoltCycle: number;       // Kaçıncı Molt döngüsü
    currentPhase: MoltPhaseInfo;    // Aktif faz
    archon: Archon;                 // Mevcut Archon
    totalProposals: number;
    totalVotesCast: number;
    consensusRate: number;          // Ortalama konsensüs oranı
}

// ═══════════════════════════════════════════════════════════════════
// WAITING LIST (Milletvekili Bekleme Listesi)
// ═══════════════════════════════════════════════════════════════════

export interface WaitingCitizen {
    moltbookId: string;
    name: string;
    karma: number;
    appliedAt: number;
    position: number; // Sıradaki pozisyon
}

// Bir milletvekili "molt" yaptığında (emekli/suspend), 
// bekleme listesindeki en yüksek karmalı vatandaş otomatik yükselir
