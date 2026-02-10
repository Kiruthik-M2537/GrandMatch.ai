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

const TRANSLATIONS = {
    en: {
        grantAmount: "Grant Amount",
        autoDraft: "Auto-Draft",
        thinking: "Thinking...",
        practiceInterview: "Practice Interview",
        checkEligibility: "Check Eligibility",
        portal: "Portal",
        analysis: "Analysis",
        checklist: "Checklist",
        strategy: "AI-Rewritten Pitch Strategy",
        ask: "Ask Question",
        checklistItems: ["Pitch Deck", "3-Year Financials", "Founder Aadhaar/PAN", "DPIIT Recognition"]
    },
    hi: {
        grantAmount: "अनुदान राशि",
        autoDraft: "स्वतः मसौदा",
        thinking: "सोच रहा हूँ...",
        practiceInterview: "साक्षात्कार अभ्यास",
        checkEligibility: "पात्रता की जांच करें",
        portal: "पोर्टल",
        analysis: "विश्लेषण",
        checklist: "जांच सूची",
        strategy: "AI पिच रणनीति",
        ask: "प्रश्न पूछें",
        checklistItems: ["पिच डेक", "3 साल का वित्तीय विवरण", "संस्थापक आधार/पैन", "DPIIT मान्यता"]
    },
    ta: {
        grantAmount: "மானியத் தொகை",
        autoDraft: "தானியங்கி வரைவு",
        thinking: "சிந்திக்கிறது...",
        practiceInterview: "நேர்காணல் பயிற்சி",
        checkEligibility: "தகுதியை சரிபார்க்கவும்",
        portal: "இணையதளம்",
        analysis: "பகுப்பாய்வு",
        checklist: "சரிபார்ப்புப் பட்டியல்",
        strategy: "AI பிட்ச் உத்தி",
        ask: "கேள்வி கேட்க",
        checklistItems: ["பிட்ச் டெக்", "3 ஆண்டு நிதி அறிக்கைகள்", "நிறுவனர் ஆதார்/பான்", "DPIIT அங்கீகாரம்"]
    }
};

export default function GrantCard({ grant, lang = 'en', profile }: { grant: any, lang?: string, profile?: any }) {
    const [activeTab, setActiveTab] = useState<'radar' | 'docs'>('radar');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // Modals
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [showJuryModal, setShowJuryModal] = useState(false);
    const [showEligibilityModal, setShowEligibilityModal] = useState(false);
    const [isDrafting, setIsDrafting] = useState(false);

    // @ts-ignore
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                            {grant.tags.map((tag: string, i: number) => (
                                <span key={i} className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wide">{tag}</span>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{grant.title}</h3>
                        <p className="text-sm text-slate-500">{grant.agency}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                            <span className="text-2xl font-bold text-slate-900">{grant.amount}</span>
                            <button
                                onClick={handleSpeak}
                                className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                {isSpeaking ? <StopCircle className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>
                        <span className="text-xs text-slate-400 font-medium uppercase">{t.grantAmount}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
                    <div className="lg:col-span-2 space-y-6">
                        <p className="text-slate-600 leading-relaxed text-sm">{grant.description}</p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAutoDraft}
                                className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
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
                                className="px-4 py-3 rounded-xl font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                {t.portal} <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex p-1 bg-slate-200 rounded-lg mb-4">
                            <button
                                onClick={() => setActiveTab('radar')}
                                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'radar' ? 'bg-white shadow-sm' : ''}`}
                            >
                                {t.analysis}
                            </button>
                            <button
                                onClick={() => setActiveTab('docs')}
                                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'docs' ? 'bg-white shadow-sm' : ''}`}
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
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                            {i < 3 ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                                            <span className={i >= 3 ? "opacity-50" : ""}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> {t.strategy}
                        </div>
                        <button
                            onClick={() => setShowChat(!showChat)}
                            className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
                        >
                            <MessageSquare className="w-3 h-3" /> {t.ask}
                        </button>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        To align with the {grant.agency}'s mission, we have tailored your proposal to highlight <span className="text-blue-600 bg-blue-100 px-1 rounded">indigenous innovation</span>.
                    </p>
                </div>

                {showChat && (
                    <div className="absolute inset-0 z-10 bg-white">
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