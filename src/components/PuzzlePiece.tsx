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
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const PATHS: Record<PuzzleShape, string> = {
  // Flat top/left; tabs on right + bottom
  "top-left":
    "M 0,0 H 0.82 V 0.35 C 0.82,0.35 1,0.38 1,0.5 C 1,0.62 0.82,0.65 0.82,0.65 V 0.82 H 0.65 C 0.65,0.82 0.62,1 0.5,1 C 0.38,1 0.35,0.82 0.35,0.82 H 0 Z",
  // Flat top/right; socket on left; tab on bottom
  "top-right":
    "M 0,0 H 1 V 0.82 H 0.65 C 0.65,0.82 0.62,1 0.5,1 C 0.38,1 0.35,0.82 0.35,0.82 H 0 V 0.65 C 0,0.65 0.18,0.62 0.18,0.5 C 0.18,0.38 0,0.35 0,0.35 Z",
  // Flat bottom/left; socket on top; tab on right
  "bottom-left":
    "M 0,0 H 0.35 C 0.35,0 0.38,0.18 0.5,0.18 C 0.62,0.18 0.65,0 0.65,0 H 0.82 V 0.35 C 0.82,0.35 1,0.38 1,0.5 C 1,0.62 0.82,0.65 0.82,0.65 V 1 H 0 Z",
  // Flat bottom/right; sockets on top + left
  "bottom-right":
    "M 0,0 H 0.35 C 0.35,0 0.38,0.18 0.5,0.18 C 0.62,0.18 0.65,0 0.65,0 H 1 V 1 H 0 V 0.65 C 0,0.65 0.18,0.62 0.18,0.5 C 0.18,0.38 0,0.35 0,0.35 Z",
};

export default function PuzzlePiece({
  shape,
  label,
  color = "#1e3a5f",
  disabled = false,
  onClick,
  className = "",
  children,
}: PuzzlePieceProps) {
  const rawId = useId();
  const clipId = `puzzle-clip-${shape}-${rawId.replace(/:/g, "")}`;
  const path = PATHS[shape];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={disabled ? `${label} (coming soon)` : `Go to ${label}`}
      className={[
        "puzzle-piece relative w-full h-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        disabled
          ? "cursor-default"
          : "cursor-pointer hover:brightness-110 active:scale-[0.98] transition-[filter,transform] duration-200",
        className,
      ].join(" ")}
    >
      <svg
        className="absolute w-0 h-0 overflow-hidden"
        aria-hidden
        focusable="false"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>

      <span
        className={[
          "absolute inset-0 flex items-center justify-center",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]",
          disabled ? "opacity-70" : "",
        ].join(" ")}
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          backgroundColor: color,
        }}
      >
        <span
          className={[
            "relative z-10 px-3 text-center font-semibold tracking-wide",
            "text-sm sm:text-base md:text-lg drop-shadow-sm select-none",
            disabled ? "text-white/60" : "text-white",
          ].join(" ")}
        >
          {children ?? label}
        </span>
      </span>
    </button>
  );
}
