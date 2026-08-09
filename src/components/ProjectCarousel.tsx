"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";

interface Project {
  title: string;
  shortDescription: string;
  bulletPoints: string[];
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
    fit === "contain" ? "object-contain" : "object-cover object-top";

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#0f172a_55%,_#020617_100%)] ring-1 ring-white/10 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)]">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={images[imageIndex]}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={images[imageIndex]}
            alt={alt}
            fill
            className={objectClass}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/[0.03]" />

      {multi && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
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

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projects[currentIndex];
  const images =
    project.imageUrls && project.imageUrls.length > 0
      ? project.imageUrls
      : [project.imageUrl];

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir > 0 ? 36 : -36 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir > 0 ? -36 : 36 },
  };

  return (
    <div className="relative w-full">
      {/* Desktop side controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous project"
        className="absolute -left-14 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:scale-105 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next project"
        className="absolute -right-14 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:scale-105 lg:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.title}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 md:grid-cols-2 md:gap-10 md:items-center"
        >
          <div className="space-y-4">
            <ProjectImage
              images={images}
              alt={project.title}
              fit={project.imageFit}
            />

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                disabled={!project.demoUrl}
                onClick={() =>
                  project.demoUrl && window.open(project.demoUrl, "_blank")
                }
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  project.demoUrl
                    ? "bg-[#5d6aff] text-white shadow-[0_10px_30px_-12px_rgba(93,106,255,0.7)] hover:bg-[#6f7aff] hover:scale-[1.02]"
                    : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
                }`}
              >
                <ExternalLink className="h-4 w-4" />
                {project.demoUrl ? "Live Demo" : "Demo soon"}
              </button>

              <button
                type="button"
                disabled={!project.githubUrl}
                onClick={() =>
                  project.githubUrl && window.open(project.githubUrl, "_blank")
                }
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  project.githubUrl
                    ? "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 hover:scale-[1.02]"
                    : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
                }`}
              >
                <Github className="h-4 w-4" />
                {project.githubUrl ? "GitHub" : "Code soon"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#72e6ff]/90">
                Project {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {project.shortDescription}
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-white/45">
                Highlights
              </h4>
              <ul className="space-y-2.5">
                {project.bulletPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/75 md:text-[15px]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5d6aff]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-white/45">
                Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-[#b8c0ff]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls: mobile arrows + progress */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, index) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${p.title}`}
              className="group relative h-2 rounded-full transition-all duration-300"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-[#5d6aff] to-[#72e6ff]"
                    : "w-2 bg-white/30 group-hover:bg-white/55"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
