"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, Sparkles, TrendingUp, Calendar, DollarSign, LayoutDashboard, Bookmark, User, Save, Settings, Menu, CheckCircle2, Bell, AlertTriangle, XCircle, Loader2, Globe, Moon, Sun } from 'lucide-react';
// @ts-ignore
import GrantCard from '@/components/GrantCard';
// @ts-ignore
import RunwayChart from '@/components/RunwayChart';
// @ts-ignore
import DigiLockerModal from '@/components/DigiLockerModal';
import { TECH_GRANTS, ALL_GRANTS } from '@/lib/smartMock';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';
import clsx from 'clsx';

interface GrantAnalysis {
    grantId: string;
    eligibility: 'eligible' | 'partial' | 'not-eligible';
    score: number;
    reason: string;
    strategy: string;
}

interface AnalysisResult {
    analysis: GrantAnalysis[];
    overallSummary: string;
}

export default function Dashboard() {
    const { user, profile, updateProfile } = useAuth();
    const { lang, setLang } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const dt = t('dashboard', lang);
    const pt = t('profile', lang);
    const st = t('sidebar', lang);

    const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
    const [pitch, setPitch] = useState("");
    const [grants, setGrants] = useState<any[]>(TECH_GRANTS);
    const [isSearching, setIsSearching] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    const [editForm, setEditForm] = useState(profile);
    const [isSaved, setIsSaved] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);

    // Voice Input State
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Initialize Web Speech Recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            // Set language based on current lang
            if (lang === 'hi') recognition.lang = 'hi-IN';
            else if (lang === 'ta') recognition.lang = 'ta-IN';
            else recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                let transcript = '';
                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setPitch(transcript);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }

        return () => {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { }
            }
        };
    }, [lang]);

    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert('Speech Recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSaveProfile = () => {
        updateProfile(editForm);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleSearch = async () => {
        if (!pitch.trim()) return;
        setIsSearching(true);
        setAnalysisError(null);
        setAnalysisResult(null);
        setHasAnalyzed(false);

        try {
            const response = await fetch('/api/analyze-pitch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pitch: pitch.trim(),
                    grants: ALL_GRANTS.map(g => ({
                        id: g.id, title: g.title, agency: g.agency, amount: g.amount,
                        tags: g.tags, sector: g.sector, idealStage: g.idealStage, idealStatus: g.idealStatus,
                    })),
                    userProfile: profile,
                }),
            });

            if (!response.ok) throw new Error('Failed to analyze pitch. Please try again.');

            const data: AnalysisResult = await response.json();
            setAnalysisResult(data);
            setGrants(ALL_GRANTS);
            setHasAnalyzed(true);
        } catch (err: any) {
            setAnalysisError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const getGrantAnalysis = (grantId: string): GrantAnalysis | undefined => {
        return analysisResult?.analysis?.find(a => a.grantId === grantId);
    };

    const eligibleGrants = hasAnalyzed
        ? grants.filter(g => { const a = getGrantAnalysis(g.id); return a && (a.eligibility === 'eligible' || a.eligibility === 'partial'); })
        : grants;
    const notEligibleGrants = hasAnalyzed
        ? grants.filter(g => { const a = getGrantAnalysis(g.id); return a && a.eligibility === 'not-eligible'; })
        : [];
    const unanalyzedGrants = hasAnalyzed
        ? grants.filter(g => !getGrantAnalysis(g.id))
        : [];

    const langLabels: Record<string, string> = { en: 'EN', hi: 'हि', ta: 'த' };
    const langNames: Record<string, string> = { en: 'English', hi: 'हिन्दी', ta: 'தமிழ்' };

    return (
        <div className={clsx("min-h-screen font-sans transition-colors duration-300", isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900")}>
            {/* HEADER */}
            <header className={clsx("sticky top-0 z-50 border-b transition-colors duration-300", isDarkMode ? "bg-slate-900/95 border-slate-800 backdrop-blur-md" : "bg-white border-slate-200")}>
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">GrantMatch.ai</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* LANGUAGE SELECTOR */}
                        <div className="relative">
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                                    isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
                                )}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{langLabels[lang]}</span>
                            </button>
                            {showLangMenu && (
                                <div className={clsx("absolute right-0 mt-2 w-36 rounded-xl shadow-xl border py-1 z-50",
                                    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                                )}>
                                    {(['en', 'hi', 'ta'] as const).map(l => (
                                        <button
                                            key={l}
                                            onClick={() => { setLang(l); setShowLangMenu(false); }}
                                            className={clsx("w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors",
                                                lang === l ? "bg-blue-50 text-blue-700 font-bold" : isDarkMode ? "text-slate-300 hover:bg-slate-700" : "text-slate-700 hover:bg-slate-50"
                                            )}
                                        >
                                            <span>{langNames[l]}</span>
                                            {lang === l && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* DARK MODE TOGGLE */}
                        <button
                            onClick={toggleDarkMode}
                            className={clsx("p-2 rounded-full border transition-all hover:scale-105",
                                isDarkMode ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                            )}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <Bell className={clsx("w-5 h-5 cursor-pointer", isDarkMode ? "text-slate-400" : "text-slate-500")} />
                        <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center border font-bold",
                            isDarkMode ? "bg-indigo-900 border-indigo-700 text-indigo-300" : "bg-indigo-100 border-indigo-200 text-indigo-700"
                        )}>AM</div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex">
                {/* SIDEBAR */}
                <aside className="hidden lg:block w-64 py-8 pr-8 sticky top-16 h-[calc(100vh-4rem)] space-y-2">
                    <button onClick={() => setActiveTab('dashboard')} className={clsx("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                        activeTab === 'dashboard' ? 'bg-blue-600 text-white' : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-white'
                    )}>
                        <LayoutDashboard className="w-5 h-5" /> {st.dashboard}
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={clsx("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                        activeTab === 'profile' ? 'bg-blue-600 text-white' : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-white'
                    )}>
                        <User className="w-5 h-5" /> {st.profile}
                    </button>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 py-8 space-y-8 min-w-0">
                    {activeTab === 'dashboard' ? (
                        <>
                            <div className={clsx("p-6 border rounded-2xl flex justify-between items-center",
                                isDarkMode ? "bg-blue-900/20 border-blue-800/50" : "bg-blue-50 border-blue-100"
                            )}>
                                <div>
                                    <h2 className={clsx("text-lg font-bold", isDarkMode ? "text-blue-100" : "text-slate-800")}>{dt.welcomeBack}, {profile.ventureName}</h2>
                                    <p className={clsx("text-sm", isDarkMode ? "text-slate-400" : "text-slate-600")}>{dt.eligibilityCalc} <span className="font-bold">{profile.stage}</span> {dt.stageProfile}</p>
                                </div>
                                <button onClick={() => setActiveTab('profile')} className={clsx("px-4 py-2 font-bold rounded-lg text-sm border",
                                    isDarkMode ? "bg-slate-800 text-blue-400 border-blue-800 hover:bg-slate-700" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                                )}>{dt.editProfile}</button>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className={clsx("p-6 rounded-2xl shadow-sm border flex items-center justify-between",
                                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                                )}>
                                    <div>
                                        <p className={clsx("text-sm font-medium", isDarkMode ? "text-slate-400" : "text-slate-500")}>{dt.totalFunds}</p>
                                        <h3 className={clsx("text-3xl font-bold mt-1", isDarkMode ? "text-white" : "text-slate-900")}>{ALL_GRANTS.length} {dt.schemes}</h3>
                                    </div>
                                    <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center",
                                        isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-50 text-green-600"
                                    )}><DollarSign className="w-6 h-6" /></div>
                                </div>
                                <div className={clsx("p-6 rounded-2xl shadow-sm border flex items-center justify-between",
                                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                                )}>
                                    <div>
                                        <p className={clsx("text-sm font-medium", isDarkMode ? "text-slate-400" : "text-slate-500")}>{dt.matchAccuracy}</p>
                                        <h3 className={clsx("text-3xl font-bold mt-1", isDarkMode ? "text-white" : "text-slate-900")}>{hasAnalyzed ? dt.aiAnalyzed : dt.pending}</h3>
                                    </div>
                                    <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center",
                                        isDarkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600"
                                    )}><TrendingUp className="w-6 h-6" /></div>
                                </div>
                                <div className={clsx("p-6 rounded-2xl shadow-sm border flex items-center justify-between",
                                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                                )}>
                                    <div>
                                        <p className={clsx("text-sm font-medium", isDarkMode ? "text-slate-400" : "text-slate-500")}>{hasAnalyzed ? dt.eligibleFunds : dt.deadlinesApproaching}</p>
                                        <h3 className={clsx("text-3xl font-bold mt-1", isDarkMode ? "text-white" : "text-slate-900")}>{hasAnalyzed ? `${eligibleGrants.length} / ${ALL_GRANTS.length}` : `4 ${dt.grants}`}</h3>
                                    </div>
                                    <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center",
                                        isDarkMode ? "bg-orange-900/30 text-orange-400" : "bg-orange-50 text-orange-600"
                                    )}><Calendar className="w-6 h-6" /></div>
                                </div>
                            </div>

                            {/* Input + Chart Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className={clsx("lg:col-span-2 p-6 rounded-2xl shadow-sm border",
                                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                                )}>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className={clsx("text-xs font-bold uppercase tracking-wider", isDarkMode ? "text-slate-400" : "text-slate-500")}>{dt.enterPitch}</label>
                                        <span className={clsx("text-xs px-2 py-1 rounded font-medium",
                                            isDarkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600"
                                        )}>{dt.aiPowered}</span>
                                    </div>
                                    <textarea
                                        value={pitch}
                                        onChange={(e) => setPitch(e.target.value)}
                                        placeholder={dt.pitchPlaceholder}
                                        className={clsx("w-full h-32 p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all mb-4",
                                            isDarkMode ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" : "bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400"
                                        )}
                                    />
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={handleVoiceInput}
                                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                isListening
                                                    ? "bg-red-600 text-white animate-pulse shadow-lg shadow-red-500/30"
                                                    : isDarkMode
                                                        ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                                                        : "bg-slate-800 text-white hover:bg-slate-900"
                                            )}
                                        >
                                            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                            {isListening ? (lang === 'hi' ? 'सुनना बंद करें' : lang === 'ta' ? 'கேட்பதை நிறுத்து' : 'Stop Listening') : dt.voiceInput}
                                        </button>
                                        <button
                                            onClick={handleSearch}
                                            disabled={isSearching || !pitch.trim()}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSearching ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> {dt.analyzingAi}</>
                                            ) : (
                                                <>{dt.analyzeEligibility} <Sparkles className="w-4 h-4" /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="lg:col-span-1 h-full min-h-[250px]">
                                    <RunwayChart />
                                </div>
                            </div>

                            {/* Analysis Error */}
                            {analysisError && (
                                <div className={clsx("p-4 border rounded-xl flex items-center gap-3",
                                    isDarkMode ? "bg-red-900/20 border-red-800 text-red-400" : "bg-red-50 border-red-200 text-red-700"
                                )}>
                                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm font-medium">{analysisError}</p>
                                </div>
                            )}

                            {/* Loading Skeleton */}
                            {isSearching && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                        <h2 className={clsx("text-lg font-bold", isDarkMode ? "text-slate-300" : "text-slate-700")}>{dt.aiAnalyzing} {ALL_GRANTS.length} {dt.governmentSchemes}</h2>
                                    </div>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={clsx("rounded-2xl p-6 border animate-pulse",
                                            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                                        )}>
                                            <div className="flex justify-between mb-4">
                                                <div className="space-y-2">
                                                    <div className={clsx("h-4 w-32 rounded", isDarkMode ? "bg-slate-700" : "bg-slate-200")} />
                                                    <div className={clsx("h-6 w-64 rounded", isDarkMode ? "bg-slate-700" : "bg-slate-200")} />
                                                    <div className={clsx("h-3 w-40 rounded", isDarkMode ? "bg-slate-800" : "bg-slate-100")} />
                                                </div>
                                                <div className={clsx("h-8 w-24 rounded", isDarkMode ? "bg-slate-700" : "bg-slate-200")} />
                                            </div>
                                            <div className={clsx("h-16 w-full rounded", isDarkMode ? "bg-slate-800" : "bg-slate-100")} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* AI Summary */}
                            {hasAnalyzed && analysisResult?.overallSummary && (
                                <div className={clsx("p-5 border rounded-2xl",
                                    isDarkMode ? "bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-800" : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                                )}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-blue-600" />
                                        <h3 className={clsx("text-sm font-bold uppercase tracking-wider", isDarkMode ? "text-blue-400" : "text-blue-800")}>{dt.aiSummary}</h3>
                                    </div>
                                    <p className={clsx("text-sm leading-relaxed", isDarkMode ? "text-slate-300" : "text-slate-700")}>{analysisResult.overallSummary}</p>
                                </div>
                            )}

                            {/* ELIGIBLE GRANTS */}
                            {!isSearching && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        {hasAnalyzed ? (
                                            <><CheckCircle2 className="w-5 h-5 text-green-500" /> {dt.eligibleFunds} ({eligibleGrants.length})</>
                                        ) : (
                                            <><Sparkles className="w-5 h-5 text-blue-500" /> {dt.matchesFor} {profile.domain} {dt.sector}</>
                                        )}
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        {(hasAnalyzed ? eligibleGrants : grants).map((grant, index) => (
                                            <GrantCard key={index} grant={grant} profile={profile} aiAnalysis={getGrantAnalysis(grant.id)} pitch={pitch} lang={lang} isDarkMode={isDarkMode} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* UNANALYZED GRANTS */}
                            {hasAnalyzed && unanalyzedGrants.length > 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-500">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500" /> {dt.otherSchemes} ({unanalyzedGrants.length})
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        {unanalyzedGrants.map((grant, index) => (
                                            <GrantCard key={`unanalyzed-${index}`} grant={grant} profile={profile} pitch={pitch} lang={lang} isDarkMode={isDarkMode} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* NOT ELIGIBLE */}
                            {hasAnalyzed && notEligibleGrants.length > 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-400">
                                        <XCircle className="w-5 h-5 text-red-400" /> {dt.notEligible} ({notEligibleGrants.length})
                                    </h2>
                                    <p className="text-sm text-slate-500 -mt-3">{dt.notEligibleDesc}</p>
                                    <div className="grid grid-cols-1 gap-6 opacity-70">
                                        {notEligibleGrants.map((grant, index) => (
                                            <GrantCard key={`not-eligible-${index}`} grant={grant} profile={profile} aiAnalysis={getGrantAnalysis(grant.id)} pitch={pitch} lang={lang} isDarkMode={isDarkMode} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* PROFILE VIEW */}
                            <div className={clsx("max-w-2xl mx-auto rounded-2xl shadow-sm border p-8",
                                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                            )}>
                                <div className={clsx("flex items-center gap-3 mb-8 border-b pb-4",
                                    isDarkMode ? "border-slate-800" : "border-slate-100"
                                )}>
                                    <div className={clsx("p-3 rounded-xl", isDarkMode ? "bg-blue-900/30" : "bg-blue-100")}><Settings className={clsx("w-6 h-6", isDarkMode ? "text-blue-400" : "text-blue-600")} /></div>
                                    <div>
                                        <h2 className={clsx("text-2xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{pt.title}</h2>
                                        <p className={clsx(isDarkMode ? "text-slate-400" : "text-slate-500")}>{pt.subtitle}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className={clsx("block text-sm font-bold mb-2", isDarkMode ? "text-slate-300" : "text-slate-700")}>{pt.ventureName}</label>
                                        <input value={editForm.ventureName} onChange={(e) => setEditForm({ ...editForm, ventureName: e.target.value })} className={clsx("w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "border-slate-300"
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={clsx("block text-sm font-bold mb-2", isDarkMode ? "text-slate-300" : "text-slate-700")}>{pt.currentStage}</label>
                                            <select value={editForm.stage} onChange={(e) => setEditForm({ ...editForm, stage: e.target.value as any })} className={clsx("w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300"
                                            )}>
                                                <option value="Idea">{pt.ideaPhase}</option>
                                                <option value="Prototype">{pt.prototyping}</option>
                                                <option value="Revenue">{pt.generatingRevenue}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={clsx("block text-sm font-bold mb-2", isDarkMode ? "text-slate-300" : "text-slate-700")}>{pt.legalStatus}</label>
                                            <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })} className={clsx("w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300"
                                            )}>
                                                <option value="Student">{pt.student}</option>
                                                <option value="Researcher">{pt.researcher}</option>
                                                <option value="Individual">{pt.individual}</option>
                                                <option value="Pvt Ltd">{pt.pvtLtd}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={clsx("block text-sm font-bold mb-2", isDarkMode ? "text-slate-300" : "text-slate-700")}>{pt.domain}</label>
                                        <select value={editForm.domain} onChange={(e) => setEditForm({ ...editForm, domain: e.target.value as any })} className={clsx("w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500",
                                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-300"
                                        )}>
                                            <option value="DeepTech">{pt.deeptech}</option>
                                            <option value="Agri">{pt.agri}</option>
                                            <option value="Health">{pt.health}</option>
                                            <option value="General">{pt.general}</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleSaveProfile}
                                        className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${isSaved ? 'bg-green-600' : 'bg-slate-900 hover:bg-slate-800'}`}
                                    >
                                        {isSaved ? <><CheckCircle2 className="w-5 h-5" /> {pt.savedRecalculated}</> : <><Save className="w-5 h-5" /> {pt.saveChanges}</>}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}