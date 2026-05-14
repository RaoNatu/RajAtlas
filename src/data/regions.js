export const regions = [
  {
    id: "mewar",
    name: "Mewar",
    districts: ["udaipur", "chittorgarh", "rajsamand", "bhilwara", "salumber"],
    description:
      "A historical region of southern Rajasthan strongly associated with Sisodia rule, forts, lakes, and resistance traditions.",
    importantCities: ["Udaipur", "Chittorgarh", "Rajsamand", "Bhilwara", "Salumber"],
    culturalImportance:
      "Useful for remembering Mewar rulers, Chittorgarh, Udaipur, lakes, and southern Rajasthan history.",
    category: "Historical Region",
    color: "#1c5fc4",
  },
  {
    id: "marwar",
    name: "Marwar",
    districts: ["jodhpur", "jaisalmer", "barmer", "nagaur", "bikaner", "phalodi", "balotra"],
    description:
      "A western Rajasthan region linked with desert geography, Rathore history, and trade routes across the Thar.",
    importantCities: ["Jodhpur", "Jaisalmer", "Bikaner", "Barmer", "Phalodi", "Balotra"],
    culturalImportance:
      "Helpful for desert culture, forts, border districts, folk traditions, and Marwar history.",
    category: "Historical Region",
    color: "#bf7327",
  },
  {
    id: "hadoti",
    name: "Hadoti",
    districts: ["kota", "bundi", "baran", "jhalawar"],
    description:
      "A south-eastern region around the Chambal basin, known for Kota, Bundi, Jhalawar, paintings, and river-linked geography.",
    importantCities: ["Kota", "Bundi", "Baran", "Jhalawar"],
    culturalImportance:
      "Useful for connecting Chambal, Kota, Bundi painting traditions, and south-eastern Rajasthan.",
    category: "Cultural Region",
    color: "#0f766e",
  },
  {
    id: "shekhawati",
    name: "Shekhawati",
    districts: ["sikar", "jhunjhunu", "churu", "deedwana-kuchaman"],
    description:
      "A north-eastern cultural belt famous for painted havelis, merchant history, and semi-arid landscapes.",
    importantCities: ["Sikar", "Jhunjhunu", "Churu", "Didwana-Kuchaman"],
    culturalImportance:
      "Strong memory anchor for havelis, frescoes, merchant families, and northern Rajasthan districts.",
    category: "Cultural Region",
    color: "#9f1736",
  },
  {
    id: "dhundhar",
    name: "Dhundhar",
    districts: ["jaipur", "dausa", "tonk"],
    description:
      "A region around Jaipur and Dausa, important for state capital facts and Amber-Jaipur history.",
    importantCities: ["Jaipur", "Dausa", "Tonk"],
    culturalImportance:
      "Connect this region with Jaipur, Amer, planned city history, and administrative facts.",
    category: "Historical Region",
    color: "#7c3aed",
  },
  {
    id: "mewat",
    name: "Mewat",
    districts: ["alwar", "bharatpur", "deeg", "khairthal-tijara", "kotputli-behror"],
    description:
      "An eastern Rajasthan region connected with Alwar, Bharatpur, Haryana border areas, and eastern gateway routes.",
    importantCities: ["Alwar", "Bharatpur", "Deeg", "Tijara", "Kotputli-Behror"],
    culturalImportance:
      "Useful for remembering eastern Rajasthan, Sariska, Bharatpur, and border relationships.",
    category: "Cultural Region",
    color: "#2563eb",
  },
  {
    id: "vagad",
    name: "Vagad",
    districts: ["banswara", "dungarpur", "pratapgarh"],
    description:
      "A southern tribal region around Banswara and Dungarpur, associated with Mahi river and Gujarat-Madhya Pradesh links.",
    importantCities: ["Banswara", "Dungarpur", "Pratapgarh"],
    culturalImportance:
      "Useful for tribal culture, Mahi basin, southern border facts, and Vagad identity.",
    category: "Cultural Region",
    color: "#16a34a",
  },
  {
    id: "godwar",
    name: "Godwar",
    districts: ["pali", "sirohi", "jalore"],
    description:
      "A western Aravalli foothill region often linked with Pali, Sirohi, and routes between Marwar and Gujarat.",
    importantCities: ["Pali", "Sirohi", "Jalore", "Mount Abu"],
    culturalImportance:
      "Good for remembering Mount Abu, Aravalli transition zones, and western Rajasthan trade routes.",
    category: "Historical Region",
    color: "#b45309",
  },
  {
    id: "ajmer-merwara",
    name: "Ajmer-Merwara",
    districts: ["ajmer", "beawar"],
    description:
      "A central Rajasthan region with administrative and historical importance around Ajmer and Pushkar.",
    importantCities: ["Ajmer", "Pushkar", "Beawar"],
    culturalImportance:
      "Useful for Ajmer, Pushkar, British-era administrative history, and central Rajasthan map recall.",
    category: "Historical Region",
    color: "#be185d",
  },
];

export const getRegionById = (id) => regions.find((region) => region.id === id);
