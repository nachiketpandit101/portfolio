"use client";

import { ReactNode, useId } from "react";

export type PuzzleShape =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type PuzzlePieceProps = {
  shape: PuzzleShape;
  label: string;
  gradient?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

/**
 * Classic jigsaw: narrow neck + round bulb (mushroom knob), not a parabola.
 * viewBox padded so tabs (~102) aren’t clipped; sockets mirror knobs.
 */
const PATHS: Record<PuzzleShape, string> = {
  // Outer top/left. Tabs right + bottom.
  "top-left": [
    "M 9,0",
    "H 80",
    "V 32",
    "C 80,32 86,28 93,34",
    "C 102,42 102,58 93,66",
    "C 86,72 80,68 80,68",
    "V 80",
    "H 68",
    "C 68,80 72,86 66,93",
    "C 58,102 42,102 34,93",
    "C 28,86 32,80 32,80",
    "H 9",
    "Q 0,80 0,71",
    "V 9",
    "Q 0,0 9,0",
    "Z",
  ].join(" "),

  // Outer top/right. Socket left (mirror of right knob). Tab bottom.
  "top-right": [
    "M 9,0",
    "H 91",
    "Q 100,0 100,9",
    "V 80",
    "H 68",
    "C 68,80 72,86 66,93",
    "C 58,102 42,102 34,93",
    "C 28,86 32,80 32,80",
    "H 0",
    "V 68",
    "C 0,68 6,72 13,66",
    "C 22,58 22,42 13,34",
    "C 6,28 0,32 0,32",
    "V 9",
    "Q 0,0 9,0",
    "Z",
  ].join(" "),

  // Outer bottom/left. Socket top (mirror of bottom knob). Tab right.
  "bottom-left": [
    "M 0,0",
    "H 32",
    "C 32,0 28,6 34,13",
    "C 42,22 58,22 66,13",
    "C 72,6 68,0 68,0",
    "H 80",
    "V 32",
    "C 80,32 86,28 93,34",
    "C 102,42 102,58 93,66",
    "C 86,72 80,68 80,68",
    "V 91",
    "Q 80,100 71,100",
    "H 9",
    "Q 0,100 0,91",
    "V 0",
    "Z",
  ].join(" "),

  // Outer bottom/right. Sockets top + left.
  "bottom-right": [
    "M 0,0",
    "H 32",
    "C 32,0 28,6 34,13",
    "C 42,22 58,22 66,13",
    "C 72,6 68,0 68,0",
    "H 91",
    "Q 100,0 100,9",
    "V 91",
    "Q 100,100 91,100",
    "H 0",
    "V 68",
    "C 0,68 6,72 13,66",
    "C 22,58 22,42 13,34",
    "C 6,28 0,32 0,32",
    "V 0",
    "Z",
  ].join(" "),
};

const LABEL_OFFSET: Record<PuzzleShape, string> = {
  "top-left": "translate(-8%, -8%)",
  "top-right": "translate(6%, -8%)",
  "bottom-left": "translate(-8%, 6%)",
  "bottom-right": "translate(6%, 6%)",
};

function parseGradientColors(gradient: string): [string, string] {
  const matches = gradient.match(/#[0-9A-Fa-f]{3,8}/g);
  if (matches && matches.length >= 2) return [matches[0], matches[1]];
  if (matches && matches.length === 1) return [matches[0], matches[0]];
  return ["#6B8AFF", "#72E5FF"];
}

export default function PuzzlePiece({
  shape,
  label,
  gradient = "linear-gradient(135deg, #6B8AFF 0%, #72E5FF 100%)",
  disabled = false,
  onClick,
  className = "",
  children,
}: PuzzlePieceProps) {
  const rawId = useId().replace(/:/g, "");
  const gradId = `pg-${rawId}`;
  const noiseId = `pn-${rawId}`;
  const fiberId = `pf-${rawId}`;
  const [c0, c1] = parseGradientColors(gradient);
  const path = PATHS[shape];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={disabled ? `${label} (coming soon)` : `Go to ${label}`}
      className={[
        "puzzle-piece relative w-full h-full overflow-visible",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        disabled
          ? "cursor-default"
          : "cursor-pointer hover:brightness-110 active:scale-[0.98] transition-[filter,transform] duration-200",
        className,
      ].join(" ")}
    >
      <svg
        className={[
          "absolute inset-0 h-full w-full overflow-visible",
          disabled ? "opacity-75" : "",
        ].join(" ")}
        viewBox="-4 -4 108 108"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c0} />
            <stop offset="100%" stopColor={c1} />
          </linearGradient>

          <filter
            id={noiseId}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.12
                      0 0 0 0 0.16
                      0 0 0 0 0.22
                      0 0 0 0.5 0"
              in="noise"
            />
          </filter>

          <pattern
            id={fiberId}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 7 L7 0 M-1 2 L2 -1 M5 8 L8 5"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="0.55"
              fill="none"
            />
            <circle cx="1.5" cy="4.5" r="0.4" fill="rgba(0,0,0,0.14)" />
            <circle cx="5" cy="2" r="0.3" fill="rgba(255,255,255,0.12)" />
          </pattern>
        </defs>

        <path d={path} fill={`url(#${gradId})`} />
        <path
          d={path}
          fill={`url(#${fiberId})`}
          style={{ mixBlendMode: "soft-light" }}
          opacity={0.9}
        />
        <path
          d={path}
          filter={`url(#${noiseId})`}
          style={{ mixBlendMode: "multiply" }}
          opacity={0.4}
        />
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.1}
        />
        <path
          d={path}
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth={1.8}
          opacity={0.45}
          transform="translate(0.5 0.7)"
        />
      </svg>

      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className={[
            "px-3 text-center font-semibold tracking-wide",
            "text-sm sm:text-base md:text-lg select-none",
            "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]",
            disabled ? "text-white/80" : "",
          ].join(" ")}
          style={{ transform: LABEL_OFFSET[shape] }}
        >
          {children ?? label}
        </span>
      </span>
    </button>
  );
}
