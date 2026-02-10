// components/ActivityFeed.tsx
import React from 'react';
import { TrendingUp, Zap } from 'lucide-react';

export default function ActivityFeed() {
  return (
    <div className="bg-slate-900 text-white text-xs font-medium py-2 overflow-hidden fixed top-0 left-0 w-full z-50 border-b border-slate-800">
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
        <span className="flex items-center gap-2 text-emerald-400">
             <TrendingUp className="w-3 h-3" /> 
             NIDHI-PRAYAS applications up 200% this week
        </span>
        <span className="text-slate-400">|</span>
        <span className="flex items-center gap-2 text-blue-400">
             <Zap className="w-3 h-3" /> 
             JUST IN: Bengaluru SaaS startup secures ₹50L via SISFS
        </span>
        <span className="text-slate-400">|</span>
        <span>
             🏛️ Policy Update: DeepTech grant cap increased to ₹1 Crore
        </span>
        <span className="text-slate-400">|</span>
        <span>
             📈 Trending: 1,200+ founders using GrantMatch today
        </span>
        {/* Duplicate for infinite scroll illusion if needed, or CSS animation will handle it */}
      </div>
    </div>
  );
}

// components/GrantCard.tsx
import confetti from 'canvas-confetti';

// ... inside handleAutoDraft ...
setDraftStatus('ready');
confetti({ 
    particleCount: 150, 
    spread: 70, 
    origin: { y: 0.6 },
    colors: ['#2563eb', '#10b981', '#f59e0b']
});

// app/dashboard/page.tsx
import ActivityFeed from '@/components/ActivityFeed';

// ... inside return ...
<div className="...">
   <ActivityFeed />
   {/* main content with top padding adjusted */}
   <div className="pt-8"> 
      {/* ... sidebar and main ... */}
   </div>
</div>
