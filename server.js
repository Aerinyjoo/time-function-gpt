const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// GET 방식으로 GPT가 호출할 수 있는 시간 API
app.get('/get-time', async (req, res) => {
  const { timezone } = req.query;

  if (!timezone) {
    return res.status(400).json({ error: 'Missing timezone' });
  }

  try {
    const response = await axios.get(`https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(timezone)}`);
    res.json({ dateTime: response.data.dateTime });
  } catch (error) {
    console.error('Time API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch time' });
  }
});

// GPT가 요구하는 openapi.yaml 파일 제공
app.get('/.well-known/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, '.well-known/openapi.yaml'));
});

// 개인정보 처리방침 페이지 
app.get('/privacy', (req, res) => {
  res.send(`
    <html>
      <head><title>Privacy Policy</title></head>
      <body>
        <h1>Privacy Policy</h1>
        <p>This GPT does not collect or store any personal data. It's too dumb for that.</p>
      </body>
    </html>
  `);
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Time proxy server running on port \${PORT}\`);
});

