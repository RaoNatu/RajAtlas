export const cultureCategories = [
  "Forts",
  "Temples",
  "Fairs",
  "Folk Dance",
  "Music",
  "Paintings",
  "Handicrafts",
  "Languages",
];

export const cultureGallery = [
  {
    id: "mehrangarh",
    category: "Forts",
    title: "Mehrangarh Fort",
    district: "Jodhpur",
    visualCue: "Blue City skyline and hill fort",
    memoryHook: "Jodhpur, Marwar, Mehrangarh.",
    details: "Built by Rao Jodha; use with Marwar, Rathore history, hill-fort architecture, and Blue City recall.",
  },
  {
    id: "chittorgarh-fort",
    category: "Forts",
    title: "Chittorgarh Fort",
    district: "Chittorgarh",
    visualCue: "Hill fort, Vijay Stambh, Mewar memory",
    memoryHook: "Chittorgarh means Mewar history and fort questions.",
    details: "Use for rulers, sieges, jauhar traditions, and fort architecture cards.",
  },
  {
    id: "amer-fort",
    category: "Forts",
    title: "Amer Fort",
    district: "Jaipur",
    visualCue: "Amber-Jaipur fort-palace",
    memoryHook: "Amer Fort connects Jaipur, Kachwaha, and capital-region history.",
    details: "Use with Kachwaha rule, palace-fort architecture, Sheesh Mahal, and Jaipur-region tourism.",
  },
  {
    id: "dilwara-temples",
    category: "Temples",
    title: "Dilwara Temples",
    district: "Sirohi",
    visualCue: "Marble temple architecture",
    memoryHook: "Mount Abu, Sirohi, Jain temple architecture.",
    details: "Important for temple architecture and marble craft memory.",
  },
  {
    id: "pushkar-fair",
    category: "Fairs",
    title: "Pushkar Fair",
    district: "Ajmer",
    visualCue: "Camel fair and Pushkar lake",
    memoryHook: "Pushkar, Ajmer, fair, lake, and pilgrimage.",
    details: "Held around Kartik Purnima; links Pushkar Lake, Brahma temple, pilgrimage, livestock, and tourism.",
  },
  {
    id: "ghoomar",
    category: "Folk Dance",
    title: "Ghoomar",
    district: "Pan-Rajasthan",
    visualCue: "Circular movement and colorful costume",
    memoryHook: "Ghoomar is the broad Rajasthan folk dance anchor.",
    details: "Use with costume, occasion, and community details.",
  },
  {
    id: "kalbelia",
    category: "Folk Dance",
    title: "Kalbelia",
    district: "Western Rajasthan",
    visualCue: "Black costume, fast movement",
    memoryHook: "Kalbelia connects dance, community, and desert culture.",
    details: "Add community-specific notes from the source book.",
  },
  {
    id: "ravanhatta",
    category: "Music",
    title: "Ravanhatta",
    district: "Mewar and western Rajasthan folk belt",
    visualCue: "String instrument",
    memoryHook: "Instrument cards make music questions visual.",
    details: "A bowed string instrument associated with Rajasthan's folk performance traditions, especially Bhopa storytelling.",
  },
  {
    id: "phad-painting",
    category: "Paintings",
    title: "Phad Painting",
    district: "Bhilwara memory anchor",
    visualCue: "Narrative scroll painting",
    memoryHook: "Phad means story scroll and folk deity tradition.",
    details: "Add artists, deities, and style details from the source book.",
  },
  {
    id: "kota-doria",
    category: "Handicrafts",
    title: "Kota Doria",
    district: "Kota",
    visualCue: "Fine woven textile",
    memoryHook: "Kota Doria pairs culture with the Economy textile module.",
    details: "Useful bridge between culture, economy, and district facts.",
  },
  {
    id: "marwari-language",
    category: "Languages",
    title: "Marwari",
    district: "Western Rajasthan",
    visualCue: "Marwar speech region",
    memoryHook: "Marwari links Jodhpur, Marwar, and western Rajasthan.",
    details: "Use with Marwar and western Rajasthan; compare it with Mewari, Dhundhari, Harauti, and Mewati.",
  },
];

export const fortExplorer = cultureGallery.filter((item) => item.category === "Forts");

export const templeExplorer = [
  {
    id: "dilwara-temples-detail",
    name: "Dilwara Temples",
    deity: "Jain Tirthankaras",
    location: "Mount Abu, Sirohi",
    festival: "Paryushan and Jain pilgrimage calendar",
    importance: "Marble temple architecture and Jain pilgrimage memory anchor.",
  },
  {
    id: "brahma-temple",
    name: "Brahma Temple",
    deity: "Brahma",
    location: "Pushkar, Ajmer",
    festival: "Pushkar Fair memory link",
    importance: "Commonly used Pushkar temple recall point.",
  },
  {
    id: "eklingji",
    name: "Eklingji Temple",
    deity: "Shiva",
    location: "Udaipur region",
    festival: "Maha Shivaratri",
    importance: "Mewar religious and cultural memory point.",
  },
];

export const danceCards = [
  {
    id: "ghoomar-dance",
    name: "Ghoomar",
    region: "Rajasthan",
    community: "Traditionally associated with women of Rajasthan",
    costume: "Traditional women costume memory anchor",
    occasion: "Festive occasions",
  },
  {
    id: "kalbelia-dance",
    name: "Kalbelia",
    region: "Western Rajasthan",
    community: "Kalbelia community",
    costume: "Black costume visual cue",
    occasion: "Folk performance",
  },
  {
    id: "bhavai-dance",
    name: "Bhavai",
    region: "Mewar and western Rajasthan performance memory",
    community: "Folk performer communities",
    costume: "Balancing pots visual cue",
    occasion: "Folk performance",
  },
  {
    id: "kachhi-ghodi",
    name: "Kachhi Ghodi",
    region: "Shekhawati memory anchor",
    community: "Folk performer communities",
    costume: "Dummy horse costume visual cue",
    occasion: "Festive performance",
  },
];

export const festivalCalendar = [
  { id: "pushkar", name: "Pushkar Fair", location: "Ajmer", month: "Kartik", importance: "Fair, lake, Brahma temple, and camel memory." },
  { id: "desert-festival", name: "Desert Festival", location: "Jaisalmer", month: "Magh / February tourism calendar", importance: "Desert culture, folk performance, and tourism." },
  { id: "gangaur", name: "Gangaur", location: "Rajasthan", month: "Chaitra", importance: "Festival and women costume-culture recall." },
  { id: "teej", name: "Teej", location: "Jaipur memory anchor", month: "Shravan", importance: "Monsoon festival and Jaipur procession recall." },
];

export const cultureQuiz = [
  {
    id: "cul-city-fort",
    type: "mcq",
    category: "Culture",
    question: "Mehrangarh Fort is a strong culture memory anchor for which city?",
    options: ["Jodhpur", "Kota", "Bharatpur", "Dausa"],
    correctAnswer: "Jodhpur",
    explanation: "Mehrangarh Fort is associated with Jodhpur and Marwar.",
  },
  {
    id: "cul-dilwara",
    type: "mcq",
    category: "Culture",
    question: "Dilwara Temples are best remembered with which place?",
    options: ["Mount Abu", "Sambhar", "Kota", "Alwar"],
    correctAnswer: "Mount Abu",
    explanation: "Dilwara Temples are located at Mount Abu in Sirohi district.",
  },
  {
    id: "cul-kota-doria",
    type: "mcq",
    category: "Culture",
    question: "Kota Doria is most closely linked with which craft type?",
    options: ["Textile", "Stone carving", "Puppet music", "Metal coinage"],
    correctAnswer: "Textile",
    explanation: "Kota Doria is a textile craft memory point.",
  },
];

export const cultureTopics = [
  ...cultureGallery,
  ...templeExplorer,
  ...danceCards,
  ...festivalCalendar,
];

export const cultureModule = {
  phase: 6,
  status: "Implemented with gallery, forts, temples, dances, fair calendar, craft cards, and quiz.",
  galleries: cultureCategories,
};
