// components/DigiLockerBadge.tsx
import React, { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function DigiLockerBadge() {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

  const handleConnect = () => {
    setStatus('verifying');
    setTimeout(() => {
      setStatus('verified');
      // Trigger confetti or something if desired
    }, 2000);
  };

  if (status === 'verified') {
    return (
      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-200 font-semibold cursor-default">
         <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/DigiLocker.png" className="w-5 h-5" alt="DigiLocker" />
         <span>DigiLocker Verified</span>
         <ShieldCheck className="w-4 h-4" />
      </div>
    );
  }

  return (
    <button 
      onClick={handleConnect}
      disabled={status === 'verifying'}
      className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors font-medium text-sm"
    >
       {status === 'verifying' ? (
         <>
           <Loader2 className="w-4 h-4 animate-spin" /> Verifying KYC...
         </>
       ) : (
         <>
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/DigiLocker.png" className="w-5 h-5" alt="DigiLocker" />
           Connect DigiLocker
         </>
       )}
    </button>
  );
}

// app/dashboard/page.tsx
// ...
const [lang, setLang] = useState<'en' | 'hi'>('en');

// TEXT DICTIONARY
const t = {
    title: lang === 'en' ? "Find Your Funding Fit" : "अपना फंडिंग विकल्प खोजें",
    placeholder: lang === 'en' ? "Describe your startup..." : "अपने स्टार्टअप का विवरण दें...",
    analyze: lang === 'en' ? "Analyze Eligibility" : "पात्रता की जांच करें",
};

// ...
<button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}>
  {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
</button>
// ...
<GrantCard grant={grant} lang={lang} />

// components/GrantCard.tsx
// Add lang prop
// Update "Apply Now" -> {lang === 'en' ? "Apply Now" : "अभी आवेदन करें"}
