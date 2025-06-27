import { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [tone, setTone] = useState('formal');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/translate', {
        text: inputText,
        tone: tone
      });
      setTranslatedText(response.data.output);
    } catch (err) {
      setTranslatedText('Error: Could not translate');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">🇮🇳 Desi Translate</h1>
      <textarea
        className="w-full max-w-xl h-32 p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none mb-4"
        placeholder="Enter text to desi-translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <select
        className="mb-4 p-2 rounded border shadow-sm"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="formal">Formal</option>
        <option value="casual">Casual</option>
        <option value="savage">Savage</option>
        <option value="romantic">Romantic</option>
        <option value="emotional">Emotional</option>
      </select>
      <button
        onClick={handleTranslate}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-xl shadow"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {translatedText && (
        <div className="mt-6 w-full max-w-xl p-4 bg-white rounded-xl shadow text-gray-800">
          <h2 className="font-semibold mb-2">Translation:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
