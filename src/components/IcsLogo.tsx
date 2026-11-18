"use client";

import { useId } from "react";

interface IcsLogoProps {
  className?: string;
  size?: number;
}

/** Crisp vector rendition of the ICS Fire Systems shield, triple-flame, and brushed steel monogram. */
export default function IcsLogo({ className = "ics-logo-mark", size = 56 }: IcsLogoProps) {
  const uid = useId().replace(/:/g, "");
  const redGrad = `${uid}-red`;
  const flameGrad = `${uid}-flame`;
  const steelGrad = `${uid}-steel`;
  const letterSteel = `${uid}-letter`;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={redGrad} x1="12" y1="18" x2="58" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0262D" />
          <stop offset="52%" stopColor="#CC151C" />
          <stop offset="100%" stopColor="#8F1317" />
        </linearGradient>

        <linearGradient id={flameGrad} x1="46" y1="5" x2="76" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3B42" />
          <stop offset="55%" stopColor="#DC171E" />
          <stop offset="100%" stopColor="#991418" />
        </linearGradient>

        <linearGradient id={steelGrad} x1="60" y1="18" x2="108" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D7DEE6" />
          <stop offset="48%" stopColor="#9CA5B1" />
          <stop offset="100%" stopColor="#5D6671" />
        </linearGradient>

        <linearGradient id={letterSteel} x1="28" y1="38" x2="104" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F2F5F8" />
          <stop offset="42%" stopColor="#C3CBD4" />
          <stop offset="76%" stopColor="#9099A4" />
          <stop offset="100%" stopColor="#DDE3EA" />
        </linearGradient>
      </defs>

      {/* Left Shield Frame (Crimson Fire Red) */}
      <path
        d="M44 17.2 L15 28.5 L15 38.5 L22.5 38.5 L22.5 33.2 L42.5 24.8 Z"
        fill={`url(#${redGrad})`}
      />
      <path
        d="M19 72 C26.5 85.5 41 96.5 59.5 103.5 L59.5 95.8 C44.5 89.8 33 80.5 26.8 72 Z"
        fill={`url(#${redGrad})`}
      />

      {/* Right Shield Frame (Brushed Industrial Steel) */}
      <path
        d="M75 16 L106 28.5 L106 38.5 L98.5 38.5 L98.5 33.2 L76.5 23.6 Z"
        fill={`url(#${steelGrad})`}
        stroke="#4B5563"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M102 72 C94.5 85.5 80 96.5 61.5 103.5 L61.5 95.8 C76.5 89.8 88 80.5 94.2 72 Z"
        fill={`url(#${steelGrad})`}
        stroke="#4B5563"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />

      {/* Triple-Tongue Solid Flame Motif Centered Cleanly in Crest Gap */}
      <path
        d="M57.5 4.2 C52.8 11.5 44.5 19.8 46.8 29.8 C48.2 35.6 52.8 38.2 55.6 38.2 C53.2 33.8 54.4 27.6 58.6 22.8 C60.4 20.6 62.2 15.2 57.5 4.2 Z"
        fill={`url(#${flameGrad})`}
      />
      <path
        d="M67.2 14.5 C61.2 21.4 58.5 28.8 60.4 34.4 C61.4 37.2 63.6 38.2 65.4 38.2 C63.8 34.6 64.9 30.2 67.6 26.6 C69.2 24.4 70.2 19.6 67.2 14.5 Z"
        fill={`url(#${flameGrad})`}
      />
      <path
        d="M73.4 24.8 C69.5 29.5 68.5 34.2 69.8 37.2 C70.2 38.0 71.2 38.2 72.1 38.2 C74.4 35.2 75.2 29.5 73.4 24.8 Z"
        fill={`url(#${flameGrad})`}
      />

      {/* Bold Red "I" Monogram Bar */}
      <rect
        x="8.5"
        y="40.5"
        width="13.5"
        height="29.5"
        rx="1.6"
        fill={`url(#${redGrad})`}
      />
      <rect x="10.2" y="42.2" width="3.2" height="26.1" rx="0.8" fill="#FFFFFF" fillOpacity="0.2" />

      {/* Geometric Brushed Steel "C" */}
      <path
        d="M36.5 40.5 L68 40.5 L63.5 48.2 L39.2 48.2 C36.2 48.2 34.6 49.8 34.2 52.8 L33.4 57.8 C32.9 60.8 34.3 62.3 37.4 62.3 L63.8 62.3 L59.4 70 L33.5 70 C26.6 70 23.5 65.8 24.8 58.6 L26 51.8 C27.3 44.6 30.6 40.5 36.5 40.5 Z"
        fill={`url(#${letterSteel})`}
        stroke="#46505C"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />

      {/* Geometric Brushed Steel "S" */}
      <path
        d="M78.2 40.5 L109.2 40.5 L105.2 47.6 L80.5 47.6 C78.2 47.6 77.2 48.7 77 50.4 C76.8 52.2 77.9 53 80.2 53 L97.5 53 C104.2 53 107.2 56.6 106 62.2 C104.8 67.2 100.8 70 94.5 70 L62.8 70 L67.2 62.6 L93.2 62.6 C95.6 62.6 96.9 61.5 97.1 59.8 C97.3 58 96 57.3 93.6 57.3 L76.6 57.3 C70 57.3 67.4 53.6 68.5 48.2 C69.6 43.2 72.8 40.5 78.2 40.5 Z"
        fill={`url(#${letterSteel})`}
        stroke="#46505C"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
