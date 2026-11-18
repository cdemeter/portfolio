import React from "react";

/**
 * Pixel-faithful recreation of the authentic SGI IRIX "dumpster" Icon.
 * Short end facing front-left, long side receding right, SGI teal interior,
 * front lid propped open, back lid closed, and side grooves.
 */
export function SgiDumpsterIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* --- CASTER WHEELS --- */}
      <rect x="42" y="74" width="4" height="6" rx="1" fill="#111" stroke="#000" strokeWidth="1" />
      <rect x="54" y="77" width="4" height="6" rx="1" fill="#111" stroke="#000" strokeWidth="1" />
      <rect x="74" y="65" width="4" height="5" rx="1" fill="#111" stroke="#000" strokeWidth="1" />

      {/* --- PROPPED OPEN FRONT/LEFT LID --- */}
      {/* Outer propped flap angled upward */}
      <polygon
        points="37,29 49,17 62,28 50,40"
        fill="#e5e7eb"
        stroke="#000"
        strokeWidth="1.8"
      />
      {/* Inner hinge bevel / lip */}
      <line x1="39" y1="28" x2="48" y2="19" stroke="#9ca3af" strokeWidth="1.2" />

      {/* --- DUMPSTER TOP OPENING --- */}
      {/* SGI Teal / Petrol Cyan Interior Cavity */}
      <polygon
        points="44,43 57,32 72,44 59,55"
        fill="#2c7885"
        stroke="#000"
        strokeWidth="1.8"
      />

      {/* --- CLOSED REAR/RIGHT LID --- */}
      <polygon
        points="57,32 69,21 84,33 72,44"
        fill="#d1d5db"
        stroke="#000"
        strokeWidth="1.8"
      />
      {/* Center divider rib on closed lid */}
      <line x1="63" y1="26" x2="78" y2="38" stroke="#9ca3af" strokeWidth="1.2" />

      {/* --- SHORT FRONT-LEFT FACE --- */}
      <polygon
        points="42,45 57,57 53,77 38,65"
        fill="#f3f4f6"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Forklift Pocket / Handle Sleeve on short face */}
      <rect
        x="43"
        y="55"
        width="6"
        height="8"
        fill="#e5e7eb"
        stroke="#000"
        strokeWidth="1.5"
      />
      <rect x="45" y="57" width="2.5" height="4" fill="#000" />

      {/* --- LONG RIGHT RECEDING SIDE PANEL --- */}
      <polygon
        points="57,57 84,34 78,54 53,77"
        fill="#e5e7eb"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Horizontal Stiffener Grooves along long side */}
      <line x1="56" y1="63" x2="80" y2="42" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="55" y1="65" x2="79" y2="44" stroke="#000" strokeWidth="1" />

      <line x1="55" y1="70" x2="78" y2="49" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="54" y1="72" x2="77" y2="51" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

/**
 * Authentic SGI IconSmith (.fti) 3D Vector Folder Icon
 * Isometric manila folder with cyan/blue accent sheet
 */
export function SgiFolderIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="32" cy="54" rx="22" ry="4" fill="rgba(0,0,0,0.35)" />

      {/* Back Folder Flap & Tab */}
      <path
        d="M10 24 L10 46 L50 46 L54 28 L30 28 L26 22 L14 22 Z"
        fill="#b89358"
        stroke="#7a5d30"
        strokeWidth="1.5"
      />

      {/* Inner Blue SGI Document Peeking Out */}
      <polygon
        points="16,18 42,18 46,38 20,38"
        fill="#1e5870"
        stroke="#123746"
        strokeWidth="1"
      />
      <line x1="22" y1="24" x2="36" y2="24" stroke="#4da1a9" strokeWidth="1.5" />
      <line x1="23" y1="28" x2="34" y2="28" stroke="#4da1a9" strokeWidth="1.5" />

      {/* Front Folder Pocket */}
      <polygon
        points="8,48 14,30 56,30 50,48"
        fill="#d2ac6c"
        stroke="#8b6c3a"
        strokeWidth="1.5"
      />
      <line x1="14" y1="30" x2="56" y2="30" stroke="#f1d096" strokeWidth="1.5" />
    </svg>
  );
}
