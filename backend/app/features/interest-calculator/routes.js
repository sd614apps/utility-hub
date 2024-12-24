const express = require('express');
const { calculateSimpleInterest, calculateCompoundInterest } = require('./utils');

const router = express.Router();

// Endpoint for Simple Interest
router.post('/simple', (req, res) => {
    const { principal, rate, time } = req.body;

    if (!principal || !rate || !time) {
        return res.status(400).json({ error: 'All fields (principal, rate, time) are required.' });
    }

    // Convert to numbers to ensure proper arithmetic
    const principalAmount = Number(principal);
    const ratePercent = Number(rate);
    const timePeriod = Number(time);

    if (isNaN(principalAmount) || isNaN(ratePercent) || isNaN(timePeriod)) {
        return res.status(400).json({ error: 'Principal, rate, and time must be valid numbers.' });
    }

    const interest = calculateSimpleInterest(principalAmount, rate, time);
    const totalAmount = principalAmount + interest;

    res.json({ interest, totalAmount });
});

// Endpoint for Compound Interest
router.post('/compound', (req, res) => {
    const { principal, rate, time, frequency } = req.body;

    if (!principal || !rate || !time || !frequency) {
        return res.status(400).json({ error: 'All fields (principal, rate, time, frequency) are required.' });
    }

    // Convert to numbers to ensure proper arithmetic
    const principalAmount = Number(principal);
    const ratePercent = Number(rate);
    const timePeriod = Number(time);

    if (isNaN(principalAmount) || isNaN(ratePercent) || isNaN(timePeriod)) {
        return res.status(400).json({ error: 'Principal, rate, and time must be valid numbers.' });
    }

    const interest = calculateCompoundInterest(principalAmount, rate, time, frequency);
    const totalAmount = principalAmount + interest;

    res.json({ interest, totalAmount });
});

module.exports = router;
