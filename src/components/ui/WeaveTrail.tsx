"use client";

import React, { useEffect, useRef } from "react";

type ElementType =
  | "node"
  | "ring_node"
  | "arc"
  | "connector"
  | "geomark"
  | "double_strand"
  // 18 Canonical Service Icons
  | "service_compass"
  | "service_shield"
  | "service_cpu"
  | "service_layers"
  | "service_milestone"
  | "service_user_check"
  | "service_code"
  | "service_refresh"
  | "service_store"
  | "service_layout"
  | "service_zap"
  | "service_lock"
  | "service_search"
  | "service_sparkles"
  | "service_map_pin"
  | "service_share"
  | "service_workflow"
  | "service_database";

interface EjectedElement {
  id: number;
  type: ElementType;
  x: number;
  y: number;
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  spawnTime: number;
  lifetime: number;
  size: number;
  weaveTargetId?: number;
  convergeTarget?: { x: number; y: number };
}

export default function WeaveTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number | null = null;
    let nextId = 1;
    const elements: EjectedElement[] = [];

    const MAX_ELEMENTS = 7;
    const MIN_DISTANCE = 40; // px mouse travel required to eject
    const MIN_TIME_GAP = 90; // ms min interval
    const LIFETIME = 800; // ms lifecycle duration

    let lastSpawnTime = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let spawnCount = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const mx = e.clientX;
      const my = e.clientY;

      if (lastMouseX === 0 && lastMouseY === 0) {
        lastMouseX = mx;
        lastMouseY = my;
        lastSpawnTime = now;
        return;
      }

      const dist = Math.hypot(mx - lastMouseX, my - lastMouseY);
      const timeGap = now - lastSpawnTime;

      if (dist < MIN_DISTANCE || timeGap < MIN_TIME_GAP) return;

      lastMouseX = mx;
      lastMouseY = my;
      lastSpawnTime = now;

      // Filter out expired elements before capping
      while (elements.length > 0 && now - elements[0].spawnTime > LIFETIME) {
        elements.shift();
      }

      if (elements.length >= MAX_ELEMENTS) {
        elements.shift();
      }

      // Eject element at randomized 20-40px radial offset from cursor
      const offsetAngle = Math.random() * 2 * Math.PI;
      const offsetRadius = 20 + Math.random() * 20; // 20-40px offset
      const spawnX = mx + Math.cos(offsetAngle) * offsetRadius;
      const spawnY = my + Math.sin(offsetAngle) * offsetRadius;

      // 24 Total Varieties: 6 Geometric Shapes + 18 Canonical Service Icons
      const types: ElementType[] = [
        "node",
        "ring_node",
        "arc",
        "connector",
        "geomark",
        "double_strand",
        "service_compass",
        "service_shield",
        "service_cpu",
        "service_layers",
        "service_milestone",
        "service_user_check",
        "service_code",
        "service_refresh",
        "service_store",
        "service_layout",
        "service_zap",
        "service_lock",
        "service_search",
        "service_sparkles",
        "service_map_pin",
        "service_share",
        "service_workflow",
        "service_database",
      ];
      const selectedType = types[Math.floor(Math.random() * types.length)];

      // Slight directional drift (0.2 to 0.5 px/frame)
      const driftAngle = Math.random() * 2 * Math.PI;
      const driftSpeed = 0.2 + Math.random() * 0.3;
      const vx = Math.cos(driftAngle) * driftSpeed;
      const vy = Math.sin(driftAngle) * driftSpeed;

      const elementId = nextId++;
      spawnCount++;

      // Check for OCCASIONAL WEAVE (~1 in 5-8 spawns, i.e. 18% probability)
      let weaveTargetId: number | undefined;
      if (elements.length > 0 && Math.random() < 0.25) {
        // Find nearest active element within 90px
        const candidates = elements.filter((el) => {
          const d = Math.hypot(el.x - spawnX, el.y - spawnY);
          return d > 15 && d < 90;
        });
        if (candidates.length > 0) {
          weaveTargetId = candidates[candidates.length - 1].id;
        }
      }

      // Check for RARE CONVERGENCE (~1 in 15-20 spawns, i.e. 6% probability)
      let convergeTarget: { x: number; y: number } | undefined;
      if (spawnCount % 16 === 0 && elements.length >= 3) {
        // Calculate center point of active elements
        let sumX = spawnX;
        let sumY = spawnY;
        elements.forEach((el) => {
          sumX += el.x;
          sumY += el.y;
        });
        const centerX = sumX / (elements.length + 1);
        const centerY = sumY / (elements.length + 1);
        convergeTarget = { x: centerX, y: centerY };

        // Apply convergence target to active elements
        elements.forEach((el) => {
          el.convergeTarget = { x: centerX, y: centerY };
        });
      }

      const newEl: EjectedElement = {
        id: elementId,
        type: selectedType,
        x: spawnX,
        y: spawnY,
        startX: spawnX,
        startY: spawnY,
        vx,
        vy,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        spawnTime: now,
        lifetime: LIFETIME,
        size: 7 + Math.random() * 4,
        weaveTargetId,
        convergeTarget,
      };

      elements.push(newEl);

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const render = () => {
      const now = Date.now();

      // Clean up expired elements
      for (let i = elements.length - 1; i >= 0; i--) {
        if (now - elements[i].spawnTime > LIFETIME) {
          elements.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (elements.length > 0) {
        // Render Mini-Weave Connections first (underneath elements)
        elements.forEach((el) => {
          if (!el.weaveTargetId) return;
          const target = elements.find((t) => t.id === el.weaveTargetId);
          if (!target) return;

          const progressA = (now - el.spawnTime) / el.lifetime;
          const progressB = (now - target.spawnTime) / target.lifetime;
          const alpha = Math.max(0, 1 - Math.max(progressA, progressB)) * 0.5;

          if (alpha <= 0) return;

          const midX = (el.x + target.x) / 2 + Math.sin(el.id) * 12;
          const midY = (el.y + target.y) / 2 + Math.cos(el.id) * 12;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(el.x, el.y);
          ctx.quadraticCurveTo(midX, midY, target.x, target.y);
          ctx.strokeStyle = `rgba(0, 160, 115, ${alpha * 0.8})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.restore();
        });

        // Render Ejected Elements
        elements.forEach((el) => {
          const progress = (now - el.spawnTime) / el.lifetime;
          const alpha = Math.max(0, 1 - progress);
          if (alpha <= 0) return;

          // Position update (drift or converge)
          if (el.convergeTarget) {
            el.x += (el.convergeTarget.x - el.x) * 0.08;
            el.y += (el.convergeTarget.y - el.y) * 0.08;
          } else {
            el.x += el.vx;
            el.y += el.vy;
          }
          el.rotation += el.rotSpeed;

          ctx.save();
          ctx.translate(el.x, el.y);
          ctx.rotate(el.rotation);

          const strokeColor = `rgba(0, 170, 120, ${0.88 * alpha})`;
          const fillColor = `rgba(255, 255, 255, ${0.9 * alpha})`;
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1.3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (el.type === "node") {
            // GEOMETRIC SHAPE 1: Plain Small Circular Node
            ctx.beginPath();
            ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.stroke();
          } else if (el.type === "ring_node") {
            // GEOMETRIC SHAPE 2: Ringed Node
            ctx.beginPath();
            ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.stroke();
          } else if (el.type === "arc") {
            // GEOMETRIC SHAPE 3: Curved Arc
            ctx.beginPath();
            ctx.arc(0, 0, 8, -Math.PI / 3, Math.PI / 3);
            ctx.stroke();
          } else if (el.type === "connector") {
            // GEOMETRIC SHAPE 4: Connector Line + Terminal Dot
            ctx.beginPath();
            ctx.moveTo(-6, -3);
            ctx.quadraticCurveTo(0, 3, 6, -1);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(6, -1, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = fillColor;
            ctx.fill();
          } else if (el.type === "geomark") {
            // GEOMETRIC SHAPE 5: Plus / Diamond / Square
            const subType = el.id % 3;
            if (subType === 0) {
              const s = 4;
              ctx.beginPath();
              ctx.moveTo(-s, 0);
              ctx.lineTo(s, 0);
              ctx.moveTo(0, -s);
              ctx.lineTo(0, s);
              ctx.stroke();
            } else if (subType === 1) {
              const d = 3.5;
              ctx.beginPath();
              ctx.moveTo(0, -d);
              ctx.lineTo(d, 0);
              ctx.lineTo(0, d);
              ctx.lineTo(-d, 0);
              ctx.closePath();
              ctx.stroke();
            } else {
              const sq = 3;
              ctx.beginPath();
              ctx.rect(-sq, -sq, sq * 2, sq * 2);
              ctx.stroke();
            }
          } else if (el.type === "double_strand") {
            // GEOMETRIC SHAPE 6: Micro Double-Strand
            ctx.beginPath();
            ctx.moveTo(-5, -2);
            ctx.quadraticCurveTo(0, 1, 5, -2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-5, 2);
            ctx.quadraticCurveTo(0, 5, 5, 2);
            ctx.stroke();
          }
          // =========================================================
          // 18 CANONICAL SERVICE ICONS (Vector Paths)
          // =========================================================
          else if (el.type === "service_compass") {
            // SERVICE 1: IT Consulting & Strategy (Compass)
            ctx.beginPath();
            ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-2, 2);
            ctx.lineTo(3, -3);
            ctx.stroke();
          } else if (el.type === "service_shield") {
            // SERVICE 2: Tech Due Diligence (Shield Check)
            ctx.beginPath();
            ctx.moveTo(-4, -5);
            ctx.lineTo(4, -5);
            ctx.quadraticCurveTo(4, 1, 0, 5);
            ctx.quadraticCurveTo(-4, 1, -4, -5);
            ctx.closePath();
            ctx.stroke();
          } else if (el.type === "service_cpu") {
            // SERVICE 3: Digital Transformation (CPU)
            ctx.beginPath();
            ctx.rect(-4, -4, 8, 8);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-2, -6); ctx.lineTo(-2, -4);
            ctx.moveTo(2, -6); ctx.lineTo(2, -4);
            ctx.moveTo(-2, 4); ctx.lineTo(-2, 6);
            ctx.moveTo(2, 4); ctx.lineTo(2, 6);
            ctx.moveTo(-6, -2); ctx.lineTo(-4, -2);
            ctx.moveTo(-6, 2); ctx.lineTo(-4, 2);
            ctx.moveTo(4, -2); ctx.lineTo(6, -2);
            ctx.moveTo(4, 2); ctx.lineTo(6, 2);
            ctx.stroke();
          } else if (el.type === "service_layers") {
            // SERVICE 4: Business Systems Architecture (Layers)
            ctx.beginPath();
            ctx.moveTo(0, -4); ctx.lineTo(5, -1.5); ctx.lineTo(0, 1); ctx.lineTo(-5, -1.5); ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-5, 1); ctx.lineTo(0, 3.5); ctx.lineTo(5, 1);
            ctx.stroke();
          } else if (el.type === "service_milestone") {
            // SERVICE 5: Technology Roadmaps (Milestone)
            ctx.beginPath();
            ctx.moveTo(-2, -5); ctx.lineTo(-2, 5);
            ctx.moveTo(-2, -5); ctx.lineTo(4, -2.5); ctx.lineTo(-2, 0);
            ctx.stroke();
          } else if (el.type === "service_user_check") {
            // SERVICE 6: Fractional CTO (User Check)
            ctx.beginPath();
            ctx.arc(-1, -2.5, 2.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(-1, 4, 4, Math.PI, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(3, 0); ctx.lineTo(4.5, 1.5); ctx.lineTo(7, -1);
            ctx.stroke();
          } else if (el.type === "service_code") {
            // SERVICE 7: Custom Website Design (Code2 <>)
            ctx.beginPath();
            ctx.moveTo(-2, -4); ctx.lineTo(-5, 0); ctx.lineTo(-2, 4);
            ctx.moveTo(2, -4); ctx.lineTo(5, 0); ctx.lineTo(2, 4);
            ctx.stroke();
          } else if (el.type === "service_refresh") {
            // SERVICE 8: Website Redesign (RefreshCw)
            ctx.beginPath();
            ctx.arc(0, 0, 4.5, -Math.PI / 4, (3 * Math.PI) / 4);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 4.5, (3 * Math.PI) / 4 + 0.3, -Math.PI / 4 - 0.3);
            ctx.stroke();
          } else if (el.type === "service_store") {
            // SERVICE 9: Small Business Web Systems (Store)
            ctx.beginPath();
            ctx.moveTo(-5, -2); ctx.lineTo(5, -2);
            ctx.lineTo(4, -5); ctx.lineTo(-4, -5); ctx.closePath();
            ctx.rect(-4, -2, 8, 7);
            ctx.stroke();
          } else if (el.type === "service_layout") {
            // SERVICE 10: Landing Page & Lead Gen (Layout)
            ctx.beginPath();
            ctx.rect(-5, -4, 10, 8);
            ctx.moveTo(-5, -1); ctx.lineTo(5, -1);
            ctx.moveTo(0, -1); ctx.lineTo(0, 4);
            ctx.stroke();
          } else if (el.type === "service_zap") {
            // SERVICE 11: UX & Conversion (Zap Lightning)
            ctx.beginPath();
            ctx.moveTo(2, -5); ctx.lineTo(-4, 0); ctx.lineTo(0, 0); ctx.lineTo(-2, 5); ctx.lineTo(4, 0); ctx.lineTo(0, 0); ctx.closePath();
            ctx.stroke();
          } else if (el.type === "service_lock") {
            // SERVICE 12: SEO-Ready Engineering (Lock)
            ctx.beginPath();
            ctx.rect(-4, -1, 8, 6);
            ctx.arc(0, -1, 3, Math.PI, 0);
            ctx.stroke();
          } else if (el.type === "service_search") {
            // SERVICE 13: SEO & Search Visibility (Search)
            ctx.beginPath();
            ctx.arc(-1, -1, 3.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(1.5, 1.5); ctx.lineTo(4.5, 4.5);
            ctx.stroke();
          } else if (el.type === "service_sparkles") {
            // SERVICE 14: AI Search Optimization & GEO (Sparkles ✦)
            ctx.beginPath();
            ctx.moveTo(0, -5); ctx.quadraticCurveTo(0, 0, 5, 0); ctx.quadraticCurveTo(0, 0, 0, 5); ctx.quadraticCurveTo(0, 0, -5, 0); ctx.quadraticCurveTo(0, 0, 0, -5);
            ctx.stroke();
          } else if (el.type === "service_map_pin") {
            // SERVICE 15: Local SEO & Lead Visibility (MapPin)
            ctx.beginPath();
            ctx.arc(0, -2, 3, Math.PI * 0.75, Math.PI * 0.25);
            ctx.lineTo(0, 5);
            ctx.closePath();
            ctx.stroke();
          } else if (el.type === "service_share") {
            // SERVICE 16: Social Media Systems (Share2)
            ctx.beginPath();
            ctx.arc(3, -3, 1.8, 0, Math.PI * 2);
            ctx.arc(-3, 0, 1.8, 0, Math.PI * 2);
            ctx.arc(3, 3, 1.8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-1.2, -0.8); ctx.lineTo(1.2, -2.2);
            ctx.moveTo(-1.2, 0.8); ctx.lineTo(1.2, 2.2);
            ctx.stroke();
          } else if (el.type === "service_workflow") {
            // SERVICE 17: Workflow & AI Automation (Workflow)
            ctx.beginPath();
            ctx.rect(-5, -4, 3.5, 3.5);
            ctx.rect(1.5, -4, 3.5, 3.5);
            ctx.rect(-1.75, 1.5, 3.5, 3.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -2.25); ctx.lineTo(0, 1.5);
            ctx.stroke();
          } else if (el.type === "service_database") {
            // SERVICE 18: Lead Capture & CRM (Database)
            ctx.beginPath();
            ctx.ellipse(0, -3, 5, 1.8, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-5, -3); ctx.lineTo(-5, 3); ctx.ellipse(0, 3, 5, 1.8, 0, 0, Math.PI); ctx.lineTo(5, -3);
            ctx.stroke();
          }

          ctx.restore();
        });
      }

      if (elements.length > 0) {
        animFrameId = requestAnimationFrame(render);
      } else {
        animFrameId = null;
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


