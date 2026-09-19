// ============================================================================
// FinQuest — Mock Data & Deterministic Calculation Engines
// MoSJE Hackathon Prototype (PS-26091)
// ============================================================================

// ---------------------------------------------------------------------------
// 1. LANGUAGE STRINGS
// ---------------------------------------------------------------------------
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
];

// ---------------------------------------------------------------------------
// 2. LOCATION CASCADE: State -> District -> Block -> Gram Panchayat
// ---------------------------------------------------------------------------
export const LOCATION_TREE = {
  Maharashtra: {
    Pune: {
      Haveli: ["Wagholi", "Uruli Kanchan", "Manjari Budruk", "Kesnand"],
      Mulshi: ["Pirangut", "Paud", "Bhugaon"],
    },
    Nashik: {
      Niphad: ["Ozar", "Pimpalgaon Baswant", "Chandori"],
      Sinnar: ["Dodi", "Vavi", "Musalgaon"],
    },
    Amravati: {
      Daryapur: ["Anjangaon Surji", "Bhandari", "Talegaon Dashasar"],
    },
  },
  "Uttar Pradesh": {
    Varanasi: {
      Pindra: ["Kaithi", "Barha", "Harhua"],
      Chiraigaon: ["Sarai Mohana", "Kotwa"],
    },
    Lucknow: {
      Malihabad: ["Kakori", "Itaunja", "Sarosa"],
      Mohanlalganj: ["Gosainganj", "Bijnaur"],
    },
    Gorakhpur: {
      Campierganj: ["Pipraich", "Sahjanwa"],
    },
  },
  "Tamil Nadu": {
    Coimbatore: {
      Pollachi: ["Anaimalai", "Kinathukadavu", "Zamin Uthukuli"],
      Mettupalayam: ["Karamadai", "Periyanaickenpalayam"],
    },
    Madurai: {
      Melur: ["Alagarkovil", "Vadipatti", "T. Kallupatti"],
      Usilampatti: ["Chekkanurani", "Kottampatti"],
    },
    Thanjavur: {
      Orathanadu: ["Ammapettai", "Pattukkottai Road"],
    },
  },
};

export const STATES = Object.keys(LOCATION_TREE);
export const getDistricts = (state) => (state ? Object.keys(LOCATION_TREE[state] || {}) : []);
export const getBlocks = (state, district) =>
  state && district ? Object.keys(LOCATION_TREE[state]?.[district] || {}) : [];
export const getPanchayats = (state, district, block) =>
  state && district && block ? LOCATION_TREE[state]?.[district]?.[block] || [] : [];

// ---------------------------------------------------------------------------
// 3. BUSINESS SECTORS — base economics used by the feasibility engine
// ---------------------------------------------------------------------------
export const SECTORS = [
  {
    id: "dairy",
    name: "Dairy Farming (Milk & Paneer)",
    icon: "Milk",
    minCapital: 40000,
    idealCapital: 150000,
    baseDemandGap: 72, // % unmet demand baseline
    baseSellingPrice: 62, // ₹ per litre / equivalent unit
    unit: "litre",
    competitorDensity: "Low",
    channels: ["Village Weekly Haat", "Local Retailers", "Direct-to-Consumer"],
  },
  {
    id: "tailoring",
    name: "Garments / Tailoring",
    icon: "Shirt",
    minCapital: 15000,
    idealCapital: 60000,
    baseDemandGap: 48,
    baseSellingPrice: 350,
    unit: "garment",
    competitorDensity: "Moderate",
    channels: ["Local Retailers", "Direct-to-Consumer", "School/Uniform Contracts"],
  },
  {
    id: "agro",
    name: "Agro-Processing (Flour / Oil Mill)",
    icon: "Wheat",
    minCapital: 80000,
    idealCapital: 250000,
    baseDemandGap: 65,
    baseSellingPrice: 48,
    unit: "kg",
    competitorDensity: "Low",
    channels: ["Village Weekly Haat", "Local Retailers", "Wholesale Aggregators"],
  },
  {
    id: "kirana",
    name: "Rural Retail / Kirana",
    icon: "Store",
    minCapital: 25000,
    idealCapital: 100000,
    baseDemandGap: 30,
    baseSellingPrice: 1,
    unit: "basket",
    competitorDensity: "Saturated",
    channels: ["Direct-to-Consumer", "Local Retailers"],
  },
  {
    id: "bamboo",
    name: "Bamboo Handicrafts",
    icon: "TreePine",
    minCapital: 20000,
    idealCapital: 70000,
    baseDemandGap: 55,
    baseSellingPrice: 220,
    unit: "piece",
    competitorDensity: "Low",
    channels: ["Village Weekly Haat", "Direct-to-Consumer", "Export Aggregators"],
  },
];

export const getSectorById = (id) => SECTORS.find((s) => s.id === id);

// ---------------------------------------------------------------------------
// 4. GOVERNMENT SCHEMES DIRECTORY
// ---------------------------------------------------------------------------
export const SCHEMES = [
  {
    id: "nsfdc",
    shortName: "NSFDC",
    fullName: "National Scheduled Castes Finance and Development Corporation",
    tagline: "Concessional term lending for SC micro-entrepreneurs",
    maxProjectCost: "₹30,00,000 (Term Loan) / ₹10,00,000 (Micro-Finance)",
    interestRate: "6.5% – 8% p.a.",
    marginMoney: "10% Beneficiary : 90% SCA-Channelized Credit",
    subsidy: "Interest subvention up to 4% for women beneficiaries",
    eligibility: ["Scheduled Caste category", "Annual family income below ₹3,00,000 (rural)", "Age 18–55 years"],
    moratorium: "6–12 months depending on project gestation",
    portalUrl: "https://nsfdc.nic.in/apply",
    color: "emerald",
  },
  {
    id: "nbcfdc",
    shortName: "NBCFDC",
    fullName: "National Backward Classes Finance & Development Corporation",
    tagline: "Micro-credit and skill-linked financing for OBC entrepreneurs",
    maxProjectCost: "₹20,00,000 (Term Loan) / ₹3,00,000 (Micro-Finance cap)",
    interestRate: "5% – 6% p.a.",
    marginMoney: "10% Beneficiary : 90% SCA-Channelized Credit",
    subsidy: "1% additional rebate on timely repayment",
    eligibility: ["OBC (Central List) category", "Annual family income below ₹3,00,000 (rural)", "Priority to women & PwD"],
    moratorium: "3–6 months",
    portalUrl: "https://nbcfdc.gov.in/apply",
    color: "indigo",
  },
  {
    id: "nskfdc",
    shortName: "NSKFDC",
    fullName: "National Safai Karamcharis Finance & Development Corporation",
    tagline: "Self-employment & sanitation-linked enterprise loans",
    maxProjectCost: "₹15,00,000 (Term Loan) / ₹5,00,000 (Sanitation Micro-Enterprise)",
    interestRate: "4% – 6% p.a.",
    marginMoney: "5% Beneficiary : 95% SCA-Channelized Credit (Safai Karamchari families)",
    subsidy: "Capital subsidy up to 50% for manual scavenger rehabilitation cases",
    eligibility: ["Safai Karamchari / Manual Scavenger family", "Valid state rehabilitation certificate", "No prior default record"],
    moratorium: "6 months",
    portalUrl: "https://nskfdc.nic.in/apply",
    color: "slate",
  },
];

// ---------------------------------------------------------------------------
// 5. DETERMINISTIC HASH — makes mock numbers vary by location/sector but stay
//    stable for the same inputs (so a report is reproducible on repeat runs).
// ---------------------------------------------------------------------------
function seededHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRange(seedStr, min, max) {
  const h = seededHash(seedStr);
  return min + (h % (max - min + 1));
}

// ---------------------------------------------------------------------------
// 6. FEASIBILITY REPORT ENGINE — Module 1, 6-Pillar Dashboard
// ---------------------------------------------------------------------------
export function generateFeasibilityReport({ state, district, block, panchayat, sectorId, capital }) {
  const sector = getSectorById(sectorId);
  if (!sector || !panchayat) return null;

  const seed = `${state}|${district}|${block}|${panchayat}|${sectorId}|${capital}`;

  // Pillar 1: Market Reach
  const population = seededRange(seed + "pop", 3200, 14500);
  const catchmentBuyingPower = seededRange(seed + "buy", 8, 22) * 1000; // ₹ thousand/week aggregate
  const householdsInCatchment = Math.round(population / seededRange(seed + "hh", 4, 6));

  // Pillar 2: Opportunity & Gap
  const demandGapScore = Math.min(
    95,
    Math.max(20, sector.baseDemandGap + seededRange(seed + "gap", -8, 8))
  );
  const gapNarrative = `${demandGapScore}% unmet demand for ${sector.name.split(" (")[0].toLowerCase()} within ${
    seededRange(seed + "radius", 5, 10)
  } km`;

  // Pillar 3: Budget-tailored SWOT
  const capitalRatio = capital / sector.idealCapital;
  const swot = {
    strengths: [
      capitalRatio >= 1
        ? "Capital meets ideal threshold — allows full working-capital buffer"
        : "Lean capital base enables low fixed-cost entry",
      `Access to ${sector.channels[0]} with near-zero logistics cost`,
      "Eligible for 90% concessional SCA credit under 10% margin rule",
    ],
    weaknesses: [
      capitalRatio < 0.6 ? "Capital significantly below ideal — limits scale in Year 1" : "Working capital cycle sensitive to seasonal demand",
      "Limited cold-chain / storage infrastructure at Gram Panchayat level",
    ],
    opportunities: [
      gapNarrative,
      `${sector.competitorDensity} competitor density — room for differentiated pricing`,
    ],
    threats: [
      "Raw material transport friction from district hub",
      "Single-buyer / aggregator dependency risk",
    ],
  };

  // Pillar 4: Threats & bottlenecks (structured list with severity)
  const bottlenecks = [
    {
      label: "Raw Material Transport Friction",
      severity: seededRange(seed + "b1", 1, 3),
      detail: `Nearest wholesale supply point is ${seededRange(seed + "dist", 6, 18)} km from ${panchayat}, raising input cost by ${seededRange(seed + "pct1", 4, 12)}%.`,
    },
    {
      label: "Single-Buyer Monopoly Risk",
      severity: seededRange(seed + "b2", 1, 3),
      detail: `${seededRange(seed + "buyers", 55, 80)}% of current local sales route through one aggregator/mandi.`,
    },
    {
      label: "Seasonal Demand Volatility",
      severity: seededRange(seed + "b3", 1, 3),
      detail: `Demand fluctuates by ${seededRange(seed + "vol", 15, 40)}% between peak (festival/harvest) and lean months.`,
    },
    {
      label: "Power / Cold-Chain Reliability",
      severity: seededRange(seed + "b4", 1, 3),
      detail: `Average ${seededRange(seed + "power", 2, 6)} hours/day of grid instability reported in this block.`,
    },
  ];

  // Pillar 5: Competitor Density
  const competitorUnits = seededRange(seed + "comp", 1, sector.competitorDensity === "Saturated" ? 14 : sector.competitorDensity === "Moderate" ? 8 : 4);

  // Pillar 6: Pricing & Revenue
  const localCompetitorAvg = Math.round(sector.baseSellingPrice * (1 + seededRange(seed + "cp", -10, 10) / 100));
  const recommendedPrice = Math.round(localCompetitorAvg * 0.95); // slight undercut for entry
  const dailyUnitsCapacity = Math.round((capital / sector.idealCapital) * seededRange(seed + "units", 30, 90) + 20);
  const monthlyRevenueCeiling = recommendedPrice * dailyUnitsCapacity * 26;
  const estMonthlyMargin = Math.round(monthlyRevenueCeiling * (seededRange(seed + "margin", 18, 34) / 100));

  return {
    meta: { state, district, block, panchayat, sector, capital, generatedAt: new Date().toISOString() },
    marketReach: {
      population,
      householdsInCatchment,
      catchmentBuyingPower,
      radiusKm: seededRange(seed + "radius", 5, 10),
      channels: sector.channels,
    },
    opportunityGap: {
      demandGapScore,
      narrative: gapNarrative,
    },
    swot,
    bottlenecks,
    competitorDensity: {
      level: sector.competitorDensity,
      estimatedUnits: competitorUnits,
    },
    pricing: {
      localCompetitorAvg,
      recommendedPrice,
      unit: sector.unit,
      dailyUnitsCapacity,
      monthlyRevenueCeiling,
      estMonthlyMargin,
    },
  };
}

// ---------------------------------------------------------------------------
// 7. REVERSE BUSINESS DISCOVERY ENGINE — Feature 1 Floating Bot
// ---------------------------------------------------------------------------
export const SKILL_ASSETS = [
  { id: "land", label: "Owns 1+ acre land" },
  { id: "stitching", label: "Stitching experience" },
  { id: "license", label: "Driving license" },
  { id: "cattle", label: "Has cattle shed" },
  { id: "retail_exp", label: "Retail / shop-keeping experience" },
  { id: "handicraft", label: "Bamboo / cane craft skill" },
  { id: "milling", label: "Access to milling / processing tools" },
];

// Skill -> Sector fit weights (%)
const SKILL_SECTOR_FIT = {
  land: { agro: 25, dairy: 20, bamboo: 5 },
  stitching: { tailoring: 45 },
  license: { kirana: 15, agro: 10 },
  cattle: { dairy: 40 },
  retail_exp: { kirana: 40, tailoring: 10 },
  handicraft: { bamboo: 45 },
  milling: { agro: 35 },
};

export function discoverBusinesses({ capital, skillIds }) {
  const results = SECTORS.map((sector) => {
    const seed = `${sector.id}|${capital}|${skillIds.slice().sort().join(",")}`;

    // Budget feasibility (0-100)
    const budgetFit = Math.max(
      5,
      Math.min(100, Math.round((capital / sector.idealCapital) * 70 + seededRange(seed + "bf", 0, 15)))
    );

    // Skill fit: sum weights of selected skills for this sector, base 20
    let skillFit = 20;
    skillIds.forEach((sid) => {
      skillFit += SKILL_SECTOR_FIT[sid]?.[sector.id] || 0;
    });
    skillFit = Math.min(100, skillFit);

    // Demand gap index reused from sector base
    const demandGapIndex = sector.baseDemandGap;

    const matchScore = Math.round(demandGapIndex * 0.35 + skillFit * 0.4 + budgetFit * 0.25);

    const estInvestment = Math.max(sector.minCapital, Math.min(capital, sector.idealCapital));
    const monthlyNetMargin = Math.round(
      estInvestment * (seededRange(seed + "mm", 8, 18) / 100)
    );

    return {
      sectorId: sector.id,
      sectorName: sector.name,
      icon: sector.icon,
      matchScore: Math.min(97, Math.max(12, matchScore)),
      skillFit,
      budgetFit,
      demandGapIndex,
      estInvestment,
      monthlyNetMargin,
    };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}
