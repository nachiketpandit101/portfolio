"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";

export default function Home() {
  const [text, setText] = useState("");
  const fullName = "Nachiket Pandit";

  // Sample projects data
  const projects = [
    {
      title: "Project 1",
      description: "Update the existing horizontal timeline component to be wider while keeping the blue dots aligned on the central timeline. Ensure each event box overlays above or below the timeline, connected to its respective dot with a line. Maintain proper spacing between events without shifting the timeline itself. Ensure hover interactions remain functional.",
      imageUrl: "/images/project1.jpg"
    },
    {
      title: "Project 2",
      description: "Description for project 2",
      imageUrl: "/images/project2.jpg"
    },
    {
      title: "Project 3",
      description: "Description for project 3",
      imageUrl: "/images/project3.jpg"
    }
  ];

  // Sample experiences data
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Company 1",
      period: "Summer 2023",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "TypeScript", "MongoDB"]
    },
    {
      title: "Full Stack Developer",
      company: "Company 2",
      period: "Spring 2023",
      description: "Built and deployed full-stack applications using modern web technologies. Implemented responsive design and optimized application performance.",
      technologies: ["Next.js", "Python", "PostgreSQL", "AWS"]
    },
    {
      title: "Frontend Developer",
      company: "Company 3",
      period: "Fall 2022",
      description: "Created user interfaces and interactive components for web applications. Focused on accessibility and user experience improvements.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Git"]
    },
    {
      title: "Backend Developer",
      company: "Company 4",
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
         
          <div className="bg-slate-800/80 p-4 rounded-md mb-8 backdrop-blur-sm">
            <p className="text-gray-100">
              I am a full stack developer studying at the University of Texas at Dallas.
              I have had the pleasure to work on various projects and parts of organizations
              so far. Check out my projects and experiences below!
            </p>
          </div>
        </div>
        
        {/* Right side - Currently working on */}
        <div className="md:col-span-7">
          
        </div>
      </div>
      
      {/* Project Preview and This Will Do section in a new grid row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        {/* Project Preview - below personal description */}
        <div className="md:col-span-8">
          <div className="bg-slate-800/80 h-64 w-[700px] rounded-md flex items-center justify-center text-gray-100 backdrop-blur-sm ml-60">
            Project Preview
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={scrollToProjects}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 group ml-55"
            >
              View All Projects
              <span className="animate-bounce-arrow group-hover:translate-y-1 transition-transform">↓</span>
            </button>
          </div>
        </div>
        
        {/* "This will do" section - to the right of project preview */}
        <div className="md:col-span-4">
          <div className="bg-slate-800/80 p-4 rounded-md shadow-sm h-full backdrop-blur-sm">
            <h3 className="text-xl mb-2 text-white">This will do</h3>
            <p className="text-gray-100">using ...</p>
            <p className="text-gray-100">to do ... for its user</p>
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