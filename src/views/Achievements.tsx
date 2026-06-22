import React from 'react';
import { motion } from 'framer-motion';

export const Achievements = () => {
  const achievements = [
    { icon: '🔥', title: '7-Day Streak', desc: 'Log meals for 7 consecutive days', unlocked: true },
    { icon: '🏆', title: '30-Day Consistency', desc: 'Log meals for 30 consecutive days', unlocked: false },
    { icon: '💪', title: 'Protein Goal Master', desc: 'Meet your protein goal 10 times', unlocked: true },
    { icon: '💧', title: 'Water Goal Master', desc: 'Complete water intake goal 7 times', unlocked: false },
    { icon: '📊', title: 'Analytics Enthusiast', desc: 'Check your analytics 20 times', unlocked: true },
    { icon: '🥗', title: 'Foodie Explorer', desc: 'Try 50 different dishes', unlocked: false },
    { icon: '⚖️', title: 'Weight Goal Achieved', desc: 'Reach your target weight', unlocked: false },
    { icon: '🤖', title: 'AI Advisor Fan', desc: 'Ask the AI assistant 10 questions', unlocked: true },
  ];

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">🏆 Achievements</h1>
        <p className="text-gray-600">Unlock achievements and track your progress</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl text-center border-2 transition-all ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-300'
                : 'bg-gray-50 border-gray-300 opacity-50'
            }`}
          >
            <motion.div
              className="text-5xl mb-3"
              animate={achievement.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {achievement.icon}
            </motion.div>
            <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.desc}</p>
            {achievement.unlocked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-xs font-bold text-amber-600"
              >
                ✓ Unlocked
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
