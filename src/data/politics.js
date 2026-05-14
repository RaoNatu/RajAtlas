export const politicalStructure = [
  {
    id: "governor",
    title: "Governor",
    layer: "Constitutional Head",
    connectsTo: ["Chief Minister", "Council of Ministers", "Legislative Assembly"],
    memoryHook: "Formal head of the state executive.",
  },
  {
    id: "chief-minister",
    title: "Chief Minister",
    layer: "Political Executive",
    connectsTo: ["Council of Ministers", "Departments", "Legislative Assembly"],
    memoryHook: "Real executive leadership in the state government.",
  },
  {
    id: "assembly",
    title: "Legislative Assembly",
    layer: "Legislature",
    connectsTo: ["Speaker", "Members", "Committees"],
    memoryHook: "Rajasthan has a unicameral legislature with 200 assembly seats.",
  },
  {
    id: "judiciary",
    title: "Rajasthan High Court",
    layer: "Judiciary",
    connectsTo: ["Jodhpur principal seat", "Jaipur bench", "District courts"],
    memoryHook: "Jodhpur and Jaipur are the court-location recall anchors.",
  },
  {
    id: "local-governance",
    title: "Local Governance",
    layer: "Grassroots Administration",
    connectsTo: ["Panchayati Raj", "Municipal bodies", "District administration"],
    memoryHook: "Village, block, district, town, and city governance make local facts visual.",
  },
];

export const currentPoliticalSnapshot = [
  { label: "Governor", value: "Haribhau Kisanrao Bagade", note: "Verified current as of 14 May 2026." },
  { label: "Chief Minister", value: "Bhajan Lal Sharma", note: "Verified current as of 14 May 2026." },
  { label: "Deputy Chief Ministers", value: "Diya Kumari and Prem Chand Bairwa", note: "Current ministry snapshot." },
  { label: "Assembly strength", value: "200 seats", note: "Unicameral Rajasthan Legislative Assembly." },
];

export const politicalFirstCards = [
  {
    id: "pol-first-cm",
    title: "First Chief Minister",
    value: "Heera Lal Shastri",
    category: "Chief Minister firsts",
    memoryHook: "Start Rajasthan CM chronology with Heera Lal Shastri.",
  },
  {
    id: "pol-first-governor",
    title: "First Governor",
    value: "Gurumukh Nihal Singh",
    category: "Governor firsts",
    memoryHook: "Start Rajasthan Governor chronology with Gurumukh Nihal Singh.",
  },
  {
    id: "pol-first-woman-cm",
    title: "First woman Chief Minister",
    value: "Vasundhara Raje",
    category: "Women in politics",
    memoryHook: "Only woman to have served as Rajasthan Chief Minister so far.",
  },
  {
    id: "pol-first-woman-minister",
    title: "First woman minister",
    value: "Kamla Beniwal",
    category: "Women in politics",
    memoryHook: "Also remembered as Rajasthan's first woman Deputy Chief Minister.",
  },
  {
    id: "pol-first-woman-speaker",
    title: "First woman Speaker",
    value: "Sumitra Singh",
    category: "Assembly firsts",
    memoryHook: "Important Rajasthan Legislative Assembly first.",
  },
  {
    id: "pol-first-non-congress-cm",
    title: "First non-Congress Chief Minister",
    value: "Bhairon Singh Shekhawat",
    category: "Political milestones",
    memoryHook: "Use with the 1977 Janata Party government memory.",
  },
];

export const governanceCards = [
  {
    id: "role-governor",
    title: "Governor",
    category: "Governor",
    appointment: "Appointed by the President of India.",
    tenure: "Usually five years, subject to constitutional provisions.",
    powers: ["Summons the state legislature", "Appoints the Chief Minister", "Gives assent to state bills"],
    importantFacts: [
      "Acts as the constitutional head of Rajasthan.",
      "Most real executive work is carried out through the elected government.",
      "Current Governor: Haribhau Kisanrao Bagade, verified on 14 May 2026.",
    ],
    sourceStatus: "Verified current snapshot",
  },
  {
    id: "role-chief-minister",
    title: "Chief Minister",
    category: "Chief Minister",
    appointment: "Appointed by the Governor, usually leader of the majority party or coalition.",
    tenure: "Dependent on majority support in the Legislative Assembly.",
    powers: ["Heads the Council of Ministers", "Guides state policy", "Coordinates departments"],
    importantFacts: [
      "The Chief Minister is the real executive head of the state government.",
      "Council of Ministers is collectively responsible to the Legislative Assembly.",
      "Current Chief Minister: Bhajan Lal Sharma, verified on 14 May 2026.",
    ],
    sourceStatus: "Verified current snapshot",
  },
  {
    id: "role-assembly",
    title: "Rajasthan Legislative Assembly",
    category: "Legislative Assembly",
    appointment: "Members are elected from assembly constituencies.",
    tenure: "Normally five years unless dissolved earlier.",
    powers: ["Makes state laws", "Controls state finances", "Holds the executive accountable"],
    importantFacts: [
      "The assembly has 200 seats.",
      "Speaker, committees, questions, and budget sessions are useful polity recall points.",
    ],
    sourceStatus: "Common GK",
  },
  {
    id: "role-high-court",
    title: "Rajasthan High Court",
    category: "High Court",
    appointment: "Judges are appointed through the constitutional judicial appointment process.",
    tenure: "As per constitutional provisions for High Court judges.",
    powers: ["Constitutional writ jurisdiction", "Appellate jurisdiction", "Superintendence over subordinate courts"],
    importantFacts: [
      "Principal seat: Jodhpur.",
      "Permanent bench: Jaipur.",
      "Use this as a two-city memory pair.",
    ],
    sourceStatus: "Common GK",
  },
];

export const localGovernance = [
  {
    id: "gram-panchayat",
    title: "Gram Panchayat",
    level: "Village",
    type: "Rural local self-government",
    description: "First local democratic unit for village-level administration and development work.",
  },
  {
    id: "panchayat-samiti",
    title: "Panchayat Samiti",
    level: "Block",
    type: "Rural local self-government",
    description: "Connects gram panchayats with district-level planning.",
  },
  {
    id: "zilla-parishad",
    title: "Zila Parishad",
    level: "District",
    type: "Rural local self-government",
    description: "District-level rural governance institution.",
  },
  {
    id: "municipality",
    title: "Municipal Bodies",
    level: "Urban",
    type: "Urban local self-government",
    description: "Municipal corporations, councils, and boards govern urban areas based on size and status.",
  },
];

export const highCourtFacts = [
  { label: "Principal seat", value: "Jodhpur" },
  { label: "Permanent bench", value: "Jaipur" },
  { label: "Court type", value: "High Court for the State of Rajasthan" },
  { label: "Memory pair", value: "Jodhpur principal seat + Jaipur bench" },
];

export const leadersTimeline = [
  {
    id: "polity-foundation",
    period: "1949",
    title: "Greater Rajasthan administration begins",
    description:
      "Use this period to connect integration of Rajasthan with first Governor and first Chief Minister facts.",
  },
  {
    id: "first-assembly",
    period: "1952",
    title: "First assembly election memory anchor",
    description:
      "Use early elections, speakers, chief ministers, and governors as the start of assembly chronology.",
  },
  {
    id: "first-woman-cm",
    period: "2003",
    title: "First woman Chief Minister",
    description:
      "Vasundhara Raje became Rajasthan's first woman Chief Minister, a high-yield polity first.",
  },
  {
    id: "current-government",
    period: "2023 onwards",
    title: "Current ministry memory",
    description:
      "Bhajan Lal Sharma is the current Chief Minister; Diya Kumari and Prem Chand Bairwa are Deputy Chief Ministers.",
  },
  {
    id: "panchayati-raj",
    period: "Local governance",
    title: "Panchayati Raj recall path",
    description:
      "Village, block, and district tiers help students separate rural governance from urban local bodies.",
  },
  {
    id: "rights-commissions",
    period: "Boards and commissions",
    title: "Public policy and citizen rights",
    description:
      "Commissions, boards, and rights topics are ready for book-backed cards and appointment-power quizzes.",
  },
];

export const politicsQuiz = [
  {
    id: "pol-governor-appoints",
    type: "mcq",
    category: "Politics",
    question: "Who appoints the Chief Minister of Rajasthan?",
    options: ["Governor", "Speaker", "High Court Chief Justice", "Chief Secretary"],
    correctAnswer: "Governor",
    explanation: "The Governor appoints the Chief Minister, usually the leader with majority support.",
  },
  {
    id: "pol-assembly-seats",
    type: "mcq",
    category: "Politics",
    question: "How many seats does the Rajasthan Legislative Assembly have?",
    options: ["90", "147", "200", "250"],
    correctAnswer: "200",
    explanation: "Rajasthan Legislative Assembly has 200 seats.",
  },
  {
    id: "pol-high-court-seat",
    type: "mcq",
    category: "Politics",
    question: "What is the principal seat of the Rajasthan High Court?",
    options: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    correctAnswer: "Jodhpur",
    explanation: "The principal seat is at Jodhpur, with a permanent bench at Jaipur.",
  },
];

export const politicsTopics = [
  ...governanceCards,
  ...politicalFirstCards,
  ...currentPoliticalSnapshot,
  ...localGovernance,
  ...politicalStructure,
];

export const politicsModule = {
  phase: 4,
  status: "Implemented with data-first cards, flowcharts, timeline, local governance, and quiz.",
  diagrams: ["Governor", "Chief Minister", "Legislative Assembly", "High Court", "Local governance"],
};
