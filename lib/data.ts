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
    tags: ["DeepTech", "R&D", "Non-dilutive"]
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
    tags: ["Accelerator", "SaaS", "B2B"]
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
    tags: ["Health", "BioTech", "R&D"]
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
    tags: ["Climate", "Energy", "GreenTech"]
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
    tags: ["Global Health", "Non-profit", "Social Impact"]
  }
];

export const USER_PROFILE = [
  { subject: 'Tech Depth', A: 85, fullMark: 150 },
  { subject: 'Impact', A: 75, fullMark: 150 },
  { subject: 'Commercial', A: 60, fullMark: 150 },
  { subject: 'Team', A: 90, fullMark: 150 },
  { subject: 'Scale', A: 70, fullMark: 150 },
];
