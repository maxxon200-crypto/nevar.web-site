type IconProps = { className?: string };

export function IconAscolto({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 28 V36" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M24 22.7 V41.3" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M32 16 V48" stroke="#009EC9" strokeWidth={2.3} />
      <path d="M40 22.7 V41.3" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M48 28 V36" stroke="#2779A7" strokeWidth={2.3} />
    </svg>
  );
}

export function IconDesign({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <g transform="translate(14 13) rotate(-30)">
        <path d="M0 0 C-4.5 5, -5 10, -4.5 15 L4.5 15 C5 10, 4.5 5, 0 0 Z" stroke="#2779A7" strokeWidth={2.3} />
        <rect x="-5.5" y="15" width="11" height="6" rx="1.5" stroke="#2779A7" strokeWidth={2.3} />
        <path d="M-5.5 18 L5.5 18" stroke="#2779A7" strokeWidth={2.3} />
        <path d="M-4 21 L4 21 L1.6 46 C1.6 48.5, -1.6 48.5, -1.6 46 Z" stroke="#2779A7" strokeWidth={2.3} />
      </g>
      <circle cx="45" cy="31" r="15.5" stroke="#2779A7" strokeWidth={2.3} />
      <circle cx="35" cy="38" r="3" stroke="#2779A7" strokeWidth={2.3} />
      <circle cx="46" cy="23" r="2.7" fill="#009EC9" />
      <circle cx="54" cy="32" r="2.7" fill="#2779A7" />
      <circle cx="47" cy="40" r="2.9" fill="#009EC9" />
    </svg>
  );
}

export function IconSviluppo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M32 14.7 L49.3 24 L32 33.3 L14.7 24 Z" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M14.7 32 L32 41.3 L49.3 32" stroke="#009EC9" strokeWidth={2.3} />
      <path d="M14.7 40 L32 49.3 L49.3 40" stroke="#2779A7" strokeWidth={2.3} />
    </svg>
  );
}

export function IconLancio({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 32 L49.3 16 L38.7 48 L30.7 36 Z" stroke="#2779A7" strokeWidth={2.3} />
      <path d="M30.7 36 L49.3 16" stroke="#009EC9" strokeWidth={2.3} />
    </svg>
  );
}
