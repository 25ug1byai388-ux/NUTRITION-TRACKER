import express from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { connectDB } from './db';
import { models } from './models';

export const createServer = () => {
  const app = express();

  // ===== Middleware =====
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(mongoSanitize());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  // ===== Connect Database =====
  connectDB();

  // ===== Authentication Routes =====
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const user = await models.User.create({ email, name });
      res.json({ success: true, user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ email });
      res.json({ success: true, user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Meal Routes =====
  app.get('/api/meals/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      let query: any = { userId };
      if (date) {
        const startOfDay = new Date(date as string);
        const endOfDay = new Date(date as string);
        endOfDay.setDate(endOfDay.getDate() + 1);
        query = { ...query, date: { $gte: startOfDay, $lt: endOfDay } };
      }

      const meals = await models.Meal.find(query);
      res.json(meals);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/meals', async (req, res) => {
    try {
      const meal = await models.Meal.create(req.body);
      res.json({ success: true, meal });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put('/api/meals/:id', async (req, res) => {
    try {
      const meal = await models.Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, meal });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete('/api/meals/:id', async (req, res) => {
    try {
      await models.Meal.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Water Routes =====
  app.get('/api/water/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      let query: any = { userId };
      if (date) {
        query = { ...query, date };
      }

      const waterLogs = await models.WaterLog.find(query);
      res.json(waterLogs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/water', async (req, res) => {
    try {
      const waterLog = await models.WaterLog.create(req.body);
      res.json({ success: true, waterLog });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Weight Routes =====
  app.get('/api/weight/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const weightLogs = await models.WeightLog.find({ userId }).sort({ date: -1 });
      res.json(weightLogs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/weight', async (req, res) => {
    try {
      const weightLog = await models.WeightLog.create(req.body);
      res.json({ success: true, weightLog });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Analytics Routes =====
  app.get('/api/analytics/daily/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      const startOfDay = new Date(date as string);
      const endOfDay = new Date(date as string);
      endOfDay.setDate(endOfDay.getDate() + 1);

      const meals = await models.Meal.find({
        userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      });

      const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
      const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
      const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
      const totalFats = meals.reduce((sum, meal) => sum + (meal.fats || 0), 0);

      res.json({
        date,
        meals,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== Health Check =====
  app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
  });

  return app;
};

// Start server if this file is run directly
if (require.main === module) {
  const app = createServer();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default createServer;
