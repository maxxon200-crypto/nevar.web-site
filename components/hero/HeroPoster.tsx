/**
 * Static poster for the liquid-glass orb. Pure SVG, zero JS/GPU cost.
 * Shown on mobile / low-power / reduced-motion devices and as the loading
 * state while the WebGL canvas compiles. Cold white with a teal-aqua refraction.
 */
export default function HeroPoster({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Sfera in vetro liquido, riflessi blu-verde su bianco freddo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="orbBody" cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor="#eaf3f3" />
          <stop offset="62%" stopColor="#bfe6df" />
          <stop offset="82%" stopColor="#49c5b6" />
          <stop offset="100%" stopColor="#009ec9" />
        </radialGradient>
        <radialGradient id="orbInner" cx="62%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#2779a7" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#2779a7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#49c5b6" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#49c5b6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#49c5b6" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Cold ambient halo */}
      <circle cx="300" cy="300" r="290" fill="url(#ambient)" />

      {/* Soft contact shadow */}
      <ellipse
        cx="300"
        cy="512"
        rx="180"
        ry="26"
        fill="#2779a7"
        opacity="0.16"
        filter="url(#soft)"
      />

      {/* Glass body */}
      <circle cx="300" cy="300" r="210" fill="url(#orbBody)" />
      <circle cx="300" cy="300" r="210" fill="url(#orbInner)" />

      {/* Frost rim */}
      <circle
        cx="300"
        cy="300"
        r="209"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <circle
        cx="300"
        cy="300"
        r="205"
        fill="none"
        stroke="#b6bac5"
        strokeOpacity="0.5"
        strokeWidth="1"
      />

      {/* Specular highlight, top-left */}
      <ellipse
        cx="232"
        cy="214"
        rx="86"
        ry="58"
        fill="url(#spec)"
        transform="rotate(-28 232 214)"
        filter="url(#soft)"
      />

      {/* Small crisp catchlight */}
      <circle cx="356" cy="360" r="10" fill="#ffffff" opacity="0.75" />
    </svg>
  );
}
