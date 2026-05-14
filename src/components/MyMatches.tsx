"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAB_OPTIONS = [
  { id: "Upcoming", label: "Upcoming" },
  { id: "Ongoing", label: "Ongoing" },
  { id: "History", label: "History" },
];

export default function MyMatches() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const getEmptyState = () => {
    switch (activeTab) {
      case "Upcoming":
        return { title: "No Upcoming Matches", sub: "Join a tournament to get started!" };
      case "Ongoing":
        return { title: "No Ongoing Matches", sub: "Stay tuned for live action!" };
      default:
        return { title: "No Match History", sub: "Your results will appear here." };
    }
  };

  const empty = getEmptyState();

  return (
    <div className="flex flex-col min-h-[calc(100dvh-4rem)] bg-slate-50 font-sora">
      <header className="bg-white px-4 pt-5 pb-2 border-b border-slate-100 flex flex-col items-center">
        <div className="flex items-center justify-center w-full mb-4">
            <h1 className="text-lg font-bold text-slate-800">My Matches</h1>
        </div>

        {/* Tab Bar */}
        <div className="w-full max-w-md bg-slate-100 p-1 rounded-xl flex items-center mb-2">
          {TAB_OPTIONS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all relative z-10 ${
                  isActive ? "text-white" : "text-slate-500"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-slate-600 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-slate-700 font-semibold text-base mb-1">{empty.title}</h3>
            <p className="text-slate-400 text-sm">{empty.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
