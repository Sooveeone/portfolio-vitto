"use client";

import { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "@/components/project-card";
import SpaceBackground from "@/components/space-background";
import { Planet, Rocket } from "@/components/space-animations";
import SocialLinks from "@/components/social-links";

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
    English: "text-teal-500",
    Korean: "text-orange-500",
    Spanish: "text-green-500",
    Chinese: "text-zinc-500",
    Portuguese: "text-yellow-500",
    Hindi: "text-purple-500",
    German: "text-red-500",
    Dutch: "text-teal-500",
    Japanese: "text-pink-500",
    French: "text-indigo-400",
    Italian: "text-cyan-400",
    Indonesian: "text-purple-500",
  };

  const projects = [
    {
      id: 1,
      title: "Drift",
      description: "Drift transforms your big goals into manageable steps and builds a personalized daily schedule to keep you on track. As you make progress, the Achievement Archive captures and celebrates every milestone, motivating you to keep moving forward.",
      tags: ["React", "TypeScript", "Tailwind CSS", "MongoDB","Express.js","Node.js","AWS S3", "Qdrant", "RAG", "LangChain"],
      image: "/drift-background.jpg",
      url: "https://github.com/Sooveeone/drift",
    },
    {
      id: 2,
      title: "Formify",
      description:
        "Transform form-filling with Formify: effortlessly convert voice to text in real time, streamlining tasks for finance, healthcare, education and more with enhanced accuracy, saving you time!",
      tags: [
        "React",
        "WebSockets",
        "Python",
        "OpenAI",
        "Django",
        "Tailwind CSS",
        "Whisper",
        "SQL",
      ],
      image: "/Formify.png",
      url: "https://devpost.com/software/formify-1kzunp",
    },
    {
      id: 3,
      title: "vicode",
      description: "Computer Science Theory-Based Learning Platform",
      tags: [
        "Next.js",
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Typescript",
        "GSAP",
        "Tailwind CSS",
      ],
      image: "/vicode.png",
      url: "https://www.vicode.live",
    },
    {
      id: 4,
      title: "Pushy",
      description: "Git Reimplemented in Dash, Shell Programming.",
      tags: ["Shell Programming", "Bash", "Scripting", "Linux"],
      image: "/pushy.png",
      url: "https://github.com/Sooveeone/Pushy",
    },
    {
      id: 5,
      title: "Google Search Algorithm",
      description:
        "A Google-inspired search engine simulator implementing PageRank and an inverted index for efficient web ranking and retrieval.",
      tags: ["C", "Data Structures", "Algorithms"],
      image: "/DSA3.png",
      url: "https://github.com/Sooveeone/google-search-algo",
    },
    {
      id: 6,
      title: "Airtable Clone",
      description: "This is a modern Airtable clone built with the T3 Stack. It allows users to create and manage bases, tables, rows, and columns with an interface inspired by Airtable. The goal of this project is to showcase a performant full-stack application with clean architecture, optimized rendering, and a smooth user experience with very large datasets.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "tRPC", "Prisma", "Zod", "PostgreSQL", "React Query"],
      image: "/airtable-logo.png",
      url: "https://github.com/Sooveeone/airtable-clone",
    },
    {
      id: 7,
      title: "Presto: Presentation Application",
      description:
        "Worked in a team of two to design and develop a presentation web application.",
      tags: ["React.js", "Javascript", "HTML", "CSS", "Auth"],
      image: "/presto.png",
      url: "https://github.com/Sooveeone/unsw-presto",
    },  
    {
      id: 8,
      title: "Blackout Controller: Simple Satellite Communication Simulator",
      description:
        "Developed the backend for a Java-based satellite communication simulation, applying Object-Oriented Programming principles.",
      tags: ["Java", "UML Diagram", "Object-oriented programming"],
      image: "/2511.png",
      url: "https://github.com/Sooveeone/B-Controller",
    },
    {
      id: 9,
      title: "Discussion Forum over UDP/TCP",
      description: "Built a multi-threaded Python forum system using UDP for command processing with custom reliability protocols, and TCP for file transfers. Implemented application-layer sequence numbering and retransmission for reliable UDP communication while supporting concurrent users and discussion thread management.",
      tags: ["UDP/TCP", "Socket Programming", "Python"],
      image: "/3331ass.png",
      url: "https://github.com/Sooveeone/discussion-form",
    },
    {
      id: 10,
      title: "Academic Hub",
      description: "Academics have lots of spinning plates to keep track of: HDR students, journal papers, conference papers, deadlines, reviewing of journal papers, and undergraduate students. They also have to keep track of their metrics for things like grant proposals and award applications. The goal of this web application is to create an all-in-one web interface that allows academics to keep all of the relevant information in one place.",
      tags: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS", "TypeScript", "Docker"],
      image: "/academic-hub.jpg",
      url: "https://github.com/unsw-cse-comp99-3900/capstone-project-2025-t1-25t1-3900-h12b-celery",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <SpaceBackground />

      {/* Hero Section */}
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <motion.div
          style={{ opacity, scale }}
          className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-9"
        >
          <div className="flex-1 space-y-6 text-center md:text-left relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold font-sans">
              Hi! I&apos;m Vitto.
            </h1>
            <div className="text-2xl md:text-4xl font-medium whitespace-nowrap">
              <span className="inline-block">I think I am a&nbsp;</span>
              <span
                className={`font-bold inline-block min-w-[200px] md:min-w-[320px] ${
                  languageColors[currentLanguage as keyof typeof languageColors]
                }`}
              >
                <TypeAnimation
                  sequence={[
                    // Text, delay, callback - Set language BEFORE showing text
                    "Developer!",
                    3000,
                    () => setCurrentLanguage("Korean"),
                    "개발자!",
                    3000,
                    () => setCurrentLanguage("Spanish"),
                    "Desarrollador!",
                    3000,
                    () => setCurrentLanguage("Chinese"),
                    "开发者!",
                    3000,
                    () => setCurrentLanguage("Portuguese"),
                    "Desenvolvedor!",
                    3000,
                    () => setCurrentLanguage("Hindi"),
                    "डेवलपर!",
                    3000,
                    () => setCurrentLanguage("German"),
                    "Entwickler!",
                    3000,
                    () => setCurrentLanguage("Dutch"),
                    "Nhà phát triển!",
                    3000,
                    () => setCurrentLanguage("Japanese"),
                    "デベロッパー!",
                    3000,
                    () => setCurrentLanguage("French"),
                    "Développeur!",
                    3000,
                    () => setCurrentLanguage("Italian"),
                    "Sviluppatore!",
                    3000,
                    () => setCurrentLanguage("Indonesian"),
                    "مطور!",
                    3000,
                    () => setCurrentLanguage("English"),
                  ]}
                  wrapper="span"
                  speed={30}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </span>
            </div>
            <SocialLinks
              linkedinUrl="https://www.linkedin.com/in/vittorio-christian-worang-47a917229/"
              githubUrl="https://github.com/Sooveeone"
              className="flex justify-center md:justify-start"
            />
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
