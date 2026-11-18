"use client";

import React, { useState, useRef } from "react";
import IrixToolchest, { ToolchestCategory } from "./IrixToolchest";
import IrixWindow from "./IrixWindow";
import { irixAudio } from "./IrixAudio";
import { SgiDumpsterIcon } from "./IrixIcons";
import PaperLabCanvas from "../lab/PaperLabCanvas";

export default function IrixDesktop() {
  const [openWindows, setOpenWindows] = useState<string[]>(["console"]);
  const [activeWindowId, setActiveWindowId] = useState<string>("console");
  const [nextZIndex, setNextZIndex] = useState(10);
  const [windowZ, setWindowZ] = useState<Record<string, number>>({ console: 10 });

  // SGI winterm state
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleHistory, setConsoleHistory] = useState<string[]>([
    "IRIX (TM) Release 6.5 IP30 (octane)",
    "Copyright 1987-1998 Silicon Graphics, Inc. All Rights Reserved.",
    "System initialized. Type 'help' for available commands.",
  ]);
  const termInputRef = useRef<HTMLInputElement>(null);

  const bringToFront = (id: string) => {
    setActiveWindowId(id);
    const updatedZ = nextZIndex + 1;
    setNextZIndex(updatedZ);
    setWindowZ((prev) => ({ ...prev, [id]: updatedZ }));
  };

  const launchWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows((prev) => [...prev, id]);
      irixAudio.playWindowOpen();
    }
    bringToFront(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = consoleInput;
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let reply = `command not found: ${cmd}. Type 'help' for commands.`;
    if (cmd === "help") {
      reply = "Available commands: whoami, uname -a, ls, portfolio, clear";
    } else if (cmd === "whoami") {
      reply = "cdemeter (Christopher Demeter — Full Stack, UX & Creative Tech)";
    } else if (cmd === "uname -a") {
      reply = "IRIX octane 6.5 05190016 IP30 mips";
    } else if (cmd === "ls") {
      reply = "PBF_RMM_Dashboard.pbi   WinTheDay_Engine.xlsm   ThreeJS_PaperLab   ivview_dino";
    } else if (cmd === "portfolio") {
      window.location.href = "/portfolio";
      return;
    } else if (cmd === "clear") {
      setConsoleHistory([]);
      setConsoleInput("");
      return;
    }

    setConsoleHistory((prev) => [...prev, `irix% ${rawCmd}`, reply]);
    setConsoleInput("");
  };

  const toolchestCategories: ToolchestCategory[] = [
    {
      title: "Work",
      items: [
        {
          id: "w-exec",
          label: "Executive Portfolio",
          icon: "💼",
          action: () => (window.location.href = "/portfolio"),
        },
        {
          id: "w-paper",
          label: "3D Paper & Trash Lab",
          icon: "📄",
          action: () => launchWindow("paperlab"),
        },
        {
          id: "w-ivview",
          label: "Open Inventor (ivview)",
          icon: "🦖",
          action: () => launchWindow("ivview"),
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          id: "s-console",
          label: "IRIX Shell Console",
          icon: "📟",
          action: () => launchWindow("console"),
        },
        {
          id: "s-about",
          label: "System & Author Info",
          icon: "ℹ️",
          action: () => launchWindow("about"),
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          id: "h-contact",
          label: "Contact Christopher",
          icon: "✉️",
          action: () => launchWindow("about"),
        },
      ],
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1e3b42] select-none font-sans">
      {/* SGI Grid Pattern Wallpaper */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4da1a9 1px, transparent 1px), linear-gradient(90deg, #4da1a9 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* SGI Indigo Magic Desktop Watermark */}
      <div className="absolute right-6 bottom-6 flex flex-col items-end opacity-25 pointer-events-none text-right font-mono">
        <span className="text-3xl font-extrabold tracking-widest text-[#a8d5db]">sgi</span>
        <span className="text-xs tracking-wider text-slate-300">IRIX 6.5 Interactive Desktop</span>
      </div>

      {/* The System Toolchest */}
      <IrixToolchest categories={toolchestCategories} />

      {/* Desktop Vector Icons — Clears the Toolchest cleanly */}
      <div className="absolute top-56 sm:top-60 left-3 sm:left-4 flex flex-col gap-6 z-20">
        <button
          onClick={() => (window.location.href = "/portfolio")}
          className="flex flex-col items-center gap-1.5 w-20 group focus:outline-none"
        >
          <div className="w-12 h-12 bg-[#c2b49c] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black p-1 flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
            💼
          </div>
          <span className="text-[11px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded shadow">
            Portfolio
          </span>
        </button>

        <button
          onClick={() => launchWindow("paperlab")}
          className="flex flex-col items-center gap-1.5 w-20 group focus:outline-none"
        >
          <div className="w-12 h-12 bg-[#c2b49c] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black p-1 flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
            📄
          </div>
          <span className="text-[11px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded shadow">
            PaperLab
          </span>
        </button>

        <button
          onClick={() => launchWindow("console")}
          className="flex flex-col items-center gap-1.5 w-20 group focus:outline-none"
        >
          <div className="w-12 h-12 bg-[#c2b49c] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black p-1 flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
            📟
          </div>
          <span className="text-[11px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded shadow">
            Console
          </span>
        </button>
      </div>

      {/* --- WINDOW 1: SGI WINTERM / WSH CONSOLE --- */}
      {openWindows.includes("console") && (
        <IrixWindow
          id="console"
          title="IRIX winterm - /bin/tcsh"
          isActive={activeWindowId === "console"}
          zIndex={windowZ["console"] || 10}
          initialX={160}
          initialY={60}
          width={580}
          height={340}
          onFocus={() => bringToFront("console")}
          onClose={() => closeWindow("console")}
        >
          {/* Authentic SGI winterm midnight blue background & amber phosphor font */}
          <div
            onClick={() => termInputRef.current?.focus()}
            className="p-3 bg-[#08141e] text-[#f6c442] font-mono text-xs leading-relaxed flex flex-col h-full overflow-y-auto cursor-text select-text"
          >
            {/* Terminal History Buffer */}
            <div className="space-y-1">
              {consoleHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap">{line}</div>
              ))}
            </div>

            {/* Seamless Inline SGI Prompt & Text-Hugging Block Cursor */}
            <form onSubmit={handleConsoleSubmit} className="relative flex items-center mt-1">
              <span className="text-[#ffd700] font-bold mr-1 shrink-0">irix%</span>
              
              {/* Visible text + cursor right after the last character */}
              <div className="flex items-center">
                <span className="text-[#f6c442] font-mono whitespace-pre">{consoleInput}</span>
                <span className="inline-block w-2 h-3.5 bg-[#ffd700] animate-[pulse_0.9s_ease-in-out_infinite] ml-[1px]" />
              </div>

              {/* Hidden input capturing the keystrokes */}
              <input
                ref={termInputRef}
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-text w-full"
                autoFocus
                spellCheck={false}
              />
            </form>
          </div>
        </IrixWindow>
      )}

      {/* --- WINDOW 2: 3D PAPER LAB --- */}
      {openWindows.includes("paperlab") && (
        <IrixWindow
          id="paperlab"
          title="Three.js + Houdini VAT Simulation & OS X Trash Can"
          isActive={activeWindowId === "paperlab"}
          zIndex={windowZ["paperlab"] || 10}
          initialX={210}
          initialY={100}
          width={680}
          height={540}
          onFocus={() => bringToFront("paperlab")}
          onClose={() => closeWindow("paperlab")}
        >
          <div className="w-full h-full p-1 bg-slate-950 flex flex-col">
            <PaperLabCanvas />
          </div>
        </IrixWindow>
      )}

      {/* --- WINDOW 3: ABOUT CHRISTOPHER --- */}
      {openWindows.includes("about") && (
        <IrixWindow
          id="about"
          title="System Information & Author — SGI IRIX 6.5"
          isActive={activeWindowId === "about"}
          zIndex={windowZ["about"] || 10}
          initialX={180}
          initialY={130}
          width={580}
          height={380}
          onFocus={() => bringToFront("about")}
          onClose={() => closeWindow("about")}
        >
          <div className="p-4 text-slate-100 font-sans text-xs space-y-3 overflow-y-auto h-full">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <div className="w-10 h-10 bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-xl font-bold font-mono">
                CD
              </div>
              <div>
                <h1 className="text-sm font-bold text-cyan-300">Christopher Demeter</h1>
                <p className="text-[11px] text-slate-400 font-mono">
                  Full Stack Developer • Data Engineer • UX Engineer • Creative Technologist
                </p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">
              20+ years building high-impact enterprise software, mission-critical operational intelligence suites, and real-time graphics pipelines. Bridging complex distributed architectures with human-centered ergonomics.
            </p>

            <div className="p-2.5 bg-black/40 border border-slate-700/80 font-mono text-[11px] space-y-1">
              <div><strong className="text-cyan-400">Host:</strong> Octane2 R12000 (MIPS RISC)</div>
              <div><strong className="text-cyan-400">Stack:</strong> Next.js 16 • React 19 • Three.js • .NET 8 • Power BI</div>
              <div><strong className="text-cyan-400">Degree:</strong> B.A. Computers in Fine Art (HCI Focus)</div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="/portfolio"
                className="px-3 py-1.5 bg-[#c2b49c] hover:bg-[#b0a088] text-slate-950 font-bold font-mono rounded"
              >
                Launch Executive Portfolio →
              </a>
              <button
                onClick={() => launchWindow("paperlab")}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono rounded"
              >
                Open 3D Paper Lab
              </button>
            </div>
          </div>
        </IrixWindow>
      )}

      {/* SGI IRIX 5.3 3D Vector Dumpster (Lower-Right Desktop) */}
      <div className="absolute bottom-10 right-6 z-20">
        <button
          onClick={() => launchWindow("dumpster")}
          className="flex flex-col items-center gap-1 w-20 group focus:outline-none"
        >
          <div className="p-1 transition-transform group-hover:scale-110 active:scale-95">
            <SgiDumpsterIcon className="w-14 h-14 drop-shadow-lg" />
          </div>
          <span className=" italic text-[11px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded shadow">
            dumpster
          </span>
        </button>
      </div>

    </div>
  );
}
