"use client"
import { useState, useEffect } from "react";
import ProjectCarousel from "@/components/ProjectCarousel";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import HeroPuzzle from "@/components/HeroPuzzle";

export default function Home() {
  const [text, setText] = useState("");
  const fullName = "Nachiket Pandit";

  // Sample projects data
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
      title: "Stock Tester (Personal Project)",
      shortDescription: "A Django-based stock analysis platform that combines financial data retrieval, back-testing, and predictive modeling. The system leverages LSTM (Long Short-Term Memory) neural networks for stock price forecasting, providing insights for data-driven trading strategies.",
      bulletPoints: [
        "Developed a Django web interface for seamless data visualization and trade simulation.",
        "Implemented a financial data pipeline that fetches real-time stock prices, historical market trends, and technical indicators to provide comprehensive analysis for trading decisions.",
        "Integrated a back-testing system, enabling users to evaluate and refine trading strategies using historical data to simulate performance in real-world scenarios."
      ],
      technologies: ["Django", "PostgreSQL", "Pandas", "TensorFlow"],
      imageUrl: "/images/project2.png",
      demoUrl: "",
      githubUrl: ""
    },
    {
      title: "Ebay Resell Helper (Personal Project)",
      shortDescription: "A full-stack web application designed to assess eBay product profitability by processing data from over 10,000 eBay listings through the eBay API. The app helps resellers determine the potential profitability of products based on various evaluation algorithms.",
      bulletPoints: [
        "Developed a full-stack web app with Angular, Flask, and MongoDB for real-time product profitability analysis",
        "Created a responsive Angular frontend with a search functionality, resell score visualization, and watchlist to track products.",
        "Integrated a Flask REST API and MongoDB database for evaluating products and storing user data, ensuring scalability and performance."
      ],
      technologies: ["Next.js", "Angular", "MongoDB", "Flask"],
      imageUrl: "/images/project3.png",
      demoUrl: "",
      githubUrl: ""
    }
  ];

  // Sample experiences data
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
 
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        setText(fullName.substring(0, index + 1));
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Split hero: bio stack + interlocking puzzle nav */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-8">
        <div className="md:col-span-5 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center text-white">
            <span>{text}</span>
            <span className="animate-blink">|</span>
          </h1>

          <div className="bg-slate-800/80 p-4 rounded-md backdrop-blur-sm border border-slate-700">
            <p className="text-gray-100 text-sm md:text-base leading-relaxed">
              Full-stack developer at UT Dallas. I build web apps, ML systems, and backends—from research work to tools that solve real problems.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-md backdrop-blur-sm border border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-white">Currently Working On</h3>
            <p className="text-gray-100 text-sm md:text-base leading-relaxed">
              Building OrgPortal with ACM—a centralized platform for discovering and managing student orgs at UTD.
            </p>
          </div>
        </div>

        <div className="md:col-span-7 flex justify-center md:justify-end md:pr-20 lg:pr-28">
          <HeroPuzzle />
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects-section" className="mt-32 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
        <div className="max-w-5xl mx-auto">
          <ProjectCarousel projects={projects} />
        </div>
      </div>

      {/* About Me Section with Timeline */}
      <div id="about-section" className="mt-32 mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">About Me</h2>
        <div className="max-w-5xl mx-auto">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}