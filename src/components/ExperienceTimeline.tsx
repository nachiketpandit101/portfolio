import { useState } from 'react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[400px]">
      {/* Central timeline line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 transform -translate-y-1/2"></div>
      
      {/* Timeline items */}
      <div className="flex justify-between items-center relative h-full">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Timeline dot */}
            <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-1/2 transform -translate-y-1/2"></div>
            
            {/* Connecting line */}
            <div className={`absolute w-0.5 bg-gray-600 ${
              index % 2 === 0 
                ? 'top-0 h-1/2' 
                : 'bottom-0 h-1/2'
            }`}></div>
            
            {/* Experience card */}
            <div
              className={`w-72 p-4 rounded-lg transition-all duration-300 absolute ${
                index % 2 === 0 
                  ? 'top-0 translate-y-[-100%]' 
                  : 'bottom-0 translate-y-[100%]'
              } ${
                hoveredIndex === index
                  ? 'bg-slate-800/90 backdrop-blur-sm scale-105 shadow-lg'
                  : 'bg-slate-800/60 backdrop-blur-sm'
              }`}
            >
              <div className="text-white">
                {/* Always visible content */}
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-bold mb-1">{experience.title}</h3>
                  <p className="text-sm text-gray-400">{experience.period}</p>
                </div>
                
                {/* Hover content */}
                <div className={`transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  <p className="text-gray-300 mb-2">{experience.company}</p>
                  <p className="text-gray-300 mb-3 text-sm">{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 