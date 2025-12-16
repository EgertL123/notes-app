require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const noteRoutes = require('./routes/noteRoutes');
const mockAuth = require('./middlewares/mockAuth');

const app = express();

app.use(express.json());
app.use(mockAuth);

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// API
app.use('/api/notes', noteRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Sync DB (dev only)
sequelize.sync({ force: true });

module.exports = app;
