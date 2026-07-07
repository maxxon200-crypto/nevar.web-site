type IconProps = { className?: string };

// Sviluppo Web - globo
export function IconWeb({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="32" cy="32" r="16" stroke="#2779A7" strokeWidth={2.3} />
      <ellipse cx="32" cy="32" rx="7" ry="16" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M16 32 H48" stroke="#009EC9" strokeWidth={2.3} />
      <path d="M20 23 H44" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M20 41 H44" stroke="#2779A7" strokeWidth={2.3} />
    </svg>
  );
}

// Sviluppo App - griglia app
export function IconApp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="18" y="18" width="12" height="12" rx="3" stroke="#2779A7" strokeWidth={2.3} />
      <rect x="34" y="18" width="12" height="12" rx="3" stroke="#009EC9" strokeWidth={2.3} />
      <rect x="18" y="34" width="12" height="12" rx="3" stroke="#2779A7" strokeWidth={2.3} />
      <rect x="34" y="34" width="12" height="12" rx="3" stroke="#2779A7" strokeWidth={2.3} />
    </svg>
  );
}

// Nevar Care - scudo
export function IconCare({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M32 11 L48 17 V31 C48 41 41 47 32 50 C23 47 16 41 16 31 V17 Z" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M25 31 L30 36 L39 26" stroke="#009EC9" strokeWidth={2.3} />
    </svg>
  );
}
