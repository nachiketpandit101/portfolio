"use client"

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: React.ReactNode;
  external: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:nachiketpandit101@gmail.com',
    handle: 'nachiketpandit101@gmail.com',
    icon: <Mail className="w-5 h-5" strokeWidth={1.75} />,
    external: false
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nachiket-pandit-80050b2b2/',
    handle: 'linkedin.com/in/nachiket-pandit',
    icon: <Linkedin className="w-5 h-5" strokeWidth={1.75} />,
    external: true
  },
  {
    name: 'GitHub',
    url: 'https://github.com/nachiketpandit101',
    handle: 'github.com/nachiketpandit101',
    icon: <Github className="w-5 h-5" strokeWidth={1.75} />,
    external: true
  }
];

export default function Contact() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="contact-section" className="mt-32 mb-16">
      <motion.div
        className="text-center mb-12"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[#72E6FF]/80 font-medium mb-3">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-white mb-3">Lets Talk</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : index * 0.1 }}
          >
            <Link
              href={link.url}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group relative block h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150 p-5 text-gray-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_0_0_rgba(255,255,255,0.05),inset_0_0_20px_rgba(255,255,255,0.04),0_8px_32px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-[#72E6FF]/30 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(255,255,255,0.08),inset_0_0_24px_rgba(255,255,255,0.06),0_10px_40px_-8px_rgba(0,0,0,0.7),0_0_32px_-6px_rgba(114,230,255,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#72E6FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.02] to-transparent" />
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-56 -translate-x-1/2 rounded-full bg-[#72E6FF]/20 blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#72E6FF]/10 text-[#72E6FF] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                  {link.icon}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-[#72E6FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>

              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-1">{link.name}</h3>
                <p className="text-sm text-gray-400 truncate transition-colors group-hover:text-gray-200">
                  {link.handle}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
