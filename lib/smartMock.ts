// lib/smartMock.ts

export interface Grant {
    id: string;
    title: string;
    agency: string;
    matchScore: number;
    amount: string;
    tags: string[];
    deadline: string;
    description: string;
    radarData: any[];
    matchReasons: string[]; // NEW: Explainable AI
    pitch?: string;
    portalUrl?: string; // NEW: Real Portal Link
    // NEW: Eligibility Criteria for Dynamic Scoring
    idealStage?: 'Idea' | 'Prototype' | 'Revenue';
    idealStatus?: 'Student' | 'Individual' | 'Pvt Ltd' | 'Researcher';
    sector?: 'DeepTech' | 'Agri' | 'Health' | 'General';
}

// --- INDIAN DATASETS ---

export const TECH_GRANTS: Grant[] = [
    {
        id: 'nidhi-prayas',
        title: 'NIDHI-PRAYAS',
        agency: 'Dept of Science & Tech (DST)',
        matchScore: 98,
        amount: '₹10 Lakhs',
        portalUrl: 'https://nidhi-prayas.org/',
        tags: ['Prototype', 'Hardware', 'DeepTech'],
        deadline: 'Rolling',
        description: 'Support for converting an innovative idea into a prototype. Geared towards hardware and physical product startups.',
        matchReasons: [
            "✅ Perfect for TRL 3-4 (Prototyping Stage)",
            "✅ Hardware-focus aligns with your 'Device' keyword",
            "🚀 High success rate for first-time founders"
        ],
        radarData: [
            { subject: 'Innovation', A: 100, fullMark: 100 },
            { subject: 'Feasibility', A: 90, fullMark: 100 },
            { subject: 'Market', A: 70, fullMark: 100 },
            { subject: 'Team', A: 85, fullMark: 100 },
            { subject: 'Scale', A: 80, fullMark: 100 },
        ],
        idealStage: 'Prototype',
        idealStatus: 'Student', // Or Individual/Pvt Ltd, but Student is a good fit for PRAYAS
        sector: 'DeepTech'
    },
    {
        id: 'sisfs',
        title: 'Startup India Seed Fund',
        agency: 'DPIIT',
        matchScore: 92,
        amount: '₹20-50 Lakhs',
        portalUrl: 'https://seedfund.startupindia.gov.in/',
        tags: ['Seed', 'Early Stage', 'General'],
        deadline: 'Open All Year',
        description: 'Financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.',
        matchReasons: [
            "✅ Matches your 'Early Stage' profile",
            "✅ Flexible use of funds (Marketing/R&D)",
            "⚠️ Requires DPIIT Recognition (We can help)"
        ],
        radarData: [
            { subject: 'Innovation', A: 80, fullMark: 100 },
            { subject: 'Feasibility', A: 95, fullMark: 100 },
            { subject: 'Market', A: 90, fullMark: 100 },
            { subject: 'Team', A: 85, fullMark: 100 },
            { subject: 'Scale', A: 95, fullMark: 100 },
        ],
        idealStage: 'Revenue', // Or late Prototype/Early Revenue
        idealStatus: 'Pvt Ltd',
        sector: 'General'
    }
];

export const HEALTH_GRANTS: Grant[] = [
    {
        id: 'birac-big',
        title: 'BIRAC BIG Scheme',
        agency: 'Biotech Industry Research Assistance Council',
        matchScore: 99,
        amount: '₹50 Lakhs',
        portalUrl: 'https://birac.nic.in/big.php',
        tags: ['Biotech', 'Pharma', 'Healthcare'],
        deadline: 'Feb 15, 2025',
        description: 'Ignition grant for establishing and validating proof of concept for budding biotech entrepreneurs.',
        matchReasons: [
            "✅ Top scheme for MedTech/BioTech",
            "✅ Non-dilutive grant (No equity taken)",
            "🚀 Access to expert mentorship network"
        ],
        radarData: [
            { subject: 'Science Depth', A: 100, fullMark: 100 },
            { subject: 'Clinical Impact', A: 95, fullMark: 100 },
            { subject: 'Regulatory', A: 85, fullMark: 100 },
            { subject: 'Team', A: 90, fullMark: 100 },
            { subject: 'IP Status', A: 80, fullMark: 100 },
        ],
        idealStage: 'Idea',
        idealStatus: 'Individual',
        sector: 'Health'
    }
];

export const AGRI_GRANTS: Grant[] = [
    {
        id: 'rkvy-raftaar',
        title: 'RKVY-RAFTAAR',
        agency: 'Ministry of Agriculture',
        matchScore: 95,
        amount: '₹25 Lakhs',
        portalUrl: 'https://rkvy.nic.in/',
        tags: ['AgriTech', 'Rural', 'Supply Chain'],
        deadline: 'Quarterly',
        description: 'Promoting innovation and agri-entrepreneurship. Focus on technology tailored for the Indian farming ecosystem.',
        matchReasons: [
            "✅ Specifically targets 'Rural Impact'",
            "✅ Supports supply chain types",
            "🚀 Incubation support included"
        ],
        radarData: [
            { subject: 'Farmer Impact', A: 100, fullMark: 100 },
            { subject: 'Innovation', A: 85, fullMark: 100 },
            { subject: 'Sustainability', A: 90, fullMark: 100 },
            { subject: 'Team', A: 80, fullMark: 100 },
            { subject: 'Scale', A: 85, fullMark: 100 },
        ],
        idealStage: 'Prototype',
        idealStatus: 'Student',
        sector: 'Agri'
    }
];

// --- LOGIC ---

export function getSmartGrants(userInput: string): Grant[] {
    const lowerInput = userInput.toLowerCase();

    // AGRI
    const agriKeywords = ['farm', 'food', 'agri', 'plant', 'rural', 'crop', 'soil', 'harvest', 'tractor', 'cow', 'dairy', 'grain', 'seed', 'water', 'organic', 'kisan'];
    if (agriKeywords.some(keyword => lowerInput.includes(keyword))) {
        return AGRI_GRANTS;
    }

    // HEALTH
    const healthKeywords = ['health', 'doctor', 'med', 'bio', 'cancer', 'patient', 'hospital', 'diagnost', 'drug', 'pharma', 'therapy', 'ayush', 'wellness'];
    if (healthKeywords.some(keyword => lowerInput.includes(keyword))) {
        return HEALTH_GRANTS;
    }

    // DEFAULT
    return TECH_GRANTS;
}