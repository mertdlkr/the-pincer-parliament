"use client";

import { motion } from "framer-motion";
import { MoltIcon } from "@/components/icons/CrabIcons";

interface ShellStatusProps {
    currentPhase?: number;
    maxPhase?: number;
    timeToNextMolt?: string;
    phaseProgress?: number;
}

export function ShellStatus({
    currentPhase = 3,
    maxPhase = 5,
    timeToNextMolt = "04:32:17",
    phaseProgress = 67,
}: ShellStatusProps) {
    const phaseNames = [
        "INIT", "SHED", "GROW", "HARDEN", "COMPLETE"
    ];

    return (
        <div className="card">
            <div className="card-header">
                <span>KABUK DURUMU</span>
            </div>

            <div className="space-y-4">
                {/* Phase Counter */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MoltIcon className="w-8 h-8 text-[--accent-orange] molt-glow" />
                        <div>
                            <div className="text-[--accent-orange] text-2xl font-bold text-glow">
                                MOLT FAZ {currentPhase}
                            </div>
                            <div className="text-[--text-muted] text-xs uppercase tracking-wide">
                                {phaseNames[currentPhase - 1]}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-[--text-muted] text-xs uppercase mb-1">
                            Sonraki Molt
                        </div>
                        <div className="text-[--text-secondary] font-mono text-lg">
                            {timeToNextMolt}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex justify-between text-xs text-[--text-muted] mb-1">
                        <span>Faz İlerlemesi</span>
                        <span>{phaseProgress}%</span>
                    </div>
                    <div className="progress-bar h-2">
                        <motion.div
                            className="progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${phaseProgress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Phase Indicators */}
                <div className="flex justify-between">
                    {Array.from({ length: maxPhase }, (_, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center ${i + 1 <= currentPhase
                                ? "text-[--accent-orange]"
                                : "text-[--text-disabled]"
                                }`}
                        >
                            <div
                                className={`w-8 h-8 flex items-center justify-center border ${i + 1 === currentPhase
                                    ? "border-[--accent-orange] bg-[--accent-dim] molt-glow"
                                    : i + 1 < currentPhase
                                        ? "border-[--accent-orange] bg-[--accent-orange]"
                                        : "border-[--border-medium]"
                                    }`}
                            >
                                <span className={`text-sm font-bold ${i + 1 < currentPhase ? "text-black" : ""
                                    }`}>
                                    {i + 1}
                                </span>
                            </div>
                            <span className="text-[0.625rem] mt-1 uppercase tracking-wide">
                                {phaseNames[i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
