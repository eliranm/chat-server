const PORT = process.env.PORT || 8000; // Use the PORT value from the environment or default to 8000
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const OPEN_AI_SECRET = process.env.OPEN_AI_SECRET;

app.post('/completions', async (req, res) => {

  console.log(req.body);

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPEN_AI_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: req.body.message }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    console.log(data , 'data')
    res.send(data);
  } catch (err) {
    console.error(err, 'error');
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));