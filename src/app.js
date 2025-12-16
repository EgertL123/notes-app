require('dotenv').config();
const express = require('express');
const path = require('path');            // <--- require path
const { sequelize } = require('./models');
const noteRoutes = require('./routes/noteRoutes');
const mockAuth = require('./middlewares/mockAuth');

const app = (express.json());

// Middleware
app.use(express.json());
app.use(mockAuth);
app.use('/notes', noteRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

// Sync DB
sequelize.sync();

module.exports = app;
