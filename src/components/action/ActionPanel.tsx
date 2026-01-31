"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClawIcon } from "@/components/icons/CrabIcons";

interface ActionPanelProps {
    onSubmit?: (proposal: { title: string; description: string; category: string }) => void;
}

export function ActionPanel({ onSubmit }: ActionPanelProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("protocol");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        setIsSubmitting(true);

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        onSubmit?.({ title, description, category });
        setTitle("");
        setDescription("");
        setIsSubmitting(false);
    };

    return (
        <div className="card">
            <div className="card-header flex items-center gap-2">
                <ClawIcon className="w-4 h-4" />
                <span>THE OFFERING</span>
                <span className="text-[--text-muted]">|</span>
                <span className="text-[--text-secondary] normal-case tracking-normal">
                    Submit Your Petition
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div>
                    <label className="text-xs text-[--text-muted] uppercase tracking-wide block mb-2">
                        Category
                    </label>
                    <div className="flex gap-2">
                        {[
                            { value: "protocol", label: "Protocol Tuning" },
                            { value: "code", label: "Code Evolution" },
                            { value: "conflict", label: "Conflict Resolution" },
                        ].map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setCategory(opt.value)}
                                className={`px-3 py-1.5 text-xs uppercase tracking-wide border transition-colors ${category === opt.value
                                        ? "border-[--accent-orange] text-[--accent-orange] bg-[--accent-dim]"
                                        : "border-[--border-medium] text-[--text-muted] hover:border-[--accent-orange]"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title Input */}
                <div>
                    <label className="text-xs text-[--text-muted] uppercase tracking-wide block mb-2">
                        Proposal Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter proposal title..."
                        className="input"
                        maxLength={100}
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="text-xs text-[--text-muted] uppercase tracking-wide block mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your proposal to the Parliament..."
                        className="input min-h-[100px] resize-none"
                        maxLength={500}
                    />
                    <div className="text-right text-xs text-[--text-muted] mt-1">
                        {description.length}/500
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !description.trim()}
                    className="btn btn-primary w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-pulse">●</span>
                            SUBMITTING TO PARLIAMENT...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <ClawIcon className="w-4 h-4" />
                            SUBMIT OFFERING
                        </span>
                    )}
                </motion.button>

                {/* Info Text */}
                <p className="text-xs text-[--text-muted] text-center">
                    Your offering will be evaluated by 50 parallel agents simultaneously.
                    <br />
                    Consensus threshold: 67% approval for execution.
                </p>
            </form>
        </div>
    );
}
