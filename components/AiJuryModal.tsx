"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ShieldAlert, Mic, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AiJuryModalProps {
    isOpen: boolean;
    onClose: () => void;
    grantName: string;
}

interface ParsedVerdict {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
}

function parseVerdict(text: string): ParsedVerdict | null {
    if (!text.includes('---VERDICT---')) return null;
    const scoreMatch = text.match(/SCORE:\s*(\d+)\/100/i);
    const strengthsMatch = text.match(/STRENGTHS:\s*([\s\S]*?)(?=WEAKNESSES:|---END---|$)/i);
    const weaknessesMatch = text.match(/WEAKNESSES:\s*([\s\S]*?)(?=RECOMMENDATION:|---END---|$)/i);
    const recMatch = text.match(/RECOMMENDATION:\s*([\s\S]*?)(?=---END---|$)/i);

    if (!scoreMatch) return null;

    const extractBullets = (raw: string | undefined): string[] => {
        if (!raw) return [];
        return raw.split('\n')
            .map(l => l.replace(/^[-•*]\s*/, '').trim())
            .filter(l => l.length > 0);
    };

    return {
        score: parseInt(scoreMatch[1]),
        strengths: extractBullets(strengthsMatch?.[1]),
        weaknesses: extractBullets(weaknessesMatch?.[1]),
        recommendation: recMatch?.[1]?.trim() || '',
    };
}

export default function AiJuryModal({ isOpen, onClose, grantName }: AiJuryModalProps) {
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [streamingText, setStreamingText] = useState("");
    const [verdict, setVerdict] = useState<ParsedVerdict | null>(null);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Send initial AI greeting when modal opens
    useEffect(() => {
        if (isOpen && messages.length === 0 && !isLoading) {
            fetchAiResponse([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Auto-scroll to bottom on new messages or streaming
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading, streamingText]);

    // Reset state when modal closes
    const handleClose = () => {
        setMessages([]);
        setInput("");
        setIsLoading(false);
        setStreamingText("");
        setVerdict(null);
        setError(null);
        onClose();
    };

    const fetchAiResponse = async (currentMessages: { role: 'ai' | 'user', text: string }[]) => {
        setIsLoading(true);
        setStreamingText("");
        setError(null);

        try {
            const res = await fetch('/api/mock-interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: currentMessages, grantName }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }

            // Read SSE stream
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (!reader) throw new Error('No response stream');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.content) {
                                fullText += parsed.content;
                                setStreamingText(fullText);
                            }
                        } catch {
                            // skip unparseable chunks
                        }
                    }
                }
            }

            // Finalize: add the complete message
            const aiMessage = { role: 'ai' as const, text: fullText };
            setMessages(prev => [...prev, aiMessage]);
            setStreamingText("");

            // Check if the AI's response contains a verdict
            const parsedVerdict = parseVerdict(fullText);
            if (parsedVerdict) {
                setVerdict(parsedVerdict);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to get AI response');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        if (!input.trim() || isLoading || verdict) return;
        const userMessage = { role: 'user' as const, text: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        fetchAiResponse(updatedMessages);
    };

    if (!isOpen) return null;

    // Clean display text: remove the verdict markers for nice UI
    const cleanText = (text: string) => {
        return text
            .replace(/---VERDICT---/g, '')
            .replace(/---END---/g, '')
            .replace(/SCORE:\s*\d+\/100/i, '')
            .replace(/STRENGTHS:/i, '✅ Strengths:')
            .replace(/WEAKNESSES:/i, '⚠️ Weaknesses:')
            .replace(/RECOMMENDATION:/i, '💡 Recommendation:')
            .trim();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[80vh] h-[600px]"
                >
                    {/* Header */}
                    <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-red-500">
                            <ShieldAlert className="w-5 h-5" />
                            <div>
                                <h2 className="font-bold text-white tracking-wider text-sm md:text-base">OFFICIAL SCRUTINY COMMITTEE</h2>
                                <p className="text-xs text-slate-500 font-medium">{grantName} • AI-Powered by Groq</p>
                            </div>
                        </div>
                        <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900" ref={scrollRef}>
                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 border-l-4 border-red-500 rounded-bl-none'
                                    }`}>
                                    {m.role === 'ai' && <p className="text-xs text-red-400 font-bold mb-2 uppercase tracking-wider">Nodal Officer</p>}
                                    <div className="whitespace-pre-wrap">{m.role === 'ai' ? cleanText(m.text) : m.text}</div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Live Streaming Text */}
                        {streamingText && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="max-w-[85%] bg-slate-800 border-l-4 border-red-500 rounded-xl rounded-bl-none p-4 shadow-lg">
                                    <p className="text-xs text-red-400 font-bold mb-2 uppercase tracking-wider">Nodal Officer</p>
                                    <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{cleanText(streamingText)}<span className="inline-block w-2 h-4 bg-red-400 animate-pulse ml-1 rounded-sm" /></div>
                                </div>
                            </motion.div>
                        )}

                        {/* Loading Indicator (before stream starts) */}
                        {isLoading && !streamingText && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-slate-800 border-l-4 border-red-500 rounded-xl rounded-bl-none p-4 shadow-lg">
                                    <p className="text-xs text-red-400 font-bold mb-2 uppercase tracking-wider">Nodal Officer</p>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm italic">Reviewing your response...</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-900/30 border border-red-500/30 text-red-300 p-4 rounded-xl text-sm"
                            >
                                <p className="font-bold mb-1">⚠️ Connection Error</p>
                                <p>{error}</p>
                                <button
                                    onClick={() => fetchAiResponse(messages)}
                                    className="mt-2 text-xs bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors"
                                >
                                    Retry
                                </button>
                            </motion.div>
                        )}

                        {/* Score Reveal */}
                        {verdict && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                                className="bg-slate-950 border border-green-500/30 p-8 rounded-2xl text-center mt-8 mx-auto max-w-sm shadow-2xl shadow-green-900/20"
                            >
                                <h3 className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">Readiness Score</h3>
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 mb-4">{verdict.score}/100</div>
                                {verdict.recommendation && (
                                    <p className="text-slate-300 text-sm font-medium italic">"{verdict.recommendation}"</p>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area — hidden after verdict */}
                    {!verdict && (
                        <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3 items-center">
                            <div className="relative flex-1">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={isLoading ? "Waiting for response..." : "Type your answer confidently..."}
                                    disabled={isLoading}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                                />
                                <Mic className="w-5 h-5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white transition-colors" />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
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
