"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      url: 'mailto:nachiketpandit101@gmail.com',
      icon: <Mail className="w-8 h-8" />,
      color: 'bg-red-500/20',
      hoverColor: 'bg-red-500/30'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nachiket-pandit-80050b2b2/',
      icon: <Linkedin className="w-8 h-8" />,
      color: 'bg-blue-500/20',
      hoverColor: 'bg-blue-500/30'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/nachiketpandit101',
      icon: <Github className="w-8 h-8" />,
      color: 'bg-green-500/20',
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
                h-[200px] w-full
                flex flex-col justify-between
              `}>
                <div>
                  <div className="text-white mb-4">{link.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{link.name}</h3>
                  <div className="text-gray-300 text-sm">
                    {link.name === 'Email' ? 'nachiketpandit101@gmail.com' : 
                     link.name === 'LinkedIn' ? 'linkedin.com/in/nachiket-pandit-80050b2b2' : 
                     'github.com/nachiketpandit'}
                  </div>
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