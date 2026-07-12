/**
 * The one primary action of the site, repeated: a dark pill with a circled
 * arrow that rotates -45deg on hover (see .btn-primary in globals.css).
 */
export default function Cta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`btn-primary ${className}`}>
      <span>{children}</span>
      <span className="circ" aria-hidden>
        &#8594;
      </span>
    </a>
  );
}
