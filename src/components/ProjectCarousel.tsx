"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Project {
  title: string;
  shortDescription: string;
  bulletPoints: string[];
  technologies: string[];
  imageUrl: string;
  /** Optional extra images — rotates through these (falls back to imageUrl alone). */
  imageUrls?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

function ProjectImage({
  images,
  alt,
}: {
  images: string[];
  alt: string;
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
    }, 3500);
    return () => clearInterval(id);
  }, [multi, imageKey, images.length]);

  return (
    <div className="relative aspect-[4/3] mb-4">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          className={`object-contain rounded-lg bg-slate-800/50 transition-opacity duration-700 ${
            i === imageIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}

      {multi && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => setImageIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === imageIndex
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
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
  const project = projects[currentIndex];
  const images =
    project.imageUrls && project.imageUrls.length > 0
      ? project.imageUrls
      : [project.imageUrl];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full">
      <button
        onClick={prevSlide}
        className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors z-10"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors z-10"
      >
        →
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <ProjectImage images={images} alt={project.title} />

          <div className="flex gap-4 justify-center">
            <button
              disabled={!project.demoUrl}
              className={`group relative px-6 py-2 rounded-lg overflow-hidden transition-all duration-300 ${
                project.demoUrl
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() =>
                project.demoUrl && window.open(project.demoUrl, "_blank")
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {project.demoUrl ? "Live Demo" : "Coming Soon"}
              </span>
              {project.demoUrl && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              )}
            </button>

            <button
              disabled={!project.githubUrl}
              className={`group relative px-6 py-2 rounded-lg overflow-hidden transition-all duration-300 ${
                project.githubUrl
                  ? "bg-gray-800 text-white hover:bg-gray-700 cursor-pointer"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() =>
                project.githubUrl && window.open(project.githubUrl, "_blank")
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {project.githubUrl ? "GitHub" : "Coming Soon"}
              </span>
              {project.githubUrl && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              )}
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-blue-400 mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
