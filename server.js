const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/get-time', (req, res) => {
  const seoulTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
  res.json({ time: seoulTime });
});

app.get('/privacy', (req, res) => {
  res.send(`
    <html>
      <head><title>Privacy Policy</title></head>
      <body>
        <h1>Privacy Policy</h1>
        <p>This GPT does not store personal data. It barely knows what time it is.</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🕒 Time Server is running on port', PORT);
});
