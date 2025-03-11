import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="p-6 flex justify-between items-center border-b">
            <div>
              <Link href="/" aria-label="Home">
                <div className="h-8 w-8 rounded-full bg-red-500" />
              </Link>
            </div>
            <nav className="space-x-6">
              <Link href="/projects" className="font-medium hover:text-gray-600 transition-colors">
                Projects
              </Link>
              <Link href="/about" className="font-medium hover:text-gray-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="font-medium hover:text-gray-600 transition-colors">
                Contact
              </Link>
            </nav>
          </header>
          
          <main className="flex-grow relative overflow-hidden">
            {/* Orange puzzle piece decorative elements */}
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-orange-400 rounded-tr-full z-0" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400 rounded-bl-full z-0" />
            
            <div className="relative z-10">
              {children}
            </div>
          </main>
          
          <footer className="p-4 border-t text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Nachiket Pandit. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}