const express = require('express');
const cors = require('cors');

const prescriptionRoutes = require('./routes/prescriptionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/recipes', prescriptionRoutes);

// Health‐check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

module.exports = app;
