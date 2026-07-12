/**
 * Text wordmark in the serif face, plain ink. No colored accent: the only
 * accent on the site is the slate italic inside titles.
 */
export default function Logo({
  className = "",
  size = "text-[1.45rem]",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span className={`font-serif leading-none text-ink ${size} ${className}`}>
      nevar.web
    </span>
  );
}
