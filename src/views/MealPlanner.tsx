import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [preferences, setPreferences] = useState({
    duration: 'weekly',
    dietType: 'balanced',
    calorieTarget: 2000,
    allergies: '',
  });

  const generateMealPlan = async () => {
    setGenerating(true);
    // Simulate meal plan generation
    setTimeout(() => {
      const plan = {
        Monday: [
          { meal: 'Breakfast', dish: 'Idli with Sambar', calories: 250 },
          { meal: 'Lunch', dish: 'Biryani with Raita', calories: 600 },
          { meal: 'Dinner', dish: 'Dal Makhani with Naan', calories: 450 },
        ],
        Tuesday: [
          { meal: 'Breakfast', dish: 'Upma with Chutney', calories: 300 },
          { meal: 'Lunch', dish: 'Paneer Tikka with Rice', calories: 550 },
          { meal: 'Dinner', dish: 'Rajma with Chawal', calories: 400 },
        ],
        Wednesday: [
          { meal: 'Breakfast', dish: 'Poha', calories: 280 },
          { meal: 'Lunch', dish: 'Chole Bhature', calories: 620 },
          { meal: 'Dinner', dish: 'Fish Curry with Rice', calories: 480 },
        ],
        Thursday: [
          { meal: 'Breakfast', dish: 'Masala Dosa', calories: 320 },
          { meal: 'Lunch', dish: 'Butter Chicken with Naan', calories: 580 },
          { meal: 'Dinner', dish: 'Sambar Rice', calories: 400 },
        ],
        Friday: [
          { meal: 'Breakfast', dish: 'Medhu Vada with Chutney', calories: 290 },
          { meal: 'Lunch', dish: 'Prawn Curry with Rice', calories: 520 },
          { meal: 'Dinner', dish: 'Chikhalwali with Chapati', calories: 420 },
        ],
        Saturday: [
          { meal: 'Breakfast', dish: 'Uttapam', calories: 310 },
          { meal: 'Lunch', dish: 'Tandoori Chicken with Rice', calories: 590 },
          { meal: 'Dinner', dish: 'Aloo Gobi with Roti', calories: 380 },
        ],
        Sunday: [
          { meal: 'Breakfast', dish: 'Khichdi with Pickle', calories: 300 },
          { meal: 'Lunch', dish: 'Vegetable Biryani', calories: 550 },
          { meal: 'Dinner', dish: 'Dal Chawal', calories: 420 },
        ],
      };
      setMealPlan(plan);
      setGenerating(false);
    }, 2000);
  };

  const days = Object.keys(mealPlan || {});

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">📅 Meal Planner</h1>
        <p className="text-gray-600">Generate personalized meal plans based on your goals and preferences</p>
      </motion.div>

      {!mealPlan ? (
        <motion.div
          className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Meal Plan</h2>

          <div className="space-y-6">
            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Duration</label>
              <div className="flex gap-3">
                {['weekly', 'monthly'].map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPreferences({ ...preferences, duration: option })}
                    className={`px-6 py-2 rounded-lg font-bold capitalize transition-colors ${
                      preferences.duration === option
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Diet Type */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Diet Type</label>
              <select
                value={preferences.dietType}
                onChange={(e) => setPreferences({ ...preferences, dietType: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              >
                <option value="balanced">Balanced</option>
                <option value="highprotein">High Protein</option>
                <option value="lowcarb">Low Carb</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            {/* Calorie Target */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Daily Calorie Target</label>
              <input
                type="number"
                value={preferences.calorieTarget}
                onChange={(e) => setPreferences({ ...preferences, calorieTarget: Number(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateMealPlan}
              disabled={generating}
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50"
            >
              {generating ? 'Generating Your Plan...' : 'Generate Meal Plan'}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {days.map((day, dayIdx) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.1 }}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">{day}</h3>
                <div className="space-y-4">
                  {mealPlan[day].map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500"
                    >
                      <p className="text-sm font-bold text-emerald-700">{item.meal}</p>
                      <p className="text-sm text-gray-900 font-medium mt-1">{item.dish}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.calories} cal</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMealPlan(null)}
            className="mt-8 px-8 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 mx-auto block"
          >
            Generate New Plan
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
