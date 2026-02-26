"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, Search, BarChart3, ShieldCheck, Zap, Moon, Sun, Globe } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { lang, setLang } = useLanguage();
  const lt = t('landing', lang);
  const langNames: Record<string, string> = { en: 'English', hi: 'हिन्दी', ta: 'தமிழ்' };

  return (
    <div className={clsx("min-h-screen font-sans transition-colors duration-300 selection:bg-blue-100",
      isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>

      {/* --- NAVBAR --- */}
      <nav className={clsx("fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-300",
        isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
      )}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Sparkles className="w-6 h-6" />
            <span>GrantMatch.ai</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative group">
              <button className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all",
                isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              )}>
                <Globe className="w-4 h-4" />
                <span>{langNames[lang]}</span>
              </button>
              <div className={clsx("absolute right-0 mt-1 w-36 rounded-xl shadow-xl border py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all",
                isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              )}>
                {(['en', 'hi', 'ta'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={clsx("w-full text-left px-4 py-2 text-sm transition-colors",
                      lang === l
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : isDarkMode ? "text-slate-300 hover:bg-slate-700" : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={clsx("p-2 rounded-full border transition-all hover:scale-105",
                isDarkMode ? "bg-slate-800 border-slate-700 text-yellow-400" : "bg-white border-slate-200 text-slate-500"
              )}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/login" className={clsx("text-sm font-medium px-4 py-2 hover:text-blue-600", isDarkMode ? "text-slate-300" : "text-slate-600")}>
              {lt.login}
            </Link>
            <Link
              href="/login"
              className={clsx("text-sm font-medium px-4 py-2 rounded-lg transition-colors",
                isDarkMode ? "bg-white text-slate-900 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-800"
              )}
            >
              {lt.getStarted}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-6 border",
            isDarkMode ? "bg-blue-900/30 text-blue-300 border-blue-800" : "bg-blue-50 text-blue-700 border-blue-100"
          )}>
            <Zap className="w-4 h-4" />
            <span>{lt.tagline}</span>
          </div>

          <h1 className={clsx("text-5xl md:text-7xl font-bold tracking-tight mb-6", isDarkMode ? "text-white" : "text-slate-900")}>
            {lt.heroTitle} <span className="text-blue-600">{lt.heroHighlight}</span>
          </h1>

          <p className={clsx("text-xl max-w-2xl mx-auto mb-10 leading-relaxed", isDarkMode ? "text-slate-400" : "text-slate-600")}>
            {lt.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
            >
              {lt.findGrants} <ArrowRight className="w-5 h-5" />
            </Link>
            <button className={clsx("px-8 py-4 rounded-xl text-lg font-medium transition-colors",
              isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
            )}>
              {lt.watchDemo}
            </button>
          </div>

          {/* Trust Metrics */}
          <div className={clsx("mt-16 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-8", isDarkMode ? "border-slate-800" : "border-slate-200")}>
            <div>
              <div className={clsx("text-3xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>$2.4B+</div>
              <div className="text-sm text-slate-500">{lt.grantDatabase}</div>
            </div>
            <div>
              <div className={clsx("text-3xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>500+</div>
              <div className="text-sm text-slate-500">{lt.agenciesIndexed}</div>
            </div>
            <div>
              <div className={clsx("text-3xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>2 min</div>
              <div className="text-sm text-slate-500">{lt.avgSearchTime}</div>
            </div>
            <div>
              <div className={clsx("text-3xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>92%</div>
              <div className="text-sm text-slate-500">{lt.matchAccuracy}</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className={clsx("py-24", isDarkMode ? "bg-slate-900" : "bg-white")}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={clsx("text-3xl font-bold mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{lt.whyFounders}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {lt.whyFoundersDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={clsx("p-8 rounded-2xl border transition-colors",
              isDarkMode ? "bg-slate-950 border-slate-800 hover:border-blue-800" : "bg-slate-50 border-slate-100 hover:border-blue-200"
            )}>
              <div className="w-12 h-12 bg-blue-100/10 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className={clsx("text-xl font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{lt.semanticMatching}</h3>
              <p className="text-slate-500 leading-relaxed">
                {lt.semanticDesc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className={clsx("p-8 rounded-2xl border transition-colors",
              isDarkMode ? "bg-slate-950 border-slate-800 hover:border-blue-800" : "bg-slate-50 border-slate-100 hover:border-blue-200"
            )}>
              <div className="w-12 h-12 bg-indigo-100/10 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className={clsx("text-xl font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{lt.eligibilityScores}</h3>
              <p className="text-slate-500 leading-relaxed">
                {lt.eligibilityDesc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className={clsx("p-8 rounded-2xl border transition-colors",
              isDarkMode ? "bg-slate-950 border-slate-800 hover:border-blue-800" : "bg-slate-50 border-slate-100 hover:border-blue-200"
            )}>
              <div className="w-12 h-12 bg-emerald-100/10 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={clsx("text-xl font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{lt.verifiedAgencies}</h3>
              <p className="text-slate-500 leading-relaxed">
                {lt.verifiedDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={clsx("py-12 border-t", isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200")}>
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>{lt.footer}</p>
        </div>
      </footer>
    </div>
  );
}