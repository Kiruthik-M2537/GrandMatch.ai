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

// --- ADDITIONAL GRANTS ---

export const ADDITIONAL_GRANTS: Grant[] = [
    {
        id: 'wep-grant',
        title: 'Women Entrepreneurship Platform (WEP)',
        agency: 'NITI Aayog',
        matchScore: 88,
        amount: '₹15 Lakhs',
        portalUrl: 'https://wep.gov.in/',
        tags: ['Women-Led', 'Incubation', 'Mentorship'],
        deadline: 'Open All Year',
        description: 'A unified platform to support aspiring women entrepreneurs, providing incubation, mentorship, funding access, and compliance support for women-led startups across India.',
        matchReasons: [
            "✅ Exclusive support for women-led startups",
            "✅ Access to NITI Aayog mentorship network",
            "🚀 Strong government push for women in tech"
        ],
        radarData: [
            { subject: 'Innovation', A: 80, fullMark: 100 },
            { subject: 'Social Impact', A: 95, fullMark: 100 },
            { subject: 'Feasibility', A: 85, fullMark: 100 },
            { subject: 'Team', A: 90, fullMark: 100 },
            { subject: 'Scale', A: 75, fullMark: 100 },
        ],
        idealStage: 'Idea',
        idealStatus: 'Individual',
        sector: 'General'
    },
    {
        id: 'tide-2',
        title: 'TIDE 2.0 Scheme',
        agency: 'Ministry of Electronics & IT (MeitY)',
        matchScore: 94,
        amount: '₹7 Lakhs',
        portalUrl: 'https://www.meity.gov.in/',
        tags: ['IT', 'Software', 'Electronics'],
        deadline: 'Quarterly',
        description: 'Technology Incubation and Development of Entrepreneurs (TIDE 2.0) supports tech startups with financial assistance, mentoring, and access to MeitY incubators for software/electronics ventures.',
        matchReasons: [
            "✅ Perfect for software and IT product startups",
            "✅ Access to premier MeitY-affiliated incubators",
            "🚀 Fast-track approval for DPIIT-recognized startups"
        ],
        radarData: [
            { subject: 'Innovation', A: 90, fullMark: 100 },
            { subject: 'Feasibility', A: 85, fullMark: 100 },
            { subject: 'Market', A: 80, fullMark: 100 },
            { subject: 'Team', A: 75, fullMark: 100 },
            { subject: 'Scale', A: 90, fullMark: 100 },
        ],
        idealStage: 'Prototype',
        idealStatus: 'Pvt Ltd',
        sector: 'DeepTech'
    },
    {
        id: 'mudra-shishu',
        title: 'MUDRA Loan – Shishu Category',
        agency: 'MUDRA / SIDBI',
        matchScore: 85,
        amount: '₹50,000 – ₹10 Lakhs',
        portalUrl: 'https://www.mudra.org.in/',
        tags: ['Micro Enterprise', 'Loan', 'No Collateral'],
        deadline: 'Open All Year',
        description: 'Micro Units Development and Refinance Agency loan for micro/small enterprises. Shishu category provides up to ₹50,000, Kishor up to ₹5L, and Tarun up to ₹10L with no collateral required.',
        matchReasons: [
            "✅ No collateral or guarantor required",
            "✅ Available through all banks in India",
            "⚠️ Loan-based (repayment required, not a grant)"
        ],
        radarData: [
            { subject: 'Accessibility', A: 100, fullMark: 100 },
            { subject: 'Feasibility', A: 90, fullMark: 100 },
            { subject: 'Market', A: 70, fullMark: 100 },
            { subject: 'Team', A: 60, fullMark: 100 },
            { subject: 'Scale', A: 65, fullMark: 100 },
        ],
        idealStage: 'Idea',
        idealStatus: 'Individual',
        sector: 'General'
    },
    {
        id: 'atal-innovation',
        title: 'Atal Innovation Mission (AIM)',
        agency: 'NITI Aayog',
        matchScore: 91,
        amount: '₹10 Cr (for Incubators)',
        portalUrl: 'https://aim.gov.in/',
        tags: ['Innovation', 'Incubation', 'Scale-up'],
        deadline: 'Annual Cohorts',
        description: 'Atal Innovation Mission promotes innovation and entrepreneurship across India. Supports startups through Atal Incubation Centres (AIC) and Atal New India Challenges for product innovation.',
        matchReasons: [
            "✅ Flagship national innovation program",
            "✅ Access to Atal Incubation Centre ecosystem",
            "🚀 Solving national-level challenges earns bonus points"
        ],
        radarData: [
            { subject: 'Innovation', A: 100, fullMark: 100 },
            { subject: 'Social Impact', A: 90, fullMark: 100 },
            { subject: 'Market', A: 85, fullMark: 100 },
            { subject: 'Team', A: 80, fullMark: 100 },
            { subject: 'Scale', A: 95, fullMark: 100 },
        ],
        idealStage: 'Prototype',
        idealStatus: 'Pvt Ltd',
        sector: 'General'
    },
    {
        id: 'stand-up-india',
        title: 'Stand-Up India Scheme',
        agency: 'Ministry of Finance / SIDBI',
        matchScore: 86,
        amount: '₹10 Lakhs – ₹1 Cr',
        portalUrl: 'https://www.standupmitra.in/',
        tags: ['SC/ST', 'Women', 'Manufacturing', 'Services'],
        deadline: 'Open All Year',
        description: 'Facilitates bank loans between ₹10 lakh and ₹1 Cr to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.',
        matchReasons: [
            "✅ Targeted support for SC/ST and women entrepreneurs",
            "✅ Available through all scheduled commercial banks",
            "⚠️ Greenfield enterprises only (new ventures)"
        ],
        radarData: [
            { subject: 'Accessibility', A: 90, fullMark: 100 },
            { subject: 'Social Impact', A: 100, fullMark: 100 },
            { subject: 'Feasibility', A: 85, fullMark: 100 },
            { subject: 'Team', A: 70, fullMark: 100 },
            { subject: 'Scale', A: 80, fullMark: 100 },
        ],
        idealStage: 'Idea',
        idealStatus: 'Individual',
        sector: 'General'
    },
    {
        id: 'sagar-defense',
        title: 'iDEX – Defence Innovation',
        agency: 'Ministry of Defence (iDEX/DIO)',
        matchScore: 93,
        amount: '₹1.5 Cr',
        portalUrl: 'https://idex.gov.in/',
        tags: ['Defence', 'Aerospace', 'DeepTech'],
        deadline: 'Rolling Challenges',
        description: 'Innovations for Defence Excellence (iDEX) engages startups for solving defence and aerospace challenges. Provides grants up to ₹1.5 Cr for prototyping and product development.',
        matchReasons: [
            "✅ Non-dilutive grant (no equity taken)",
            "✅ Guaranteed procurement from Armed Forces",
            "🚀 Fast-track for dual-use technologies"
        ],
        radarData: [
            { subject: 'Innovation', A: 100, fullMark: 100 },
            { subject: 'Feasibility', A: 80, fullMark: 100 },
            { subject: 'Defence Need', A: 95, fullMark: 100 },
            { subject: 'Team', A: 85, fullMark: 100 },
            { subject: 'IP Status', A: 90, fullMark: 100 },
        ],
        idealStage: 'Prototype',
        idealStatus: 'Pvt Ltd',
        sector: 'DeepTech'
    },
    {
        id: 'msme-clcss',
        title: 'MSME Credit Linked Capital Subsidy',
        agency: 'Ministry of MSME',
        matchScore: 82,
        amount: '₹15 Lakhs (Subsidy)',
        portalUrl: 'https://msme.gov.in/',
        tags: ['Manufacturing', 'MSME', 'Upgrade'],
        deadline: 'Open All Year',
        description: 'Capital subsidy of 15% on institutional finance up to ₹1 Cr for technology upgradation in MSME sector. Supports upgrading plant and machinery for improved productivity.',
        matchReasons: [
            "✅ Capital subsidy (no repayment needed)",
            "✅ Broad sector coverage (manufacturing + services)",
            "⚠️ Requires existing MSME registration"
        ],
        radarData: [
            { subject: 'Feasibility', A: 85, fullMark: 100 },
            { subject: 'Market', A: 80, fullMark: 100 },
            { subject: 'Sustainability', A: 90, fullMark: 100 },
            { subject: 'Team', A: 70, fullMark: 100 },
            { subject: 'Scale', A: 85, fullMark: 100 },
        ],
        idealStage: 'Revenue',
        idealStatus: 'Pvt Ltd',
        sector: 'General'
    },
    {
        id: 'cgtmse',
        title: 'CGTMSE – Credit Guarantee Scheme',
        agency: 'Ministry of MSME / SIDBI',
        matchScore: 84,
        amount: '₹5 Cr (Guarantee Cover)',
        portalUrl: 'https://www.cgtmse.in/',
        tags: ['Credit Guarantee', 'Collateral-Free', 'MSME'],
        deadline: 'Open All Year',
        description: 'Credit Guarantee Fund Trust for Micro and Small Enterprises provides collateral-free credit guarantee cover to MSMEs, enabling them to access bank loans without pledging assets.',
        matchReasons: [
            "✅ Collateral-free bank loan access",
            "✅ Covers both manufacturing and service sectors",
            "⚠️ Guarantee cover, not direct funding"
        ],
        radarData: [
            { subject: 'Accessibility', A: 95, fullMark: 100 },
            { subject: 'Feasibility', A: 85, fullMark: 100 },
            { subject: 'Market', A: 75, fullMark: 100 },
            { subject: 'Team', A: 70, fullMark: 100 },
            { subject: 'Scale', A: 80, fullMark: 100 },
        ],
        idealStage: 'Revenue',
        idealStatus: 'Pvt Ltd',
        sector: 'General'
    },
];

// --- COMBINED ARRAY OF ALL GRANTS ---
export const ALL_GRANTS: Grant[] = [
    ...TECH_GRANTS,
    ...HEALTH_GRANTS,
    ...AGRI_GRANTS,
    ...ADDITIONAL_GRANTS
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