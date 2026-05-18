import { districts } from "../data/districts";
import { regions } from "../data/regions";
import { rivers } from "../data/rivers";
import { lakes } from "../data/lakes";
import { climateZones } from "../data/climate";
import { hillsAndMountains, irrigationProjects, wildlifeAreas } from "../data/geography";
import { soils } from "../data/soil";
import { economyLayers } from "../data/economy";
import { governanceCards } from "../data/politics";
import { ancientSites, medievalKingdoms, movementCards } from "../data/history";
import { cultureGallery } from "../data/culture";
import { introFacts } from "../data/introFacts";

export function buildSearchIndex() {
  const economyItems = Object.entries(economyLayers).flatMap(([scope, items]) =>
    items.map((item) => ({
      id: `economy-${item.id}`,
      title: item.name,
      type: scope,
      module: "Economy",
      description: item.memoryHook,
      path: "/economy",
      keywords: [scope, item.category, ...(item.districtIds || []), ...(item.crops || []), ...(item.minerals || [])],
    })),
  );

  return [
    ...introFacts.map((fact) => ({
      id: `intro-${fact.id}`,
      title: fact.title,
      type: fact.category,
      module: "Map",
      description: fact.summary,
      path: "/map",
      keywords: [fact.detail, fact.sourceStatus],
    })),
    ...districts.map((district) => ({
      id: `district-${district.id}`,
      title: district.name,
      type: "District",
      module: "Map",
      description: `${district.region} region, ${district.division} division. ${district.nickname}`,
      path: "/map",
      keywords: [
        district.region,
        district.division,
        district.importantCity,
        district.nickname,
        ...(district.famousFor || []),
      ],
    })),
    ...regions.map((region) => ({
      id: `region-${region.id}`,
      title: region.name,
      type: "Region",
      module: "Regions",
      description: region.description,
      path: "/regions",
      keywords: [...region.districts, ...region.importantCities, region.category],
    })),
    ...rivers.map((river) => ({
      id: `river-${river.id}`,
      title: river.name,
      type: "River",
      module: "Geography",
      description: river.memoryHook || river.description,
      path: "/geography",
      keywords: [river.origin, river.basin, ...(river.districtIds || [])],
    })),
    ...lakes.map((lake) => ({
      id: `lake-${lake.id}`,
      title: lake.name,
      type: "Lake",
      module: "Geography",
      description: lake.memoryHook || lake.description,
      path: "/geography",
      keywords: [lake.type, lake.nature, lake.district],
    })),
    ...soils.map((soil) => ({
      id: `soil-${soil.id}`,
      title: soil.name,
      type: "Soil",
      module: "Geography",
      description: soil.note,
      path: "/geography",
      keywords: [soil.region, ...(soil.districts || []), ...(soil.cropSuitability || [])],
    })),
    ...climateZones.map((zone) => ({
      id: `climate-${zone.id}`,
      title: zone.name,
      type: "Climate Zone",
      module: "Geography",
      description: zone.memoryHook,
      path: "/geography",
      keywords: [zone.region, zone.rainfall, zone.temperature, ...(zone.districts || [])],
    })),
    ...hillsAndMountains.map((hill) => ({
      id: `hill-${hill.id}`,
      title: hill.name,
      type: "Hill / Mountain",
      module: "Geography",
      description: hill.memoryHook,
      path: "/geography",
      keywords: [hill.range, hill.district, hill.elevation, ...(hill.districtIds || [])],
    })),
    ...wildlifeAreas.map((area) => ({
      id: `wildlife-${area.id}`,
      title: area.name,
      type: "Wildlife",
      module: "Geography",
      description: area.memoryHook,
      path: "/geography",
      keywords: [area.district, area.type, ...(area.species || []), ...(area.districtIds || [])],
    })),
    ...irrigationProjects.map((project) => ({
      id: `irrigation-${project.id}`,
      title: project.name,
      type: "Irrigation",
      module: "Geography",
      description: project.memoryHook,
      path: "/geography",
      keywords: [project.region, ...(project.linkedDistricts || []), ...(project.districtIds || [])],
    })),
    ...economyItems,
    ...governanceCards.map((card) => ({
      id: `politics-${card.id}`,
      title: card.title,
      type: card.category,
      module: "Politics",
      description: card.appointment,
      path: "/politics",
      keywords: [card.tenure, ...card.powers, ...card.importantFacts],
    })),
    ...ancientSites.map((site) => ({
      id: `history-${site.id}`,
      title: site.name,
      type: "Ancient Site",
      module: "History",
      description: site.memoryHook,
      path: "/history",
      keywords: [site.district, site.period, ...site.facts],
    })),
    ...medievalKingdoms.map((kingdom) => ({
      id: `history-${kingdom.id}`,
      title: kingdom.name,
      type: "Kingdom",
      module: "History",
      description: kingdom.anchor,
      path: "/history",
      keywords: [kingdom.dynasty, ...kingdom.districts, ...kingdom.facts],
    })),
    ...movementCards.map((movement) => ({
      id: `history-${movement.id}`,
      title: movement.title,
      type: movement.type,
      module: "History",
      description: movement.memoryHook,
      path: "/history",
      keywords: [movement.place, movement.cause, movement.outcome],
    })),
    ...cultureGallery.map((item) => ({
      id: `culture-${item.id}`,
      title: item.title,
      type: item.category,
      module: "Culture",
      description: item.memoryHook,
      path: "/culture",
      keywords: [item.district, item.visualCue, item.details],
    })),
  ];
}

export function searchAtlas(query, scope = "All") {
  const normalizedQuery = normalizeSearch(query);
  const index = buildSearchIndex();
  const scoped = scope === "All" ? index : index.filter((item) => item.module === scope);

  if (!normalizedQuery) return scoped.slice(0, 12);

  return scoped
    .map((item) => {
      const haystack = [
        item.title,
        item.type,
        item.module,
        item.description,
        ...(item.keywords || []),
      ]
        .filter(Boolean)
        .join(" ")
        .replace(/([a-z])([A-Z])/g, "$1 $2");

      return {
        ...item,
        score: scoreMatch(normalizeSearch(haystack), normalizedQuery, normalizeSearch(item.title)),
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 18);
}

function scoreMatch(haystack, query, title) {
  const terms = query.split(" ").filter(Boolean);
  if (title === query) return 4;
  if (title.includes(query)) return 3;
  if (haystack.includes(query)) return 2;
  return terms.filter((part) => part.length > 1 && haystack.includes(part)).length;
}

function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[-_/]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
