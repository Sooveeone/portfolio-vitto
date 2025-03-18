"use client";

import { useEffect, useState, useCallback } from "react";
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

  const createStar = useCallback(
    (id: number): Star => ({
      id,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.005 + 0.002,
      floatX: Math.random() * 2 - 1, // Random value between -1 and 1
      floatY: Math.random() * 2 - 1, // Random value between -1 and 1
      duration: Math.random() * 3 + 4, // Random duration between 4 and 7 seconds
    }),
    []
  );

  useEffect(() => {
    const newStars = Array.from({ length: 150 }, (_, i) => createStar(i));
    setStars(newStars);

    const initialMeteors = Array.from({ length: 2 }, (_, i) => ({
      id: i,
      active: false,
      top: Math.random() * 50,
      left: -10,
    }));
    setMeteors(initialMeteors);

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
  }, [createStar]);

  useEffect(() => {
    const twinkleInterval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          opacity: Math.max(
            0.3,
            Math.min(
              0.8,
              star.opacity + (Math.random() - 0.5) * star.twinkleSpeed
            )
          ),
        }))
      );
    }, 100);

    return () => clearInterval(twinkleInterval);
  }, []);

  return (
    <div
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
      {stars.map((star) => (
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
          }}
          animate={{
            opacity: star.opacity,
            x: [0, star.floatX * 20, 0], // Move 20px in random direction
            y: [0, star.floatY * 20, 0], // Move 20px in random direction
          }}
          transition={{
            opacity: {
              duration: 2,
              ease: "easeInOut",
            },
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
      ))}

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
