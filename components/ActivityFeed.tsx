import React from 'react';
import { TrendingUp, Zap, Newspaper, Users, IndianRupee } from 'lucide-react';

const UPDATE_ITEMS = [
    {
        icon: TrendingUp,
        label: "SURGE",
        color: "emerald",
        text: "NIDHI-PRAYAS applications up 300% this quarter"
    },
    {
        icon: Zap,
        label: "JUST IN",
        color: "blue",
        text: <>Tamil Nadu announces <span className="text-white font-bold">₹10 Lakh</span> subsidy for Agri-Drones</>
    },
    {
        icon: Newspaper,
        label: "POLICY",
        color: "purple",
        text: "DeepTech Startup Policy 2025 draft released for public consultation"
    },
    {
        icon: IndianRupee,
        label: "FUNDING",
        color: "yellow",
        text: <>Bengaluru-based <span className="text-white font-bold">SpaceX-India</span> raises Series A</>
    }
];

export default function ActivityFeed() {
    return (
        <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs font-medium h-10 fixed top-0 left-0 right-0 z-50 flex items-center overflow-hidden">
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-infinite {
                    animation: marquee 30s linear infinite;
                }
            `}</style>

            <div className="flex animate-marquee-infinite whitespace-nowrap min-w-full">
                {/* DOUBLE LOOP FOR SEAMLESS SCROLL */}
                {[...UPDATE_ITEMS, ...UPDATE_ITEMS, ...UPDATE_ITEMS].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 mx-8 opacity-90 hover:opacity-100 transition-opacity">
                        <span className={`bg-${item.color}-500/10 text-${item.color}-400 px-2 py-0.5 rounded flex items-center gap-1 border border-${item.color}-500/20`}>
                            <item.icon className="w-3 h-3" /> {item.label}
                        </span>
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
