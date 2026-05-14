import { districts } from "../../data/districts";
import SvgDistrictMap from "./SvgDistrictMap";

export default function RajasthanMap({
  selectedDistrictId,
  onSelectDistrict,
  selectedRegion,
  visibleDistricts = districts,
  className = "",
}) {
  const highlightedDistrictIds = selectedRegion?.districts || [];
  const regionFillMap = selectedRegion
    ? Object.fromEntries(selectedRegion.districts.map((id) => [id, selectedRegion.color]))
    : {};
  const emphasizedDistrictIds = selectedRegion
    ? highlightedDistrictIds
    : selectedDistrictId
      ? [selectedDistrictId]
      : [];

  return (
    <SvgDistrictMap
      selectedDistrictId={selectedDistrictId}
      visibleDistricts={visibleDistricts}
      highlightedDistrictIds={highlightedDistrictIds}
      emphasizedDistrictIds={emphasizedDistrictIds}
      districtFillMap={regionFillMap}
      onSelectDistrict={onSelectDistrict}
      className={className}
    />
  );
}
