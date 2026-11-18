"use client";

import React, { useState, useEffect } from "react";
import { irixAudio } from "./IrixAudio";

export interface ToolchestAction {
  id: string;
  label: string;
  action: () => void;
  icon?: string;
}

export interface ToolchestCategory {
  title: string;
  items: ToolchestAction[];
}

interface IrixToolchestProps {
  categories: ToolchestCategory[];
}

export default function IrixToolchest({ categories }: IrixToolchestProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryClick = (title: string) => {
    irixAudio.playClick();
    setActiveCategory((prev) => (prev === title ? null : title));
  };

  const handleActionClick = (action: () => void) => {
    irixAudio.playClick();
    setActiveCategory(null);
    action();
  };

  return (
    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-40 select-none font-sans text-xs">
      {/* Toolchest Outer Motif Bevel */}
      <div className="w-28 sm:w-32 bg-[#7b8a8b] border-t-2 border-l-2 border-t-white/80 border-l-white/80 border-b-2 border-r-2 border-b-black/80 border-r-black/80 p-1 shadow-2xl">
        
        {/* Toolchest Header Notch */}
        <div className="h-6 px-2 bg-gradient-to-r from-[#1c4d5c] to-[#2b6a7d] text-white flex items-center justify-between font-mono font-bold tracking-wider text-[11px] mb-1 border border-black/50 shadow-inner">
          <span className="italic">Toolchest</span>
          <span className="text-[9px] opacity-75">SGI</span>
        </div>

        {/* Vertical Stacked Menu Buttons */}
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isOpen = activeCategory === cat.title;

            return (
              <div key={cat.title} className="relative">
                <button
                  onClick={() => handleCategoryClick(cat.title)}
                  className={`w-full h-7 px-2 flex items-center justify-between text-left font-medium transition-colors ${
                    isOpen
                      ? "bg-[#526061] text-white border-t-2 border-l-2 border-t-black/80 border-l-black/80 border-b-2 border-r-2 border-b-white/80 border-r-white/80"
                      : "bg-[#7b8a8b] text-slate-900 border-t-2 border-l-2 border-t-white/80 border-l-white/80 border-b-2 border-r-2 border-b-black/80 border-r-black/80 active:bg-[#526061]"
                  }`}
                >
                  <span className="font-mono text-[11px] sm:text-xs">{cat.title}</span>
                  <span className="text-[9px] text-slate-700">{isMobile && isOpen ? "▼" : "▶"}</span>
                </button>

                {/* Submenu: Cascading on Desktop, Accordion on Mobile */}
                {isOpen && (
                  <div
                    className={
                      isMobile
                        ? "mt-1 w-full bg-[#6a7879] border border-black/60 p-1 flex flex-col gap-1"
                        : "absolute top-0 left-full ml-1 w-52 bg-[#7b8a8b] border-t-2 border-l-2 border-t-white/80 border-l-white/80 border-b-2 border-r-2 border-b-black/80 border-r-black/80 p-1 shadow-2xl flex flex-col gap-0.5"
                    }
                  >
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleActionClick(item.action)}
                        className="w-full px-2 py-1.5 flex items-center justify-between text-left font-mono text-[11px] sm:text-xs text-slate-900 hover:bg-[#1c4d5c] hover:text-white transition-colors border-b border-black/10 last:border-b-0"
                      >
                        <span>{item.label}</span>
                        {item.icon && <span className="text-xs opacity-80">{item.icon}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
