"use client";

import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

export function Globe({ className }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const rotation = useRef(0.3);
  const animationRef = useRef(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1);

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
      }
      return { w, h, cx: w / 2, cy: h / 2, r: Math.min(w, h) * 0.4 };
    };

    let size = setSize();

    function draw() {
      if (!ctx || !canvasRef.current) return;
      size = setSize();
      const { cx, cy, r: radius } = size;
      const phi = rotation.current + rs.get();

      ctx.clearRect(0, 0, size.w, size.h);

      const latBands = 24;
      const longBands = 36;
      const wireColor = "rgba(87, 219, 150, 0.4)";
      const fillColor = "rgba(51, 194, 204, 0.08)";

      for (let lat = 0; lat <= latBands; lat++) {
        const theta = (lat * Math.PI) / latBands;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        ctx.beginPath();
        for (let long = 0; long <= longBands; long++) {
          const phiCur = (long * 2 * Math.PI) / longBands + phi;
          const x = cx + radius * sinT * Math.cos(phiCur);
          const y = cy + radius * cosT;
          if (long === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let long = 0; long <= longBands; long++) {
        const phiCur = (long * 2 * Math.PI) / longBands + phi;
        ctx.beginPath();
        for (let lat = 0; lat <= latBands; lat++) {
          const theta = (lat * Math.PI) / latBands;
          const x = cx + radius * Math.sin(theta) * Math.cos(phiCur);
          const y = cy + radius * Math.cos(theta);
          if (lat === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wireColor;
        ctx.stroke();
      }

      if (!pointerInteracting.current) {
        rotation.current += 0.002;
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [rs]);

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
