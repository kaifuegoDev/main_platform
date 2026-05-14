"use client";

import React from "react";

interface GameModesProps {
  modes: string[];
  selectedMode: string;
  onSelect: (mode: string) => void;
}

export default function GameModes({ modes, selectedMode, onSelect }: GameModesProps) {
  return (
    <div className="bg-white border-b border-slate-50">
      <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-3">
        {modes.map((mode) => {
          const isSelected = selectedMode === mode;
          return (
            <button
              key={mode}
              onClick={() => onSelect(mode)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-medium transition-all ${
                isSelected
                  ? "bg-slate-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
