"use client";
import React, { useState } from 'react';
import { Sparkles, ExternalLink, FileText, Volume2, StopCircle, CheckCircle2, XCircle, MessageSquare, Mic, ShieldCheck } from 'lucide-react';
// @ts-ignore
import GrantRadar from './GrantRadar';
// @ts-ignore
import GrantChat from './GrantChat';
// @ts-ignore
import DraftPreviewModal from './DraftPreviewModal';
// @ts-ignore
import AiJuryModal from './AiJuryModal';
// @ts-ignore
import EligibilityModal from './EligibilityModal';
import { t as getTranslations } from '@/lib/translations';
import clsx from 'clsx';

export default function GrantCard({ grant, lang = 'en', profile, aiAnalysis, pitch, isDarkMode = false }: { grant: any, lang?: string, profile?: any, aiAnalysis?: { eligibility: string; score: number; reason: string; strategy: string }, pitch?: string, isDarkMode?: boolean }) {
    const [activeTab, setActiveTab] = useState<'radar' | 'docs'>('radar');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // Modals
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [showJuryModal, setShowJuryModal] = useState(false);
    const [showEligibilityModal, setShowEligibilityModal] = useState(false);
    const [isDrafting, setIsDrafting] = useState(false);

    // @ts-ignore
    const t = getTranslations('grantCard', lang as any);

    const handleSpeak = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }
        const utterance = new SpeechSynthesisUtterance(grant.description);
        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;
        if (lang === 'hi') selectedVoice = voices.find(v => v.lang.includes('hi'));
        else if (lang === 'ta') selectedVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('IN'));
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const handleAutoDraft = () => {
        setIsDrafting(true);
        setTimeout(() => {
            setIsDrafting(false);
            setShowDraftModal(true);
        }, 1000);
    };

    return (
        <>
            <div className={clsx("rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow relative overflow-hidden group",
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
            )}>
                {/* AI Eligibility Badge */}
                {aiAnalysis && (
                    <div className={`mb-4 px-4 py-2.5 rounded-xl border flex items-center justify-between ${aiAnalysis.eligibility === 'eligible'
                        ? isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
                        : aiAnalysis.eligibility === 'partial'
                            ? isDarkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
                            : isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                        }`}>
                        <div className="flex items-center gap-2">
                            {aiAnalysis.eligibility === 'eligible' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : aiAnalysis.eligibility === 'partial' ? (
                                <span className="text-yellow-600 text-lg">⚠️</span>
                            ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`text-sm font-bold ${aiAnalysis.eligibility === 'eligible'
                                ? isDarkMode ? 'text-green-400' : 'text-green-800'
                                : aiAnalysis.eligibility === 'partial'
                                    ? isDarkMode ? 'text-yellow-400' : 'text-yellow-800'
                                    : isDarkMode ? 'text-red-400' : 'text-red-800'
                                }`}>
                                {aiAnalysis.eligibility === 'eligible'
                                    ? '✅ Eligible'
                                    : aiAnalysis.eligibility === 'partial'
                                        ? '⚠️ Partially Eligible'
                                        : '❌ Not Eligible'}
                            </span>
                            <span className={clsx("text-xs ml-2", isDarkMode ? "text-slate-400" : "text-slate-500")}>— {aiAnalysis.reason}</span>
                        </div>
                        <div className={`text-lg font-black ${aiAnalysis.score >= 70 ? 'text-green-600' : aiAnalysis.score >= 40 ? 'text-yellow-600' : 'text-red-500'
                            }`}>
                            {aiAnalysis.score}%
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                            {grant.tags.map((tag: string, i: number) => (
                                <span key={i} className={clsx("text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide",
                                    isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600"
                                )}>{tag}</span>
                            ))}
                        </div>
                        <h3 className={clsx("text-xl font-bold mb-1", isDarkMode ? "text-white" : "text-slate-900")}>{grant.title}</h3>
                        <p className={clsx("text-sm", isDarkMode ? "text-slate-400" : "text-slate-500")}>{grant.agency}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                            <span className={clsx("text-2xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{grant.amount}</span>
                            <button
                                onClick={handleSpeak}
                                className={clsx("p-2 rounded-full transition-colors",
                                    isSpeaking ? 'bg-red-100 text-red-600' : isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                {isSpeaking ? <StopCircle className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>
                        <span className={clsx("text-xs font-medium uppercase", isDarkMode ? "text-slate-500" : "text-slate-400")}>{t.grantAmount}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
                    <div className="lg:col-span-2 space-y-6">
                        <p className={clsx("leading-relaxed text-sm", isDarkMode ? "text-slate-300" : "text-slate-600")}>{grant.description}</p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAutoDraft}
                                className={clsx("flex-1 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg",
                                    isDarkMode ? "bg-white text-slate-900 hover:bg-slate-200 shadow-white/5" : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10"
                                )}
                            >
                                {isDrafting ? (
                                    <span className="animate-pulse">{t.thinking}</span>
                                ) : (
                                    <>
                                        <FileText className="w-4 h-4" /> {t.autoDraft}
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setShowEligibilityModal(true)}
                                className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                                <ShieldCheck className="w-4 h-4" /> {t.checkEligibility || "Check Eligibility"}
                            </button>

                            <button
                                onClick={() => setShowJuryModal(true)}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                                <Mic className="w-4 h-4" /> {t.practiceInterview}
                            </button>

                            <a
                                href={grant.portalUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx("px-4 py-3 rounded-xl font-bold border transition-colors flex items-center gap-2",
                                    isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                )}
                            >
                                {t.portal} <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className={clsx("lg:col-span-1 rounded-xl p-4 border",
                        isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
                    )}>
                        <div className={clsx("flex p-1 rounded-lg mb-4", isDarkMode ? "bg-slate-700" : "bg-slate-200")}>
                            <button
                                onClick={() => setActiveTab('radar')}
                                className={clsx("flex-1 py-1 text-xs font-bold rounded-md transition-all",
                                    activeTab === 'radar' ? (isDarkMode ? 'bg-slate-600 shadow-sm text-white' : 'bg-white shadow-sm') : ''
                                )}
                            >
                                {t.analysis}
                            </button>
                            <button
                                onClick={() => setActiveTab('docs')}
                                className={clsx("flex-1 py-1 text-xs font-bold rounded-md transition-all",
                                    activeTab === 'docs' ? (isDarkMode ? 'bg-slate-600 shadow-sm text-white' : 'bg-white shadow-sm') : ''
                                )}
                            >
                                {t.checklist}
                            </button>
                        </div>

                        <div className="h-48 flex items-center justify-center">
                            {activeTab === 'radar' ? (
                                <GrantRadar data={grant.radarData} />
                            ) : (
                                <div className="w-full space-y-3">
                                    {t.checklistItems.map((item: string, i: number) => (
                                        <div key={i} className={clsx("flex items-center gap-2 text-sm", isDarkMode ? "text-slate-300" : "text-slate-700")}>
                                            {i < 3 ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                                            <span className={i >= 3 ? "opacity-50" : ""}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={clsx("rounded-xl p-4 border",
                    isDarkMode ? "bg-blue-900/10 border-blue-900/30" : "bg-blue-50/50 border-blue-100"
                )}>
                    <div className="flex justify-between items-center mb-2">
                        <div className={clsx("flex items-center gap-2 text-xs font-bold uppercase tracking-wider", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                            <Sparkles className="w-3 h-3" /> {t.strategy}
                        </div>
                        <button
                            onClick={() => setShowChat(!showChat)}
                            className={clsx("text-xs flex items-center gap-1",
                                isDarkMode ? "text-slate-400 hover:text-blue-400" : "text-slate-500 hover:text-blue-600"
                            )}
                        >
                            <MessageSquare className="w-3 h-3" /> {t.ask}
                        </button>
                    </div>
                    <p className={clsx("text-sm leading-relaxed font-medium", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                        {aiAnalysis?.strategy
                            ? aiAnalysis.strategy
                            : <>To align with the {grant.agency}&apos;s mission, we have tailored your proposal to highlight <span className={clsx("px-1 rounded", isDarkMode ? "text-blue-400 bg-blue-900/30" : "text-blue-600 bg-blue-100")}>indigenous innovation</span>.</>
                        }
                    </p>
                </div>

                {showChat && (
                    <div className={clsx("absolute inset-0 z-10", isDarkMode ? "bg-slate-900" : "bg-white")}>
                        <GrantChat onClose={() => setShowChat(false)} grantName={grant.title} />
                    </div>
                )}
            </div>

            <DraftPreviewModal
                isOpen={showDraftModal}
                onClose={() => setShowDraftModal(false)}
                grant={grant}
            />

            <AiJuryModal
                isOpen={showJuryModal}
                onClose={() => setShowJuryModal(false)}
                grantName={grant.title}
            />

            <EligibilityModal
                isOpen={showEligibilityModal}
                onClose={() => setShowEligibilityModal(false)}
                grant={grant}
                userProfile={profile}
            />
        </>
    );
}