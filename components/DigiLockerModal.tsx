"use client";
import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DigiLockerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DigiLockerModal({ isOpen, onClose, onSuccess }: DigiLockerModalProps) {
    const [step, setStep] = useState<'aadhaar' | 'otp' | 'success'>('aadhaar');
    const [aadhaar, setAadhaar] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAadhaarSubmit = () => {
        if (aadhaar.length < 12) return alert("Enter valid 12-digit Aadhaar");
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
        }, 1500);
    };

    const handleOtpSubmit = () => {
        if (otp.length < 6) return alert("Enter valid 6-digit OTP");
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('success');
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="bg-[#2B3087] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="font-bold text-lg leading-none">DigiLocker <span className="block text-[10px] font-normal opacity-80 uppercase tracking-wider">Govt of India</span></div>
                        </div>
                        <button onClick={onClose}><X className="w-5 h-5 opacity-70 hover:opacity-100" /></button>
                    </div>
                    <div className="p-8">
                        {step === 'aadhaar' && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-slate-800">Verify Identity</h2>
                                    <p className="text-sm text-slate-500">Enter your Aadhaar to link documents</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Aadhaar Number</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input type="text" maxLength={12} value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} placeholder="XXXX XXXX XXXX" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono text-lg tracking-widest" />
                                    </div>
                                </div>
                                <button onClick={handleAadhaarSubmit} disabled={isLoading} className="w-full bg-[#2B3087] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-all flex items-center justify-center gap-2">{isLoading ? "Verifying..." : "Next"} {!isLoading && <ArrowRight className="w-4 h-4" />}</button>
                            </div>
                        )}
                        {step === 'otp' && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-slate-800">Enter OTP</h2>
                                    <p className="text-sm text-slate-500">Sent to mobile linked with Aadhaar ending in ****{aadhaar.slice(-4)}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">One Time Password</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono text-lg tracking-widest text-center" />
                                    </div>
                                </div>
                                <button onClick={handleOtpSubmit} disabled={isLoading} className="w-full bg-[#2B3087] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-all flex items-center justify-center gap-2">{isLoading ? "Verifying..." : "Submit"} {!isLoading && <ArrowRight className="w-4 h-4" />}</button>
                            </div>
                        )}
                        {step === 'success' && (
                            <div className="text-center space-y-4 py-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce"><ShieldCheck className="w-10 h-10 text-green-600" /></div>
                                <h2 className="text-2xl font-bold text-slate-900">Verified!</h2>
                                <p className="text-slate-500">Your Identity has been confirmed via DigiLocker.</p>
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-50 p-4 border-t border-slate-100 text-center"><p className="text-xs text-slate-400">Secured by National Informatics Centre</p></div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
