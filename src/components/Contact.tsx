"use client"

import { useState } from 'react';
import Link from 'next/link';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  hoverColor: string;
}

export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: '✉️',
      color: 'bg-red-500/20',
      hoverColor: 'bg-red-500/30'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: '💼',
      color: 'bg-blue-500/20',
      hoverColor: 'bg-blue-500/30'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: '💻',
      color: 'bg-gray-500/20',
      hoverColor: 'bg-gray-500/30'
    }
  ];

  return (
    <div id="contact-section" className="mt-32 mb-16">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">Get in Touch</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target={link.name === 'Email' ? '_self' : '_blank'}
              rel={link.name === 'Email' ? '' : 'noopener noreferrer'}
              className="group relative"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div className={`
                p-6 rounded-lg transition-all duration-300
                ${hoveredLink === link.name ? link.hoverColor : link.color}
                backdrop-blur-sm
                transform hover:scale-105
                border border-white/10
              `}>
                <div className="text-4xl mb-4">{link.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{link.name}</h3>
                <div className="text-gray-300 text-sm">
                  {link.name === 'Email' ? 'your.email@example.com' : 
                   link.name === 'LinkedIn' ? 'linkedin.com/in/yourprofile' : 
                   'github.com/yourusername'}
                </div>
                
                {/* Hover effect line */}
                <div className={`
                  absolute bottom-0 left-0 h-0.5 bg-white
                  transition-all duration-300
                  ${hoveredLink === link.name ? 'w-full' : 'w-0'}
                `}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 