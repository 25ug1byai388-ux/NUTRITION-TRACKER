"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { AuthFlow } from '../components/AuthFlow';
import { Dashboard } from '../views/Dashboard';
import { FoodLog } from '../views/FoodLog';
import { AIAssistant } from '../views/AIAssistant';
import { MealPlanner } from '../views/MealPlanner';
import { Achievements } from '../views/Achievements';
import { Analytics, RecipeSuggestions, WaterTracker, WeightTracker, Profile } from '../views/OtherPages';

type Page = 'dashboard' | 'food-log' | 'analytics' | 'meal-planner' | 'recipes' | 'water' | 'weight' | 'profile' | 'achievements' | 'ai-assistant';

export default function NutritionApp() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize app
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const renderPage = () => {
    const pages: Record<Page, React.ReactNode> = {
      dashboard: <Dashboard />,
      'food-log': <FoodLog />,
      analytics: <Analytics />,
      'meal-planner': <MealPlanner />,
      recipes: <RecipeSuggestions />,
      water: <WaterTracker />,
      weight: <WeightTracker />,
      profile: <Profile />,
      achievements: <Achievements />,
      'ai-assistant': <AIAssistant />,
    };
    return pages[currentPage];
  };

  if (!user) {
    return <AuthFlow onAuthSuccess={setUser} />;
  }

  return (
    <div className={`h-screen flex overflow-hidden ${darkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" className="flex items-center justify-center h-screen">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600">Loading Nutrition Tracker...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
