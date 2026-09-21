/**
 * The "RD" monogram. The cyan-to-green gradient is the brand's only accent,
 * so it is defined here once and referenced by id.
 *
 * `gradientId` is parameterised because the mark appears more than once per
 * page (navbar + footer) and duplicate SVG ids would collide.
 */
export default function Logo({ className = '', gradientId = 'rd-mark', withWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1FD9E8" />
            <stop offset="0.5" stopColor="#2ADCC2" />
            <stop offset="1" stopColor="#4CE38C" />
          </linearGradient>
        </defs>

        {/* Rounded container */}
        <rect x="1" y="1" width="38" height="38" rx="11" stroke={`url(#${gradientId})`} strokeWidth="2" />

        {/* R */}
        <path
          d="M11 28V12h6.2c2.6 0 4.3 1.6 4.3 4 0 1.9-1.1 3.3-2.8 3.8L22 28h-3.2l-2.9-7.6h-2v7.6H11Zm2.9-10.1h3c1.2 0 1.9-.7 1.9-1.8s-.7-1.8-1.9-1.8h-3v3.6Z"
          fill={`url(#${gradientId})`}
        />

        {/* D */}
        <path
          d="M24.4 28V12h4.8c4.3 0 7 3.1 7 8s-2.7 8-7 8h-4.8Zm2.9-2.6h1.8c2.6 0 4.1-2 4.1-5.4s-1.5-5.4-4.1-5.4h-1.8v10.8Z"
          fill={`url(#${gradientId})`}
        />
      </svg>

      {withWordmark && (
        <span className="font-display text-[1.06rem] font-semibold tracking-[-0.03em] text-chalk">
          Rapid Dawn
        </span>
      )}
    </span>
  )
}
