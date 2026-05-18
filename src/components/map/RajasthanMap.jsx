import { districts } from "../../data/districts";
import SvgDistrictMap from "./SvgDistrictMap";

export default function RajasthanMap({
  selectedDistrictId,
  onSelectDistrict,
  selectedRegion,
  visibleDistricts = districts,
  districtFillMap,
  highlightedDistrictIds: customHighlightedDistrictIds,
  emphasizedDistrictIds: customEmphasizedDistrictIds,
  lineFeatures = [],
  className = "",
}) {
  const highlightedDistrictIds = customHighlightedDistrictIds || selectedRegion?.districts || [];
  const regionFillMap = selectedRegion
    ? Object.fromEntries(selectedRegion.districts.map((id) => [id, selectedRegion.color]))
    : {};
  const emphasizedDistrictIds =
    customEmphasizedDistrictIds ||
    (selectedRegion
      ? highlightedDistrictIds
      : selectedDistrictId
        ? [selectedDistrictId]
        : []);
  const fillMap =
    districtFillMap && Object.keys(districtFillMap).length ? districtFillMap : regionFillMap;

  return (
    <SvgDistrictMap
      selectedDistrictId={selectedDistrictId}
      visibleDistricts={visibleDistricts}
      highlightedDistrictIds={highlightedDistrictIds}
      emphasizedDistrictIds={emphasizedDistrictIds}
      districtFillMap={fillMap}
      lineFeatures={lineFeatures}
      onSelectDistrict={onSelectDistrict}
      className={className}
    />
  );
}
