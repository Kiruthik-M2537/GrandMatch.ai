"use client";
import React, { useState } from 'react';
import { Search, Mic, Sparkles, TrendingUp, Calendar, DollarSign, LayoutDashboard, Bookmark, User, Save, Settings, Menu, CheckCircle2, Bell } from 'lucide-react';
// @ts-ignore
import GrantCard from '@/components/GrantCard';
// @ts-ignore
import RunwayChart from '@/components/RunwayChart';
// @ts-ignore
import DigiLockerModal from '@/components/DigiLockerModal';
import { TECH_GRANTS, AGRI_GRANTS, HEALTH_GRANTS } from '@/lib/smartMock';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
    const { user, profile, updateProfile } = useAuth(); // GET GLOBAL PROFILE
    const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
    const [pitch, setPitch] = useState("");
    const [grants, setGrants] = useState<any[]>(TECH_GRANTS); // Default to Tech
    const [isSearching, setIsSearching] = useState(false);

    // Form State for Profile Tab
    const [editForm, setEditForm] = useState(profile);
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveProfile = () => {
        updateProfile(editForm);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleSearch = () => {
        setIsSearching(true);
        setTimeout(() => {
            // Simple logic just to show interactivity
            if (pitch.toLowerCase().includes('agri') || pitch.toLowerCase().includes('farm')) {
                setGrants(AGRI_GRANTS);
            } else if (pitch.toLowerCase().includes('health') || pitch.toLowerCase().includes('med')) {
                setGrants(HEALTH_GRANTS);
            } else {
                setGrants(TECH_GRANTS);
            }
            setIsSearching(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">GrantMatch.ai</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-700 font-bold">AM</div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex">
                {/* SIDEBAR */}
                <aside className="hidden lg:block w-64 py-8 pr-8 sticky top-16 h-[calc(100vh-4rem)] space-y-2">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-white'}`}>
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-white'}`}>
                        <User className="w-5 h-5" /> Profile & Settings
                    </button>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 py-8 space-y-8 min-w-0">

                    {activeTab === 'dashboard' ? (
                        <>
                            {/* DASHBOARD VIEW */}
                            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Welcome back, {profile.ventureName}</h2>
                                    <p className="text-sm text-slate-600">Your eligibility score is being calculated based on your <span className="font-bold">{profile.stage}</span> stage profile.</p>
                                </div>
                                <button onClick={() => setActiveTab('profile')} className="px-4 py-2 bg-white text-blue-600 font-bold rounded-lg text-sm border border-blue-200 hover:bg-blue-50">Edit Profile</button>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl shadow-sm border bg-white border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Total Funding Available</p>
                                        <h3 className="text-3xl font-bold mt-1 text-slate-900">₹20,000 Cr</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                        <DollarSign className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl shadow-sm border bg-white border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Match Accuracy</p>
                                        <h3 className="text-3xl font-bold mt-1 text-slate-900">92%</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl shadow-sm border bg-white border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Deadlines Approaching</p>
                                        <h3 className="text-3xl font-bold mt-1 text-slate-900">4 Grants</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Input + Chart Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 p-6 rounded-2xl shadow-sm border bg-white border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Enter Pitch Details
                                        </label>
                                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">
                                            AI-Powered
                                        </span>
                                    </div>
                                    <textarea
                                        value={pitch}
                                        onChange={(e) => setPitch(e.target.value)}
                                        placeholder="Describe your startup here to refine matches..."
                                        className="w-full h-32 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all mb-4 bg-slate-50 text-slate-800 placeholder:text-slate-400"
                                    />
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white hover:bg-slate-900 transition-colors">
                                            <Mic className="w-4 h-4" /> Voice Input
                                        </button>
                                        <button
                                            onClick={handleSearch}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                        >
                                            {isSearching ? "Analyzing..." : "Analyze Eligibility"} <Sparkles className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 h-full min-h-[250px]">
                                    <RunwayChart />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-500" /> Matches for {profile.domain} Sector</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {grants.map((grant, index) => (
                                        <GrantCard key={index} grant={grant} profile={profile} />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* PROFILE VIEW */}
                            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                                    <div className="p-3 bg-blue-100 rounded-xl"><Settings className="w-6 h-6 text-blue-600" /></div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Startup Profile</h2>
                                        <p className="text-slate-500">Update these details to recalculate your grant eligibility.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Venture Name</label>
                                        <input value={editForm.ventureName} onChange={(e) => setEditForm({ ...editForm, ventureName: e.target.value })} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Stage</label>
                                            <select value={editForm.stage} onChange={(e) => setEditForm({ ...editForm, stage: e.target.value as any })} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                                <option value="Idea">Idea Phase</option>
                                                <option value="Prototype">Prototyping</option>
                                                <option value="Revenue">Generating Revenue</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Legal Status</label>
                                            <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                                <option value="Student">Student (Individual)</option>
                                                <option value="Researcher">Researcher / Academic</option>
                                                <option value="Individual">Individual (Non-Student)</option>
                                                <option value="Pvt Ltd">Pvt Ltd Company</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Domain</label>
                                        <select value={editForm.domain} onChange={(e) => setEditForm({ ...editForm, domain: e.target.value as any })} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                            <option value="DeepTech">DeepTech / AI / Hardware</option>
                                            <option value="Agri">Agriculture / Rural</option>
                                            <option value="Health">Healthcare / BioTech</option>
                                            <option value="General">Generic / E-commerce</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={handleSaveProfile}
                                        className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${isSaved ? 'bg-green-600' : 'bg-slate-900 hover:bg-slate-800'}`}
                                    >
                                        {isSaved ? <><CheckCircle2 className="w-5 h-5" /> Saved & Recalculated!</> : <><Save className="w-5 h-5" /> Save Changes</>}
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