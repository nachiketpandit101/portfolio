"use client";
import ProjectCarousel from "@/components/ProjectCarousel";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import HeroIntro from "@/components/HeroIntro";

export default function Home() {
  const projects = [
    {
      title: "Catch Me Up",
      shortDescription: "A hybrid RAG pipeline that allows users to catch up to a certain book series they are reading with smart spoiler protection.",
      bulletPoints: [
        "Built a hybrid RAG pipeline combining pgvector dense search with a custom Okapi BM25 implementation in Postgres, fused via Reciprocal Rank Fusion and refined by a pluggable cross-encoder reranker (Cohere, Jina, or self-hosted TEI), achieving 100% recall@12 on an 81-question eval suite with zero spoiler violations enforced at the SQL layer.",
        "Engineered a Corrective RAG decision graph that self-heals low-confidence retrieval through LLM-graded relevance scoring, automatic query expansion with alias-aware rewriting, and a spoiler-filtered web search fallback, with graceful degradation at every stage so provider errors and timeouts fall back instead of failing.",
        "Implemented a sentence-level citation grounding guardrail that strips hallucinated references and drops uncited claims, failing closed with a refusal when no grounded content survives, backed by an automated eval framework with programmatically derived ground truth and assertions for zero spoiler leaks."
      ],
      technologies: ["PostgreSQL", "pgvector", "RAG", "LLMs"],
      imageUrl: "/images/catch-me-up-img.png",
      demoUrl: "https://catch-me-up-pi.vercel.app/",
      githubUrl: "https://github.com/nachiketpandit101/catch-me-up"
    },
    {
      title: "OrgPortal (Team Project)",
      shortDescription: "A full-stack club management platform built with Next.js and Supabase PostgreSQL, serving 300+ users across various university organizations by centralizing event coordination, member administration, and club discovery.",
      bulletPoints: [
        "Built a full-stack club management platform serving 300+ users across various UTD organizations, centralizing event coordination, member management, and club discovery.",
        "Developed an admin dashboard enabling officers to manage club profiles, create events/forms, control member access, and configure custom roles with granular permissions for page-level and content visibility.",
        "Implemented Row Level Security (RLS) policies in Supabase to enforce role-based access control at the database layer, ensuring authorized data querying and modification."
      ],
      technologies: ["Next.js", "PostgreSQL", "Supabase", "TypeScript"],
      imageUrl: "/images/orgportal1.png",
      imageUrls: ["/images/orgportal1.png", "/images/orgportal2.png"],
      demoUrl: "https://org-portal.com/",
      githubUrl: ""
    },
    {
      title: "GD Analytics Mod",
      shortDescription: "A telemetry and physics analysis mod for Geometry Dash built with C++ and Geode SDK to stream and align player trajectory data.",
      bulletPoints: [
        "Hooked engine update and input loops in C++ via Geode SDK to stream structured telemetry (deaths, subsampled player trajectories, and button events), filtering anti-cheat artifacts and serializing to versioned JSON.",
        "Engineered a state-machine stitching engine that aligns 3D kinematic physics seams (position, acceleration, gravity) within epsilon tolerances, remapping split attempts onto a continuous reference input timeline.",
        "Designing a frame-delta analysis algorithm using nearest-neighbor spatial alignment to quantify jump timing and hold duration errors against reference runs with sub-frame precision."
      ],
      technologies: ["C++", "Geode SDK", "Cocos2d-x"],
      imageUrl: "/images/gd-analytics-coming-soon.jpg",
      demoUrl: "",
      githubUrl: "https://github.com/nachiketpandit101/gd-helper"
    },
    {
      title: "eBay Resell Helper (Personal Project)",
      shortDescription:
        "A full-stack web app that ingests live eBay listings via the eBay Browse API, scores them for resale profitability, and lets users bookmark the best opportunities.",
      bulletPoints: [
        "Built a full-stack app with Svelte 5, Spring Boot (Java 21), and MongoDB to sync, score, and search live eBay listings.",
        "Implemented cohort-based profitability scoring (margin, shipping, demand) with a searchable UI, score visuals, dashboard stats, and a watchlist.",
        "Integrated the eBay Browse API with OAuth, rate limiting, and retries; exposed a Spring Boot REST API backed by MongoDB Atlas."
      ],
      technologies: ["Svelte", "Spring Boot", "MongoDB", "eBay API"],
      imageUrl: "/images/project3.png",
      imageFit: "contain" as const,
      demoUrl: "",
      githubUrl: ""
    },
    {
      title: "ThreadConnect (Team Project)",
      shortDescription: "A machine-learning-driven search tool that helps users find clothing alternatives by uploading an image or text description. The system leverages OpenAI's CLIP model for image-text similarity and a vector database (Qdrant) for fast, scalable retrieval.",
      bulletPoints: [
        "Trained CLIP on a fashion dataset, improving the accuracy of clothing attribute recognition.",
        "Developed a React-based UI with a Flask backend, allowing users to upload images or text descriptions for reverse product search.",
        "Integrated Qdrant vector database, enabling fast and efficient nearest-neighbor searches to match uploaded images with similar clothing items.",
      ],
      technologies: ["React", "Flask", "OpenAICLIP", "QdrantDB", "PyTorch"],
      imageUrl: "/images/threadconnectimage.png",
      demoUrl: "",
      githubUrl: ""
    }
  ];

  const experiences = [
    {
      title: "Software Developer",
      company: "Unlocking Doors",
      period: "Spring 2024",
      description: "Worked with a nonprofit to develop a secure contact management system, enabling efficient role-based data organization for staff assisting formerly incarcerated individuals.",
      technologies: ["Vue.js", "Node.js", "Docker", "PostgreSQL"]
    },
    {
      title: "UG Research Assistant",
      company: "The University of Texas at Dallas",
      period: "Summer 2024",
      description: "Collaborated with 2 PhD candidates to improve a Python decompiler using NLP techniques for PYC file decoding. Enhanced the platform's security and tracking capabilities while streamlining the manual patch submission process.",
      technologies: ["Python", "NLP", "MongoDB"]
    },
    {
      title: "AIM Project Mentee",
      company: "Artificial Intelligence Society",
      period: "Fall 2024",
      description: "Participated in a mentorship-driven program focused on artificial intelligence applications. Designed and built ThreadConnect, a clothing search platform leveraging OpenAI's CLIP model and vector databases for image-based product matching.",
      technologies: ["Pytorch", "React", "Flask"]
    },
    {
      title: "Development Officer",
      company: "Association of Computer Machinery",
      period: "Spring 2025 - Present",
      description: "Working with a team of five officers to build a centralized platform for student organizations at UTD.",
      technologies: ["Next.js", "Supabase", "Typescript", "Tailwind CSS"]
    },
    {
      title: "Product Analyst - AI/ML Intern",
      company: "Mr. Cooper Group",
      period: "Summer 2025",
      description: "Evaluated and optimized LLM prompts for an internal customer service call analyzer tool handling ∼2M calls per month. Led cross-functional meetings with developers and executives.",
      technologies: []
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroIntro />

      <div id="projects-section" className="mt-32 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
        <div className="max-w-5xl mx-auto">
          <ProjectCarousel projects={projects} />
        </div>
      </div>

      <div id="about-section" className="mt-32 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">About Me</h2>
        <div className="max-w-5xl mx-auto">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>

      <Contact />
    </div>
  );
}
