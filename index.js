// index.js
// where your node app starts

const express = require('express');
const path = require('path');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static files and index.html
app.use(express.static('public'));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Hello endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Helper to parse date
function parseDate(dateString) {
  if (!dateString) return new Date();
  // Check if dateString is an integer (unix timestamp)
  if (/^\d+$/.test(dateString)) {
    return new Date(Number(dateString));
  }
  return new Date(dateString);
}

// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  const { date: dateString } = req.params;
  const date = parseDate(dateString);

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
