const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/get-time', async (req, res) => {
  const { timezone } = req.body;

  try {
    const response = await axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`);
    res.json({ time: response.data.datetime });
  } catch (error) {
    res.status(500).json({ error: 'Time fetch failed' });
  }
});

app.get('/.well-known/openapi.yaml', (req, res) => {
  res.sendFile(__dirname + '/openapi.yaml');
});

app.listen(3000, () => {
  console.log('Time function running on port 3000');
});
