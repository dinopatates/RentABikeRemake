const paths = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  calendar: <><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M16 2.5v4M8 2.5v4M3 9.5h18" /></>,
  motorcycle: <><path d="M5 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM15 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" /><path d="M8 17h7l-2-6h3l2 3M10 11h3M8 11l-2 3h4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m7 9 5 5 5-5" />,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1.5v3A2.5 2.5 0 0 1 17 19C9.3 18.4 3.6 12.7 3 5a2.5 2.5 0 0 1 3.5-1.5Z" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  shield: <path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3Z" />,
  wallet: <><path d="M4 6.5h15a2 2 0 0 1 2 2v9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" /><path d="M16 13h5" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 6" /></>,
};

export default function Icon({ name, size = 22, strokeWidth = 1.8, className = "" }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
