"use client";

import React, { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  time: number;
  dist: number;
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

    const MAX_NODES = 5; // Sparse max active nodes
    const MIN_DISTANCE = 45; // min pixels moved to log a new node
    const MIN_TIME_GAP = 90; // min ms gap between node logging
    const FADE_DURATION = 750; // ms node lifetime (quick clearing)
    const WAVELENGTH = 45; // px for delicate weave oscillation cycle
    const BASE_WIDTH = 7; // subtle weave ribbon half-width in px (14px peak-to-peak separation)

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

      let cumDist = 0;
      if (nodes.length > 0) {
        const lastNode = nodes[nodes.length - 1];
        const stepDist = Math.hypot(x - lastNode.x, y - lastNode.y);
        const timeGap = now - lastNode.time;
        if (stepDist < MIN_DISTANCE || timeGap < MIN_TIME_GAP) return;
        cumDist = lastNode.dist + stepDist;
      }

      nodes.push({ x, y, time: now, dist: cumDist });

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
        // Prepare Segment Offsets for Dual-Strand Weave (Layer 3) & Apex Convergence (Layer 4)
        const pointsStrandA: { x: number; y: number; alpha: number; isOver: boolean }[] = [];
        const pointsStrandB: { x: number; y: number; alpha: number; isOver: boolean }[] = [];

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const alpha = Math.max(0, 1 - (now - n.time) / FADE_DURATION);

          if (i === 0 || i === nodes.length - 1) {
            // LAYER 4: Convergence — Endpoints converge to single apex node point
            pointsStrandA.push({ x: n.x, y: n.y, alpha, isOver: true });
            pointsStrandB.push({ x: n.x, y: n.y, alpha, isOver: false });
            continue;
          }

          const prev = nodes[i - 1];
          const next = nodes[i + 1];

          // Tangent & Normal vectors along the motion path
          const vx = next.x - prev.x;
          const vy = next.y - prev.y;
          const len = Math.hypot(vx, vy);

          if (len < 0.001) {
            pointsStrandA.push({ x: n.x, y: n.y, alpha, isOver: true });
            pointsStrandB.push({ x: n.x, y: n.y, alpha, isOver: false });
            continue;
          }

          const nx = -vy / len;
          const ny = vx / len;

          // LAYER 4: Convergence Factor — calculate turn angle / speed deceleration
          const v1x = n.x - prev.x;
          const v1y = n.y - prev.y;
          const v2x = next.x - n.x;
          const v2y = next.y - n.y;
          const a1 = Math.atan2(v1y, v1x);
          const a2 = Math.atan2(v2y, v2x);
          let turnAngle = Math.abs(a2 - a1);
          if (turnAngle > Math.PI) turnAngle = 2 * Math.PI - turnAngle;

          // If turn angle is sharp (> 50 deg), converge strands together (Apex pinch)
          let convergenceWidth = BASE_WIDTH;
          if (turnAngle > 0.872665) {
            // 50 degrees
            convergenceWidth = BASE_WIDTH * 0.15; // Pinch strands together at sharp turn apex
          }

          // LAYER 3: Interlacing Dual-Strand Weave Offset Calculation
          const phase = (n.dist / WAVELENGTH) * 2 * Math.PI;
          const offset = Math.sin(phase) * convergenceWidth;

          // Strand A & Strand B oppose each other in exact counter-phase
          const ax = n.x + nx * offset;
          const ay = n.y + ny * offset;
          const bx = n.x - nx * offset;
          const by = n.y - ny * offset;

          // Deterministic Over/Under determination based on cosine phase derivative
          const isOver = Math.cos(phase) >= 0;

          pointsStrandA.push({ x: ax, y: ay, alpha, isOver });
          pointsStrandB.push({ x: bx, y: by, alpha, isOver: !isOver });
        }

        // =========================================================
        // RENDER LAYER 2: Primary Central Path Spine (Subtle guide)
        // =========================================================
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < nodes.length; i++) {
          const p1 = nodes[i - 1];
          const p2 = nodes[i];
          const alpha = Math.max(0, 1 - (now - p2.time) / FADE_DURATION);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 158, 115, ${0.08 * alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();

        // =========================================================
        // RENDER LAYER 3 & LAYER 4: Sparse Interlaced Dual-Strand Weave
        // =========================================================
        const renderStrandSegment = (
          p1: { x: number; y: number; alpha: number; isOver: boolean },
          p2: { x: number; y: number; alpha: number; isOver: boolean },
          isOverStrand: boolean
        ) => {
          const segAlpha = (p1.alpha + p2.alpha) / 2;
          if (segAlpha <= 0) return;

          const cpX = (p1.x + p2.x) / 2;
          const cpY = (p1.y + p2.y) / 2;

          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (isOverStrand) {
            // OVER STRAND: Light drop shadow + Delicate Emerald Strand (1.8px wide)
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
            ctx.strokeStyle = `rgba(10, 15, 12, ${0.25 * segAlpha})`;
            ctx.lineWidth = 3.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 160, 115, ${0.90 * segAlpha})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          } else {
            // UNDER STRAND: Soft Muted Emerald Strand (1.5px wide)
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 130, 95, ${0.65 * segAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          ctx.restore();
        };

        // Draw Under Segments for Strand A & Strand B
        for (let i = 1; i < pointsStrandA.length; i++) {
          if (!pointsStrandA[i].isOver) {
            renderStrandSegment(pointsStrandA[i - 1], pointsStrandA[i], false);
          }
          if (!pointsStrandB[i].isOver) {
            renderStrandSegment(pointsStrandB[i - 1], pointsStrandB[i], false);
          }
        }

        // Draw Over Segments for Strand A & Strand B (with shadow masks)
        for (let i = 1; i < pointsStrandA.length; i++) {
          if (pointsStrandA[i].isOver) {
            renderStrandSegment(pointsStrandA[i - 1], pointsStrandA[i], true);
          }
          if (pointsStrandB[i].isOver) {
            renderStrandSegment(pointsStrandB[i - 1], pointsStrandB[i], true);
          }
        }

        // =========================================================
        // RENDER LAYER 1: Sparse Glowing Node Apex Marks
        // =========================================================
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const nodeAlpha = Math.max(0, 1 - (now - n.time) / FADE_DURATION);
          if (nodeAlpha <= 0) continue;

          ctx.save();
          // Radial glow
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 5);
          grad.addColorStop(0, `rgba(0, 160, 115, ${0.60 * nodeAlpha})`);
          grad.addColorStop(1, `rgba(0, 160, 115, 0)`);

          ctx.beginPath();
          ctx.arc(n.x, n.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = grad;
          ctx.fill();

          // Node core dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.5, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.90 * nodeAlpha})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(0, 160, 115, ${0.70 * nodeAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
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
