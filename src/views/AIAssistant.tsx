import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AIAssistant = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      type: 'assistant',
      content: 'Hello! I\'m your AI Nutrition Assistant. I can help you with meal recommendations, nutrition advice, and personalized guidance. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    '🍗 Suggest a high-protein meal under 500 calories',
    '💪 How can I gain muscle weight healthily?',
    '🥗 Create a vegetarian meal plan',
    '⚖️ What\'s my ideal daily protein intake?',
    '🏃 Best meals for post-workout recovery',
    '🌙 Healthy late-night snacks',
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API call to AI
    setTimeout(() => {
      const responses = [
        'Based on your goals, I recommend Grilled Paneer with Brown Rice and Steamed Broccoli. This provides 45g protein, 55g carbs, and 12g fat for approximately 450 calories.',
        'For muscle gain, focus on: 1. High protein intake (1.6-2.2g per kg body weight), 2. Caloric surplus (200-300 above maintenance), 3. Regular strength training.',
        'Here\'s a balanced vegetarian meal plan: Breakfast (Oats with nuts), Lunch (Dal with Rice), Dinner (Paneer Curry with Roti), Snacks (Greek Yogurt with fruits).',
        'Your ideal protein intake is approximately 120-150g daily based on your weight and activity level. Spread this across 4-5 meals for optimal muscle protein synthesis.',
        'Post-workout meals should contain protein and carbs: Chicken with Sweet Potato, or Paneer with Rice, consumed within 1-2 hours after exercise.',
        'Healthy late-night snacks: Greek Yogurt, Almonds, Protein shake, Cottage Cheese, or Berries. Avoid heavy and high-fat foods.',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: randomResponse }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-gray-900 mb-2">🤖 AI Nutrition Assistant</h1>
        <p className="text-gray-600">Get personalized nutrition advice powered by artificial intelligence</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          {/* Chat Messages */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 h-96 overflow-y-auto mb-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about nutrition..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700"
            >
              Send
            </motion.button>
          </div>
        </motion.div>

        {/* Suggested Questions */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Questions</h3>
            <div className="space-y-3">
              {suggestedQuestions.map((question, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-sm font-medium text-gray-900 transition-colors"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
