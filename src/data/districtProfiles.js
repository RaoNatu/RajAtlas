import hawaMahal from "../assets/photos/hawa-mahal.jpg";
import mehrangarhFort from "../assets/photos/mehrangarh-fort.jpg";

const curatedProfiles = {
  jaipur: {
    overview:
      "Jaipur is Rajasthan's capital and the main gateway for Dhundhar-region study. For beginners, remember it through three anchors: planned city, Amber-Jaipur history, and pink sandstone architecture.",
    history:
      "Jaipur was founded by Sawai Jai Singh II as a planned city after Amber. Its grid layout, city gates, markets, Hawa Mahal, Jantar Mantar, and Amer Fort make it one of the easiest districts to connect with history, culture, science, and administration.",
    photos: [
      { label: "Hawa Mahal", src: hawaMahal },
      imageFor("Amer Fort Jaipur Rajasthan", "Amer Fort"),
      imageFor("Jantar Mantar Jaipur Rajasthan", "Jantar Mantar"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Jaipur_district",
  },
  jodhpur: {
    overview:
      "Jodhpur is the Marwar anchor. Remember it with Mehrangarh Fort, Blue City lanes, desert trade routes, and the Rathore line.",
    history:
      "Jodhpur grew as the major Rathore centre of Marwar. Mehrangarh Fort dominates the city and works as a strong memory hook for medieval Rajasthan, desert administration, architecture, and western Rajasthan culture.",
    photos: [
      { label: "Mehrangarh Fort", src: mehrangarhFort },
      imageFor("Jodhpur Blue City Rajasthan", "Blue City"),
      imageFor("Umaid Bhawan Palace Jodhpur", "Umaid Bhawan Palace"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Jodhpur_district",
  },
  udaipur: {
    overview:
      "Udaipur is the City of Lakes and a major Mewar history anchor. Pair it with lakes, palaces, Ahar-Banas culture, and Aravalli hills.",
    history:
      "Udaipur became the later capital of Mewar after the Chittorgarh period. It is important for palace architecture, lake systems, the Mewar royal tradition, and southern Rajasthan geography.",
    photos: [
      imageFor("City Palace Udaipur Rajasthan", "City Palace"),
      imageFor("Lake Pichola Udaipur", "Lake Pichola"),
      imageFor("Sajjangarh Monsoon Palace Udaipur", "Monsoon Palace"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Udaipur_district",
  },
  chittorgarh: {
    overview:
      "Chittorgarh is the strongest fort-memory district for Mewar. It is useful for questions on resistance, jauhar traditions, and medieval Rajasthan.",
    history:
      "Chittorgarh Fort is tied to Mewar's political and cultural identity. Beginners should connect it with Rana Kumbha, Maharana Pratap's legacy, fort architecture, and repeated sieges in medieval history.",
    photos: [
      imageFor("Chittorgarh Fort Rajasthan", "Chittorgarh Fort"),
      imageFor("Vijay Stambh Chittorgarh", "Vijay Stambh"),
      imageFor("Padmini Palace Chittorgarh", "Padmini Palace"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Chittorgarh_district",
  },
  bikaner: {
    overview:
      "Bikaner is a north-western desert district. Link it with camel research, Junagarh Fort, canal agriculture, and the Thar landscape.",
    history:
      "Bikaner grew under the Rathore branch associated with Rao Bika. It is important for desert administration, forts, trade, camel culture, and later canal-linked agricultural transformation.",
    photos: [
      imageFor("Junagarh Fort Bikaner Rajasthan", "Junagarh Fort"),
      imageFor("Camel Research Centre Bikaner", "Camel Research Centre"),
      imageFor("Karni Mata Temple Deshnoke Bikaner", "Karni Mata Temple"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Bikaner_district",
  },
  kota: {
    overview:
      "Kota is the Hadoti and Chambal anchor. Remember it through the Chambal river, Kota Doria, education hub identity, and black soil region.",
    history:
      "Kota developed as a major Hadoti centre. For exams, connect it with the Chambal project, Kota state, Kota paintings, Kota Doria textile, and south-eastern Rajasthan agriculture.",
    photos: [
      imageFor("Kota Garh Palace Rajasthan", "Garh Palace"),
      imageFor("Chambal River Kota Rajasthan", "Chambal River"),
      imageFor("Kota Doria Rajasthan", "Kota Doria"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Kota_district",
  },
  bharatpur: {
    overview:
      "Bharatpur is the eastern gateway and the Keoladeo bird sanctuary anchor. It also connects with Lohagarh Fort and Braj-region memory.",
    history:
      "Bharatpur is remembered for the Jat kingdom, Lohagarh Fort, and Keoladeo Ghana National Park. It is important for culture, polity, ecology, and eastern Rajasthan map questions.",
    photos: [
      imageFor("Keoladeo National Park Bharatpur", "Keoladeo National Park"),
      imageFor("Lohagarh Fort Bharatpur", "Lohagarh Fort"),
      imageFor("Bharatpur Palace Rajasthan", "Bharatpur Palace"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Bharatpur_district",
  },
  "sawai-madhopur": {
    overview:
      "Sawai Madhopur is the Ranthambore anchor. It is a simple district to remember through tiger reserve, fort, and Banas-Chambal-side map practice.",
    history:
      "Ranthambore Fort and tiger reserve make Sawai Madhopur important for both history and geography. The district is also useful for eastern Rajasthan route and wildlife questions.",
    photos: [
      imageFor("Ranthambore Fort Sawai Madhopur", "Ranthambore Fort"),
      imageFor("Ranthambore National Park Rajasthan tiger", "Ranthambore National Park"),
      imageFor("Trinetra Ganesh Temple Ranthambore", "Trinetra Ganesh Temple"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Sawai_Madhopur_district",
  },
  ajmer: {
    overview:
      "Ajmer is an Ajmer-Merwara anchor. Pair it with Ajmer Sharif, Pushkar, Taragarh, and Luni-origin geography.",
    history:
      "Ajmer has medieval, religious, and colonial-era importance. It connects Chauhan memory, Ajmer Sharif, Pushkar pilgrimage, Taragarh Fort, and central Rajasthan administration.",
    photos: [
      imageFor("Ajmer Sharif Dargah Rajasthan", "Ajmer Sharif"),
      imageFor("Pushkar Lake Rajasthan", "Pushkar Lake"),
      imageFor("Taragarh Fort Ajmer", "Taragarh Fort"),
    ],
    readMore: "https://en.wikipedia.org/wiki/Ajmer_district",
  },
};

export function getDistrictProfile(district) {
  const curated = curatedProfiles[district.id];
  if (curated) return curated;

  const anchors = district.famousFor?.slice(0, 3) || [district.name];
  return {
    overview: `${district.name} is best remembered through ${district.region} region, ${district.division} division, and ${anchors.join(", ")}.`,
    history: `${district.name} belongs to the ${district.region} memory belt. Start with its region and division, then connect its important city, local monuments, ecology, economy, and border clues to map practice.`,
    photos: anchors.map((anchor) =>
      imageFor(`${anchor} ${district.name} Rajasthan`, anchor),
    ),
    readMore: `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(`${district.name} district Rajasthan`)}`,
  };
}

function imageFor(query, label) {
  return {
    label,
    src: `https://source.unsplash.com/640x420/?${encodeURIComponent(query)}`,
    fallbackSrc: query.toLowerCase().includes("jodhpur") ? mehrangarhFort : hawaMahal,
  };
}
