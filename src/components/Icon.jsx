/**
 * Line icons, drawn on a 24×24 grid with a 1.5 stroke so they sit at the same
 * optical weight as the body text. Every icon inherits `currentColor`.
 */
const PATHS = {
  // Services
  terrain: <path d="m2 19 6-9 4 5.5L16 9l6 10H2Z M8.5 10.5 11 7" />,
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 11 6c3-2 8-2 10-2 0 2 0 7-2 10a7 7 0 0 1-8 6Z" />
      <path d="M4 21c1-6 5-10 9-12" />
    </>
  ),
  contour: (
    <>
      <path d="M2 17c3-4 7-4 10 0s7 4 10 0" />
      <path d="M2 12c3-4 7-4 10 0s7 4 10 0" />
      <path d="M2 7c3-4 7-4 10 0s7 4 10 0" />
    </>
  ),
  mesh: (
    <>
      <path d="m12 3 9 5.5v7L12 21l-9-5.5v-7L12 3Z" />
      <path d="M3 8.5 12 14l9-5.5M12 14v7" />
    </>
  ),
  thermal: (
    <>
      <path d="M11 14.8V5a2 2 0 1 1 4 0v9.8a4.5 4.5 0 1 1-4 0Z" />
      <path d="M13 17.5v-4" />
    </>
  ),
  satellite: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a10 10 0 0 1 10 10M12 6a6 6 0 0 1 6 6" />
      <path d="m5 19 3-3M3 21l1.5-1.5" />
    </>
  ),
  process: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 9h4M7 13h7M16 8l2 2-2 2" />
    </>
  ),

  // Deliverables
  map: (
    <>
      <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  cloud: (
    <>
      <circle cx="7" cy="8" r="1" />
      <circle cx="13" cy="5" r="1" />
      <circle cx="18" cy="9" r="1" />
      <circle cx="5" cy="15" r="1" />
      <circle cx="11" cy="12" r="1" />
      <circle cx="17" cy="16" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="21" r="1" />
    </>
  ),
  cube: (
    <>
      <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
      <path d="m3 7 9 5 9-5M12 12v10" />
    </>
  ),
  report: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  print: (
    <>
      <path d="M6 9V3h12v6" />
      <rect x="3" y="9" width="18" height="7" rx="2" />
      <path d="M6 14h12v7H6z" />
    </>
  ),

  // UI
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m4 12 5 5L20 6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  phone: (
    <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4V3Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  drone: (
    <>
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
      <path d="M9 9 5 5M15 9l4-4M9 15l-4 4M15 15l4 4" />
      <circle cx="4" cy="4" r="2" />
      <circle cx="20" cy="4" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="20" cy="20" r="2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7" />
    </>
  ),
}

export default function Icon({ name, size = 22, className = '', strokeWidth = 1.5 }) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {path}
    </svg>
  )
}
