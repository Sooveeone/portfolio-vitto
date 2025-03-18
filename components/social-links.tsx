"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SocialLinksProps {
  linkedinUrl: string;
  githubUrl: string;
  className?: string;
}

export default function SocialLinks({
  linkedinUrl,
  githubUrl,
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex gap-6 ${className}`}>
      {/* LinkedIn */}
      <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:scale-110 transition-transform duration-300"
          whileHover={{
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))",
          }}
        >
          {/* Cosmic background circle */}
          <motion.circle
            cx="25"
            cy="25"
            r="23"
            fill="none"
            stroke="url(#linkedinGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* LinkedIn custom logo */}
          <path
            d="M15 21v15M15 17.5c0 .828-.672 1.5-1.5 1.5S12 18.328 12 17.5 12.672 16 13.5 16s1.5.672 1.5 1.5zM22 27v9M22 21v3M35 36V26c0-2-1-5-4.5-5S26 24 26 26v10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
          />

          {/* Glowing gradient */}
          <defs>
            <linearGradient
              id="linkedinGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0A66C2" />
              <stop offset="50%" stopColor="#00A0DC" />
              <stop offset="100%" stopColor="#0A66C2" />
            </linearGradient>
          </defs>

          {/* Stars */}
          <g className="stars">
            <circle cx="10" cy="10" r="1" fill="white" />
            <circle cx="40" cy="40" r="1" fill="white" />
            <circle cx="40" cy="10" r="1" fill="white" />
            <circle cx="10" cy="40" r="1" fill="white" />
          </g>
        </motion.svg>
      </Link>

      {/* GitHub */}
      <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:scale-110 transition-transform duration-300"
          whileHover={{
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))",
          }}
        >
          {/* Cosmic background circle */}
          <motion.circle
            cx="25"
            cy="25"
            r="23"
            fill="none"
            stroke="url(#githubGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ rotate: -360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* GitHub custom logo */}
          <path
            d="M25 12c-7.2 0-13 5.8-13 13 0 5.8 3.7 10.7 8.9 12.4.7.1.9-.3.9-.6v-2.2c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.3 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.3 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.6 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.9-3 6-5.9 6.3.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.9.6 5.2-1.7 8.9-6.6 8.9-12.4 0-7.2-5.8-13-13-13z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
          />

          {/* Glowing gradient */}
          <defs>
            <linearGradient
              id="githubGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6E5494" />
              <stop offset="50%" stopColor="#9F7BE1" />
              <stop offset="100%" stopColor="#6E5494" />
            </linearGradient>
          </defs>

          {/* Stars */}
          <g className="stars">
            <circle cx="15" cy="15" r="1" fill="white" />
            <circle cx="35" cy="35" r="1" fill="white" />
            <circle cx="35" cy="15" r="1" fill="white" />
            <circle cx="15" cy="35" r="1" fill="white" />
          </g>
        </motion.svg>
      </Link>
    </div>
  );
}
