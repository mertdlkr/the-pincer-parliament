// The Pincer Parliament - Stylized Robotic Crab Icon
// Brutalist orange (#FF4500) claw design inspired by Clawdbot/Moltbook

import { SVGProps } from "react";

export function CrabLogo({ className = "", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Main Body - Hexagonal Shell */}
            <path
                d="M32 8L52 18V38L32 48L12 38V18L32 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="miter"
            />

            {/* Left Claw (Kıskaç) */}
            <path
                d="M12 22L4 18L2 24L8 28L12 26"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="miter"
            />
            <path
                d="M4 18L2 14L6 12L8 16L4 18Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
            />

            {/* Right Claw (Kıskaç) */}
            <path
                d="M52 22L60 18L62 24L56 28L52 26"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="miter"
            />
            <path
                d="M60 18L62 14L58 12L56 16L60 18Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
            />

            {/* Eyes */}
            <circle cx="26" cy="24" r="3" fill="currentColor" />
            <circle cx="38" cy="24" r="3" fill="currentColor" />

            {/* Inner Eye Glow */}
            <circle cx="26" cy="24" r="1.5" fill="#000" />
            <circle cx="38" cy="24" r="1.5" fill="#000" />

            {/* Circuit Lines on Shell */}
            <path
                d="M32 18V28M24 23H32M32 23H40M28 32H36"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />

            {/* Legs - Left */}
            <path d="M14 32L8 36L6 42" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 36L10 42L8 50" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 40L14 48L12 56" stroke="currentColor" strokeWidth="1.5" />

            {/* Legs - Right */}
            <path d="M50 32L56 36L58 42" stroke="currentColor" strokeWidth="1.5" />
            <path d="M48 36L54 42L56 50" stroke="currentColor" strokeWidth="1.5" />
            <path d="M46 40L50 48L52 56" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function ClawIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Kıskaç (Pincer) */}
            <path
                d="M12 4L20 8L22 14L16 18L12 16L8 18L2 14L4 8L12 4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="miter"
            />
            <path
                d="M4 8L2 4L6 2L8 6"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M20 8L22 4L18 2L16 6"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export function MoltIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            {/* Shell shedding symbol */}
            <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 2"
            />
            <path
                d="M12 6C8.7 6 6 8.7 6 12s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
                fill="currentColor"
                fillOpacity="0.3"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    );
}
