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
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      imageUrl: "/images/threadconnectimage.png",
      demoUrl: "https://threadconnect-demo.com",
      githubUrl: "https://github.com/yourusername/threadconnect"
    },
    {
      title: "Stock Tester (Personal Project)",
      shortDescription: "A Django-based stock analysis platform that combines financial data retrieval, back-testing, and predictive modeling. The system leverages LSTM (Long Short-Term Memory) neural networks for stock price forecasting, providing insights for data-driven trading strategies.",
      bulletPoints: [
        "Developed a Django web interface for seamless data visualization and trade simulation.",
        "Implemented a financial data pipeline that fetches real-time stock prices, historical market trends, and technical indicators to provide comprehensive analysis for trading decisions.",
        "Integrated a back-testing system, enabling users to evaluate and refine trading strategies using historical data to simulate performance in real-world scenarios."
      ],
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
      imageUrl: "/images/project2.png",
      demoUrl: "https://stocktester-demo.com",
      githubUrl: "https://github.com/yourusername/stocktester"
    },
    {
      title: "Ebay Resell Helper (Personal Project)",
      shortDescription: "A full-stack web application designed to assess eBay product profitability by processing data from over 10,000 eBay listings through the eBay API. The app helps resellers determine the potential profitability of products based on various evaluation algorithms.",
      bulletPoints: [
        "Developed a full-stack web app with Angular, Flask, and MongoDB for real-time product profitability analysis",
        "Created a responsive Angular frontend with a search functionality, resell score visualization, and watchlist to track products.",
        "Integrated a Flask REST API and MongoDB database for evaluating products and storing user data, ensuring scalability and performance."
      ],
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "D3.js"],
      imageUrl: "/images/project3.png",
      demoUrl: "https://ebayresell-demo.com",
      githubUrl: "https://github.com/yourusername/ebayresell"
    }
  ];

  // Sample experiences data
  const experiences = [
    {
      title: "Software Developer",
      company: "Unlocking Doors",
      period: "Spring 2024",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "TypeScript", "MongoDB"]
    },
    {
      title: "UG Research Assistant",
      company: "The University of Texas at Dallas",
      period: "Summer 2024",
      description: "Built and deployed full-stack applications using modern web technologies. Implemented responsive design and optimized application performance.",
      technologies: ["Next.js", "Python", "PostgreSQL", "AWS"]
    },
    {
      title: "AIM Project Mentee",
      company: "Company 3",
      period: "Fall 2024",
      description: "Created user interfaces and interactive components for web applications. Focused on accessibility and user experience improvements.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Git"]
    },
    {
      title: "Development Officer",
      company: "Association of Computer Machinery",
      period: "Summer 2022",
      description: "Developed and maintained server-side applications and APIs. Implemented security measures and optimized database queries.",
      technologies: ["Java", "Spring Boot", "MySQL", "Docker"]
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
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left side - Name and Bio */}
        <div className="md:col-span-5">
          <h1 className="text-5xl font-bold mb-6 flex items-center text-white">
            <span>{text}</span>
            <span className="animate-blink">|</span>
          </h1>
         
          <div className="bg-slate-800/80 p-4 rounded-md mb-8 backdrop-blur-sm w-[800px]">
            <p className="text-gray-100">
            I am a full-stack developer studying at the University of Texas at Dallas. I have worked on various projects spanning web development, machine learning, and backend systems. My experience includes contributing to research, leading software development for organizations, and building applications that solve real-world problems. Check out my projects and experiences below!

            </p>
          </div>
        </div>
        
        {/* Right side - Currently working on */}
        <div className="md:col-span-7">
          
        </div>
      </div>
      
      {/* Project Preview and This Will Do section in a new grid row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2">
        {/* Project Preview - below personal description */}
        <div className="md:col-span-8">
          <div className="h-[300px] w-[800px] rounded-md relative overflow-hidden">
            <Image
              src="/images/current.png"
              alt="Project Preview"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
        
        {/* "This will do" section - to the right of project preview */}
        <div className="md:col-span-4">
          <div className="bg-slate-800/80 p-6 rounded-md shadow-sm h-[200px] backdrop-blur-sm flex flex-col justify-center border border-slate-700">
            <h3 className="text-2xl font-semibold mb-4 text-white">This will do</h3>
            <div className="space-y-3">
              <p className="text-gray-100 text-lg">using ...</p>
              <p className="text-gray-100 text-lg">to do ... for its user</p>
            </div>
          </div>
        </div>
      </div>

      {/* View All Projects Button - below both boxes */}
      <div className="flex justify-center mt-8">
        <button
          onClick={scrollToProjects}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 group"
        >
          View All Projects
          <span className="animate-bounce-arrow group-hover:translate-y-1 transition-transform">↓</span>
        </button>
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