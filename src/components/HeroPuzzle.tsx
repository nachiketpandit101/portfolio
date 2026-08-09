"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import PuzzlePiece, { PuzzleShape } from "./PuzzlePiece";

type PuzzleLink = {
  id: string;
  label: string;
  shape: PuzzleShape;
  gradient: string;
  sectionId?: string;
  disabled?: boolean;
  /** Initial scatter offset for the snap-in animation */
  from: { x: number; y: number; rotate: number };
  /** CSS placement within the overlapping 2×2 */
  className: string;
};

const PIECES: PuzzleLink[] = [
  {
    id: "projects",
    label: "Projects",
    shape: "top-left",
    // Periwinkle → cyan (matches puzzlepiece.png)
    gradient: "linear-gradient(135deg, #5B7CFF 0%, #6EE3FF 100%)",
    sectionId: "projects-section",
    from: { x: -80, y: -60, rotate: -12 },
    className: "puzzle-slot puzzle-slot-tl",
  },
  {
    id: "about",
    label: "About",
    shape: "top-right",
    // Violet → soft sky
    gradient: "linear-gradient(135deg, #7B5CFF 0%, #8EB8FF 100%)",
    sectionId: "about-section",
    from: { x: 80, y: -60, rotate: 10 },
    className: "puzzle-slot puzzle-slot-tr",
  },
  {
    id: "contact",
    label: "Contact",
    shape: "bottom-left",
    // Teal → aqua
    gradient: "linear-gradient(135deg, #1FA8B8 0%, #6EF0D0 100%)",
    sectionId: "contact-section",
    from: { x: -80, y: 70, rotate: 8 },
    className: "puzzle-slot puzzle-slot-bl",
  },
  {
    id: "soon",
    label: "Coming Soon",
    shape: "bottom-right",
    // Soft indigo → muted cyan
    gradient: "linear-gradient(135deg, #4A6FA8 0%, #9BC4D8 100%)",
    disabled: true,
    from: { x: 80, y: 70, rotate: -8 },
    className: "puzzle-slot puzzle-slot-br",
  },
];

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const offset = 100;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

export default function HeroPuzzle() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="puzzle-board relative w-full max-w-md mx-auto aspect-square"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      aria-label="Site navigation puzzle"
    >
      {PIECES.map((piece) => {
        const pieceVariants = prefersReducedMotion
          ? {
              hidden: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
              show: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
            }
          : {
              hidden: {
                opacity: 0,
                x: piece.from.x,
                y: piece.from.y,
                rotate: piece.from.rotate,
                scale: 0.85,
              },
              show: {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 280,
                  damping: 18,
                  mass: 0.85,
                },
              },
            };

        return (
          <motion.div
            key={piece.id}
            className={piece.className}
            variants={pieceVariants}
          >
            <PuzzlePiece
              shape={piece.shape}
              label={piece.label}
              gradient={piece.gradient}
              disabled={piece.disabled}
              onClick={
                piece.sectionId
                  ? () => scrollToSection(piece.sectionId!)
                  : undefined
              }
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
