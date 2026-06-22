import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    calories: 1450,
    protein: 85,
    carbs: 180,
    fats: 45,
    water: 6,
    dailyGoal: 2000,
  });

  const StatCard = ({ label, value, unit, goal, color }: any) => {
    const percentage = (value / goal) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-emerald-300"
      >
        <p className="text-gray-600 font-medium mb-2">{label}</p>
        <motion.h3
          className="text-3xl font-bold text-gray-900 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {value} <span className="text-lg text-gray-500">{unit}</span>
        </motion.h3>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className={`h-3 rounded-full bg-gradient-to-r from-${color}-500 to-${color}-600`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{Math.round(percentage)}% of {goal}{unit}</p>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Today's Nutrition</h1>
        <p className="text-gray-600">Track your daily nutrition intake and progress</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Calories" value={stats.calories} unit="kcal" goal={stats.dailyGoal} color="emerald" />
        <StatCard label="Protein" value={stats.protein} unit="g" goal={150} color="blue" />
        <StatCard label="Carbs" value={stats.carbs} unit="g" goal={250} color="amber" />
        <StatCard label="Fats" value={stats.fats} unit="g" goal={65} color="red" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Macro Distribution</h2>
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="15" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="15"
                strokeDasharray="100 300"
                initial={{ strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 50 }}
                transition={{ duration: 1.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{Math.round((stats.calories / stats.dailyGoal) * 100)}%</p>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Water Intake</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  i <= stats.water ? 'bg-blue-100' : 'bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{i <= stats.water ? '💧' : '⚪'}</span>
                <p className="flex-1 font-medium text-gray-900">Glass {i}</p>
                <p className="text-sm text-gray-600">250ml</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
