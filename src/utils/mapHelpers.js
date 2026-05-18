import { districts } from "../data/districts";
import { rivers } from "../data/rivers";
import { lakes } from "../data/lakes";
import { irrigationProjects, wildlifeAreas } from "../data/geography";
import { ancientSites } from "../data/history";

export function getDistrictsByRegion(region) {
  if (!region) return [];
  const districtIds = new Set(region.districts || []);
  return districts.filter((district) => districtIds.has(district.id));
}

export function getDistrictsByDivision(divisionName) {
  return districts.filter((district) => district.division === divisionName);
}

export function districtMatchesQuery(district, query) {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return true;

  const haystack = normalizeSearch([
    district.name,
    district.id,
    district.division,
    district.region,
    district.nickname,
    district.administrativeStatus,
    district.area,
    district.importantCity,
    district.ancientName,
    district.borderInfo,
    ...(district.famousFor || []),
    ...getDistrictRelatedKeywords(district.id),
  ].join(" "));

  return terms.every((term) => haystack.includes(term));
}

export function buildMapSearchResults(query) {
  if (!query) return districts;
  return districts.filter((district) => districtMatchesQuery(district, query));
}

function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[-_/]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDistrictRelatedKeywords(districtId) {
  return [
    ...keywordsFromDistrictLinkedItems(rivers, districtId, ["name", "basin", "origin", "flow"]),
    ...keywordsFromDistrictLinkedItems(lakes, districtId, ["name", "type", "nature", "district"]),
    ...keywordsFromDistrictLinkedItems(wildlifeAreas, districtId, ["name", "type", "district"]),
    ...keywordsFromDistrictLinkedItems(irrigationProjects, districtId, ["name", "region"]),
    ...ancientSites
      .filter((site) => site.districtId === districtId)
      .flatMap((site) => [site.name, site.period, site.memoryHook, ...(site.facts || [])]),
  ];
}

function keywordsFromDistrictLinkedItems(items, districtId, fields) {
  return items
    .filter((item) => (item.districtIds || item.districts || []).includes(districtId))
    .flatMap((item) => [
      ...fields.map((field) => item[field]),
      ...(item.tributaries || []),
      ...(item.species || []),
      ...(item.linkedDistricts || []),
    ])
    .filter(Boolean);
}
