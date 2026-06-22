import React, { useState } from 'react';
import { motion } from 'framer-motion';
import foodsData from '../../foods_database.json';

export const FoodLog = () => {
  const [meals, setMeals] = useState<any[]>([]);
  const [foodDatabase] = useState<any[]>(foodsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const addMeal = (food: any) => {
    const newMeal = {
      id: Date.now(),
      ...food,
      mealType: selectedMealType,
      timestamp: new Date(),
      servings: 1,
    };
    setMeals([...meals, newMeal]);
  };

  const filteredFoods = foodDatabase.filter((food) =>
    food.dish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Food Log</h1>
        <p className="text-gray-600">Search from 870+ Indian dishes and log your meals</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div className="md:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <input
              type="text"
              placeholder="Search foods by name or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none font-medium"
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Foods</h2>
            <div className="grid sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredFoods.slice(0, 20).map((food: any) => (
                <motion.div
                  key={food.sno}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => addMeal(food)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 cursor-pointer hover:bg-emerald-50"
                >
                  <p className="font-bold text-gray-900">{food.dish}</p>
                  <p className="text-sm text-gray-600 mb-2">{food.state}</p>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-emerald-600">{food.calories} cal</span>
                    <span className="text-blue-600">{food.protein}g protein</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Meals</h2>

            <div className="mb-6 space-y-2">
              {mealTypes.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMealType(type)}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedMealType === type
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {meals.map((meal, idx) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-gray-50 rounded-lg border-l-4 border-emerald-500"
                >
                  <p className="font-bold text-gray-900 text-sm">{meal.dish}</p>
                  <div className="text-xs text-gray-600 mt-1">
                    <p>{meal.mealType}</p>
                    <p>{meal.calories} cal • {meal.protein}g protein</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setMeals(meals.filter((_, i) => i !== idx))}
                    className="mt-2 text-xs text-red-600 font-bold hover:text-red-700"
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Total Calories</p>
              <motion.p
                className="text-3xl font-black text-emerald-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {meals.reduce((sum, meal) => sum + meal.calories, 0)}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
