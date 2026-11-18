"use client";

import React, { useState, useEffect } from "react";
import { irixAudio } from "./IrixAudio";

export interface IrixWindowProps {
  id: string;
  title: string;
  isActive: boolean;
  zIndex: number;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  onFocus: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export default function IrixWindow({
  title,
  isActive,
  zIndex,
  initialX = 40,
  initialY = 40,
  width = 620,
  height = 420,
  onFocus,
  onClose,
  children,
}: IrixWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: width, h: height });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showWindowMenu, setShowWindowMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setIsMaximized(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Window Dragging ---
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isMaximized) return;
    const maxX = Math.max(10, window.innerWidth - size.width - 10);
    const maxY = Math.max(10, window.innerHeight - 100);

    setPosition({
      x: Math.min(maxX, Math.max(10, e.clientX - dragOffset.x)),
      y: Math.min(maxY, Math.max(10, e.clientY - dragOffset.y)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  // --- Window Resizing ---
  const handleResizeDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleResizeMove = (e: React.PointerEvent) => {
    if (!isResizing || isMaximized) return;
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    setSize({
      width: Math.max(340, Math.min(window.innerWidth - position.x - 10, resizeStart.w + deltaX)),
      height: Math.max(220, Math.min(window.innerHeight - position.y - 20, resizeStart.h + deltaY)),
    });
  };

  const handleResizeUp = (e: React.PointerEvent) => {
    if (isResizing) {
      setIsResizing(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    irixAudio.playClick();
    setShowWindowMenu(!showWindowMenu);
  };

  const handleMenuDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    irixAudio.playWindowClose();
    onClose();
  };

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    irixAudio.playClick();
    setIsMaximized(!isMaximized);
  };

  const frameBg = isActive ? "bg-[#c2b49c]" : "bg-[#828d90]";
  const titleBg = isActive ? "bg-[#c2b49c]" : "bg-[#828d90]";
  const textColor = isActive ? "text-slate-950 font-bold" : "text-slate-800 font-medium";

  return (
    <div
      onPointerDown={onFocus}
      style={
        isMaximized
          ? {
              top: isMobile ? "4px" : "10px",
              left: isMobile ? "4px" : "10px",
              right: isMobile ? "4px" : "10px",
              bottom: isMobile ? "4px" : "10px",
              width: "auto",
              height: "auto",
              zIndex,
            }
          : {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              width: `${size.width}px`,
              height: `${size.height}px`,
              zIndex,
            }
      }
      className={`absolute flex flex-col select-none font-sans transition-[top,left,right,bottom] duration-150 ${
        isMaximized ? "max-w-none" : "max-w-[calc(100vw-1rem)] max-h-[calc(100vh-2rem)]"
      }`}
    >
      {/* 4Dwm Segmented Frame */}
      <div className={`flex-1 flex flex-col ${frameBg} shadow-[8px_12px_24px_rgba(0,0,0,0.65)] p-[3px] border border-black/80`}>
        
        {/* Top Grab Rail */}
        <div className="flex items-center h-1.5 mb-[2px] gap-[2px]">
          <div className="w-4 h-full bg-inherit border-t-2 border-l-2 border-t-white border-l-white border-b border-r border-b-black border-r-black" />
          <div className="flex-1 h-full bg-inherit border-t-2 border-t-white border-b border-b-black" />
          <div className="w-4 h-full bg-inherit border-t-2 border-r-2 border-t-white border-r-black border-b border-l border-b-black border-l-white" />
        </div>

        {/* Middle Section */}
        <div className="flex-1 flex gap-[2px]">
          <div className="w-1.5 bg-inherit border-t border-l-2 border-t-white border-l-white border-b border-r border-b-black border-r-black" />

          {/* Window Interior */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Title Bar */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`h-[24px] px-1 flex items-center justify-between cursor-move touch-none border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black ${titleBg}`}
            >
              {/* Window Menu Button */}
              <div className="relative">
                <button
                  onClick={handleMenuButtonClick}
                  onDoubleClick={handleMenuDoubleClick}
                  className="w-[18px] h-[18px] bg-inherit border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                  title="Window Menu (Double-click to Close)"
                >
                  <div className="w-2.5 h-[2px] bg-black" />
                </button>

                {showWindowMenu && (
                  <div className={`absolute top-full left-0 mt-1 w-36 ${frameBg} border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black p-1 shadow-2xl z-50 flex flex-col text-[11px] font-mono text-slate-900`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMaximize(e);
                        setShowWindowMenu(false);
                      }}
                      className="px-2 py-1 text-left hover:bg-[#1c4d5c] hover:text-white"
                    >
                      {isMaximized ? "Restore" : "Maximize"}
                    </button>
                    <div className="h-[1px] bg-black/40 my-0.5" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        irixAudio.playWindowClose();
                        onClose();
                      }}
                      className="px-2 py-1 text-left hover:bg-[#1c4d5c] hover:text-white font-bold"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Title Text */}
              <span className={`truncate px-2 font-mono text-[11px] tracking-wide ${textColor}`}>
                {title}
              </span>

              {/* Minimize & Maximize Widgets */}
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    irixAudio.playClick();
                    onClose();
                  }}
                  className="w-[18px] h-[18px] bg-inherit border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                  title="Minimize"
                >
                  <div className="w-[4px] h-[4px] bg-black" />
                </button>

                {!isMobile && (
                  <button
                    onClick={toggleMaximize}
                    className="w-[18px] h-[18px] bg-inherit border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                    title={isMaximized ? "Restore" : "Maximize"}
                  >
                    <div className="w-[8px] h-[8px] border border-black" />
                  </button>
                )}
              </div>
            </div>

            {/* Sunken Inset Client Canvas */}
            <div className="flex-1 mt-[2px] bg-[#1a2324] border-t-2 border-l-2 border-t-black border-l-black border-b-2 border-r-2 border-b-white border-r-white overflow-hidden relative">
              {children}
            </div>
          </div>

          <div className="w-1.5 bg-inherit border-t border-l border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black" />
        </div>

        {/* Bottom Grab Rail & Resize Corner */}
        <div className="flex items-center h-2 mt-[2px] gap-[2px]">
          <div className="w-4 h-full bg-inherit border-t border-l-2 border-t-white border-l-white border-b-2 border-r border-b-black border-r-black" />
          
          <div className="flex-1 h-full flex gap-[2px]">
            <div className="flex-1 bg-inherit border-t border-t-white border-b-2 border-b-black border-r border-r-black" />
            <div className="flex-1 bg-inherit border-t border-t-white border-b-2 border-b-black border-r border-r-black border-l border-l-white" />
            <div className="flex-1 bg-inherit border-t border-t-white border-b-2 border-b-black border-l border-l-white" />
          </div>

          {/* Bottom-Right Corner: Active Resizer Handle */}
          <div
            onPointerDown={handleResizeDown}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
            className="w-4 h-full bg-inherit border-t border-l border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black cursor-se-resize touch-none active:bg-black/30"
            title="Drag to Resize"
          />
        </div>

      </div>
    </div>
  );
}
