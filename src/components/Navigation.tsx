"use client"

import Link from "next/link";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="space-x-6">
      <button
        onClick={() => scrollToSection('projects-section')}
        className="font-medium hover:text-gray-400 transition-colors"
      >
        Projects
      </button>
      <button
        onClick={() => scrollToSection('about-section')}
        className="font-medium hover:text-gray-400 transition-colors"
      >
        About
      </button>
      <button
        onClick={() => scrollToSection('contact-section')}
        className="font-medium hover:text-gray-400 transition-colors"
      >
        Contact
      </button>
      
    </nav>
  );
} 