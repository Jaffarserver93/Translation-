import { motion } from 'framer-motion';
import { Star, Check } from 'lucide-react';

const Premium = () => {
  const features = [
    { text: 'AI-Powered Hinglish & Hyderabadi English Translations', icon: <Star className="h-6 w-6 text-desi-gold" /> },
    { text: 'Unlimited Translations with OpenAI GPT', icon: <Check className="h-6 w-6 text-green-500" /> },
    { text: 'Priority Support for Desi Users', icon: <Check className="h-6 w-6 text-green-500" /> },
    { text: 'Ad-Free Experience', icon: <Check className="h-6 w-6 text-green-500" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-desi-blue to-purple-600 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative glow-platform bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-3xl w-full border border-white/20"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-6"
        >
          Desi Translate Premium 😎
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-200 dark:text-gray-300 mb-8"
        >
          Unlock the ultimate translation experience with AI-powered features for Hinglish, Hyderabadi English, and more!
        </motion.p>
        <div className="grid gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              className="flex items-center space-x-4 p-4 bg-white/5 dark:bg-gray-700/30 rounded-lg"
            >
              {feature.icon}
              <span className="text-white dark:text-gray-200">{feature.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-desi-gold text-desi-blue p-3 rounded-md font-bold hover:bg-yellow-400 transition"
          onClick={() => alert('Redirect to payment gateway (placeholder)')}
        >
          Get Premium Now 🔥
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Premium;
