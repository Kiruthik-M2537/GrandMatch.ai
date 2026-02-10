export const GRANTS = [
  {
    id: "nsf-seed",
    title: "NSF Seed Fund",
    agency: "National Science Foundation",
    amount: "$275,000",
    deadline: "Rolling",
    description: "Awards for early-stage R&D with high technical risk and potential for significant commercial impact.",
    requirements: [
      { subject: 'Tech Depth', A: 90, B: 150, fullMark: 150 }, // Grant Req (A) vs Max (B)
      { subject: 'Impact', A: 80, B: 150, fullMark: 150 },
      { subject: 'Commercial', A: 50, B: 150, fullMark: 150 },
      { subject: 'Team', A: 70, B: 150, fullMark: 150 },
      { subject: 'Scale', A: 60, B: 150, fullMark: 150 },
    ],
    matchScore: 92,
    tags: ["DeepTech", "R&D", "Non-dilutive"],
    faq: [
      { question: "Can I use funds for marketing?", answer: "No. NSF funds must be strictly used for R&D and technical development. Marketing costs are unallowable." },
      { question: "Is there a minimum team size?", answer: "No, but you must have a PI (Principal Investigator) employed >= 51% by the startup." },
      { question: "What is the success rate?", answer: "Phase I success rates are typically around 15-20%." }
    ]
  },
  {
    id: "yc-s24",
    title: "Y Combinator S24",
    agency: "Y Combinator",
    amount: "$500,000",
    deadline: "April 2024",
    description: "Standard deal for early-stage startups. Looking for outliers and rapid growth potential.",
    requirements: [
      { subject: 'Tech Depth', A: 60, B: 150, fullMark: 150 },
      { subject: 'Impact', A: 50, B: 150, fullMark: 150 },
      { subject: 'Commercial', A: 100, B: 150, fullMark: 150 },
      { subject: 'Team', A: 100, B: 150, fullMark: 150 },
      { subject: 'Scale', A: 100, B: 150, fullMark: 150 },
    ],
    matchScore: 85,
    tags: ["Accelerator", "SaaS", "B2B"],
    faq: [
      { question: "Do I need a co-founder?", answer: "It is highly recommended. Solo founders are funded, but it's much harder." },
      { question: "Do you take equity?", answer: "Yes, YC takes 7% for $125k, plus an additional $375k on an MFN safe." },
      { question: "Is it remote?", answer: "No, the batch takes place in person in San Francisco." }
    ]
  },
  {
    id: "nih-sbir",
    title: "NIH SBIR Phase I",
    agency: "National Institutes of Health",
    amount: "$300,000",
    deadline: "Sept 5, 2024",
    description: "Funding for biomedical technologies that improve health. Focus on rigorous R&D.",
    requirements: [
      { subject: 'Tech Depth', A: 95, B: 150, fullMark: 150 },
      { subject: 'Impact', A: 90, B: 150, fullMark: 150 },
      { subject: 'Commercial', A: 40, B: 150, fullMark: 150 },
      { subject: 'Team', A: 85, B: 150, fullMark: 150 },
      { subject: 'Scale', A: 50, B: 150, fullMark: 150 },
    ],
    matchScore: 78,
    tags: ["Health", "BioTech", "R&D"],
    faq: [
      { question: "What is the review process duration?", answer: "Typically 4-6 months from submission to notice of award." },
      { question: "Can I pivot during Phase I?", answer: "Yes, provided the core R&D goals remain aligned with the mission." },
      { question: "Are clinical trials covered?", answer: "Phase I usually covers pre-clinical work. Clinical trials are Phase II." }
    ]
  },
  {
    id: "doe-clean-energy",
    title: "DOE Clean Energy Grant",
    agency: "Department of Energy",
    amount: "$200,000",
    deadline: "Oct 15, 2024",
    description: "Supports innovative clean energy technologies with potential for significant emissions reduction.",
    requirements: [
      { subject: 'Tech Depth', A: 80, B: 150, fullMark: 150 },
      { subject: 'Impact', A: 95, B: 150, fullMark: 150 },
      { subject: 'Commercial', A: 70, B: 150, fullMark: 150 },
      { subject: 'Team', A: 60, B: 150, fullMark: 150 },
      { subject: 'Scale', A: 80, B: 150, fullMark: 150 },
    ],
    matchScore: 88,
    tags: ["Climate", "Energy", "GreenTech"],
    faq: [
      { question: "Does this cover hardware?", answer: "Yes, hardware prototypes and pilot plants are eligible." },
      { question: "Is cost-sharing required?", answer: "For some programs, yes. Usually 20% cost share for R&D." },
      { question: "Can I partner with a university?", answer: "Yes, university partnerships are strongly encouraged." }
    ]
  },
  {
    id: "gates-foundation",
    title: "Grand Challenges",
    agency: "Bill & Melinda Gates Foundation",
    amount: "$100,000",
    deadline: "Nov 2024",
    description: "Solving global health and development problems. Focus on innovative, unconventional solutions.",
    requirements: [
      { subject: 'Tech Depth', A: 70, B: 150, fullMark: 150 },
      { subject: 'Impact', A: 100, B: 150, fullMark: 150 },
      { subject: 'Commercial', A: 30, B: 150, fullMark: 150 },
      { subject: 'Team', A: 60, B: 150, fullMark: 150 },
      { subject: 'Scale', A: 90, B: 150, fullMark: 150 },
    ],
    matchScore: 65,
    tags: ["Global Health", "Non-profit", "Social Impact"],
    faq: [
      { question: "Is my IP protected?", answer: "Yes, you retain all intellectual property rights." },
      { question: "Do I need non-profit status?", answer: "No, both for-profit and non-profit organizations can apply." },
      { question: "What is the reporting requirement?", answer: "Simple 2-page reports every 6 months." }
    ]
  }
];

export const USER_PROFILE = [
  { subject: 'Tech Depth', A: 85, fullMark: 150 },
  { subject: 'Impact', A: 75, fullMark: 150 },
  { subject: 'Commercial', A: 60, fullMark: 150 },
  { subject: 'Team', A: 90, fullMark: 150 },
  { subject: 'Scale', A: 70, fullMark: 150 },
];
