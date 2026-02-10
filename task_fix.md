// app/page.tsx - Fix Syntax Error (Clean Rewrite)
import Link from 'next/link';
import { ArrowRight, Sparkles, Search, BarChart3, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* ... Content same as before but clean ... */}
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Sparkles className="w-6 h-6" />
            <span>GrantMatch.ai</span>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2">
              Log In
            </Link>
             <Link 
              href="/dashboard" 
              className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      {/* Rest of the file... */}
    </div>
  );
}

// app/dashboard/page.tsx - Connect to Smart Mock
import { getSmartGrants, Grant } from '@/lib/smartMock';

export default function Dashboard() {
    // ...
    const [results, setResults] = useState<Grant[]>([]); // New state

    const handleAnalyze = () => {
        if (!pitch) return;
        setIsAnalyzing(true);
        setShowResults(false);
        
        // Simulating network delay but getting REAL Mock Data
        setTimeout(() => {
            const matches = getSmartGrants(pitch);
            setResults(matches);
            setIsAnalyzing(false);
            setShowResults(true);
        }, 1500);
    };

    // ...
    // Map over `results` instead of `GRANTS`
}
