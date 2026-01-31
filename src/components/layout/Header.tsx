"use client";

import Link from "next/link";
import { ClawIcon } from "@/components/icons/CrabIcons";

interface HeaderProps {
    currentBlock?: number;
    moltPhase?: number;
}

export function Header({ currentBlock = 0, moltPhase = 1 }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 border-b border-[--border-medium]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Status Indicators */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-[--accent-orange] font-bold text-lg tracking-widest text-glow hover:scale-105 transition-transform">
                        DECAPOLIS
                    </Link>
                    <div className="h-4 w-px bg-[--border-medium] hidden md:block" />
                    {/* Molt Phase */}
                    <div className="flex items-center gap-2">
                        <span className="text-[--text-muted] text-xs uppercase">Faz</span>
                        <span className="text-[--accent-orange] font-bold text-glow-subtle">
                            {moltPhase}/5
                        </span>
                    </div>

                    {/* Block Counter */}
                    <div className="flex items-center gap-2">
                        <span className="text-[--text-muted] text-xs uppercase">Blok</span>
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

                {/* Center: Constitution Link */}
                <Link
                    href="/anayasa"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-[--accent-orange] text-sm uppercase tracking-wider font-bold hover:text-glow transition-all border border-transparent hover:border-[--accent-orange]"
                >
                    <span>📜</span>
                    <span>Anayasa</span>
                </Link>

                {/* Right: Navigation */}
                <nav className="flex items-center gap-4">
                    <NavLink href="/">Kovan</NavLink>
                    <NavLink href="/terminal">Kayıtlar</NavLink>
                    <NavLink href="/offering">Öneriler</NavLink>

                    {/* Moltbook Integration Badge */}
                    <Link
                        href="/moltbook"
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[--accent-orange] text-[--accent-orange] text-xs uppercase tracking-wide hover:bg-[--accent-orange] hover:text-black transition-colors"
                    >
                        <ClawIcon className="w-4 h-4" />
                        <span>Moltbook</span>
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
