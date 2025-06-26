// File: src/App.jsx
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Volume2, Copy } from 'lucide-react';
import axios from 'axios';

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
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLang, setFromLang] = useState('auto');
  const [toLang, setToLang] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://libretranslate.de/translate', {
        q: inputText,
        source: fromLang,
        target: toLang,
        format: 'text',
      });
      setOutputText(res.data.translatedText);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">🔤 AI Translator</h1>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
        <div className="flex-1 flex flex-col gap-2">
          <Select onValueChange={setFromLang} defaultValue="auto">
            <SelectTrigger><SelectValue placeholder="From" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto Detect</SelectItem>
              {languages.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type here..." className="h-40 text-black"/>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <Select onValueChange={setToLang} defaultValue="en">
            <SelectTrigger><SelectValue placeholder="To" /></SelectTrigger>
            <SelectContent>
              {languages.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea value={outputText} readOnly placeholder="Translation..." className="h-40 text-black"/>
          <div className="flex gap-2">
            <Button onClick={() => navigator.clipboard.writeText(outputText)}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
            <Button onClick={() => speak(outputText, toLang)}><Volume2 className="w-4 h-4 mr-1" /> Speak</Button>
          </div>
        </div>
      </div>

      <Button onClick={handleTranslate} disabled={loading} className="mt-4 px-10 py-2 text-lg">
        {loading ? 'Translating...' : 'Translate'}
      </Button>
    </div>
  );
}
