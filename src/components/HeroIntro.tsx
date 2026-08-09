"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

const ORBIT_NODES = [
  { angle: 0, radius: 38, size: 10, delay: 0 },
  { angle: 60, radius: 42, size: 7, delay: 0.15 },
  { angle: 120, radius: 36, size: 9, delay: 0.3 },
  { angle: 180, radius: 44, size: 6, delay: 0.45 },
  { angle: 240, radius: 40, size: 8, delay: 0.6 },
  { angle: 300, radius: 37, size: 7, delay: 0.75 },
];

const FLOAT_SHARDS = [
  { x: "8%", y: "18%", w: 56, h: 56, rotate: 12, delay: 0.2 },
  { x: "78%", y: "14%", w: 40, h: 40, rotate: -18, delay: 0.45 },
  { x: "86%", y: "58%", w: 64, h: 48, rotate: 28, delay: 0.35 },
  { x: "12%", y: "68%", w: 44, h: 44, rotate: -8, delay: 0.55 },
  { x: "70%", y: "78%", w: 36, h: 36, rotate: 40, delay: 0.7 },
];

function polarToCartesian(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + radiusPct * Math.cos(rad),
    y: 50 + radiusPct * Math.sin(rad),
  };
}

function MotionBlender({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Soft atmospheric wash — periwinkle → cyan */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 70% 45%, rgba(93, 106, 255, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 25% 70%, rgba(114, 230, 255, 0.1), transparent 50%)",
        }}
      />

      {/* Morphing core blob with gentle bounce */}
      <motion.div
        className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(52vw,420px)] h-[min(52vw,420px)]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          reduceMotion
            ? { opacity: 0.7, scale: 1 }
            : {
                opacity: [0.55, 0.85, 0.55],
                scale: [1, 1.08, 1],
                y: [0, -14, 0],
                borderRadius: [
                  "42% 58% 48% 52%",
                  "58% 42% 62% 38%",
                  "42% 58% 48% 52%",
                ],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0.8 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          background:
            "conic-gradient(from 120deg, rgba(93,106,255,0.4), rgba(60,70,180,0.18), rgba(114,230,255,0.32), rgba(93,106,255,0.4))",
          filter: "blur(2px)",
        }}
      />

      {/* Inner glass disc */}
      <motion.div
        className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(28vw,220px)] h-[min(28vw,220px)] rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-[2px]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: 1, rotate: 360, y: [0, -10, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0.8, delay: 0.2 }
            : {
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { type: "spring", stiffness: 80, damping: 16, delay: 0.2 },
                rotate: { duration: 48, repeat: Infinity, ease: "linear" },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
      />

      {/* Orbit ring with matched bounce */}
      <motion.div
        className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(58vw,460px)] h-[min(58vw,460px)] rounded-full border border-[#5D6AFF]/25"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: 1, y: [0, -12, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 1, delay: 0.3 }
            : {
                opacity: { duration: 1, delay: 0.3 },
                scale: { duration: 1, delay: 0.3 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
              }
        }
      />

      {/* Connecting lines + orbiting nodes */}
      <motion.div
        className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(58vw,460px)] h-[min(58vw,460px)]"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {ORBIT_NODES.map((node, i) => {
            const next = ORBIT_NODES[(i + 1) % ORBIT_NODES.length];
            const a = polarToCartesian(node.angle, node.radius * 0.48);
            const b = polarToCartesian(next.angle, next.radius * 0.48);
            return (
              <motion.line
                key={`line-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(114, 230, 255, 0.4)"
                strokeWidth="0.25"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.08 }}
              />
            );
          })}
          {ORBIT_NODES.map((node, i) => {
            const pos = polarToCartesian(node.angle, node.radius * 0.48);
            return (
              <motion.circle
                key={`node-${i}`}
                cx={pos.x}
                cy={pos.y}
                r={node.size / 10}
                fill="rgba(114, 230, 255, 0.9)"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  reduceMotion
                    ? { scale: 1, opacity: 1 }
                    : {
                        scale: [1, 1.35, 1],
                        opacity: [0.7, 1, 0.7],
                      }
                }
                transition={
                  reduceMotion
                    ? { delay: 0.6 + node.delay }
                    : {
                        scale: {
                          duration: 2.8,
                          repeat: Infinity,
                          delay: node.delay,
                          ease: "easeInOut",
                        },
                        opacity: {
                          duration: 2.8,
                          repeat: Infinity,
                          delay: node.delay,
                          ease: "easeInOut",
                        },
                      }
                }
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Floating geometric shards */}
      {FLOAT_SHARDS.map((shard, i) => (
        <motion.div
          key={`shard-${i}`}
          className="absolute border border-[#72E6FF]/30 bg-gradient-to-br from-[#5D6AFF]/25 to-[#72E6FF]/10 backdrop-blur-[1px]"
          style={{
            left: shard.x,
            top: shard.y,
            width: shard.w,
            height: shard.h,
            borderRadius: i % 2 === 0 ? "28% 72% 35% 65%" : "60% 40% 55% 45%",
          }}
          initial={{ opacity: 0, y: 24, rotate: shard.rotate - 20 }}
          animate={
            reduceMotion
              ? { opacity: 0.7, y: 0, rotate: shard.rotate }
              : {
                  opacity: [0.35, 0.75, 0.35],
                  y: [0, -14, 0],
                  rotate: [shard.rotate, shard.rotate + 8, shard.rotate],
                }
          }
          transition={
            reduceMotion
              ? { delay: shard.delay, duration: 0.6 }
              : {
                  delay: shard.delay,
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}

      {/* Sweeping highlight */}
      {!reduceMotion && (
        <motion.div
          className="absolute left-[55%] top-1/2 w-[min(58vw,460px)] h-[min(58vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(114,230,255,0.14) 40deg, transparent 80deg)",
          }}
          animate={{ rotate: 360, y: [0, -12, 0] }}
          transition={{
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
          }}
        />
      )}
    </div>
  );
}

export default function HeroIntro() {
  const reduceMotion = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const name = "Nachiket Pandit";

  useEffect(() => {
    setReady(true);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about-section");
    if (!el) return;
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-7rem)] flex flex-col justify-center mb-8">
      <MotionBlender reduceMotion={reduceMotion} />

      <div className="relative z-10 max-w-2xl space-y-6">
        <motion.p
          className="text-[#72E6FF]/90 text-sm tracking-[0.2em] uppercase font-medium"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Portfolio
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          <span className="sr-only">{name}</span>
          <span aria-hidden className="inline-flex flex-wrap">
            {ready &&
              name.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className={char === " " ? "inline-block w-[0.35em]" : "inline-block"}
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.45,
                    delay: reduceMotion ? 0 : 0.25 + i * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
          </span>
        </h1>

        <motion.p
          className="text-gray-200/90 text-base md:text-lg max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          Full-stack developer at UT Dallas. I build web apps, ML systems, and
          backends—from research work to tools that solve real problems.
        </motion.p>

        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[#72E6FF]/80 mb-2">
            Currently
          </p>
          <p className="text-gray-200/85 text-sm md:text-base leading-relaxed">
            Building OrgPortal with ACM—a centralized platform for discovering and
            managing student orgs at UTD.
          </p>
        </motion.div>

        <motion.div
          className="pt-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
        >
          <button
            type="button"
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#72E6FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          >
            <span className="relative">
              See more about me
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#72E6FF] transition-all duration-300 group-hover:w-full" />
            </span>
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#72E6FF]"
            >
              <ChevronDown className="w-4 h-4" strokeWidth={2} />
            </motion.span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {ready && (
          <motion.button
            type="button"
            onClick={scrollToAbout}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-400/70 hover:text-gray-200 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            aria-label="Scroll to about section"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1.5"
            >
              <span className="w-1 h-1.5 rounded-full bg-[#72E6FF]/80" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
