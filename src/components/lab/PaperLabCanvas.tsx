"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { paperAudio } from "./PaperAudio";
import { createTrashCan } from "./TrashCan";

export default function PaperLabCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCrumpled, setIsCrumpled] = useState(false);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const stateRef = useRef({
    progress: 0,
    targetProgress: 0,
    isThrowing: false,
    position: new THREE.Vector3(0, 1.8, 0),
    velocity: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.8, 6.2);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const cyanRim = new THREE.PointLight(0x06b6d4, 1.2, 12);
    cyanRim.position.set(-3, 2, -2);
    scene.add(cyanRim);

    // --- 3. Floor Plane ---
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // --- 4. OS X Mesh Trash Can ---
    const trashCan = createTrashCan();
    trashCan.position.set(1.9, 0, -1.8);
    scene.add(trashCan);

    // --- 5. Paper Sheet Geometry & Dynamic Canvas Texture ---
    const paperCanvas = document.createElement("canvas");
    paperCanvas.width = 512;
    paperCanvas.height = 680;
    const pctx = paperCanvas.getContext("2d");
    if (pctx) {
      pctx.fillStyle = "#f8fafc";
      pctx.fillRect(0, 0, 512, 680);

      // Subtle drafting grid
      pctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
      pctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 32) {
        pctx.beginPath();
        pctx.moveTo(x, 0);
        pctx.lineTo(x, 680);
        pctx.stroke();
      }
      for (let y = 0; y < 680; y += 32) {
        pctx.beginPath();
        pctx.moveTo(0, y);
        pctx.lineTo(512, y);
        pctx.stroke();
      }

      // Title & Portfolio Note
      pctx.fillStyle = "#0f172a";
      pctx.font = "bold 26px sans-serif";
      pctx.fillText("CHRISTOPHER DEMETER", 40, 70);

      pctx.fillStyle = "#0284c7";
      pctx.font = "16px monospace";
      pctx.fillText("Full Stack • UX • Creative Tech", 40, 100);

      pctx.fillStyle = "#334155";
      pctx.font = "14px sans-serif";
      pctx.fillText("• PBF Energy RMM Operational Suite", 40, 150);
      pctx.fillText("• Win The Day (WTD) Plant Engine", 40, 180);
      pctx.fillText("• Three.js + Houdini VAT Simulation", 40, 210);
      pctx.fillText("• IRIX Interactive Desktop (4Dwm)", 40, 240);

      pctx.fillStyle = "#64748b";
      pctx.font = "13px monospace";
      pctx.fillText("https://cdemeter.github.io/portfolio", 40, 310);

      pctx.fillStyle = "#ef4444";
      pctx.font = "bold 15px sans-serif";
      pctx.fillText("TOSS OR CRUMPLE ME →", 40, 360);
    }

    const paperTex = new THREE.CanvasTexture(paperCanvas);
    const paperGeo = new THREE.PlaneGeometry(1.6, 2.1, 48, 48);

    // Save flat coordinates for morphing
    const basePositions = paperGeo.attributes.position.array.slice() as Float32Array;

    const paperMat = new THREE.MeshStandardMaterial({
      map: paperTex,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.05,
    });

    const paperMesh = new THREE.Mesh(paperGeo, paperMat);
    paperMesh.position.copy(stateRef.current.position);
    scene.add(paperMesh);

    // --- 6. Morph / Crumple Mathematics ---
    const updatePaperShape = (factor: number) => {
      const posAttr = paperGeo.attributes.position;
      const count = posAttr.count;

      for (let i = 0; i < count; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];

        if (factor <= 0.001) {
          posAttr.setXYZ(i, bx, by, bz);
        } else {
          // Collapse toward a tight sphere + crease noise
          const len = Math.sqrt(bx * bx + by * by);
          const theta = Math.atan2(by, bx);
          const phi = (len / 1.4) * Math.PI;

          const r = 0.38 + 0.15 * Math.sin(bx * 14.0 + by * 11.0);
          const sphereX = r * Math.sin(phi) * Math.cos(theta);
          const sphereY = r * Math.sin(phi) * Math.sin(theta);
          const sphereZ = -r * Math.cos(phi);

          const nx = THREE.MathUtils.lerp(bx, sphereX, factor);
          const ny = THREE.MathUtils.lerp(by, sphereY, factor);
          const nz = THREE.MathUtils.lerp(bz, sphereZ, factor);

          posAttr.setXYZ(i, nx, ny, nz);
        }
      }

      posAttr.needsUpdate = true;
      paperGeo.computeVertexNormals();
    };

    // --- 7. Animation & Physics Loop ---
    let animId: number;
    const rimPos = new THREE.Vector3(1.9, 2.4, -1.8);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const s = stateRef.current;

      // Smoothly interpolate crumple progress
      if (Math.abs(s.progress - s.targetProgress) > 0.01) {
        s.progress = THREE.MathUtils.lerp(s.progress, s.targetProgress, 0.12);
        updatePaperShape(s.progress);
      }

      // Handle Throw Ball Physics
      if (s.isThrowing) {
        s.velocity.y -= 0.012; // Gravity
        s.position.add(s.velocity);
        paperMesh.position.copy(s.position);

        paperMesh.rotation.x += 0.06;
        paperMesh.rotation.y += 0.08;

        // Collision: Inside trash can target
        const distToRim = s.position.distanceTo(rimPos);
        if (distToRim < 0.85 && s.position.y <= 2.4 && s.position.y > 0.4) {
          paperAudio.playScore();
          setScore((prev) => prev + 1);
          s.isThrowing = false;
          // Reset ball after swish
          setTimeout(() => {
            s.position.set(0, 1.8, 0);
            s.velocity.set(0, 0, 0);
            paperMesh.position.copy(s.position);
          }, 900);
        } else if (distToRim < 1.3 && Math.abs(s.position.y - 2.4) < 0.3) {
          // Hit the rim!
          paperAudio.playRimClang();
          s.velocity.x *= -0.4;
          s.velocity.z *= -0.4;
        } else if (s.position.y <= 0.2) {
          // Hit the floor
          s.isThrowing = false;
          s.position.y = 0.2;
          paperMesh.position.copy(s.position);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleCrumpleToggle = () => {
    const nextState = !isCrumpled;
    setIsCrumpled(nextState);
    stateRef.current.targetProgress = nextState ? 1 : 0;
    paperAudio.playCrinkle(0.85);
  };

  const handleToss = () => {
    if (!isCrumpled) {
      handleCrumpleToggle();
    }
    paperAudio.playToss();
    const s = stateRef.current;
    s.isThrowing = true;
    s.position.set(0, 1.8, 0);
    // Toss velocity arc toward the trash can at (1.9, 2.4, -1.8)
    s.velocity.set(0.065, 0.14, -0.062);
  };

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD */}
      <div className="absolute top-4 left-4 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700/60 text-xs font-mono text-slate-300">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>THREE.JS + VAT PAPER LAB</span>
        <span className="text-slate-500">|</span>
        <span>BASKETS: <strong className="text-cyan-300">{score}</strong></span>
      </div>

      {/* Action Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700 shadow-lg text-sm font-medium">
        <button
          onClick={handleCrumpleToggle}
          className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
        >
          {isCrumpled ? "Uncrumple Sheet" : "Crumple Paper"}
        </button>

        <button
          onClick={handleToss}
          className="px-5 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95 shadow-md shadow-cyan-500/20"
        >
          Fling into Trash Can 🗑️
        </button>

        <button
          onClick={() => setSoundEnabled(paperAudio.toggleMute())}
          className="p-1.5 text-slate-400 hover:text-slate-200 text-xs font-mono"
          title="Toggle Web Audio"
        >
          {soundEnabled ? "🔊 SFX ON" : "🔇 MUTED"}
        </button>
      </div>
    </div>
  );
}