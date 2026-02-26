"use client";
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

interface EligibilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    grant: any;
    userProfile: any; // Receives the real profile
}

export default function EligibilityModal({ isOpen, onClose, grant, userProfile }: EligibilityModalProps) {
    const [score, setScore] = useState(0);
    const [matchDetails, setMatchDetails] = useState<any[]>([]);
    const { lang } = useLanguage();
    const et = t('eligibility', lang);

    // CALCULATE SCORE BASED ON REAL SAVED PROFILE
    useEffect(() => {
        if (!isOpen || !userProfile || !grant) return;

        let newScore = 50;
        let details = [];

        // 1. Stage Check
        if (grant.idealStage) {
            if (userProfile.stage === grant.idealStage) {
                newScore += 30;
                details.push({ title: et.perfectStage, desc: `Grant targets ${grant.idealStage} phase.`, type: "good" });
            } else {
                const stages = ['Idea', 'Prototype', 'Revenue'];
                const pIndex = stages.indexOf(userProfile.stage);
                const gIndex = stages.indexOf(grant.idealStage);
                if (pIndex < gIndex) {
                    newScore -= 10;
                    details.push({ title: et.tooEarly, desc: `Needs ${grant.idealStage}.`, type: "bad" });
                } else {
                    newScore -= 10;
                    details.push({ title: et.advancedStage, desc: `Grant focuses on ${grant.idealStage}.`, type: "bad" });
                }
            }
        } else {
            if (userProfile.stage === 'Prototype') {
                newScore += 10;
                details.push({ title: et.stageOk, desc: "Prototyping is generally supported.", type: "good" });
            }
        }

        // 2. Status Check
        if (grant.idealStatus) {
            if (userProfile.status === grant.idealStatus) {
                newScore += 20;
                details.push({ title: et.statusMatch, desc: `Grant supports ${grant.idealStatus}.`, type: "good" });
            } else if (grant.idealStatus === 'Pvt Ltd' && userProfile.status !== 'Pvt Ltd') {
                newScore -= 15;
                details.push({ title: et.registrationNeeded, desc: "Must be Pvt Ltd.", type: "bad" });
            } else {
                newScore += 10;
                details.push({ title: et.statusAccepted, desc: `Grant prefers ${grant.idealStatus}.`, type: "good" });
            }
        } else {
            if (userProfile.status === 'Student') {
                newScore += 10;
                details.push({ title: et.studentCategory, desc: "Eligible for student tracks.", type: "good" });
            }
        }

        // 3. Domain Check
        if (grant.sector) {
            if (userProfile.domain === grant.sector) {
                newScore += 20;
                details.push({ title: et.sectorPriority, desc: `Aligned with ${grant.sector}.`, type: "good" });
            } else if (grant.sector === 'General') {
                newScore += 10;
                details.push({ title: et.sectorOpen, desc: "Open to all sectors.", type: "good" });
            } else {
                newScore -= 10;
                details.push({ title: et.sectorMismatch, desc: `Focus is ${grant.sector}.`, type: "bad" });
            }
        } else {
            if (userProfile.domain === 'DeepTech') {
                newScore += 20;
                details.push({ title: et.deepTechPriority, desc: "High priority sector.", type: "good" });
            }
        }

        setScore(Math.min(Math.max(newScore, 0), 98));
        setMatchDetails(details);
    }, [isOpen, userProfile, grant, et]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-600" /> {et.title}</h3>
                        <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-5 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="36" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                                    <circle cx="40" cy="40" r="36" stroke={score > 80 ? "#16a34a" : "#ca8a04"} strokeWidth="8" fill="transparent" strokeDasharray={`${score * 2.26} 226`} />
                                </svg>
                                <span className={`absolute inset-0 flex items-center justify-center text-xl font-black ${score > 80 ? "text-green-600" : "text-yellow-600"}`}>{score}%</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">{et.matchFor} {userProfile?.ventureName}</h2>
                                <p className="text-xs text-slate-500">{et.basedOnProfile}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {matchDetails.map((d, i) => (
                                <div key={i} className={`p-3 rounded-xl border flex gap-3 ${d.type === 'good' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    {d.type === 'good' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-red-600" />}
                                    <div><h4 className={`text-sm font-bold ${d.type === 'good' ? 'text-green-800' : 'text-red-800'}`}>{d.title}</h4><p className={`text-xs ${d.type === 'good' ? 'text-green-700' : 'text-red-700'}`}>{d.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
