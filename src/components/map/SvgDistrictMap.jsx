import { useEffect, useRef, useState } from "react";
import rajasthanSvg from "../../assets/maps/rajasthan-districts.svg?raw";
import { districts } from "../../data/districts";

const SELECTED_FILL = "#dbeafe";
const CORRECT_FILL = "#22c55e";
const INCORRECT_FILL = "#ef4444";
const DEFAULT_FILL = "#f8fafc";
const HIGHLIGHT_FILL = "#e5e7eb";

const districtAliases = {
  "sri-ganganagar": ["Ganganagar", "Sri Ganganagar"],
  "deedwana-kuchaman": ["Deedwana- Kuchaman", "Deedwana-Kuchaman"],
  "kotputli-behror": ["Kotputli- Behror", "Kotputli-Behror"],
  "khairthal-tijara": ["Khairthal- Tijara", "Khairthal-Tijara"],
};

export default function SvgDistrictMap({
  selectedDistrictId,
  visibleDistricts = districts,
  highlightedDistrictIds = [],
  emphasizedDistrictIds = [],
  districtFillMap = {},
  feedbackMap = {},
  lineFeatures = [],
  onSelectDistrict,
  ariaLabel = "Interactive Rajasthan district SVG map",
  showAttribution = true,
  className = "",
}) {
  const wrapperRef = useRef(null);
  const districtPathRef = useRef(new Map());
  const [hoveredDistrictId, setHoveredDistrictId] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const wrapper = wrapperRef.current;
      const svg = wrapper?.querySelector("svg");
      if (!svg) return;

      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", ariaLabel);
      svg.style.width = "100%";
      svg.style.height = "auto";
      svg.style.display = "block";

      const paths = Array.from(svg.children).filter(
        (node) => node.tagName?.toLowerCase() === "path",
      );
      const texts = Array.from(svg.querySelectorAll("text"));

      if (!districtPathRef.current.size) {
        districtPathRef.current = mapDistrictLabelsToPaths(paths, texts);
      }

      const districtPathSet = new Set([...districtPathRef.current.values()].flat());

      paths.forEach((path) => {
        const isDistrictPath = districtPathSet.has(path);
        path.style.fill = isDistrictPath ? DEFAULT_FILL : "none";
        path.style.fillOpacity = "1";
        path.style.stroke = "#111827";
        path.style.strokeWidth = isDistrictPath ? "0.16" : "0.12";
        path.style.vectorEffect = "non-scaling-stroke";
        path.style.cursor = "default";
        path.style.outline = "none";
        path.style.pointerEvents = isDistrictPath ? "auto" : "none";
        path.style.opacity = isDistrictPath ? "1" : "0.36";
        path.removeAttribute("filter");
        path.removeAttribute("tabindex");
        path.removeAttribute("role");
        path.removeAttribute("aria-label");
        path.onclick = null;
        path.onmouseenter = null;
        path.onmouseleave = null;
        path.onkeydown = null;
      });

      texts.forEach((text) => {
        text.style.fill = "#111827";
        text.style.fontWeight = "700";
        text.style.pointerEvents = "none";
        text.style.paintOrder = "stroke";
        text.style.stroke = "#ffffff";
        text.style.strokeWidth = "0.55";
      });

      const visibleIds = new Set(visibleDistricts.map((district) => district.id));
      const highlightIds = new Set(highlightedDistrictIds);
      const emphasisIds = new Set(emphasizedDistrictIds);

      districts.forEach((district) => {
        const districtPaths = districtPathRef.current.get(district.id) || [];
        if (!districtPaths.length) return;

        const isVisible = visibleIds.has(district.id);
        const feedback = feedbackMap[district.id];
        const isSelected = selectedDistrictId === district.id;
        const isEmphasized = isSelected || emphasisIds.has(district.id);
        const isHovered = hoveredDistrictId === district.id;
        const layerFill = districtFillMap[district.id];
        const hasLayerFill = Boolean(layerFill);
        const fill =
          feedback === "correct"
            ? CORRECT_FILL
            : feedback === "incorrect"
              ? INCORRECT_FILL
              : layerFill
                ? layerFill
                : isSelected
                  ? SELECTED_FILL
                  : highlightIds.has(district.id)
                    ? HIGHLIGHT_FILL
                    : DEFAULT_FILL;

        districtPaths.forEach((path, pathIndex) => {
          path.dataset.districtId = district.id;
          path.style.fill = fill;
          path.style.fillOpacity = hasLayerFill ? (isEmphasized ? "0.72" : "0.42") : "1";
          path.style.opacity = isVisible ? "1" : "0.12";
          path.style.stroke =
            isEmphasized || feedback ? "#102a56" : isHovered ? "#1c5fc4" : "#64748b";
          path.style.strokeWidth = isEmphasized || feedback ? "0.62" : isHovered ? "0.38" : "0.16";
          path.style.transition = "fill-opacity 180ms ease, stroke-width 180ms ease, stroke 180ms ease";
          path.style.animation = "none";
          path.style.filter = isEmphasized ? "drop-shadow(0 0 2px rgba(16, 42, 86, 0.32))" : "none";
          path.style.cursor = isVisible ? "pointer" : "default";

          if (isVisible) {
            path.setAttribute("tabindex", pathIndex === 0 ? "0" : "-1");
            path.setAttribute("role", "button");
            path.setAttribute("aria-label", `Select ${district.name}`);
            path.onclick = () => onSelectDistrict?.(district);
            path.onmouseenter = () => setHoveredDistrictId(district.id);
            path.onmouseleave = () => setHoveredDistrictId("");
            path.onkeydown = (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectDistrict?.(district);
              }
            };
          }
        });
      });

      renderLineFeatures(svg, lineFeatures);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [
    ariaLabel,
    districtFillMap,
    feedbackMap,
    highlightedDistrictIds,
    hoveredDistrictId,
    lineFeatures,
    onSelectDistrict,
    emphasizedDistrictIds,
    selectedDistrictId,
    visibleDistricts,
  ]);

  return (
    <div
      className={[
        "map-grid relative overflow-hidden rounded-lg border border-desert-200 bg-white p-2 shadow-insetSoft",
        className,
      ].join(" ")}
    >
      <div
        ref={wrapperRef}
        className="inline-rajasthan-svg"
        dangerouslySetInnerHTML={{ __html: rajasthanSvg }}
      />

      <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm">
        Interactive SVG district map
      </div>
      {showAttribution ? (
        <a
          href="https://commons.wikimedia.org/wiki/File:Rajasthan_districts_map.svg"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-3 py-2 text-[11px] font-semibold text-gray-700 shadow-sm transition hover:text-royal-800"
        >
          Map: Wikimedia Commons, CC BY-SA 4.0
        </a>
      ) : null}
    </div>
  );
}

function mapDistrictLabelsToPaths(paths, texts) {
  const mapping = new Map();
  const textRecords = texts
    .map((text) => ({
      node: text,
      label: normalizeLabel(text.textContent),
      rect: text.getBoundingClientRect(),
      points: getTextProbePoints(text),
    }))
    .filter((record) => record.label);
  const districtTextRecords = districts
    .map((district) => {
      const aliases = (districtAliases[district.id] || [district.name]).map(normalizeLabel);
      const labelRecord = textRecords.find((record) => aliases.includes(record.label));
      return labelRecord
        ? {
            district,
            labelRecord,
            center: rectCenter(labelRecord.rect),
            points: labelRecord.points,
          }
        : null;
    })
    .filter(Boolean);
  const pathRecords = paths
    .map((path) => ({
      node: path,
      rect: path.getBoundingClientRect(),
      fill: getOriginalFill(path),
    }))
    .filter(
      (record) =>
        record.rect.width > 2 &&
        record.rect.height > 2 &&
        record.fill &&
        record.fill !== "none",
    );

  districtTextRecords.forEach(({ district }) => {
    mapping.set(district.id, []);
  });

  pathRecords.forEach((pathRecord) => {
    const bestMatch = districtTextRecords
      .map((districtRecord) => getPathLabelMatch(pathRecord, districtRecord))
      .filter(Boolean)
      .sort(comparePathLabelMatches)[0];
    const bestLabel = bestMatch?.districtRecord;

    if (bestLabel) {
      mapping.get(bestLabel.district.id)?.push(pathRecord.node);
    }
  });

  return mapping;
}

function getOriginalFill(path) {
  const style = path.getAttribute("style") || "";
  const match = style.match(/(?:^|;)fill:([^;]+)/);
  return match?.[1]?.trim();
}

function renderLineFeatures(svg, lineFeatures) {
  const namespace = "http://www.w3.org/2000/svg";
  svg.querySelector("[data-dynamic-map-layer='true']")?.remove();

  if (!lineFeatures.length) return;

  const layer = document.createElementNS(namespace, "g");
  layer.setAttribute("data-dynamic-map-layer", "true");
  const viewBox = svg.viewBox?.baseVal;
  if (viewBox?.width && viewBox?.height) {
    layer.setAttribute("transform", `scale(${viewBox.width / 100} ${viewBox.height / 100})`);
  }

  lineFeatures.forEach((feature) => {
    const isSelected = Boolean(feature.isSelected || feature.pulse);
    const strokeWidth = Number.parseFloat(feature.strokeWidth || "1.2");

    if (isSelected) {
      const casing = document.createElementNS(namespace, "path");
      casing.setAttribute("d", feature.path);
      casing.setAttribute("fill", "none");
      casing.setAttribute("stroke", "#ffffff");
      casing.setAttribute("stroke-width", String(strokeWidth + 1.2));
      casing.setAttribute("stroke-linecap", "round");
      casing.setAttribute("vector-effect", "non-scaling-stroke");
      casing.setAttribute("pointer-events", "none");
      casing.style.opacity = "0.92";
      layer.appendChild(casing);
    }

    const path = document.createElementNS(namespace, "path");
    path.setAttribute("d", feature.path);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", feature.color || "#111827");
    path.setAttribute("stroke-width", String(strokeWidth));
    path.setAttribute("stroke-opacity", isSelected ? "0.96" : "0.66");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("vector-effect", "non-scaling-stroke");
    path.style.cursor = feature.onSelect ? "pointer" : "default";
    path.style.outline = "none";
    path.style.animation = "none";
    path.style.filter = isSelected ? "drop-shadow(0 0 3px rgba(16, 42, 86, 0.32))" : "none";
    if (feature.onSelect) {
      path.setAttribute("role", "button");
      path.setAttribute("tabindex", "0");
      path.setAttribute("aria-label", feature.label || "Select map feature");
      path.onclick = feature.onSelect;
      path.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          feature.onSelect();
        }
      };
    }
    layer.appendChild(path);
  });

  const firstText = svg.querySelector("text");
  if (firstText) {
    svg.insertBefore(layer, firstText);
  } else {
    svg.appendChild(layer);
  }
}

function normalizeLabel(value) {
  return String(value || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function rectCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function rectContains(rect, point) {
  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
}

function getTextProbePoints(text) {
  const rect = text.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const points = [
    { x: centerX, y: centerY },
    { x: rect.left + rect.width * 0.25, y: centerY },
    { x: rect.left + rect.width * 0.75, y: centerY },
    { x: centerX, y: rect.top + rect.height * 0.35 },
    { x: centerX, y: rect.top + rect.height * 0.65 },
  ];
  const anchor = getTextAnchorPoint(text);

  if (anchor) {
    points.push(anchor);
  }

  return dedupePoints(points);
}

function getTextAnchorPoint(text) {
  const svg = text.ownerSVGElement;
  const matrix = text.getScreenCTM?.();
  const x = Number.parseFloat(text.getAttribute("x"));
  const y = Number.parseFloat(text.getAttribute("y"));

  if (!svg || !matrix || !Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }

  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;

  try {
    return point.matrixTransform(matrix);
  } catch {
    return null;
  }
}

function dedupePoints(points) {
  const seen = new Set();

  return points.filter((point) => {
    const key = `${Math.round(point.x * 10)}:${Math.round(point.y * 10)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getPathLabelMatch(pathRecord, districtRecord) {
  const matchingPoints = districtRecord.points.filter((point) =>
    pathContainsScreenPoint(pathRecord.node, pathRecord.rect, point),
  );

  if (!matchingPoints.length) return null;

  return {
    districtRecord,
    matchingPointCount: matchingPoints.length,
    centerInside: pathContainsScreenPoint(
      pathRecord.node,
      pathRecord.rect,
      districtRecord.center,
    ),
    distanceFromPathCenter: distance(districtRecord.center, rectCenter(pathRecord.rect)),
  };
}

function comparePathLabelMatches(a, b) {
  return (
    b.matchingPointCount - a.matchingPointCount ||
    Number(b.centerInside) - Number(a.centerInside) ||
    a.distanceFromPathCenter - b.distanceFromPathCenter
  );
}

function pathContainsScreenPoint(path, rect, point) {
  if (!rectContains(rect, point)) return false;

  if (typeof path.isPointInFill !== "function") return true;

  const svg = path.ownerSVGElement;
  const matrix = path.getScreenCTM?.();

  if (!svg || !matrix) return false;

  const svgPoint = svg.createSVGPoint();
  svgPoint.x = point.x;
  svgPoint.y = point.y;

  try {
    const localPoint = svgPoint.matrixTransform(matrix.inverse());
    return path.isPointInFill(localPoint);
  } catch {
    return false;
  }
}

function rectArea(rect) {
  return rect.width * rect.height;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
