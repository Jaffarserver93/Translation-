import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import Premium from './Premium';

// #update this line 👇
const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'te', label: 'Telugu' },
    { value: 'ta', label: 'Tamil' },
    { value: 'hinglish', label: 'Hinglish' },
  ];

  const handleTranslate = async () => {
    // Placeholder for LibreTranslate or OpenAI API
    setOutputText(`Translated: ${inputText} (to ${targetLang})`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
      <nav className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Desi Translate 😎
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/premium" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              Go Premium 🔥
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2">Source Language</label>
                    <div className="relative">
                      <select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 appearance-none"
                      >
                        <option value="" disabled>Select source language</option>
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <motion.textarea
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text to translate..."
                      className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2">Target Language</label>
                    <div className="relative">
                      <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 appearance-none"
                      >
                        <option value="" disabled>Select target language</option>
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <div className="w-full p-2 mt-2 border rounded-md h-32 bg-gray-100 dark:bg-gray-700 dark:text-white">
                      {outputText || 'Translation will appear here...'}
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTranslate}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                  Translate 🔥
                </motion.button>
              </div>
            </motion.div>
          }
        />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </div>
  );
};

export default App;
