import React from 'react';

export default function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`bg-slate-200/50 relative overflow-hidden rounded-xl ${className}`}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
    );
}

// Add this to your global.css or tailwind config:
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
