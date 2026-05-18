export const climateZones = [
  {
    id: "arid-west",
    name: "Extremely Arid West",
    region: "Thar Desert and border belt",
    districts: ["jaisalmer", "barmer", "bikaner", "phalodi"],
    rainfall: "About 100-250 mm in the driest pockets",
    temperature: "Very high summer temperature range",
    memoryHook: "Jaisalmer-Barmer-Bikaner-Phalodi are the fastest low-rainfall, high-range climate anchors.",
    color: "#f59e0b",
  },
  {
    id: "semi-arid-central",
    name: "Semi-Arid Central Belt",
    region: "Central Rajasthan",
    districts: ["ajmer", "nagaur", "jaipur", "pali", "sikar", "jhunjhunu"],
    rainfall: "Roughly 300-600 mm, increasing eastward",
    temperature: "Hot summers and cooler winters",
    memoryHook: "This is the transition zone between the Thar and wetter eastern plains.",
    color: "#d9953f",
  },
  {
    id: "sub-humid-east",
    name: "Semi-Arid to Sub-Humid East",
    region: "Eastern plains",
    districts: ["alwar", "bharatpur", "dausa", "karauli", "sawai-madhopur", "dholpur"],
    rainfall: "Moderate monsoon rainfall",
    temperature: "Hot summers with stronger monsoon relief than the west",
    memoryHook: "Eastern Rajasthan receives more monsoon support and pairs with alluvial agriculture.",
    color: "#38bdf8",
  },
  {
    id: "humid-south",
    name: "Sub-Humid Southern Hills",
    region: "Aravalli and Vagad-Mewar belt",
    districts: ["udaipur", "banswara", "dungarpur", "sirohi", "rajsamand"],
    rainfall: "Higher than western Rajasthan; Mount Abu is the high-rainfall anchor",
    temperature: "Moderated by elevation and monsoon influence",
    memoryHook: "Southern hills receive more monsoon influence.",
    color: "#16a34a",
  },
  {
    id: "humid-east",
    name: "Humid South-East",
    region: "Hadoti and Chambal belt",
    districts: ["kota", "bundi", "baran", "jhalawar"],
    rainfall: "Relatively higher monsoon rainfall",
    temperature: "Hot summers, stronger monsoon effect",
    memoryHook: "Hadoti, Chambal, and black soil go together.",
    color: "#2563eb",
  },
];

export const rainfallComparison = [
  { zone: "West", rainfall: 18 },
  { zone: "Central", rainfall: 42 },
  { zone: "East", rainfall: 58 },
  { zone: "South", rainfall: 72 },
  { zone: "South-East", rainfall: 82 },
];

export const climateModule = {
  phase: 2,
  status: "Expanded climate learning data",
  visualizations: ["Rainfall", "Temperature", "Monsoon", "Aravalli influence"],
};
