"use client";

import Link from "next/link";
import { CrabLogo, ClawIcon } from "@/components/icons/CrabIcons";

interface HeaderProps {
    currentBlock?: number;
    moltPhase?: number;
}

export function Header({ currentBlock = 0, moltPhase = 1 }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 border-b border-[--border-medium]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo + Title */}
                <Link href="/" className="flex items-center gap-3 group">
                    <CrabLogo className="w-10 h-10 text-[--accent-orange] transition-transform group-hover:scale-110" />
                    <div className="flex flex-col">
                        <span className="text-[--accent-orange] text-lg font-bold uppercase tracking-wider text-glow">
                            KISKAÇ PARLAMENTOSU
                        </span>
                        <span className="text-[--text-muted] text-xs uppercase tracking-widest">
                            The Pincer Parliament
                        </span>
                    </div>
                </Link>

                {/* Status Indicators */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Molt Phase */}
                    <div className="flex items-center gap-2">
                        <span className="text-[--text-muted] text-xs uppercase">Phase</span>
                        <span className="text-[--accent-orange] font-bold text-glow-subtle">
                            {moltPhase}/5
                        </span>
                    </div>

                    {/* Block Counter */}
                    <div className="flex items-center gap-2">
                        <span className="text-[--text-muted] text-xs uppercase">Block</span>
                        <span className="text-[--text-secondary] font-mono text-sm">
                            {currentBlock.toLocaleString()}
                        </span>
                    </div>

                    {/* Connection Status */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[--accent-orange] animate-pulse" />
                        <span className="text-[--text-muted] text-xs uppercase">Monad</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-4">
                    <NavLink href="/parliament">The Hive</NavLink>
                    <NavLink href="/terminal">Molt-Log</NavLink>
                    <NavLink href="/offering">Offering</NavLink>

                    {/* Moltbook Integration Badge */}
                    <Link
                        href="/moltbook"
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[--accent-orange] text-[--accent-orange] text-xs uppercase tracking-wide hover:bg-[--accent-orange] hover:text-black transition-colors"
                    >
                        <ClawIcon className="w-4 h-4" />
                        <span>Join Moltbook</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-[--text-muted] text-sm uppercase tracking-wide hover:text-[--accent-orange] transition-colors"
        >
            {children}
        </Link>
    );
}
