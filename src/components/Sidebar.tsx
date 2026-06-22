import React from 'react';
import { motion } from 'framer-motion';

export const Sidebar = ({ currentPage, onNavigate }: any) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'food-log', icon: '🍽️', label: 'Food Log' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'meal-planner', icon: '📅', label: 'Meal Planner' },
    { id: 'recipes', icon: '👨‍🍳', label: 'Recipes' },
    { id: 'water', icon: '💧', label: 'Water Tracker' },
    { id: 'weight', icon: '⚖️', label: 'Weight Tracker' },
    { id: 'achievements', icon: '🏆', label: 'Achievements' },
    { id: 'ai-assistant', icon: '🤖', label: 'AI Assistant' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white shadow-xl border-r border-gray-200 hidden md:block h-full overflow-y-auto"
    >
      <div className="p-6">
        <motion.h1 className="text-2xl font-black text-emerald-600 flex items-center gap-2">
          🥗 NutriAI
        </motion.h1>
      </div>

      <nav className="px-4 space-y-2 pb-6">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
              currentPage === item.id
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};
