export function ToyArtwork({ type, className = "" }) {
  const views = {
    plane: (
      <>
        <rect x="18" y="42" width="92" height="26" rx="12" fill="#14213d" />
        <path d="M82 40 116 26l8 10-27 14Z" fill="#ef476f" />
        <path d="M38 38 64 18l8 10-22 16Z" fill="#118ab2" />
        <circle cx="42" cy="76" r="8" fill="#ffb703" />
        <circle cx="84" cy="76" r="8" fill="#ffb703" />
      </>
    ),
    excavator: (
      <>
        <rect x="24" y="56" width="66" height="18" rx="9" fill="#264653" />
        <rect x="54" y="36" width="22" height="24" rx="6" fill="#8ecae6" />
        <path d="M74 36 104 18l8 10-22 18" stroke="#ffb703" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M90 46 108 58" stroke="#ffb703" strokeWidth="8" strokeLinecap="round" />
        <path d="M104 58h12v12h-14" fill="#14213d" />
        <circle cx="42" cy="80" r="9" fill="#1d3557" />
        <circle cx="76" cy="80" r="9" fill="#1d3557" />
      </>
    ),
    dollhouse: (
      <>
        <rect x="30" y="24" width="64" height="66" rx="14" fill="#ff87ab" />
        <path d="M24 40 62 12l38 28" fill="#ff4f81" />
        <rect x="54" y="56" width="16" height="34" rx="6" fill="#ffe5ec" />
        <rect x="38" y="40" width="12" height="12" rx="4" fill="#ffe5ec" />
        <rect x="74" y="40" width="12" height="12" rx="4" fill="#ffe5ec" />
        <path d="M96 58h18l8 10-24 16z" fill="#6ec5ff" />
      </>
    ),
    doll: (
      <>
        <circle cx="64" cy="28" r="16" fill="#f2c6a0" />
        <path d="M48 34c4-12 22-20 32-6" fill="#c08497" />
        <path d="M48 54c8-8 24-8 32 0v34H48Z" fill="#1d3557" />
        <path d="M52 88h24" stroke="#ef476f" strokeWidth="8" strokeLinecap="round" />
        <path d="M48 56 36 74" stroke="#f2c6a0" strokeWidth="8" strokeLinecap="round" />
        <path d="M80 56 92 74" stroke="#f2c6a0" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    walker: (
      <>
        <rect x="30" y="26" width="54" height="50" rx="12" fill="#ff9f1c" />
        <rect x="42" y="36" width="30" height="8" rx="4" fill="#fff3b0" />
        <circle cx="44" cy="86" r="10" fill="#4cc9f0" />
        <circle cx="80" cy="86" r="10" fill="#4cc9f0" />
        <path d="M30 76 18 30" stroke="#7bd389" strokeWidth="8" strokeLinecap="round" />
        <path d="M84 76 96 30" stroke="#7bd389" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    doctor: (
      <>
        <circle cx="64" cy="26" r="16" fill="#f4d6b5" />
        <path d="M48 52h32v36H48z" fill="#ffc8dd" />
        <path d="M64 42v18" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <path d="M56 50h16" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <path d="M44 56 30 78" stroke="#f4d6b5" strokeWidth="8" strokeLinecap="round" />
        <path d="M84 56 98 78" stroke="#f4d6b5" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    bag: (
      <>
        <rect x="34" y="28" width="60" height="62" rx="14" fill="#bde0fe" />
        <path d="M48 30c0-10 8-16 16-16s16 6 16 16" stroke="#6ec5ff" strokeWidth="8" fill="none" />
        <circle cx="52" cy="54" r="8" fill="#ffffff" />
        <circle cx="76" cy="54" r="8" fill="#ffe5ec" />
        <path d="M44 74h40" stroke="#6ec5ff" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    blocks: (
      <>
        <rect x="26" y="54" width="24" height="30" rx="6" fill="#ff9f1c" />
        <rect x="50" y="44" width="24" height="40" rx="6" fill="#4cc9f0" />
        <rect x="74" y="58" width="24" height="26" rx="6" fill="#ef476f" />
        <circle cx="38" cy="48" r="4" fill="#ffd166" />
        <circle cx="62" cy="38" r="4" fill="#ffd166" />
        <circle cx="86" cy="52" r="4" fill="#ffd166" />
      </>
    ),
    cup: (
      <>
        <path d="M40 24h38c8 0 14 6 14 14v34c0 8-6 14-14 14H40c-8 0-14-6-14-14V38c0-8 6-14 14-14" fill="#3a86ff" />
        <path d="M92 42h10c8 0 14 6 14 14s-6 14-14 14H92" stroke="#ffb703" strokeWidth="8" fill="none" />
        <rect x="30" y="34" width="10" height="10" rx="3" fill="#ff9f1c" />
        <rect x="46" y="52" width="10" height="10" rx="3" fill="#7bd389" />
        <rect x="62" y="38" width="10" height="10" rx="3" fill="#ef476f" />
      </>
    ),
    bear: (
      <>
        <circle cx="46" cy="26" r="10" fill="#d9a066" />
        <circle cx="82" cy="26" r="10" fill="#d9a066" />
        <circle cx="64" cy="52" r="28" fill="#d9a066" />
        <circle cx="54" cy="46" r="3" fill="#1d3557" />
        <circle cx="74" cy="46" r="3" fill="#1d3557" />
        <circle cx="64" cy="58" r="8" fill="#f4d6b5" />
        <rect x="48" y="78" width="12" height="20" rx="6" fill="#d9a066" />
        <rect x="68" y="78" width="12" height="20" rx="6" fill="#d9a066" />
      </>
    ),
    truck: (
      <>
        <rect x="22" y="54" width="58" height="26" rx="8" fill="#2ecc71" />
        <rect x="74" y="46" width="22" height="34" rx="8" fill="#264653" />
        <path d="M46 54 64 24h16v20" stroke="#14213d" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="40" cy="86" r="10" fill="#1d3557" />
        <circle cx="78" cy="86" r="10" fill="#1d3557" />
      </>
    ),
    rocket: (
      <>
        <path d="M64 18c22 10 34 28 24 44L64 98 40 62C30 46 42 28 64 18Z" fill="#ef476f" />
        <circle cx="64" cy="50" r="10" fill="#ffffff" />
        <path d="M48 66 34 78l8-22" fill="#ffb703" />
        <path d="M80 66 94 78l-8-22" fill="#ffb703" />
        <path d="M56 94h16l-8 18Z" fill="#ff9f1c" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`toy-artwork ${className}`}
      viewBox="0 0 128 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="6" width="116" height="100" rx="28" fill="rgba(255,255,255,0.18)" />
      {views[type] || views.blocks}
    </svg>
  );
}
