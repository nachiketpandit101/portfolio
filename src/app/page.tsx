"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import Image from "next/image";

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
      period: "Spring 2025",
      description: "Working with a team of five officers to build a centralized platform for student organizations at UTD.",
      technologies: ["Next.js", "Supabase", "Typescript", "Tailwind CSS"]
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

  const scrollToProjects = () => {
    const element = document.getElementById('projects-section');
    if (element) {
      const offset = 100; // Adjust this value as needed
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left side - Name and Bio */}
        <div className="md:col-span-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center text-white">
            <span>{text}</span>
            <span className="animate-blink">|</span>
          </h1>
         
          <div className="bg-slate-800/80 p-4 rounded-md mb-8 backdrop-blur-sm w-full md:w-[800px]">
            <p className="text-gray-100">
              I am a full-stack developer studying at the University of Texas at Dallas. I have worked on various projects spanning web development, machine learning, and backend systems. My experience includes contributing to research, leading software development for organizations, and building applications that solve real-world problems. Check out my projects and experiences below!
            </p>
          </div>
        </div>
        
      </div>
      
      {/* Project Preview and Currently Working On section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2">
        {/* Project Preview */}
        <div className="md:col-span-7">
          <div className="h-[300px] w-full md:w-[800px] rounded-md relative overflow-hidden">
            <Image
              src="/images/current.png"
              alt="Project Preview"
              fill
              className="object-contain object-center"
              priority
            />
            {/* View All Projects Button - Right aligned over image */}
            <div className="absolute right-4 bottom-4">
              <button
                onClick={scrollToProjects}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center group relative z-10"
              >
                <span className="text-xl animate-bounce-arrow group-hover:translate-y-1 transition-transform">↓</span>
              </button>
            </div>
          </div>
        </div>

        {/* Currently Working On section */}
        <div className="md:col-span-5">
          <div className="bg-slate-800/80 p-6 rounded-md shadow-sm backdrop-blur-sm border border-slate-700 h-[300px] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4 text-white">Currently Working On</h3>
            <p className="text-gray-100 text-lg leading-relaxed">
              I am collaborating with a team to build OrgPortal, a full-stack web application designed to streamline the management and discovery of student organizations at UTD. The platform provides a centralized space for students to explore clubs, manage memberships, and stay updated on events, all within an intuitive and scalable system.
            </p>
          </div>
        </div>
      </div>

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