import React from 'react';
import { motion } from 'framer-motion';

export const Analytics = () => (
  <motion.div
    className="p-8 max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-4xl font-black text-gray-900 mb-8">Nutrition Analytics</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Daily Report', 'Weekly Report', 'Monthly Report', 'Calorie Trends', 'Macro Analysis', 'Progress Overview'].map((title, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200"
        >
          <p className="font-bold text-gray-900">{title}</p>
          <div className="h-32 bg-white rounded-lg mt-4 flex items-center justify-center">
            <p className="text-gray-500">📊 Chart Visualization</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export const RecipeSuggestions = () => (
  <motion.div
    className="p-8 max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-4xl font-black text-gray-900 mb-8">Recipe Suggestions</h1>
    <p className="text-gray-600">Get personalized recipe recommendations based on your goals</p>
  </motion.div>
);

export const WaterTracker = () => (
  <motion.div
    className="p-8 max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-4xl font-black text-gray-900 mb-8">Water Tracker</h1>
    <p className="text-gray-600">Track your daily water intake and stay hydrated</p>
  </motion.div>
);

export const WeightTracker = () => (
  <motion.div
    className="p-8 max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-4xl font-black text-gray-900 mb-8">Weight Tracker</h1>
    <p className="text-gray-600">Monitor your weight progress and body measurements</p>
  </motion.div>
);

export const Profile = () => (
  <motion.div
    className="p-8 max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-4xl font-black text-gray-900 mb-8">Profile</h1>
    <p className="text-gray-600">Manage your profile and health goals</p>
  </motion.div>
);
