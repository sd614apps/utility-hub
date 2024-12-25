const express = require('express');
const { calculateFD, calculateRD } = require('./utils');

const router = express.Router();

// FD Calculation API
router.post('/fd', (req, res) => {
    const { principal, rate, tenure, frequency } = req.body;

    if (!principal || !rate || !tenure || !frequency) {
        return res.status(400).json({ error: 'All fields (principal, rate, tenure, frequency) are required.' });
    }

    const result = calculateFD(principal, rate, tenure, frequency);
    res.json(result);
});

// RD Calculation API
router.post('/rd', (req, res) => {
    const { monthlyInstallment, rate, tenure, frequency } = req.body;

    if (!monthlyInstallment || !rate || !tenure || !frequency) {
        return res.status(400).json({ error: 'All fields (monthlyInstallment, rate, tenure, frequency) are required.' });
    }

    const result = calculateRD(monthlyInstallment, rate, tenure, frequency);
    res.json(result);
});

module.exports = router;
