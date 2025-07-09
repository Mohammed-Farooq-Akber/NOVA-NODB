const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Simple fake login/logout (no DB)
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "Username required" });
  res.cookie('user', username, { httpOnly: true });
  res.json({ message: `Logged in as ${username}` });
});

app.get('/api/status', (req, res) => {
  const user = req.cookies.user;
  if (!user) return res.json({ loggedIn: false });
  res.json({ loggedIn: true, user });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('user');
  res.json({ message: "Logged out" });
});

app.get('/', (req, res) => res.send('Minimal Backend Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));