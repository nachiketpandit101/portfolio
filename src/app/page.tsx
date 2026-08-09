"use client";
import ProjectCarousel from "@/components/ProjectCarousel";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import HeroIntro from "@/components/HeroIntro";

export default function Home() {
  const projects = [
    {
      title: "ThreadConnect (Team Project)",
      shortDescription: "A machine-learning-driven search tool that helps users find clothing alternatives by uploading an image or text description. The system leverages OpenAI's CLIP model for image-text similarity and a vector database (Qdrant) for fast, scalable retrieval.",
      bulletPoints: [
        "Trained CLIP on a fashion dataset, improving the accuracy of clothing attribute recognition.",
        "Developed a React-based UI with a Flask backend, allowing users to upload images or text descriptions for reverse product search.",
        "Integrated Qdrant vector database, enabling fast and efficient nearest-neighbor searches to match uploaded images with similar clothing items.",
      ],
      technologies: ["React", "Flask", "OpenAICLIP", "QdrantDB","PyTorch"],
      imageUrl: "/images/threadconnectimage.png",
      demoUrl: "",
      githubUrl: ""
    },
    {
      title: "OrgPortal (Personal Project)",
      shortDescription: "A full-stack club management platform built with Next.js and Supabase PostgreSQL, serving 300+ users across various university organizations by centralizing event coordination, member administration, and club discovery.",
      bulletPoints: [
        "Built a full-stack club management platform serving 300+ users across various UTD organizations, centralizing event coordination, member management, and club discovery.",
        "Developed an admin dashboard enabling officers to manage club profiles, create events/forms, control member access, and configure custom roles with granular permissions for page-level and content visibility.",
        "Implemented Row Level Security (RLS) policies in Supabase to enforce role-based access control at the database layer, ensuring authorized data querying and modification."
      ],
      technologies: ["Next.js", "PostgreSQL", "Supabase", "TypeScript"],
      imageUrl: "/images/orgportal1.png",
      imageUrls: ["/images/orgportal1.png", "/images/orgportal2.png"],
      demoUrl: "",
      githubUrl: ""
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
