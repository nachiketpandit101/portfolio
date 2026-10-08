"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Transition,
} from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
  title?: string;
}

// Horizontal (desktop) viewBox: the wave runs along x, crests alternate in y.
const H_WIDTH = 1000;
const H_HEIGHT = 160;
const H_AMPLITUDE = 60;

// Vertical (mobile) viewBox: the wave runs along y, crests alternate in x.
const V_WIDTH = 64;
const V_HEIGHT = 1000;
const V_AMPLITUDE = 20;
const V_SLOT_PX = 200;

// Extra scroll distance (in viewport heights) per experience while the desktop timeline is pinned.
const PIN_VH_PER_ITEM = 50;

type Pt = { u: number; v: number };
type Segment = [Pt, Pt, Pt, Pt];

function cubicAt(s: Segment, t: number): Pt {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    u: a * s[0].u + b * s[1].u + c * s[2].u + d * s[3].u,
    v: a * s[0].v + b * s[1].v + c * s[2].v + d * s[3].v,
  };
}

function cubicLength(s: Segment, steps = 64) {
  let length = 0;
  let prev = s[0];
  for (let i = 1; i <= steps; i++) {
    const p = cubicAt(s, i / steps);
    length += Math.hypot(p.u - prev.u, p.v - prev.v);
    prev = p;
  }
  return length;
}

/**
 * Builds a wave along the `u` axis that passes through `count` evenly spaced
 * crests alternating around `mid`. Returns the crest points, an SVG path, and
 * the fraction of total path length at which each crest is reached.
 */
function buildWave(
  count: number,
  length: number,
  mid: number,
  amplitude: number,
  toXY: (p: Pt) => [number, number]
) {
  const step = length / count;
  const points: Pt[] = Array.from({ length: count }, (_, i) => ({
    u: step * (i + 0.5),
    v: mid + (i % 2 === 0 ? -amplitude : amplitude),
  }));

  const first = points[0];
  const last = points[count - 1];
  const segments: Segment[] = [
    [
      { u: 0, v: mid },
      { u: first.u / 2, v: (mid + first.v) / 2 },
      { u: first.u / 2, v: first.v },
      first,
    ],
  ];
  for (let i = 0; i < count - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const cu = (a.u + b.u) / 2;
    segments.push([a, { u: cu, v: a.v }, { u: cu, v: b.v }, b]);
  }
  const tailU = (last.u + length) / 2;
  segments.push([
    last,
    { u: tailU, v: last.v },
    { u: tailU, v: (mid + last.v) / 2 },
    { u: length, v: mid },
  ]);

  const fmt = (p: Pt) => toXY(p).join(" ");
  const d =
    `M ${fmt(segments[0][0])} ` +
    segments.map((s) => `C ${fmt(s[1])} ${fmt(s[2])} ${fmt(s[3])}`).join(" ");

  const lengths = segments.map((s) => cubicLength(s));
  const total = lengths.reduce((sum, l) => sum + l, 0);
  const thresholds: number[] = [];
  let acc = 0;
  for (let i = 0; i < count; i++) {
    acc += lengths[i];
    thresholds.push(acc / total);
  }

  return { points: points.map(toXY), d, thresholds };
}

const countReached = (thresholds: number[], progress: number) =>
  thresholds.filter((t) => progress >= t - 0.001).length;

export default function ExperienceTimeline({ experiences, title }: ExperienceTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [reachedH, setReachedH] = useState(0);
  const [reachedV, setReachedV] = useState(0);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const count = experiences.length;

  const horizontal = useMemo(
    () =>
      count > 0
        ? buildWave(count, H_WIDTH, H_HEIGHT / 2, H_AMPLITUDE, (p) => [p.u, p.v])
        : null,
    [count]
  );
  const vertical = useMemo(
    () =>
      count > 0
        ? buildWave(count, V_HEIGHT, V_WIDTH / 2, V_AMPLITUDE, (p) => [p.v, p.u])
        : null,
    [count]
  );

  // Desktop progress spans the pinned scroll track; mobile scrolls normally.
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 75%", "end 50%"],
  });
  const desktopPathLength = useTransform(desktopProgress, [0, 1], [0, 1]);
  const mobilePathLength = useTransform(mobileProgress, [0, 1], [0, 1]);

  useMotionValueEvent(desktopPathLength, "change", (progress) => {
    if (horizontal) setReachedH(countReached(horizontal.thresholds, progress));
  });
  useMotionValueEvent(mobilePathLength, "change", (progress) => {
    if (vertical) setReachedV(countReached(vertical.thresholds, progress));
  });

  if (!horizontal || !vertical) return null;

  const isReached = (index: number, reached: number) => reduceMotion || index < reached;

  const hoverProps = (index: number) => ({
    onMouseEnter: () => setHoveredIndex(index),
    onMouseLeave: () => setHoveredIndex(null),
  });

  const renderTitle = () =>
    title ? <h2 className="text-3xl font-bold text-white mb-8 text-center">{title}</h2> : null;

  const renderPaths = (d: string, pathLength: MotionValue<number>) => (
    <>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="text-gray-700"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="#72E6FF"
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{ pathLength: reduceMotion ? 1 : pathLength }}
      />
    </>
  );

  const renderNode = (index: number, x: number, y: number, width: number, height: number, reached: boolean) => (
    <span
      key={`node-${index}`}
      {...hoverProps(index)}
      className={`absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 border-2 transition-all duration-500 motion-reduce:transition-none ${
        reached
          ? "bg-[#72E6FF] border-[#72E6FF] shadow-[0_0_14px_4px_rgba(114,230,255,0.55)]"
          : "bg-gray-900 border-gray-700"
      }`}
      style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
    />
  );

  const renderCard = (experience: Experience, index: number) => {
    const hovered = hoveredIndex === index;
    return (
      <div
        className={`relative w-full md:w-72 overflow-hidden rounded-2xl border bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150 px-5 py-4 text-gray-200/90 transition-all duration-300 motion-reduce:transition-none ${
          hovered
            ? "scale-105 border-[#72E6FF]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(255,255,255,0.08),inset_0_0_24px_rgba(255,255,255,0.06),0_10px_40px_-8px_rgba(0,0,0,0.7),0_0_32px_-6px_rgba(114,230,255,0.45)]"
            : "border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_0_0_rgba(255,255,255,0.05),inset_0_0_20px_rgba(255,255,255,0.04),0_8px_32px_-8px_rgba(0,0,0,0.6)]"
        }`}
      >
        {/* Liquid glass layers: diagonal specular, curved lens reflection, rim highlight, cyan refraction tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-white/[0.02] to-transparent" />
        <div
          className={`pointer-events-none absolute -top-1/2 -left-1/4 h-full w-[150%] rounded-[50%] bg-gradient-to-b from-white/[0.12] to-transparent transition-transform duration-500 motion-reduce:transition-none ${
            hovered ? "translate-y-2" : ""
          }`}
        />
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div
          className={`pointer-events-none absolute -bottom-12 left-1/2 h-24 w-56 -translate-x-1/2 rounded-full bg-[#72E6FF]/20 blur-2xl transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-40"
          }`}
        />

        {/* Always visible content */}
        <div className="relative flex flex-col items-center text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#72E6FF]/80 mb-1.5">
            {experience.period}
          </p>
          <h3 className="text-lg font-semibold leading-snug">{experience.title}</h3>
        </div>

        {/* Hover content */}
        <div
          className={`relative transition-all duration-300 ${
            hovered ? "opacity-100 max-h-96 mt-4" : "opacity-0 max-h-0"
          } overflow-hidden`}
        >
          <div className="h-px mb-3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="flex items-center justify-center gap-2 text-sm font-medium text-gray-200/90 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#72E6FF] shadow-[0_0_6px_1px_rgba(114,230,255,0.6)]" />
            {experience.company}
          </p>
          <p className="text-gray-300 mb-3 text-sm leading-relaxed">{experience.description}</p>
          {experience.technologies.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2.5 py-0.5 rounded-full border border-white/15 bg-[#72E6FF]/10 text-[#72E6FF] text-[11px] tracking-wide shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const reveal = (reached: boolean, offset: { x?: number; y?: number }) => {
    const transition: Transition = reduceMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: "easeOut" };
    return {
      initial: false as const,
      animate: reached ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset },
      transition,
    };
  };

  return (
    <div className="relative w-full">
      {/* Desktop: horizontal wave, pinned while the scroll track draws it */}
      <div
        ref={desktopRef}
        className="relative hidden md:block"
        style={reduceMotion ? undefined : { height: `${100 + count * PIN_VH_PER_ITEM}vh` }}
      >
        <div
          className={
            reduceMotion
              ? ""
              : "sticky top-0 h-screen pt-16 flex flex-col justify-center"
          }
        >
          {renderTitle()}
          <AnimatePresence>
            {!reduceMotion && reachedH < count && (
              <motion.div
                key="scroll-hint"
                className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-gray-300/80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-hidden
              >
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1.5"
                >
                  <span className="w-1 h-1.5 rounded-full bg-[#72E6FF]/80" />
                </motion.div>
                <span>Scroll to follow the timeline</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[#72E6FF]"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative h-[480px]">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40">
              <svg
                viewBox={`0 0 ${H_WIDTH} ${H_HEIGHT}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full overflow-visible"
                aria-hidden
              >
                {renderPaths(horizontal.d, desktopPathLength)}
              </svg>

              {experiences.map((experience, index) => {
                const [x, y] = horizontal.points[index];
                const reached = isReached(index, reachedH);
                const isUpper = index % 2 === 0;
                return (
                  <div key={index}>
                    {renderNode(index, x, y, H_WIDTH, H_HEIGHT, reached)}
                    <div
                      {...hoverProps(index)}
                      className={`absolute -translate-x-1/2 ${isUpper ? "-translate-y-full" : ""} ${
                        hoveredIndex === index ? "z-20" : "z-10"
                      } ${reached ? "" : "pointer-events-none"}`}
                      style={{ left: `${(x / H_WIDTH) * 100}%`, top: `${(y / H_HEIGHT) * 100}%` }}
                    >
                      <motion.div
                        className={`flex items-center ${isUpper ? "flex-col" : "flex-col-reverse"}`}
                        {...reveal(reached, { y: isUpper ? 16 : -16 })}
                      >
                        {renderCard(experience, index)}
                        <div className="w-0.5 h-6 bg-gray-700" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical wave down the left side */}
      <div className="md:hidden">{renderTitle()}</div>
      <div ref={mobileRef} className="relative md:hidden" style={{ height: count * V_SLOT_PX }}>
        <div className="absolute left-0 inset-y-0 w-16">
          <svg
            viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
            aria-hidden
          >
            {renderPaths(vertical.d, mobilePathLength)}
          </svg>
          {vertical.points.map(([x, y], index) =>
            renderNode(index, x, y, V_WIDTH, V_HEIGHT, isReached(index, reachedV))
          )}
        </div>

        {experiences.map((experience, index) => {
          const [, y] = vertical.points[index];
          const reached = isReached(index, reachedV);
          return (
            <div
              key={index}
              {...hoverProps(index)}
              className={`absolute left-20 right-0 -translate-y-1/2 ${
                hoveredIndex === index ? "z-20" : "z-10"
              } ${reached ? "" : "pointer-events-none"}`}
              style={{ top: `${(y / V_HEIGHT) * 100}%` }}
            >
              <motion.div {...reveal(reached, { x: 16 })}>
                {renderCard(experience, index)}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
