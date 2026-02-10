// components/ActivityFeed.tsx
// Use Framer Motion for infinite loop
<div className="overflow-hidden bg-slate-900 ...">
  <motion.div 
    animate={{ x: ["0%", "-100%"] }}
    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
    className="flex whitespace-nowrap gap-12"
  >
    {/* Items duplicated for loop */}
  </motion.div>
</div>

// components/DigiLockerBadge.tsx
// State: isOpen, step (aadhaar -> otp -> verified)
// Return Modal if isOpen
// Modal Logic:
// Step 1: Input Aadhaar -> Button "Send OTP"
// Step 2: Input OTP -> Button "Verify" -> Spinner -> Success -> Badge Green

// app/dashboard/page.tsx
// Translations for Tamil
const t = {
  // ...
  title: { en: "...", hi: "...", ta: "உங்கள் நிதி பொருத்தத்தைக் கண்டறியவும்" },
  // ...
}
// Dark Mode
const [isDarkMode, setIsDarkMode] = useState(false);
// Wrapper class
<div className={clsx("min-h-screen transition-colors", isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900")}>
  {/* Pass isDarkMode to children if needed or use context-like props */}
  <GrantCard darkMode={isDarkMode} ... />
</div>
