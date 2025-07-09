const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

// Simulated data (you can later connect it to MongoDB or a database)
let events = [
  { name: "Tech Talk", date: "2025-07-15T10:00", description: "AI and ML Trends" },
  { name: "CodeFest", date: "2025-07-20T14:00", description: "Coding competition for all branches" }
];

let clubs = [
  { name: "Coding Club", description: "Weekly coding challenges and sessions" },
  { name: "Robotics Club", description: "Build and battle bots" }
];

// Routes
app.get('/api/clubs', (req, res) => res.json(clubs));
app.get('/api/events', (req, res) => res.json(events));

app.post('/api/events', (req, res) => {
  const { name, date, description } = req.body;
  if (!name || !date || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  events.push({ name, date, description });
  res.json({ message: "Event created successfully" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));