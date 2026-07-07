/**
 * Text wordmark: nevar in ink, .web in teal, rendered in the wide display face.
 * This is the live logo. A graphic version can be dropped at /public/logo.svg
 * and swapped in with a single line (see DESIGN.md) without touching layout.
 */
export default function Logo({
  className = "",
  size = "text-[1.35rem]",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={`font-display inline-flex items-baseline leading-none ${size} ${className}`}
      style={{ fontVariationSettings: '"wght" 620, "wdth" 112' }}
    >
      nevar<span className="text-teal-text">.web</span>
    </span>
  );
}
