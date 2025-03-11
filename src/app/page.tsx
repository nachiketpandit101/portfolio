"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [text, setText] = useState("");
  const fullName = "Nachiket Pandit";
 
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        setText(fullName.substring(0, index + 1));
        index += 1;
      } else {
        clearInterval(interval); // Stop when we reach the end of the name
      }
    }, 150); // Adjust typing speed here
    return () => clearInterval(interval); // Cleanup when component unmounts
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6 flex items-center">
            <span>{text}</span>
            <span className="animate-blink">|</span> {/* This creates the typing cursor effect */}
          </h1>
         
          <div className="bg-gray-100 p-4 rounded-md mb-8">
            <p className="text-gray-800">
              I am a full stack developer studying at the University of Texas at Dallas.
              I have had the pleasure to work on various projects and parts of organizations
              so far. Check out my projects and experiences below!
            </p>
          </div>
         
          <div className="mb-8">
            <h2 className="text-lg mb-2">I am currently working on ...</h2>
            <ul className="list-disc pl-5">
              <li>Last updated set up API here</li>
            </ul>
          </div>
         
          <div className="bg-gray-200 h-64 w-full rounded-md flex items-center justify-center text-gray-500">
            Project Preview
          </div>
        </div>
       
        <div className="space-y-6">
          <div>
            <h3 className="text-xl mb-2">This will do</h3>
            <p className="text-gray-700">using ...</p>
            <p className="text-gray-700">to do ... for its user</p>
          </div>
         
          <div className="mt-8">
            <Link
              href="/projects"
              className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}