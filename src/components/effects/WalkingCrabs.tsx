"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Crab {
    id: number;
    x: number;
    direction: number;
    speed: number;
    size: number;
}

export function WalkingCrabs() {
    const [crabs, setCrabs] = useState<Crab[]>([]);

    useEffect(() => {
        // Create 5 crabs with random positions
        const initialCrabs = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 0.5 + Math.random() * 1,
            size: 48 + Math.floor(Math.random() * 24), // 48-72px for GIF
        }));
        setCrabs(initialCrabs);

        // Animate crabs
        const interval = setInterval(() => {
            setCrabs(prev => prev.map(crab => {
                let newX = crab.x + (crab.direction * crab.speed * 0.08);
                let newDirection = crab.direction;

                // Bounce at edges
                if (newX > 95) {
                    newX = 95;
                    newDirection = -1;
                } else if (newX < 2) {
                    newX = 2;
                    newDirection = 1;
                }

                return { ...crab, x: newX, direction: newDirection };
            }));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden"
            style={{ zIndex: -1 }} // Alt katmanda kalması için
        >
            {crabs.map(crab => (
                <div
                    key={crab.id}
                    className="absolute bottom-0"
                    style={{
                        left: `${crab.x}%`,
                        transform: `scaleX(${crab.direction})`,
                        width: crab.size,
                        height: crab.size,
                    }}
                >
                    <Image
                        src="/crab.gif"
                        alt="Yürüyen yengeç"
                        width={crab.size}
                        height={crab.size}
                        unoptimized // GIF animasyonu için gerekli
                    />
                </div>
            ))}
        </div>
    );
}
