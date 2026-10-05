// Project "type" system shared by work cards, the info legend, and the
// play page filter. Colors are non-text marks (dots, ticks), each ≥3:1
// against white and black.
export const TYPES = {
  spatial: { label: "Spatial", color: "#3d6fd6" },
  motion: { label: "Motion", color: "#2f9e6b" },
  physical: { label: "Physical", color: "#c8701a" },
  web: { label: "Web", color: "#8a8a8a" },
};

export const TYPE_ORDER = ["spatial", "motion", "physical", "web"];

export const TypeDot = ({ type, size = 7, className = "" }) => {
  const t = TYPES[type];
  if (!t) return null;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size, backgroundColor: t.color }}
    />
  );
};
