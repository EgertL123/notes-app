const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const authMiddleware = require('./middlewares/auth');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/notes', authMiddleware, noteRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;