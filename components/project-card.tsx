"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string; // Add url property
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-300 border border-gray-700/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  // If URL exists, wrap the content in a clickable Link
  return project.url ? (
    <Link href={project.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="cursor-pointer bg-gray-900/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/70 transition-all duration-300 group"
      >
        {cardContent}
      </motion.div>
    </Link>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/70 transition-all duration-300 group"
    >
      {cardContent}
    </motion.div>
  );
}
