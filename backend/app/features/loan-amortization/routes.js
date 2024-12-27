const express = require('express');
const { calculateAmortization } = require('./utils');

const router = express.Router();

router.post('/amortization', (req, res) => {
    const { principal, annualRate, years } = req.body;

    if (!principal || !annualRate || !years) {
        return res.status(400).json({ error: 'Missing required fields: principal, annualRate, or years.' });
    }

    const schedule = calculateAmortization(principal, annualRate, years);
    res.json(schedule);
});

module.exports = router;
