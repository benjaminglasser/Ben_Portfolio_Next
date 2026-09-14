/**
 * Aligns arbitrary content (images, videos, lists) to the same content
 * column used by the rail sections (starts at column 3 on md+, spans to
 * the edge). Keeps media flush with section text; only heroes go full-bleed.
 *
 * Pass a custom `spanClass` to change the width (e.g. leave an empty
 * column on the right).
 */
export default function Contained({
  children,
  className = "",
  spanClass = "md:col-start-3 md:col-span-10",
}) {
  return (
    <div className="grid-ed">
      <div className={`col-span-12 ${spanClass} ${className}`}>{children}</div>
    </div>
  );
}
