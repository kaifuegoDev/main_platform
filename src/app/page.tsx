"use client";

import { useState } from "react";
import BottomNavbar from "@/components/BottomNavbar";
import Header from "@/components/Header";
import GameModes from "@/components/GameModes";
import Leaderboard from "@/components/Leaderboard";
import MyMatches from "@/components/MyMatches";
import Wallet from "@/components/Wallet";
import AppDrawer from "@/components/AppDrawer";

const GAME_MODES = [
  "Lone Wolf",
  "Clash Squad",
  "Battle Royale",
  "Showdown",
  "Scrims",
  "Survival",
  "Elimination",
];

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [showWallet, setShowWallet] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex flex-col">
            <Header 
              onWalletClick={() => setShowWallet(true)} 
              onMenuClick={() => setIsDrawerOpen(true)}
            />
          </div>
        );
      case "matches":
        return <MyMatches />;
      case "leaderboard":
        return <Leaderboard />;
      case "store":
        return (
          <div className="flex flex-col h-full bg-white font-sora min-h-[calc(100vh-4rem)]">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-16">
              <h3 className="text-slate-700 font-semibold text-base mb-1">Coming Soon</h3>
              <p className="text-slate-400 text-sm">New items are on their way!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 pb-16 overflow-y-auto overflow-x-hidden flex flex-col">
        {renderContent()}
      </div>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence>
        {showWallet && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100]"
          >
            <Wallet onBack={() => setShowWallet(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AppDrawer 
        isOpen={isDrawerOpen} 
        onCloseAction={() => setIsDrawerOpen(false)} 
        onNavigateAction={setActiveTab}
        onWalletClickAction={() => { setIsDrawerOpen(false); setShowWallet(true); }}
      />
    </main>
  );
}
