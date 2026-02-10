"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ShieldAlert, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AiJuryModalProps {
    isOpen: boolean;
    onClose: () => void;
    grantName: string;
}

export default function AiJuryModal({ isOpen, onClose, grantName }: AiJuryModalProps) {
    const [stage, setStage] = useState<'intro' | 'questioning' | 'feedback'>('intro');
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0); // Initialize with 0
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                setMessages([{
                    role: 'ai',
                    text: `I am the Nodal Officer for the ${grantName}. We receive thousands of applications. State your startup's specific innovation in one sentence. Do not waste my time.`
                }]);
            }, 500);
        }
    }, [isOpen, messages.length, grantName]); // Added dependencies

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user' as const, text: input }];
        setMessages(newMessages);
        setInput("");

        // Simulate AI thinking and responding
        setTimeout(() => {
            let nextResponse = "";
            let nextStage = stage;

            if (stage === 'intro') {
                nextResponse = "That sounds generic. Many startups claim to do that. How specifically will you handle the logistics in rural areas where internet connectivity is < 2G?";
                nextStage = 'questioning';
            } else if (stage === 'questioning') {
                // Check if we are done with questions
                if (messages.length >= 3) {
                    nextResponse = "Your financial model seems optimistic. If the grant money is delayed by 6 months (which happens), how will you pay your team? Justify your survival strategy.";
                    nextStage = 'feedback';
                } else {
                    // Intermediate question could go here if we wanted more rounds
                    nextResponse = "I see. And what is your plan for IP protection?";
                }
            } else if (stage === 'feedback') {
                // We shouldn't really get here if we transition correctly, but for safety:
                nextResponse = "Review Concluded.";
            }

            // If we are transitioning to feedback, calculate score
            if (nextStage === 'feedback' && stage !== 'feedback') {
                const finalScore = Math.min(Math.floor(Math.random() * 20) + 70, 95);
                setScore(finalScore);
                // Override the response for feedback stage
                nextResponse = "Your financial model seems optimistic. If the grant money is delayed by 6 months (which happens), how will you pay your team? Justify your survival strategy.";
            }

            // Update stage
            setStage(nextStage);

            // If already in feedback mode (answered the last question), show score
            if (stage === 'feedback') {
                // Wait, the logic in user prompt was:
                // intro -> input -> questioning (response 1) -> input -> feedback (response 2)
                // Let's stick closer to the user's prompt logic for simplicity:
                // 1. Intro msg (AI)
                // 2. User inputs.
                // 3. AI responds with "That sounds generic... How handle 2G?" (Stage: questioning)
                // 4. User inputs.
                // 5. AI responds with "Financial model optimistic... Justify." (Stage: feedback)
                // 6. User inputs? Or just show score?
                // The prompt says: "Feedback: After 3 questions...".  The provided code snippet does intro -> questioning -> feedback.
                // Let's use the provided snippet's logic exactly.
            }

            // RE-READING PROMPT CODE LOGIC:
            // intro (msg 1) -> user sends -> ai responds "generic... 2G" & sets stage='questioning'
            // user sends -> ai responds "financial... survival" & sets stage='feedback'
            // user sends -> sets score & ai responds "Review Complete"

            if (stage === 'intro') {
                nextResponse = "That sounds generic. Many startups claim to do that. How specifically will you handle the logistics in rural areas where internet connectivity is < 2G?";
                setStage('questioning');
            } else if (stage === 'questioning') {
                nextResponse = "Your financial model seems optimistic. If the grant money is delayed by 6 months (which happens), how will you pay your team? Justify your survival strategy.";
                setStage('feedback');
            } else if (stage === 'feedback') {
                const finalScore = Math.min(Math.floor(Math.random() * 20) + 70, 95);
                setScore(finalScore);
                nextResponse = `Review Complete.`;
            }

            setMessages(prev => [...prev, { role: 'ai', text: nextResponse }]);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[80vh] h-[600px]"
                >
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-red-500">
                            <ShieldAlert className="w-5 h-5" />
                            <h2 className="font-bold text-white tracking-wider text-sm md:text-base">OFFICIAL SCRUTINY COMMITTEE</h2>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900" ref={scrollRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 border-l-4 border-red-500 rounded-bl-none'
                                    }`}>
                                    {m.role === 'ai' && <p className="text-xs text-red-400 font-bold mb-2 uppercase tracking-wider">Nodal Officer</p>}
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {/* Score Reveal */}
                        {score > 0 && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                className="bg-slate-950 border border-green-500/30 p-8 rounded-2xl text-center mt-8 mx-auto max-w-sm shadow-2xl shadow-green-900/20"
                            >
                                <h3 className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">Readiness Score</h3>
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 mb-4">{score}/100</div>
                                <p className="text-slate-300 text-sm font-medium italic">"You showed good domain knowledge, but work on your financial contingency answers."</p>
                            </motion.div>
                        )}
                    </div>

                    {score === 0 && (
                        <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3 items-center">
                            <div className="relative flex-1">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your answer confidently..."
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                />
                                <Mic className="w-5 h-5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white transition-colors" />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
