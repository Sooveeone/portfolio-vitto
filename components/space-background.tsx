"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  floatX: number;
  floatY: number;
  duration: number;
  x: number; // Actual x position in pixels
  y: number; // Actual y position in pixels
}

interface Meteor {
  id: number;
  active: boolean;
  top: number;
  left: number;
}

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Create stars with pixel positions
  const createStar = useCallback(
    (id: number, containerWidth: number, containerHeight: number): Star => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      return {
        id,
        top,
        left,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.005 + 0.002,
        floatX: Math.random() * 2 - 1,
        floatY: Math.random() * 2 - 1,
        duration: Math.random() * 3 + 4,
        x: (left / 100) * containerWidth,
        y: (top / 100) * containerHeight,
      };
    },
    []
  );

  // Initialize stars and meteors
  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const newStars = Array.from({ length: 150 }, (_, i) =>
      createStar(i, containerWidth, containerHeight)
    );
    setStars(newStars);

    const initialMeteors = Array.from({ length: 2 }, (_, i) => ({
      id: i,
      active: false,
      top: Math.random() * 50,
      left: -10,
    }));
    setMeteors(initialMeteors);

    // Update star positions on window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: (star.left / 100) * newWidth,
          y: (star.top / 100) * newHeight,
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [createStar]);

  // Trigger meteors periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMeteors((prev) => {
        const newState = [...prev];
        const inactiveIndex = newState.findIndex((meteor) => !meteor.active);

        if (inactiveIndex !== -1) {
          newState[inactiveIndex] = {
            ...newState[inactiveIndex],
            active: true,
            top: Math.random() * 50,
          };

          setTimeout(() => {
            setMeteors((current) => {
              const resetState = [...current];
              resetState[inactiveIndex] = {
                ...resetState[inactiveIndex],
                active: false,
              };
              return resetState;
            });
          }, 8000);
        }

        return newState;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate distance between mouse and each star
  const getStarBrightness = (star: Star) => {
    const distance = Math.sqrt(
      Math.pow(star.x - mousePosition.x, 2) +
        Math.pow(star.y - mousePosition.y, 2)
    );

    // Influence radius (px) - adjust as needed
    const influenceRadius = 150;

    if (distance < influenceRadius) {
      // Calculate brightness boost based on proximity
      const proximityFactor = 1 - distance / influenceRadius;
      // Boost opacity and add glow effect
      return {
        opacity: Math.min(1, star.opacity + proximityFactor * 0.7),
        boxShadow: `0 0 ${5 + proximityFactor * 15}px ${
          proximityFactor * 5
        }px rgba(255, 255, 255, ${0.3 + proximityFactor * 0.7})`,
        transform: `scale(${1 + proximityFactor * 0.5})`,
      };
    }

    // Default state
    return {
      opacity: star.opacity,
      boxShadow: "none",
      transform: "scale(1)",
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {stars.map((star) => {
        const { opacity, boxShadow, transform } = getStarBrightness(star);

        return (
          <motion.div
            key={star.id}
            style={{
              position: "absolute",
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity,
              boxShadow,
              transform,
              transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            animate={{
              x: [0, star.floatX * 20, 0],
              y: [0, star.floatY * 20, 0],
            }}
            transition={{
              x: {
                duration: star.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              y: {
                duration: star.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}

      {meteors.map(
        (meteor) =>
          meteor.active && (
            <motion.div
              key={`meteor-${meteor.id}`}
              style={{
                position: "absolute",
                top: `${meteor.top}%`,
                left: `${meteor.left}%`,
                width: "3px",
                height: "3px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.7)",
              }}
              animate={{
                x: ["0vw", "120vw"],
                y: ["0vh", "70vh"],
              }}
              transition={{
                duration: 8,
                ease: "easeIn",
              }}
            >
              {/* Meteor tail */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  width: "100px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.81) 0%, rgba(234, 238, 25, 0) 100%)",
                  transformOrigin: "right center",
                }}
                animate={{
                  scaleX: [0.3, 1],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.1,
                }}
              />
            </motion.div>
          )
      )}
    </div>
  );
}
