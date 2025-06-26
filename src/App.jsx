import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Volume2, Copy, RefreshCcw, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ur', label: 'Urdu' },
  { code: 'te', label: 'Telugu' },
  { code: 'ta', label: 'Tamil' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mr', label: 'Marathi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'kn', label: 'Kannada' },
  { code: 'hinglish', label: 'Hindi-English' },
  { code: 'hydeng', label: 'Hyderabadi English' },
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLang, setFromLang] = useState('auto');
  const [toLang, setToLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      let translated = '';
      if (toLang === 'hinglish' || toLang === 'hydeng') {
        const prompt = toLang === 'hinglish'
          ? 'Translate this to Roman Hindi (Hinglish):'
          : 'Translate this to Hyderabadi English style:';

        const res = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: inputText },
          ]
        }, {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json'
          }
        });

        translated = res.data.choices[0].message.content;
      } else {
        const res = await axios.post('https://libretranslate.de/translate', {
          q: inputText,
          source: fromLang,
          target: toLang,
          format: 'text',
        });

        translated = res.data.translatedText;
      }

      setOutputText(translated);
      setChatHistory(prev => [...prev, { input: inputText, output: translated }]);
    } catch (err) {
      setOutputText('Something went wrong...');
    }
    setLoading(false);
  };

  const speak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className={`min-h-screen p-4 flex flex-col items-center gap-4 transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <motion.div className="flex w-full max-w-4xl justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-3xl font-bold">
          🔤 AI Translator
        </motion.h1>
        <Button onClick={() => setDarkMode(!darkMode)} variant="outline">
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="flex-1 flex flex-col gap-2">
          <Select onValueChange={setFromLang} value={fromLang}>
            <SelectTrigger><SelectValue placeholder="From" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto Detect</SelectItem>
              {languages.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type here..." className="h-40 text-black dark:text-white dark:bg-black"/>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="flex-1 flex flex-col gap-2">
          <Select onValueChange={setToLang} value={toLang}>
            <SelectTrigger><SelectValue placeholder="To" /></SelectTrigger>
            <SelectContent>
              {languages.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea value={outputText} readOnly placeholder="Translation..." className="h-40 text-black dark:text-white dark:bg-black"/>
          <div className="flex gap-2">
            <Button onClick={() => navigator.clipboard.writeText(outputText)}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
            <Button onClick={() => speak(outputText, toLang)}><Volume2 className="w-4 h-4 mr-1" /> Speak</Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="flex gap-4 mt-4"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}>
        <Button onClick={handleTranslate} disabled={loading} className="px-10 py-2 text-lg">
          {loading ? 'Translating...' : 'Translate'}
        </Button>
        <Button onClick={swapLanguages} variant="outline" className="px-6 py-2">
          <RefreshCcw className="w-4 h-4 mr-1" /> Swap
        </Button>
      </motion.div>

      <motion.div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">🗨️ Chat History</h2>
        <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl space-y-2 max-h-64 overflow-y-auto">
          {chatHistory.map((item, index) => (
            <div key={index} className="border-b border-white/10 pb-2">
              <p className="text-sm text-gray-800 dark:text-gray-300"><strong>You:</strong> {item.input}</p>
              <p className="text-sm text-green-600 dark:text-green-400"><strong>AI:</strong> {item.output}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
