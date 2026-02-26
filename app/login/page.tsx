"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { useAuth } from '@/context/AuthContext';
import DigiLockerModal from '@/components/DigiLockerModal';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';
import clsx from 'clsx';

export default function LoginPage() {
    const router = useRouter();
    // @ts-ignore
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showDigiLocker, setShowDigiLocker] = useState(false);
    const { lang } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const lt = t('login', lang);

    const handleLogin = async (provider: string) => {
        if (provider === 'digilocker') {
            setShowDigiLocker(true);
            return;
        }

        setIsLoading(true);
        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        login();
        router.push('/dashboard');
    };

    const handleDigiLockerSuccess = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for smooth transition
        login();
        router.push('/dashboard');
    };

    return (
        <div className={clsx("min-h-screen flex", isDarkMode ? "bg-slate-950" : "bg-slate-50")}>
            {/* Left Side: Abstract & Testimonial (Desktop) */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-80 z-0"></div>

                {/* Abstract Shapes */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 max-w-lg space-y-8">
                    <div className="flex items-center gap-3 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                        <Sparkles className="w-10 h-10 text-blue-400" />
                        GrantMatch.ai
                    </div>
                    <blockquote className="text-2xl font-light leading-relaxed">
                        &quot;{lt.testimonial} <span className="text-blue-400 font-bold">{lt.testimonialAmount}</span> {lt.testimonialEnd}&quot;
                    </blockquote>
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" className="w-12 h-12 rounded-full border-2 border-blue-500" alt="Founder" />
                        <div>
                            <div className="font-bold">Priya Sharma</div>
                            <div className="text-sm text-slate-400">Founder, Agri-Tech India</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                {/* Dark mode toggle */}
                <button
                    onClick={toggleDarkMode}
                    className={clsx("absolute top-6 right-6 p-2 rounded-full border transition-all hover:scale-105 z-10",
                        isDarkMode ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    )}
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={clsx("w-full max-w-md space-y-8 p-10 rounded-2xl shadow-xl border",
                        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                    )}
                >
                    <div className="text-center">
                        <h2 className={clsx("text-3xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{lt.welcomeBack}</h2>
                        <p className={clsx("mt-2", isDarkMode ? "text-slate-400" : "text-slate-500")}>{lt.subtitle}</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleLogin('google')}
                            disabled={isLoading}
                            className={clsx("w-full flex items-center justify-center gap-3 border font-semibold py-4 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]",
                                isDarkMode ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                            )}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            )}
                            {lt.google}
                        </button>

                        <button
                            onClick={() => handleLogin('digilocker')}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-[#2B3087] text-white font-semibold py-4 rounded-xl hover:bg-[#202466] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/DigiLocker.png" className="w-5 h-5 object-contain brightness-0 invert" alt="DigiLocker" />
                            )}
                            {lt.digilocker}
                        </button>
                    </div>

                    <p className={clsx("text-center text-xs mt-8", isDarkMode ? "text-slate-500" : "text-slate-400")}>
                        {lt.terms}<br />
                        {lt.securedBy}
                    </p>
                </motion.div>
            </div>

            <DigiLockerModal
                isOpen={showDigiLocker}
                onClose={() => setShowDigiLocker(false)}
                onSuccess={handleDigiLockerSuccess}
            />
        </div>
    );
}
