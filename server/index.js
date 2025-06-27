import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/translate', async (req, res) => {
  const { text, tone } = req.body;

  const prompt = `Convert the following sentence to a ${tone} tone:\n\"${text}\"`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful tone conversion assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 100,
    });

    const output = completion.data.choices[0].message.content.trim();
    res.json({ output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
