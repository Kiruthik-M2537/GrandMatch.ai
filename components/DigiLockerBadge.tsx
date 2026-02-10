import React, { useState } from 'react';
import { ShieldCheck, Loader2, X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function DigiLockerBadge() {
    const [status, setStatus] = useState<'idle' | 'verified'>('idle');
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'aadhaar' | 'otp' | 'verifying'>('aadhaar');
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpMessage, setShowOtpMessage] = useState(false);

    const handleOpen = () => {
        if (status === 'verified') return;
        setIsOpen(true);
        setStep('aadhaar');
        setAadhaar('');
        setOtp('');
        setShowOtpMessage(false);
    };

    const handleSendOTP = () => {
        if (aadhaar.length < 12) return alert("Please enter a valid 12-digit Aadhaar number");
        setStep('otp');
        // Simulate OTP sent
        setTimeout(() => {
            setShowOtpMessage(true);
            setOtp('8888'); // Pre-fill for hackathon demo
        }, 1000);
    };

    const handleVerify = () => {
        if (otp.length !== 4 && otp.length !== 6) return alert("Please enter the valid OTP");
        setStep('verifying');
        setTimeout(() => {
            setIsOpen(false);
            setStatus('verified');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.2 },
                colors: ['#22c55e', '#ffffff']
            });
        }, 2000);
    };

    return (
        <>
            {/* BADGE */}
            {status === 'verified' ? (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold cursor-default text-sm shadow-sm select-none">
                    <ShieldCheck className="w-4 h-4" />
                    <span>DigiLocker Verified</span>
                </div>
            ) : (
                <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 bg-white text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-600"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                    Connect DigiLocker
                </button>
            )}

            {/* MODAL */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-[#2B3087] p-6 text-white flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                        Secure Verification
                                    </h2>
                                    <p className="text-blue-200 text-sm mt-1">Government of India</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8 space-y-6">
                                {step === 'aadhaar' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Aadhaar Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={aadhaar}
                                                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                                    placeholder="XXXX XXXX XXXX"
                                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none font-mono text-lg tracking-widest text-slate-900"
                                                />
                                                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                                            </div>
                                            <p className="text-xs text-slate-500">We will send an OTP to your linked mobile number.</p>
                                        </div>
                                        <button
                                            onClick={handleSendOTP}
                                            className="w-full bg-[#2B3087] text-white py-3 rounded-lg font-bold hover:bg-[#202466] transition-colors shadow-lg"
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                )}

                                {step === 'otp' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Enter OTP</label>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                placeholder="------"
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none font-mono text-center text-3xl tracking-widest text-slate-900"
                                                autoFocus
                                            />
                                            {showOtpMessage && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-xs text-center text-emerald-600 font-bold bg-emerald-50 py-1 rounded"
                                                >
                                                    ✅ OTP sent to mobile: 8888
                                                </motion.p>
                                            )}
                                            {!showOtpMessage && (
                                                <p className="text-xs text-center text-slate-500">Sent to linked mobile number ending in *8921</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleVerify}
                                            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
                                        >
                                            Verify Identity
                                        </button>
                                    </div>
                                )}

                                {step === 'verifying' && (
                                    <div className="py-8 flex flex-col items-center gap-4 text-center">
                                        <Loader2 className="w-12 h-12 text-[#2B3087] animate-spin" />
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Fetch from UIDAI...</h3>
                                            <p className="text-slate-500 text-sm">Verifying biometric credentials securely</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                                <Lock className="w-3 h-3" />
                                256-bit Secure Encryption • ISO 27001 Certified
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
