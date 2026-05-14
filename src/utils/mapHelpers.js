import { districts } from "../data/districts";

export function getDistrictsByRegion(region) {
  if (!region) return [];
  const districtIds = new Set(region.districts || []);
  return districts.filter((district) => districtIds.has(district.id));
}

export function getDistrictsByDivision(divisionName) {
  return districts.filter((district) => district.division === divisionName);
}

export function districtMatchesQuery(district, query) {
  const value = query.toLowerCase();
  return [district.name, district.division, district.region, district.nickname]
    .join(" ")
    .toLowerCase()
    .includes(value);
}

export function buildMapSearchResults(query) {
  if (!query) return districts;
  return districts.filter((district) => districtMatchesQuery(district, query));
}
