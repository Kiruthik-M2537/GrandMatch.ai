"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import GrantRadar from './GrantRadar'; // Import the Radar component
import { USER_PROFILE } from '@/lib/data'; // Import User Profile for the chart
import clsx from 'clsx';

interface GrantCardProps {
    grant: {
        id: string;
        title: string;
        agency: string;
        amount: string;
        deadline: string;
        description: string;
        requirements: any[];
        matchScore: number;
        tags: string[];
    };
}

export default function GrantCard({ grant }: GrantCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getMatchColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
        if (score >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        return 'text-red-600 bg-red-100 border-red-200';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-black/5 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{grant.agency}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{grant.deadline}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{grant.title}</h3>
                    </div>
                    <div className={clsx("flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold text-sm", getMatchColor(grant.matchScore))}>
                        {grant.matchScore}%
                    </div>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{grant.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {grant.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">{tag}</span>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                        <div className="text-2xl font-bold text-slate-900">{grant.amount}</div>
                        <div className="text-xs text-gray-500">Grant Amount</div>
                    </div>
                    {/* Mini Radar Chart */}
                    <div className="h-32 w-full relative">
                        <GrantRadar grantRequirements={grant.requirements} userProfile={USER_PROFILE} />
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                    >
                        <Sparkles className="w-4 h-4" />
                        {isExpanded ? 'Hide Optimization' : 'Optimize Pitch'}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50 border-t border-slate-200"
                    >
                        <div className="p-6">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                AI-Rewritten Pitch Strategy
                            </h4>
                            <div className="p-4 bg-white rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed shadow-sm">
                                <p>
                                    <span className="font-medium text-blue-600">To align with {grant.agency}'s focus on {grant.tags[0]},</span> we have emphasized your project's technical depth and scalability.
                                    <br /><br />
                                    "Our autonomous drone swarm directly addresses the <strong>{grant.title}</strong> objectives by leveraging proprietary deep-tech algorithms for real-time terrain analysis. Unlike traditional methods, our solution offers a scalable, low-cost alternative perfectly suited for {grant.tags[1] || 'rapid deployment'}, ensuring high-impact results with measurable outcomes."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
