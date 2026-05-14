export const historyPeriods = [
  {
    id: "ancient",
    name: "Ancient Rajasthan",
    range: "Prehistoric to early historic",
    description: "Civilization sites, inscriptions, coins, and early political centers.",
    color: "#1c5fc4",
  },
  {
    id: "medieval",
    name: "Medieval Rajasthan",
    range: "Rajput kingdoms",
    description: "Mewar, Marwar, Amber, Hadoti, forts, battles, dynasties, and ruler lineages.",
    color: "#bf7327",
  },
  {
    id: "british",
    name: "British Period",
    range: "Rajputana agencies",
    description: "1857 centers, princely states, press, reform, and political awakening.",
    color: "#9f1736",
  },
  {
    id: "freedom",
    name: "Freedom Struggle",
    range: "Movements and leaders",
    description: "Peasant movements, tribal movements, Praja Mandal activity, and journalism.",
    color: "#0f766e",
  },
  {
    id: "integration",
    name: "Integration of Rajasthan",
    range: "1948-1956",
    description: "Step-by-step merger of princely states into modern Rajasthan.",
    color: "#7c3aed",
  },
];

export const ancientSites = [
  {
    id: "kalibangan",
    name: "Kalibangan",
    district: "Hanumangarh",
    period: "Harappan / Indus Valley",
    coordinates: { x: 42, y: 15 },
    facts: ["Harappan site", "Fire altars memory hook", "Ploughed field memory hook"],
    memoryHook: "Kalibangan means Hanumangarh plus Harappan archaeology.",
  },
  {
    id: "ahar",
    name: "Ahar",
    district: "Udaipur",
    period: "Ahar-Banas culture",
    coordinates: { x: 43, y: 72 },
    facts: ["Chalcolithic culture", "Southern Rajasthan", "Linked with Banas basin"],
    memoryHook: "Ahar pairs with Udaipur and Banas-side ancient culture.",
  },
  {
    id: "ganeshwar",
    name: "Ganeshwar",
    district: "Sikar",
    period: "Copper age memory site",
    coordinates: { x: 49, y: 33 },
    facts: ["Copper objects", "North-eastern Rajasthan", "Ganeshwar-Jodhpura complex"],
    memoryHook: "Ganeshwar means Sikar plus copper.",
  },
  {
    id: "bairath",
    name: "Bairath",
    district: "Jaipur",
    period: "Ancient / Mauryan memory anchor",
    coordinates: { x: 58, y: 39 },
    facts: ["Ancient site", "Buddhist and inscription recall", "Near Jaipur region"],
    memoryHook: "Bairath connects Jaipur region with ancient sources.",
  },
];

export const medievalKingdoms = [
  {
    id: "mewar-kingdom",
    name: "Mewar",
    anchor: "Chittorgarh and Udaipur",
    dynasty: "Sisodia memory line",
    districts: ["Udaipur", "Chittorgarh", "Rajsamand"],
    facts: ["Chittorgarh Fort", "Maharana Pratap", "Resistance traditions"],
  },
  {
    id: "marwar-kingdom",
    name: "Marwar",
    anchor: "Jodhpur",
    dynasty: "Rathore memory line",
    districts: ["Jodhpur", "Nagaur", "Pali", "Jaisalmer side links"],
    facts: ["Mehrangarh Fort", "Desert trade routes", "Marwar polity"],
  },
  {
    id: "amber-jaipur",
    name: "Amber-Jaipur",
    anchor: "Jaipur",
    dynasty: "Kachwaha memory line",
    districts: ["Jaipur", "Dausa"],
    facts: ["Amer Fort", "Planned Jaipur", "Capital region"],
  },
  {
    id: "hadoti-states",
    name: "Hadoti",
    anchor: "Kota and Bundi",
    dynasty: "Hada memory line",
    districts: ["Kota", "Bundi", "Jhalawar"],
    facts: ["Bundi paintings", "Kota state", "Chambal-side history"],
  },
];

export const movementCards = [
  {
    id: "nasirabad-1857",
    title: "1857 in Rajasthan",
    type: "1857",
    place: "Nasirabad and other centers",
    cause: "Sepoy unrest and anti-British resistance.",
    outcome: "Use source book to add center-wise sequence and leaders.",
    memoryHook: "Nasirabad is the first 1857 recall anchor for Rajasthan.",
  },
  {
    id: "bijolia",
    title: "Bijolia Peasant Movement",
    type: "Peasant movement",
    place: "Bhilwara region",
    cause: "Agrarian grievances and revenue-related exploitation.",
    outcome: "Leader and date details should be added from the source book.",
    memoryHook: "Bijolia pairs with peasant movement questions.",
  },
  {
    id: "bhil-movement",
    title: "Bhil and Tribal Movements",
    type: "Tribal movement",
    place: "Southern Rajasthan",
    cause: "Local rights, social reform, and resistance to exploitation.",
    outcome: "Add Govind Guru, Mangarh, and district-specific details from the book.",
    memoryHook: "Southern Rajasthan plus tribal movements.",
  },
  {
    id: "praja-mandal",
    title: "Praja Mandal Activity",
    type: "Freedom struggle",
    place: "Princely states",
    cause: "Demand for responsible government and civil rights.",
    outcome: "Good bridge from princely states to integration.",
    memoryHook: "Praja Mandal links politics, history, and integration.",
  },
];

export const integrationTimeline = [
  {
    id: "matsya-union",
    period: "Stage 1",
    title: "Matsya Union",
    description:
      "Early integration stage involving eastern princely states. Add exact date and member states from the book.",
  },
  {
    id: "rajasthan-union",
    period: "Stage 2",
    title: "Rajasthan Union",
    description:
      "A key merger step in the formation of Rajasthan. Use this as a sortable timeline card.",
  },
  {
    id: "greater-rajasthan",
    period: "Stage 3",
    title: "Greater Rajasthan",
    description:
      "Major expansion stage remembered with Jaipur, Jodhpur, Bikaner, and Jaisalmer joining the formation story.",
  },
  {
    id: "modern-rajasthan",
    period: "Stage 4",
    title: "Modern Rajasthan consolidation",
    description:
      "Final merger and reorganization details should be filled from the Rajasthan GK source chapter.",
  },
];

export const historyEvents = [
  ...ancientSites.map((site) => ({
    id: site.id,
    period: site.period,
    title: site.name,
    description: site.memoryHook,
  })),
  ...integrationTimeline,
];

export const historyQuiz = [
  {
    id: "hist-kalibangan",
    type: "mcq",
    category: "History",
    question: "Kalibangan is a strong memory anchor for which ancient tradition?",
    options: ["Harappan archaeology", "Mughal painting", "Salt production", "Panchayati Raj"],
    correctAnswer: "Harappan archaeology",
    explanation: "Kalibangan is studied as an important Harappan site in Rajasthan.",
  },
  {
    id: "hist-mewar-anchor",
    type: "mcq",
    category: "History",
    question: "Which fort-city is a major Mewar history anchor?",
    options: ["Chittorgarh", "Bikaner", "Bharatpur", "Jhunjhunu"],
    correctAnswer: "Chittorgarh",
    explanation: "Chittorgarh is a core Mewar memory point for forts, rulers, and resistance traditions.",
  },
  {
    id: "hist-bijolia",
    type: "mcq",
    category: "History",
    question: "Bijolia is best remembered in Rajasthan GK for which type of movement?",
    options: ["Peasant movement", "River valley project", "Judicial bench", "Mineral belt"],
    correctAnswer: "Peasant movement",
    explanation: "Bijolia is a major peasant movement recall point.",
  },
];

export const historyModule = {
  phase: 5,
  status: "Implemented with timelines, sites, movement cards, integration sequence, and quiz.",
  timelines: ["Ancient", "Medieval", "British period", "Freedom struggle", "Integration"],
};
