"use client";

import { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "@/components/project-card";
import SpaceBackground from "@/components/space-background";
import { Planet, Rocket } from "@/components/space-animations";

export default function Portfolio() {
  const ref = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Define language colors
  const languageColors = {
    English: "text-blue-500",
    Korean: "text-orange-500",
    Spanish: "text-green-500",
    Chinese: "text-white",
    Portuguese: "text-yellow-500",
    Hindi: "text-purple-500",
    German: "text-red-500",
    Dutch: "text-teal-500",
    Japanese: "text-pink-500",
    French: "text-indigo-400",
    Italian: "text-cyan-400",
    Indonesian: "text-emerald-400",
  };

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform built with Next.js and Stripe",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Weather App",
      description: "A weather application that shows real-time weather data",
      tags: ["React", "OpenWeather API", "CSS"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Task Management System",
      description:
        "A collaborative task management system with real-time updates",
      tags: ["React", "Firebase", "Material UI"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my projects and skills",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      {/* Hero Section */}
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <motion.div
          style={{ opacity, scale }}
          className="container max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1 space-y-6 text-center md:text-left relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi! I&apos;m Vitto.
            </h1>
            <div className="text-2xl md:text-4xl font-medium">
              <span>I think I am a </span>
              <span className={`font-bold ${languageColors[currentLanguage]}`}>
                <TypeAnimation
                  sequence={[
                    // Text, delay, callback
                    "Developer!",
                    3000,
                    () => setCurrentLanguage("English"),
                    "개발자!",
                    3000,
                    () => setCurrentLanguage("Korean"),
                    "Desarrollador!",
                    3000,
                    () => setCurrentLanguage("Spanish"),
                    "开发者!",
                    3000,
                    () => setCurrentLanguage("Chinese"),
                    "Desenvolvedor!",
                    3000,
                    () => setCurrentLanguage("Portuguese"),
                    "डेवलपर!!",
                    3000,
                    () => setCurrentLanguage("Hindi"),
                    "Entwickler!",
                    3000,
                    () => setCurrentLanguage("German"),
                    "Ontwikkelaar!",
                    3000,
                    () => setCurrentLanguage("Dutch"),
                    "デベロッパー!",
                    3000,
                    () => setCurrentLanguage("Japanese"),
                    "Développeur!",
                    3000,
                    () => setCurrentLanguage("French"),
                    "Sviluppatore!",
                    3000,
                    () => setCurrentLanguage("Italian"),
                    "Pengembang!",
                    3000,
                    () => setCurrentLanguage("Indonesian"),
                  ]}
                  wrapper="span"
                  speed={30}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </span>
            </div>
          </div>

          {/* Hide on small screens, show on medium and up */}
          <div className="hidden md:block flex-1 relative h-[300px] w-full">
            <Planet className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48" />
            <Rocket className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48" />
          </div>

          {/* Show on small screens, hide on medium and up */}
          <div className="md:hidden absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <Planet className="absolute top-10 right-10 w-28 h-28" />
            <Rocket className="absolute bottom-32 left-10 w-28 h-28" />
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm text-gray-400">
              Scroll down to see my projects
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto mt-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
