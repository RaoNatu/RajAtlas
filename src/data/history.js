export const historyPeriods = [
  {
    id: "ancient",
    name: "Ancient Rajasthan",
    range: "Prehistoric to early historic",
    description:
      "Start with archaeology: Harappan Kalibangan in the north, Ahar-Banas culture near Udaipur, copper-age Ganeshwar-Jodhpura, and early historic Bairath. These sites explain why Rajasthan GK is not only fort history.",
    color: "#1c5fc4",
  },
  {
    id: "medieval",
    name: "Medieval Rajasthan",
    range: "Rajput kingdoms",
    description:
      "Medieval study becomes easier when each region gets an anchor: Mewar with Chittorgarh-Udaipur, Marwar with Jodhpur, Amber-Jaipur with Dhundhar, and Hadoti with Kota-Bundi.",
    color: "#bf7327",
  },
  {
    id: "british",
    name: "British Period",
    range: "Rajputana agencies",
    description:
      "In the British period, Rajasthan was remembered as Rajputana: princely states, agency administration, cantonments, reform movements, newspapers, and new political associations shaped public life.",
    color: "#9f1736",
  },
  {
    id: "freedom",
    name: "Freedom Struggle",
    range: "Movements and leaders",
    description:
      "Freedom struggle questions often mix peasant issues, tribal reform, Praja Mandals, journalism, and local leaders. Learn every movement through place, cause, leader, and outcome.",
    color: "#0f766e",
  },
  {
    id: "integration",
    name: "Integration of Rajasthan",
    range: "1948-1956",
    description:
      "Modern Rajasthan formed through seven merger stages between 1948 and 1956. The safest memory chain is Matsya Union, Rajasthan Union, Udaipur joining, Greater Rajasthan, Matsya merger, Sirohi adjustment, and the 1956 reorganization.",
    color: "#7c3aed",
  },
];

export const ancientSites = [
  {
    id: "kalibangan",
    name: "Kalibangan",
    district: "Hanumangarh",
    districtId: "hanumangarh",
    period: "Harappan / Indus Valley",
    coordinates: { x: 42, y: 15 },
    facts: [
      "Major Harappan site on the Ghaggar-Hakra belt",
      "Known in GK for fire altars and the ploughed field evidence",
      "Useful for connecting ancient history with northern Rajasthan geography",
    ],
    memoryHook:
      "Kalibangan means Hanumangarh plus Harappan archaeology, fire altars, and ploughed-field recall.",
  },
  {
    id: "ahar",
    name: "Ahar",
    district: "Udaipur",
    districtId: "udaipur",
    period: "Ahar-Banas culture",
    coordinates: { x: 43, y: 72 },
    facts: [
      "Chalcolithic culture of southern Rajasthan",
      "Linked with copper use, black-and-red ware, and Banas basin settlements",
      "Helps connect archaeology with Udaipur and south Rajasthan",
    ],
    memoryHook:
      "Ahar pairs Udaipur with the Ahar-Banas Chalcolithic culture and early settled life.",
  },
  {
    id: "ganeshwar",
    name: "Ganeshwar",
    district: "Sikar",
    districtId: "sikar",
    period: "Copper age memory site",
    coordinates: { x: 49, y: 33 },
    facts: [
      "Copper-age site in north-eastern Rajasthan",
      "Remembered with the Ganeshwar-Jodhpura complex",
      "Important for questions on copper tools and early technology",
    ],
    memoryHook: "Ganeshwar means Sikar plus copper-age technology.",
  },
  {
    id: "bairath",
    name: "Bairath",
    district: "Jaipur",
    districtId: "jaipur",
    period: "Ancient / Mauryan memory anchor",
    coordinates: { x: 58, y: 39 },
    facts: [
      "Early historic site near Jaipur region",
      "Known for Mauryan-era and Buddhist memory links",
      "Useful for inscription, archaeology, and ancient polity questions",
    ],
    memoryHook: "Bairath connects Jaipur with Mauryan-era and Buddhist ancient-history recall.",
  },
  {
    id: "bagor",
    name: "Bagor",
    district: "Bhilwara",
    districtId: "bhilwara",
    period: "Mesolithic / early pastoral memory site",
    coordinates: { x: 53, y: 59 },
    facts: [
      "Site on the Kothari river",
      "Useful for Mesolithic and early pastoral evidence",
      "Connects central Rajasthan with early settlement patterns",
    ],
    memoryHook: "Bagor means Bhilwara plus Kothari river and early pastoral evidence.",
  },
  {
    id: "gilund",
    name: "Gilund",
    district: "Rajsamand",
    districtId: "rajsamand",
    period: "Ahar-Banas culture",
    coordinates: { x: 46, y: 63 },
    facts: [
      "Important Ahar-Banas settlement",
      "Helps connect Rajsamand with Chalcolithic archaeology",
      "Good companion site for Ahar and Balathal",
    ],
    memoryHook: "Gilund keeps Rajsamand in the Ahar-Banas ancient-culture map.",
  },
  {
    id: "balathal",
    name: "Balathal",
    district: "Udaipur",
    districtId: "udaipur",
    period: "Ahar-Banas culture",
    coordinates: { x: 39, y: 76 },
    facts: [
      "Chalcolithic settlement in southern Rajasthan",
      "Studied with Ahar-Banas culture and early village life",
      "Useful for pairing Udaipur with archaeology beyond palaces",
    ],
    memoryHook: "Balathal reinforces Udaipur as an ancient archaeology district, not only a lake city.",
  },
  {
    id: "nagari",
    name: "Nagari",
    district: "Chittorgarh",
    districtId: "chittorgarh",
    period: "Early historic / Madhyamika",
    coordinates: { x: 55, y: 70 },
    facts: [
      "Associated with ancient Madhyamika",
      "Useful for early historic Rajasthan questions",
      "Connects Chittorgarh district with sources older than medieval Mewar",
    ],
    memoryHook: "Nagari means Chittorgarh plus ancient Madhyamika recall.",
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
    outcome:
      "Nasirabad is usually taken as the first Rajasthan cantonment outbreak anchor, followed by activity around Neemuch, Erinpura, Kota, and other centres.",
    memoryHook:
      "For 1857, start with Nasirabad, then connect cantonments and Kota-side resistance.",
  },
  {
    id: "bijolia",
    title: "Bijolia Peasant Movement",
    type: "Peasant movement",
    place: "Bhilwara region",
    cause: "Agrarian grievances and revenue-related exploitation.",
    outcome:
      "It became the best-known peasant movement anchor in Rajasthan GK because it linked taxes, begar, leadership, press attention, and organized resistance.",
    memoryHook:
      "Bijolia pairs Bhilwara with peasant grievances, Vijay Singh Pathik, and long-running agrarian protest.",
  },
  {
    id: "bhil-movement",
    title: "Bhil and Tribal Movements",
    type: "Tribal movement",
    place: "Southern Rajasthan",
    cause: "Local rights, social reform, and resistance to exploitation.",
    outcome:
      "Govind Guru, the Bhagat movement, and Mangarh memory make this a key bridge between social reform, tribal assertion, and freedom-struggle study.",
    memoryHook:
      "Southern Rajasthan plus Govind Guru and Mangarh is the tribal movement shortcut.",
  },
  {
    id: "praja-mandal",
    title: "Praja Mandal Activity",
    type: "Freedom struggle",
    place: "Princely states",
    cause: "Demand for responsible government and civil rights.",
    outcome: "Good bridge from princely states to integration.",
    memoryHook:
      "Praja Mandal links princely-state politics, civil rights, local leaders, and integration.",
  },
];

export const integrationTimeline = [
  {
    id: "matsya-union",
    period: "18 March 1948",
    title: "Matsya Union",
    description:
      "Alwar, Bharatpur, Dholpur, and Karauli joined as Matsya Union. This is the eastern Rajasthan starting point for the merger story.",
  },
  {
    id: "rajasthan-union",
    period: "25 March 1948",
    title: "Rajasthan Union",
    description:
      "Banswara, Bundi, Dungarpur, Jhalawar, Kishangarh, Kota, Pratapgarh, Shahpura, and Tonk formed Rajasthan Union.",
  },
  {
    id: "united-state-rajasthan",
    period: "18 April 1948",
    title: "United State of Rajasthan",
    description:
      "Udaipur joined the earlier Rajasthan Union. This is the key Mewar step before the larger 1949 expansion.",
  },
  {
    id: "greater-rajasthan",
    period: "30 March 1949",
    title: "Greater Rajasthan",
    description:
      "Jaipur, Jodhpur, Bikaner, and Jaisalmer joined. Rajasthan Day is observed on 30 March because of this major merger stage.",
  },
  {
    id: "united-greater-rajasthan",
    period: "15 May 1949",
    title: "United Greater Rajasthan",
    description:
      "Matsya Union merged with Greater Rajasthan, bringing the eastern states into the larger Rajasthan structure.",
  },
  {
    id: "sirohi-stage",
    period: "26 January 1950",
    title: "Sirohi joins Rajasthan",
    description:
      "Most of Sirohi joined Rajasthan, while Abu Road and Delwara were handled through later reorganization. This stage is important for border-adjustment questions.",
  },
  {
    id: "modern-rajasthan",
    period: "1 November 1956",
    title: "Modern Rajasthan consolidation",
    description:
      "States Reorganisation completed the modern form: Ajmer-Merwara, Abu Road, and Sunel Tappa adjustments are the key recall points.",
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
  {
    id: "hist-ahar-banas",
    type: "mcq",
    category: "History",
    question: "Ahar near Udaipur is mainly associated with which ancient culture?",
    options: ["Ahar-Banas culture", "Gandhara art", "Mughal karkhana", "British cantonment"],
    correctAnswer: "Ahar-Banas culture",
    explanation:
      "Ahar is a southern Rajasthan archaeology anchor and is studied with the Ahar-Banas Chalcolithic culture.",
  },
  {
    id: "hist-greater-rajasthan",
    type: "mcq",
    category: "History",
    question: "Which date is remembered as Rajasthan Day because of the Greater Rajasthan merger?",
    options: ["30 March 1949", "18 March 1948", "1 November 1956", "15 August 1947"],
    correctAnswer: "30 March 1949",
    explanation:
      "Greater Rajasthan was formed on 30 March 1949 when Jaipur, Jodhpur, Bikaner, and Jaisalmer joined.",
  },
  {
    id: "hist-mangarh",
    type: "mcq",
    category: "History",
    question: "Govind Guru and Mangarh are best remembered with which stream of Rajasthan history?",
    options: ["Tribal movement", "Canal irrigation", "Blue pottery", "Judicial reform"],
    correctAnswer: "Tribal movement",
    explanation:
      "Govind Guru, the Bhagat movement, and Mangarh are key tribal movement anchors in southern Rajasthan.",
  },
];

export const historyModule = {
  phase: 5,
  status: "Implemented with timelines, map-linked sites, movement cards, integration sequence, and quiz.",
  timelines: ["Ancient", "Medieval", "British period", "Freedom struggle", "Integration"],
};
