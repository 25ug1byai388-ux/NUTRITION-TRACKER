import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  name: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activityLevel: String,
  fitnessGoal: String,
  dailyCalorieGoal: { type: Number, default: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MealSchema = new mongoose.Schema({
  userId: String,
  dish: String,
  state: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  fiber: Number,
  sodium: Number,
  cholesterol: Number,
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] },
  servings: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const WaterLogSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  date: Date,
});

const WeightLogSchema = new mongoose.Schema({
  userId: String,
  weight: Number,
  date: { type: Date, default: Date.now },
  bodyFat: Number,
  notes: String,
});

const MealPlanSchema = new mongoose.Schema({
  userId: String,
  weekStartDate: Date,
  days: [
    {
      date: Date,
      meals: [
        {
          mealType: String,
          dish: String,
          calories: Number,
          protein: Number,
          carbs: Number,
          fats: Number,
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const AchievementSchema = new mongoose.Schema({
  userId: String,
  type: String,
  unlockedAt: { type: Date, default: Date.now },
  progress: Number,
});

export const models = {
  User: mongoose.model('User', UserSchema),
  Meal: mongoose.model('Meal', MealSchema),
  WaterLog: mongoose.model('WaterLog', WaterLogSchema),
  WeightLog: mongoose.model('WeightLog', WeightLogSchema),
  MealPlan: mongoose.model('MealPlan', MealPlanSchema),
  Achievement: mongoose.model('Achievement', AchievementSchema),
};
