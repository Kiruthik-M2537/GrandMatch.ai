import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, PenLine, FileText, Loader2, CheckCircle2, Copy, Printer, Landmark } from 'lucide-react';
import confetti from 'canvas-confetti';
// @ts-ignore
import { jsPDF } from 'jspdf';

interface DraftPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    grant: {
        id: string;
        title: string;
        agency: string;
        amount: string;
        tags: string[];
    };
    lang?: 'en' | 'hi' | 'ta';
}

export default function DraftPreviewModal({ isOpen, onClose, grant, lang }: DraftPreviewModalProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const paperRef = useRef<HTMLDivElement>(null);

    // GENERATE THE FULL TEXT
    const fullText = `GOVERNMENT OF INDIA
MINISTRY OF ${grant.agency.toUpperCase()}
(INTEGRATED GRANT APPLICATION SYSTEM - IGAS)

FORM 1-A: OFFICIAL GRANT PROPOSAL
----------------------------------------------------------------------------------
To: 
The Nodal Officer, 
${grant.agency}, Government of India,
New Delhi - 110001.

Subject: Proposal for Indigenous Innovation under "${grant.title}" Scheme.

Reference No: IGAS/${new Date().getFullYear()}/${grant.id.substring(0, 8).toUpperCase()}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

Respected Sir/Madam,

1. EXECUTIVE SUMMARY
We, the undersigned, hereby submit our proposal for the aforementioned grant scheme. Our project aims to deliver a high-impact, indigenous solution aligned with the ${grant.agency}'s strategic mission. By leveraging ${grant.tags[1] || 'advanced technology'}, we intend to solve critical infrastructure challenges in the Indian ecosystem, fostering self-reliance (Atmanirbhar Bharat).

2. IMPACT ASSESSMENT
Our solution is projected to impact 10,000+ beneficiaries in Tier-2 and Tier-3 cities within the first 18 months of deployment. The primary outcomes include:
   (a) 30% increase in operational efficiency for end-users.
   (b) Reduction in dependency on foreign imports by 45%.
   (c) Creation of 50+ direct and indirect jobs in the local community.

3. BUDGET UTILIZATION STRATEGY
We request a total grant amount of ${grant.amount}, to be utilized as per the standard GFR (General Financial Rules) guidelines:
   - 40% :: Research & Development (Product Engineering)
   - 30% :: Indigenous Prototyping & Manufacturing
   - 20% :: Field Trials & Validation (Pilot Phase)
   - 10% :: Administrative Overheads & Compliance

4. CONCLUSION & UNDERTAKING
We certify that the information provided herein is true to the best of our knowledge. We are ready to commence the project immediately upon approval and adhere to all compliance norms set forth by the Ministry.

We request your favorable consideration for this application.

Yours Faithfully,

(Signature of Authorized Signatory)
[Your Startup Name]
[DPIIT Recognition Number: DIPP12345]
`;

    // TYPEWRITER EFFECT
    useEffect(() => {
        if (isOpen) {
            setDisplayedText("");
            setIsTyping(true);
            setIsEditing(false);
            let i = 0;
            const speed = 2; // Fast typing for larger text

            const interval = setInterval(() => {
                if (i < fullText.length) {
                    setDisplayedText((prev) => prev + fullText.charAt(i));
                    i++;

                    // Auto-scroll the paper container
                    if (paperRef.current) {
                        paperRef.current.scrollTop = paperRef.current.scrollHeight;
                    }
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                    // Confetti when done
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#2563eb', '#10b981'],
                        zIndex: 99999
                    });
                }
            }, speed);

            return () => clearInterval(interval);
        }
    }, [isOpen, fullText]);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Document Configuration
        doc.setFont("times", "roman");
        doc.setFontSize(12);

        // --- HEADER ---
        doc.setFontSize(16);
        doc.setFont("times", "bold");
        doc.text("GOVERNMENT OF INDIA", 105, 20, { align: "center" });

        doc.setFontSize(14);
        doc.text(`MINISTRY OF ${grant.agency.toUpperCase()}`, 105, 30, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("times", "normal");
        doc.text("(INTEGRATED GRANT APPLICATION SYSTEM - IGAS)", 105, 36, { align: "center" });

        // Line Separator
        doc.line(20, 42, 190, 42);

        // --- CONTENT ---
        // We use splitTextToSize to handle word wrapping
        // The displayedText contains the full generated draft

        // Remove the top header lines from displayedText to avoid duplication if user edited them
        // For simplicity, we just print the current textarea content
        const lines = doc.splitTextToSize(displayedText, 170);

        doc.setFontSize(11);
        doc.text(lines, 20, 50);

        // Footer Metadata (Fake System ID)
        // @ts-ignore
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(`Page ${i} of ${pageCount} | System Ref: ${grant.id} | Generated via GrantMatch AI`, 105, 285, { align: "center" });
        }

        doc.save(`Application_Draft_${grant.id}.pdf`);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(displayedText);
        alert("Draft copied to clipboard!");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-slate-100 rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden relative border border-slate-700 ring-1 ring-white/10"
            >
                {/* TOOLBAR (Top) */}
                <div className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center shadow-md z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                            <Landmark className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm tracking-wide uppercase text-slate-200">Integrated Grant Application System (IGAS)</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                                {isTyping ? 'Auto-Drafting in Progress...' : 'Document Ready'}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400 border border-slate-700">
                            FORM 1-A
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* MAIN EDITOR AREA */}
                <div className="flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center justify-start p-8">

                    {/* A4 Paper Container */}
                    <div
                        ref={paperRef}
                        className="bg-white w-full max-w-3xl h-full shadow-xl relative flex flex-col overflow-y-auto custom-scrollbar"
                        style={{ aspectRatio: '210/297' }} // A4 aspect ratio approximation for wider screens, but mostly h-full
                    >
                        {/* Official Header Graphic Placeholder */}
                        <div className="px-12 pt-12 pb-6 border-b-2 border-slate-800 flex flex-col items-center justify-center shrink-0 select-none pointer-events-none">
                            <Landmark className="w-12 h-12 text-slate-800 mb-2" />
                            <h1 className="text-xl font-serif font-black uppercase tracking-widest text-slate-900 text-center">Government of India</h1>
                            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-slate-600 text-center">Ministry of {grant.agency}</h2>
                        </div>

                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                            <div className="text-[8rem] font-sans font-black text-slate-900/5 -rotate-45 select-none whitespace-nowrap">
                                OFFICIAL DRAFT
                            </div>
                        </div>

                        {/* Editor/Text Area */}
                        <div className="flex-1 p-12 relative z-10">
                            <textarea
                                ref={textAreaRef}
                                value={displayedText}
                                readOnly={!isEditing}
                                onChange={(e) => setDisplayedText(e.target.value)}
                                className={`w-full h-full resize-none outline-none font-serif text-base leading-relaxed text-slate-900 bg-transparent selection:bg-yellow-200 ${isEditing ? 'cursor-text' : 'cursor-default'}`}
                                spellCheck="false"
                            />
                            {isTyping && (
                                <span className="inline-block w-2 h-5 bg-slate-900 animate-pulse align-middle ml-1"></span>
                            )}
                        </div>

                        {/* Footer Graphic Placeholder */}
                        <div className="px-12 py-6 border-t border-slate-200 mt-auto shrink-0 select-none pointer-events-none flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase">
                            <span>Sys. Ref: {grant.id}</span>
                            <span>IGAS-Ver.2.0</span>
                            <span>Page 1 of 1</span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="bg-white px-6 py-4 border-t border-slate-200 flex justify-between items-center shrink-0 z-20">
                    <div className="text-xs text-slate-500 font-medium">
                        {displayedText.length} Characters • English (Official)
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            disabled={isTyping}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 border ${isEditing ? 'bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-100' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                        >
                            <PenLine className="w-4 h-4" /> {isEditing ? 'Done Editing' : 'Edit Document'}
                        </button>

                        <button
                            onClick={handleCopy}
                            disabled={isTyping}
                            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 active:scale-95"
                        >
                            <Copy className="w-4 h-4" /> Copy Text
                        </button>

                        <button
                            onClick={handleDownloadPDF}
                            disabled={isTyping}
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FileText className="w-4 h-4" /> Export as PDF
                        </button>

                        <button
                            onClick={() => alert("Please connect a printer.")}
                            disabled={isTyping}
                            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                            title="Print"
                        >
                            <Printer className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
