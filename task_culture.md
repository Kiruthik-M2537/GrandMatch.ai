// app/dashboard/page.tsx

// Refactor handleAnalyze to accept text
const handleAnalyze = (textOverride?: string) => {
    const text = textOverride || pitch;
    if (!text) return;
    setIsAnalyzing(true);
    // ...
    // CALL SMART MOCK with text
    const matches = getSmartGrants(text);
    // ...
};

// New Voice Logic
const handleMicClick = () => {
    if (isRecording) {
        setIsRecording(false);
        return;
    }

    if ('webkitSpeechRecognition' in window) {
        setIsRecording(true);
        // @ts-ignore
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-IN'; // Indian English
        recognition.continuous = false;
        
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setPitch(transcript);
            setIsRecording(false);
            handleAnalyze(transcript); // Auto-trigger
        };
        
        recognition.start();
    } else {
        alert("Voice input not supported in this browser.");
    }
};

// components/GrantCard.tsx

const handleWhatsApp = () => {
    const text = `Hey! I found this grant ${grant.title} worth ${grant.amount}. Matched ${grant.matchScore}% on GrantMatch. Check it out!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

// UI addition next to Apply button
<button onClick={handleWhatsApp} className="bg-[#25D366] ...">
   <MessageCircle className="w-5 h-5" />
</button>
