"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create stars - REDUCED COUNT for better performance
    const stars: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      twinkleDirection: boolean;
    }[] = [];

    // Reduce star count for better performance
    const starCount = 150; // Reduced from 300
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.05,
        twinkleSpeed: Math.random() * 0.01,
        twinkleDirection: Math.random() > 0.5,
      });
    }

    // Create nebulas (subtle colored areas) - REDUCED COUNT
    const nebulas: {
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
    }[] = [];

    const colors = [
      "rgba(111, 66, 193, 0.03)", // Purple (more subtle)
      "rgba(59, 130, 246, 0.03)", // Blue (more subtle)
    ];

    // Reduce nebula count
    for (let i = 0; i < 2; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.05, // More subtle
      });
    }

    // Create fixed shooting stars (not scroll-dependent)
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      progress: number;
      active: boolean;
      timeToNextActivation: number;
    }[] = [];

    // Create 2 shooting stars that will activate periodically
    for (let i = 0; i < 2; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
        length: Math.random() * 80 + 100,
        speed: 2 + Math.random() * 3,
        angle: (Math.PI / 4) * (1 + Math.random()),
        progress: 0,
        active: false,
        timeToNextActivation: Math.random() * 5000 + 2000, // Random time between 2-7 seconds
      });
    }

    // Last frame timestamp for animation timing
    let lastFrameTime = 0;

    // Animation
    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulas
      nebulas.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw stars
      stars.forEach((star) => {
        // Twinkle effect
        if (star.twinkleDirection) {
          star.opacity += star.twinkleSpeed;
          if (star.opacity >= 1) {
            star.twinkleDirection = false;
          }
        } else {
          star.opacity -= star.twinkleSpeed;
          if (star.opacity <= 0.2) {
            star.twinkleDirection = true;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Add glow to some stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.2})`;
          ctx.fill();
        }

        // Move stars
        star.y += star.speed;

        // Reset stars when they go off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Update and draw shooting stars
      shootingStars.forEach((star) => {
        if (star.active) {
          // Update position
          star.progress += star.speed * (deltaTime / 16); // Normalize by 16ms (60fps)

          // Calculate current position
          const currentX = star.x + Math.cos(star.angle) * star.progress;
          const currentY = star.y + Math.sin(star.angle) * star.progress;

          // Draw shooting star
          const tailLength = 20; // Reduced from 30
          for (let i = 0; i < tailLength; i++) {
            const opacity = 1 - i / tailLength;

            ctx.beginPath();
            ctx.moveTo(
              currentX - i * Math.cos(star.angle) * 2,
              currentY - i * Math.sin(star.angle) * 2
            );
            ctx.lineTo(
              currentX - (i + 1) * Math.cos(star.angle) * 2,
              currentY - (i + 1) * Math.sin(star.angle) * 2
            );
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Draw star head
          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, 1)`;
          ctx.fill();

          // Check if star has moved off screen
          if (currentX > canvas.width || currentY > canvas.height) {
            star.active = false;
            star.progress = 0;
            star.timeToNextActivation = Math.random() * 5000 + 2000;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * (canvas.height / 3);
            star.angle = (Math.PI / 4) * (1 + Math.random());
          }
        } else {
          // Count down to next activation
          star.timeToNextActivation -= deltaTime;
          if (star.timeToNextActivation <= 0) {
            star.active = true;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
