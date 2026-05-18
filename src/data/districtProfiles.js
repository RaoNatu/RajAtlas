const curatedProfiles = {
  jaipur: {
    overview:
      "Jaipur is Rajasthan's capital and the main gateway for Dhundhar-region study. For beginners, remember it through three anchors: planned city, Amber-Jaipur history, and pink sandstone architecture.",
    history:
      "Jaipur was founded by Sawai Jai Singh II as a planned city after Amber. Its grid layout, city gates, markets, Hawa Mahal, Jantar Mantar, and Amer Fort make it one of the easiest districts to connect with history, culture, science, and administration.",
    places: [
      placeFor("Hawa Mahal", "Five-storey palace facade linked with Jaipur's planned-city lanes, royal processions, and pink sandstone memory.", ["Architecture", "Pink City"]),
      placeFor("Amer Fort", "Amber-Jaipur state anchor that connects Kachwaha history, fort architecture, and hill-defence questions.", ["Fort", "Kachwaha"]),
      placeFor("Jantar Mantar", "UNESCO-listed observatory that pairs Sawai Jai Singh II with astronomy and city-planning recall.", ["Science", "UNESCO"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Jaipur_district",
  },
  jodhpur: {
    overview:
      "Jodhpur is the Marwar anchor. Remember it with Mehrangarh Fort, Blue City lanes, desert trade routes, and the Rathore line.",
    history:
      "Jodhpur grew as the major Rathore centre of Marwar. Mehrangarh Fort dominates the city and works as a strong memory hook for medieval Rajasthan, desert administration, architecture, and western Rajasthan culture.",
    places: [
      placeFor("Mehrangarh Fort", "The strongest Jodhpur landmark for Rathore, Marwar, and medieval fort questions.", ["Fort", "Marwar"]),
      placeFor("Blue City lanes", "Old-city visual memory for Jodhpur's nickname, desert urban form, and tourism questions.", ["Nickname", "Urban"]),
      placeFor("Umaid Bhawan Palace", "A modern royal-era palace anchor that keeps Jodhpur separate from older hill-fort facts.", ["Palace", "Modern"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Jodhpur_district",
  },
  udaipur: {
    overview:
      "Udaipur is the City of Lakes and a major Mewar history anchor. Pair it with lakes, palaces, Ahar-Banas culture, and Aravalli hills.",
    history:
      "Udaipur became the later capital of Mewar after the Chittorgarh period. It is important for palace architecture, lake systems, the Mewar royal tradition, and southern Rajasthan geography.",
    places: [
      placeFor("City Palace", "Mewar royal complex on Lake Pichola, useful for palace architecture and later-capital questions.", ["Palace", "Mewar"]),
      placeFor("Lake Pichola", "The easiest Udaipur lake anchor and the reason City of Lakes recall works quickly.", ["Lake", "City of Lakes"]),
      placeFor("Sajjangarh", "Monsoon Palace on the Aravalli edge, useful for hill, lake, and viewpoint memory.", ["Aravalli", "Palace"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Udaipur_district",
  },
  chittorgarh: {
    overview:
      "Chittorgarh is the strongest fort-memory district for Mewar. It is useful for questions on resistance, jauhar traditions, and medieval Rajasthan.",
    history:
      "Chittorgarh Fort is tied to Mewar's political and cultural identity. Beginners should connect it with Rana Kumbha, Maharana Pratap's legacy, fort architecture, and repeated sieges in medieval history.",
    places: [
      placeFor("Chittorgarh Fort", "Mewar's most important fort-memory site for sieges, resistance, and jauhar traditions.", ["Fort", "Mewar"]),
      placeFor("Vijay Stambh", "Rana Kumbha victory tower anchor inside the fort complex.", ["Monument", "Rana Kumbha"]),
      placeFor("Padmini Palace", "A common Chittorgarh recall point tied to local fort stories and medieval memory.", ["Palace", "Medieval"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Chittorgarh_district",
  },
  bikaner: {
    overview:
      "Bikaner is a north-western desert district. Link it with camel research, Junagarh Fort, canal agriculture, and the Thar landscape.",
    history:
      "Bikaner grew under the Rathore branch associated with Rao Bika. It is important for desert administration, forts, trade, camel culture, and later canal-linked agricultural transformation.",
    places: [
      placeFor("Junagarh Fort", "Bikaner's main fort anchor for desert-state administration and Rathore history.", ["Fort", "Rathore"]),
      placeFor("Camel Research Centre", "Pairs Bikaner with camel, desert livestock, and state-symbol style questions.", ["Camel", "Desert"]),
      placeFor("Karni Mata Temple", "Deshnoke temple memory hook that often appears in culture and tourism recall.", ["Temple", "Deshnoke"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Bikaner_district",
  },
  kota: {
    overview:
      "Kota is the Hadoti and Chambal anchor. Remember it through the Chambal river, Kota Doria, education hub identity, and black soil region.",
    history:
      "Kota developed as a major Hadoti centre. For exams, connect it with the Chambal project, Kota state, Kota paintings, Kota Doria textile, and south-eastern Rajasthan agriculture.",
    places: [
      placeFor("Garh Palace", "Kota state and Hadoti painting memory anchor near the old city.", ["Palace", "Hadoti"]),
      placeFor("Chambal River", "Kota's strongest geography clue through barrage, ravines, and south-eastern drainage.", ["River", "Chambal"]),
      placeFor("Kota Doria", "Textile craft clue that links Kota with economy and culture in mixed quizzes.", ["Textile", "Craft"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Kota_district",
  },
  bharatpur: {
    overview:
      "Bharatpur is the eastern gateway and the Keoladeo bird sanctuary anchor. It also connects with Lohagarh Fort and Braj-region memory.",
    history:
      "Bharatpur is remembered for the Jat kingdom, Lohagarh Fort, and Keoladeo Ghana National Park. It is important for culture, polity, ecology, and eastern Rajasthan map questions.",
    places: [
      placeFor("Keoladeo National Park", "Wetland and bird sanctuary anchor that makes Bharatpur a core ecology district.", ["Wetland", "Birds"]),
      placeFor("Lohagarh Fort", "Jat kingdom fort memory that keeps Bharatpur distinct from Mewar and Marwar forts.", ["Fort", "Jat kingdom"]),
      placeFor("Bharatpur Palace", "City palace anchor for eastern Rajasthan and Braj-region cultural recall.", ["Palace", "Braj"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Bharatpur_district",
  },
  "sawai-madhopur": {
    overview:
      "Sawai Madhopur is the Ranthambore anchor. It is a simple district to remember through tiger reserve, fort, and Banas-Chambal-side map practice.",
    history:
      "Ranthambore Fort and tiger reserve make Sawai Madhopur important for both history and geography. The district is also useful for eastern Rajasthan route and wildlife questions.",
    places: [
      placeFor("Ranthambore Fort", "Hill-fort anchor that joins Sawai Madhopur with medieval history and wildlife geography.", ["Fort", "Ranthambore"]),
      placeFor("Ranthambore National Park", "Tiger reserve clue for Sawai Madhopur and eastern Rajasthan conservation questions.", ["Wildlife", "Tiger reserve"]),
      placeFor("Trinetra Ganesh Temple", "Pilgrimage point inside the Ranthambore memory cluster.", ["Temple", "Pilgrimage"]),
    ],
    readMore: "https://en.wikipedia.org/wiki/Sawai_Madhopur_district",
  },
  ajmer: {
    overview:
      "Ajmer is an Ajmer-Merwara anchor. Pair it with Ajmer Sharif, Pushkar, Taragarh, and Luni-origin geography.",
    history:
      "Ajmer has medieval, religious, and colonial-era importance. It connects Chauhan memory, Ajmer Sharif, Pushkar pilgrimage, Taragarh Fort, and central Rajasthan administration.",
    places: [
      placeFor("Ajmer Sharif", "Religious and medieval-city anchor that makes Ajmer a high-frequency culture fact.", ["Dargah", "Pilgrimage"]),
      placeFor("Pushkar Lake", "Pilgrimage and fair memory hook, usually paired with Ajmer district.", ["Lake", "Fair"]),
      placeFor("Taragarh Fort", "Chauhan-era hill fort clue for Ajmer-Merwara and medieval Rajasthan.", ["Fort", "Chauhan"]),
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
    places: anchors.map((anchor) =>
      placeFor(
        anchor,
        `${anchor} is a quick recall anchor for ${district.name}. Pair it with ${district.region}, ${district.division} division, and the district's border clues while using the map.`,
        [district.region, district.division],
      ),
    ),
    readMore: `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(`${district.name} district Rajasthan`)}`,
  };
}

function placeFor(label, description, tags = []) {
  return {
    label,
    description,
    tags,
  };
}
