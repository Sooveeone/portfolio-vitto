"use client";

import { motion } from "framer-motion";
import { useId } from "react"; // Add this import

export function Planet({ className }: { className?: string }) {
  // Generate unique IDs for each SVG element
  const id = useId();
  const planetGradientId = `planetGradient-${id}`;
  const glowId = `glow-${id}`;
  const ringGradientId = `ringGradient-${id}`;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className={className}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient
            id={planetGradientId}
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id={ringGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.7)" />
            <stop offset="50%" stopColor="rgba(167, 139, 250, 0.3)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.7)" />
          </linearGradient>
        </defs>

        {/* Planet */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill={`url(#${planetGradientId})`}
          filter={`url(#${glowId})`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Rings */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="90"
          ry="30"
          fill="none"
          stroke={`url(#${ringGradientId})`}
          strokeWidth="3"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Craters */}
        <circle cx="70" cy="80" r="10" fill="rgba(76, 29, 149, 0.7)" />
        <circle cx="120" cy="110" r="15" fill="rgba(76, 29, 149, 0.7)" />
        <circle cx="90" cy="130" r="8" fill="rgba(76, 29, 149, 0.7)" />

        {/* Surface details */}
        <path
          d="M50,100 Q70,70 100,80 T150,100"
          fill="none"
          stroke="rgba(167, 139, 250, 0.5)"
          strokeWidth="2"
        />
        <path
          d="M60,120 Q80,150 120,140 T160,110"
          fill="none"
          stroke="rgba(167, 139, 250, 0.5)"
          strokeWidth="2"
        />

        {/* Small moons */}
        <motion.circle
          cx="160"
          cy="70"
          r="8"
          fill="#A78BFA"
          animate={{
            cx: [160, 170, 160, 150, 160],
            cy: [70, 80, 90, 80, 70],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.circle
          cx="40"
          cy="130"
          r="5"
          fill="#C4B5FD"
          animate={{
            cx: [40, 30, 40, 50, 40],
            cy: [130, 140, 150, 140, 130],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </svg>
    </motion.div>
  );
}

export function Rocket({ className }: { className?: string }) {
  // Generate unique IDs for each SVG element
  const id = useId();
  const rocketBodyId = `rocketBody-${id}`;
  const rocketWindowId = `rocketWindow-${id}`;
  const flameGlowId = `flameGlow-${id}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={className}
    >
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id={rocketBodyId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient
            id={rocketWindowId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <filter id={flameGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Rocket Body */}
        <path
          d="M100,30 L130,100 L130,150 C130,160 120,170 100,170 C80,170 70,160 70,150 L70,100 Z"
          fill={`url(#${rocketBodyId})`}
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Rocket Nose */}
        <path
          d="M100,30 C115,50 115,50 130,100 L70,100 C85,50 85,50 100,30 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Window */}
        <circle
          cx="100"
          cy="80"
          r="15"
          fill={`url(#${rocketWindowId})`}
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Fins */}
        <path
          d="M70,120 L40,150 L70,150 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="2"
        />
        <path
          d="M130,120 L160,150 L130,150 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Flames */}
        <motion.g
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.8, 1, 0.7, 0.9, 0.8],
          }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          filter={`url(#${flameGlowId})`}
        >
          <path d="M85,170 Q100,200 115,170" fill="#F97316" stroke="none" />
          <path d="M90,170 Q100,190 110,170" fill="#FBBF24" stroke="none" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
