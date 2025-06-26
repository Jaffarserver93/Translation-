import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, ChevronDown, Copy } from 'lucide-react';
import axios from 'axios';

// #update this line 👇
const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'te', label: 'Telugu' },
    { value: 'ta', label: 'Tamil' },
    { value: 'hinglish', label: 'Hinglish' },
  ];

  const handleTranslate = async () => {
    if (!inputText) {
      setError('Please enter text to translate.');
      return;
    }

    setIsTranslating(true);
    setError('');

    // Mock translation fallback for testing
    const mockTranslation = () => {
      const translations = {
        en: inputText,
        hi: `Translated to Hindi: ${inputText}`,
        te: `Translated to Telugu: ${inputText}`,
        ta: `Translated to Tamil: ${inputText}`,
        hinglish: `Hinglish vibe: ${inputText} bhai!`,
      };
      return translations[targetLang] || `Translated to ${targetLang}: ${inputText}`;
    };

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OpenAI API key is missing. Please set VITE_OPENAI_API_KEY in .env.');
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a translation assistant specializing in Indian languages and Hinglish. Translate the input text from ${sourceLang} to ${targetLang} with natural, context-aware phrasing suitable for Indian users. For Hinglish, use casual, urban Indian slang where appropriate.`,
            },
            { role: 'user', content: inputText },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const translatedText = response.data.choices[0].message.content;
      setOutputText(translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid OpenAI API key. Please check your VITE_OPENAI_API_KEY.');
        } else if (error.response.status === 429) {
          setError('Rate limit exceeded. Please try again later.');
        } else {
          setError('Failed to connect to OpenAI. Using mock translation.');
          setOutputText(mockTranslation());
        }
      } else {
        setError(error.message || 'Something went wrong. Using mock translation.');
        setOutputText(mockTranslation());
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('Translation copied to clipboard! 😎');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-desi-blue to-purple-600'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative glow-platform bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-3xl w-full border border-white/20"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            Desi Translate Premium 😎
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-white/10 dark:bg-gray-700/30 text-white hover:bg-white/20 dark:hover:bg-gray-600/30"
          >
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </motion.button>
        </div>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-200 dark:text-gray-300 mb-8"
        >
          Experience AI-powered translations for Hinglish, Hyderabadi English, and more with OpenAI! 🚀
        </motion.p>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-md text-center"
          >
            {error}
          </motion.div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <label className="block text-white mb-2 font-semibold">Source Language</label>
            <div className="relative">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-desi-gold bg-white/5 dark:bg-gray-700/30 text-white appearance-none"
              >
                <option value="" disabled className="text-gray-400">Select source language</option>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value} className="text-black dark:text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-desi-gold" />
            </div>
            <motion.textarea
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full p-3 mt-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-desi-gold h-36 resize-none bg-white/5 dark:bg-gray-700/30 text-white placeholder-gray-400"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <label className="block text-white mb-2 font-semibold">Target Language</label>
            <div className="relative">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-desi-gold bg-white/5 dark:bg-gray-700/30 text-white appearance-none"
              >
                <option value="" disabled className="text-gray-400">Select target language</option>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value} className="text-black dark:text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-desi-gold" />
            </div>
            <div className="relative w-full p-3 mt-3 border border-white/20 rounded-md h-36 bg-white/5 dark:bg-gray-700/30 text-white">
              {outputText || 'Translation will appear here...'}
              {outputText && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="absolute right-3 top-3 p-2 bg-desi-gold/20 rounded-md hover:bg-desi-gold/30"
                >
                  <Copy className="h-5 w-5 text-desi-gold" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTranslate}
          disabled={isTranslating}
          className={`w-full bg-desi-gold text-desi-blue p-3 rounded-md font-bold hover:bg-yellow-400 transition ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isTranslating ? 'Translating...' : 'Translate 🔥'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default App;
