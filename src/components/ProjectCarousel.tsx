"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  title: string;
  shortDescription: string;
  /** One-line summary shown in the open book (falls back to shortDescription). */
  summary?: string;
  bulletPoints: string[];
  /** Short bullets shown in the open book (falls back to bulletPoints). */
  highlights?: string[];
  technologies: string[];
  imageUrl: string;
  /** Optional extra images — rotates through these (falls back to imageUrl alone). */
  imageUrls?: string[];
  /** cover (default) crops tall shots; contain shows wide pages fully. */
  imageFit?: "cover" | "contain";
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SPINE_TINTS = [
  "linear-gradient(180deg, #171c36 0%, #0e1224 100%)",
  "linear-gradient(180deg, #10212c 0%, #09141c 100%)",
  "linear-gradient(180deg, #1b1733 0%, #0f0d21 100%)",
  "linear-gradient(180deg, #131d2e 0%, #0b111d 100%)",
  "linear-gradient(180deg, #0f1b30 0%, #08101e 100%)",
];

const HEIGHT_FACTORS = [0.93, 1, 0.95, 0.88, 0.97];

const SPRING: Transition = {
  type: "spring",
  stiffness: 210,
  damping: 30,
  mass: 0.9,
};

const HOVER_INTENT_MS = 110;

function splitTitle(title: string) {
  const match = title.match(/^(.*?)\s*\((.+)\)\s*$/);
  return match
    ? { name: match[1], tag: match[2] }
    : { name: title, tag: undefined };
}

function getShelfSizes(containerWidth: number, count: number) {
  const compact = containerWidth < 640;
  const gap = compact ? 6 : 10;
  const spine = compact ? 40 : 60;
  const idle = compact ? 52 : 78;
  const height = compact ? 580 : 480;
  const fit = containerWidth - (count - 1) * (spine + gap);
  const open = Math.max(
    Math.min(fit, 800),
    Math.min(containerWidth - 56, 340)
  );
  return { compact, gap, spine, idle, height, open };
}

function ProjectImage({
  images,
  alt,
  fit = "cover",
}: {
  images: string[];
  alt: string;
  fit?: "cover" | "contain";
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const multi = images.length > 1;
  const imageKey = images.join("|");

  useEffect(() => {
    setImageIndex(0);
  }, [imageKey]);

  useEffect(() => {
    if (!multi) return;
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [multi, imageKey, images.length]);

  const objectClass =
    fit === "contain" ? "object-contain p-4" : "object-cover object-top";

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#0f172a_55%,_#020617_100%)]">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={images[imageIndex]}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={images[imageIndex]}
            alt={alt}
            fill
            className={objectClass}
            sizes="(max-width: 1024px) 50vw, 340px"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b16]/70 via-transparent to-white/[0.03]" />

      {multi && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => setImageIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === imageIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BookPanel({
  project,
  index,
  total,
  width,
  showCover,
  reduceMotion,
  onClose,
}: {
  project: Project;
  index: number;
  total: number;
  width: number;
  showCover: boolean;
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const { name, tag } = splitTitle(project.title);
  const summary = project.summary ?? project.shortDescription;
  const highlights = (project.highlights ?? project.bulletPoints).slice(0, 3);
  const images =
    project.imageUrls && project.imageUrls.length > 0
      ? project.imageUrls
      : [project.imageUrl];

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      id={`book-panel-${index}`}
      role="region"
      aria-label={name}
      className="absolute inset-0 overflow-hidden rounded-l-[6px] rounded-r-2xl border border-white/10 bg-[linear-gradient(135deg,#0f1529_0%,#0a0f1e_55%,#070b16_100%)] shadow-[0_30px_80px_-30px_rgba(114,230,255,0.28),inset_0_1px_0_rgba(255,255,255,0.05)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-y-0 left-0 z-20 w-[3px] bg-gradient-to-b from-[#72e6ff] via-[#72e6ff]/70 to-[#5d6aff] shadow-[0_0_14px_rgba(114,230,255,0.6)]" />

      <motion.div
        className="flex h-full"
        style={{ width }}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: reduceMotion ? 0 : 0.2,
              staggerChildren: reduceMotion ? 0 : 0.05,
            },
          },
        }}
      >
        {showCover && (
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-[42%] shrink-0"
          >
            <ProjectImage
              images={images}
              alt={name}
              fit={project.imageFit}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-black/50" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />
          </motion.div>
        )}

        <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto p-5 sm:p-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close book"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-colors hover:border-white/25 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-2 pr-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#72e6ff]/90">
              Vol. {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            {tag && (
              <span className="rounded-full border border-[#5d6aff]/30 bg-[#5d6aff]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#b8c0ff]">
                {tag}
              </span>
            )}
          </motion.div>

          <motion.h3
            variants={item}
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[28px]"
          >
            {name}
          </motion.h3>

          <motion.p
            variants={item}
            className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/65 sm:line-clamp-2 sm:text-[15px]"
          >
            {summary}
          </motion.p>

          <motion.div variants={item} className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#72e6ff]/20 bg-[#72e6ff]/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-[#bdefff]"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="my-5 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent"
          />

          <ul className="space-y-3">
            {highlights.map((point, i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-white/75"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#72e6ff] shadow-[0_0_8px_rgba(114,230,255,0.8)]" />
                <span className="line-clamp-3 sm:line-clamp-2">{point}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            variants={item}
            className="mt-auto grid grid-cols-2 gap-2 pt-6 sm:flex sm:gap-2.5 [&>*]:justify-center [&>*]:whitespace-nowrap"
          >
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 sm:px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                <Github className="h-4 w-4 shrink-0" />
                GitHub
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 sm:px-4 text-sm font-medium text-white/40">
                <Github className="h-4 w-4 shrink-0" />
                Code soon
              </span>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5d6aff] px-3.5 py-2 sm:px-4 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(93,106,255,0.8)] transition-all duration-300 hover:bg-[#6f7aff]"
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                Live
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 sm:px-4 text-sm font-medium text-white/40">
                <ExternalLink className="h-4 w-4 shrink-0" />
                Demo soon
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [containerWidth, setContainerWidth] = useState(1024);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>();

  useIsoLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setContainerWidth(el.clientWidth);
    const raf = requestAnimationFrame(() => setReady(true));
    const observer = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width)
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const sizes = getShelfSizes(containerWidth, projects.length);
  const anyOpen = openIndex !== null;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || openIndex === null) return;
    const contentWidth =
      sizes.open + (projects.length - 1) * (sizes.spine + sizes.gap);
    if (contentWidth <= el.clientWidth) return;
    const target =
      openIndex * (sizes.spine + sizes.gap) -
      (el.clientWidth - sizes.open) / 2;
    const id = window.setTimeout(
      () =>
        el.scrollTo({
          left: Math.max(0, target),
          behavior: reduceMotion ? "auto" : "smooth",
        }),
      reduceMotion ? 0 : 280
    );
    return () => window.clearTimeout(id);
  }, [openIndex, sizes.open, sizes.spine, sizes.gap, projects.length, reduceMotion]);

  const open = useCallback((index: number) => {
    window.clearTimeout(hoverTimer.current);
    setOpenIndex(index);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setOpenIndex(null);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setOpenIndex((i) => (i === null ? 0 : Math.min(i + 1, projects.length - 1)));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setOpenIndex((i) => (i === null ? 0 : Math.max(i - 1, 0)));
    }
  };

  const transition: Transition =
    !ready || reduceMotion ? { duration: 0 } : SPRING;

  return (
    <div className="relative w-full" onKeyDown={handleKeyDown}>
      <div
        ref={scrollerRef}
        className="overflow-x-auto pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="mx-auto flex w-max items-end"
          style={{ gap: sizes.gap, height: sizes.height }}
        >
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            const { name } = splitTitle(project.title);
            const width = isOpen
              ? sizes.open
              : anyOpen
                ? sizes.spine
                : sizes.idle;
            const height = isOpen
              ? sizes.height
              : Math.round(
                  sizes.height * HEIGHT_FACTORS[i % HEIGHT_FACTORS.length]
                );

            return (
              <motion.div
                key={project.title}
                className={`relative shrink-0 ${isOpen ? "z-10" : "z-0"}`}
                initial={false}
                animate={{ width, height }}
                transition={transition}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse" || isOpen) return;
                  window.clearTimeout(hoverTimer.current);
                  hoverTimer.current = window.setTimeout(
                    () => setOpenIndex(i),
                    HOVER_INTENT_MS
                  );
                }}
                onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
              >
                <motion.button
                  type="button"
                  onClick={() => open(i)}
                  aria-expanded={isOpen}
                  aria-controls={`book-panel-${i}`}
                  aria-label={`Open ${name}`}
                  tabIndex={isOpen ? -1 : 0}
                  aria-hidden={isOpen}
                  initial={false}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: isOpen ? 0.15 : 0.35 }}
                  className={`group absolute inset-0 overflow-hidden rounded-b-[3px] rounded-t-[6px] border border-white/10 text-left shadow-[0_18px_30px_-18px_rgba(0,0,0,0.9)] outline-none transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#72e6ff]/30 focus-visible:-translate-y-1.5 focus-visible:border-[#72e6ff]/60 ${
                    isOpen ? "pointer-events-none" : ""
                  }`}
                  style={{ background: SPINE_TINTS[i % SPINE_TINTS.length] }}
                >
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.4)_100%)]" />
                  <span className="pointer-events-none absolute inset-0 bg-[#72e6ff]/0 transition-colors duration-300 group-hover:bg-[#72e6ff]/[0.04]" />

                  <span className="absolute bottom-4 left-[7px] top-4 w-[2px] rounded-full bg-[#72e6ff]/70 shadow-[0_0_8px_rgba(114,230,255,0.55)] transition-all duration-300 group-hover:bg-[#72e6ff] group-hover:shadow-[0_0_14px_rgba(114,230,255,0.9)]" />

                  <span className="absolute inset-x-3 top-5 h-px bg-white/15" />
                  <span className="absolute inset-x-3 top-[23px] h-px bg-white/10" />
                  <span className="absolute inset-x-3 bottom-12 h-px bg-white/10" />

                  <span className="absolute inset-x-0 bottom-10 top-10 flex items-center justify-center">
                    <span
                      className={`whitespace-nowrap font-semibold uppercase text-white/80 transition-colors duration-300 group-hover:text-white ${
                        sizes.compact
                          ? "text-[11px] tracking-[0.16em]"
                          : "text-[13px] tracking-[0.2em]"
                      }`}
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {name}
                    </span>
                  </span>

                  <span className="absolute inset-x-0 bottom-4 text-center font-mono text-[10px] text-[#72e6ff]/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <BookPanel
                      project={project}
                      index={i}
                      total={projects.length}
                      width={sizes.open}
                      showCover={sizes.open >= 640}
                      reduceMotion={reduceMotion}
                      onClose={() => setOpenIndex(null)}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none relative h-8" aria-hidden>
        <div className="absolute inset-x-[2%] top-0 h-[3px] rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.02]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#72e6ff]/80 to-transparent" />
        <div className="absolute inset-x-[12%] -top-3 h-6 rounded-full bg-[#72e6ff]/15 blur-xl" />
        <div className="absolute inset-x-[6%] top-[3px] h-5 bg-gradient-to-b from-black/40 to-transparent blur-[2px]" />
      </div>

      <p className="mt-2 text-center text-xs tracking-wide text-white/35">
        {sizes.compact ? "Tap a spine to open it" : "Hover a spine to pull it off the shelf"}
      </p>
    </div>
  );
}
