import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nachiket Pandit | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen bg-cover bg-center bg-no-repeat`} 
        style={{ backgroundImage: "url('/images/background.jpg')" }}>
        <div className="min-h-screen flex flex-col">
          <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center border-b border-gray-800 bg-black/40 backdrop-blur-sm z-50">
            <div>
              <Link href="/" aria-label="Home">
                <div className="h-8 w-8 rounded-full bg-red-500 overflow-hidden">
                  <Image 
                    src="/images/Nachiket pandit.png" 
                    alt="Logo" 
                    width={32} 
                    height={32} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
            <Navigation />
          </header>
         
          <main className="flex-grow relative overflow-hidden pt-24">
            {/* Bottom-left puzzle piece */}
            <div className="absolute bottom-0 left-0 w-96 h-96 z-0">
              <Image 
                src="/images/puzzlepiece.png" 
                alt="Puzzle piece decoration" 
                width={384} 
                height={384}
                className="object-contain"
              />
            </div>
            
            {/* Top-right puzzle piece */}
            <div className="absolute top-0 right-0 w-96 h-96 z-0">
              <Image 
                src="/images/puzzlepiece.png" 
                alt="Puzzle piece decoration" 
                width={384} 
                height={384}
                className="object-contain"
              />
            </div>
           
            <div className="relative z-10 p-4">
              {children}
            </div>
          </main>
         
          <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Nachiket Pandit
          </footer>
        </div>
      </body>
    </html>
  );
}