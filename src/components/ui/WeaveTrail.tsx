"use client";

import React, { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  time: number;
}

export default function WeaveTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Desktop-only and accessibility checks
    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number | null = null;
    const nodes: NodePoint[] = [];

    const MAX_NODES = 18;
    const MIN_DISTANCE = 14; // min pixels moved to log a new node
    const FADE_DURATION = 1200; // ms node lifetime
    const ANGLE_THRESHOLD = 0.785398; // 45 degrees in radians

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const x = e.clientX;
      const y = e.clientY;

      if (nodes.length > 0) {
        const lastNode = nodes[nodes.length - 1];
        const dist = Math.hypot(x - lastNode.x, y - lastNode.y);
        if (dist < MIN_DISTANCE) return;
      }

      nodes.push({ x, y, time: now });

      if (nodes.length > MAX_NODES) {
        nodes.shift();
      }

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const render = () => {
      const now = Date.now();

      // Filter expired nodes
      while (nodes.length > 0 && now - nodes[0].time > FADE_DURATION) {
        nodes.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (nodes.length >= 2) {
        // Draw strands
        for (let i = 1; i < nodes.length; i++) {
          const prevNode = nodes[i - 1];
          const currNode = nodes[i];

          const alphaA = Math.max(0, 1 - (now - prevNode.time) / FADE_DURATION);
          const alphaB = Math.max(0, 1 - (now - currNode.time) / FADE_DURATION);
          const segAlpha = (alphaA + alphaB) / 2;

          if (segAlpha <= 0) continue;

          let isWeaveTurn = false;
          let cpX = (prevNode.x + currNode.x) / 2;
          let cpY = (prevNode.y + currNode.y) / 2;
          let isOver = i % 2 === 0;

          if (i >= 2) {
            const nodePrev2 = nodes[i - 2];
            const v1x = prevNode.x - nodePrev2.x;
            const v1y = prevNode.y - nodePrev2.y;
            const v2x = currNode.x - prevNode.x;
            const v2y = currNode.y - prevNode.y;

            const len1 = Math.hypot(v1x, v1y);
            const len2 = Math.hypot(v2x, v2y);

            if (len1 > 0 && len2 > 0) {
              const a1 = Math.atan2(v1y, v1x);
              const a2 = Math.atan2(v2y, v2x);

              let angleDelta = Math.abs(a2 - a1);
              if (angleDelta > Math.PI) angleDelta = 2 * Math.PI - angleDelta;

              // Rule-based deterministic trigger: Turn angle >= 45 degrees
              if (angleDelta >= ANGLE_THRESHOLD) {
                isWeaveTurn = true;
                // Normal vector perpendicular to v2
                const nx = -v2y / len2;
                const ny = v2x / len2;
                const side = isOver ? 1 : -1;
                const offset = 18;

                cpX = (prevNode.x + currNode.x) / 2 + nx * offset * side;
                cpY = (prevNode.y + currNode.y) / 2 + ny * offset * side;
              }
            }
          }

          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (isWeaveTurn) {
            if (isOver) {
              // OVER strand: background shadow mask + vibrant green top strand
              ctx.beginPath();
              ctx.moveTo(prevNode.x, prevNode.y);
              ctx.quadraticCurveTo(cpX, cpY, currNode.x, currNode.y);
              ctx.strokeStyle = `rgba(10, 10, 10, ${0.35 * segAlpha})`;
              ctx.lineWidth = 6;
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(prevNode.x, prevNode.y);
              ctx.quadraticCurveTo(cpX, cpY, currNode.x, currNode.y);
              ctx.strokeStyle = `rgba(0, 158, 115, ${0.9 * segAlpha})`;
              ctx.lineWidth = 2.5;
              ctx.stroke();
            } else {
              // UNDER strand: deeper, slightly muted interlock strand
              ctx.beginPath();
              ctx.moveTo(prevNode.x, prevNode.y);
              ctx.quadraticCurveTo(cpX, cpY, currNode.x, currNode.y);
              ctx.strokeStyle = `rgba(0, 130, 95, ${0.65 * segAlpha})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          } else {
            // Straight / mild curve: natural smooth path
            ctx.beginPath();
            ctx.moveTo(prevNode.x, prevNode.y);
            ctx.quadraticCurveTo(cpX, cpY, currNode.x, currNode.y);
            ctx.strokeStyle = `rgba(0, 158, 115, ${0.7 * segAlpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          ctx.restore();
        }

        // Render Glowing Node Points
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const nodeAlpha = Math.max(0, 1 - (now - n.time) / FADE_DURATION);
          if (nodeAlpha <= 0) continue;

          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3.5, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(0, 158, 115, ${nodeAlpha})`;
          ctx.shadowColor = "rgba(0, 158, 115, 0.6)";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      }

      if (nodes.length > 0) {
        animFrameId = requestAnimationFrame(render);
      } else {
        animFrameId = null; // Auto stop RAF loop when idle and nodes have faded
      }
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40] w-full h-full"
      aria-hidden="true"
    />
  );
}
