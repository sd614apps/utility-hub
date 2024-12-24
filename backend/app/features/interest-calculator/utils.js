// Calculate Simple Interest
function calculateSimpleInterest(principal, rate, time) {
    return (principal * rate * time) / 100;
}

// Calculate Compound Interest
function calculateCompoundInterest(principal, rate, time, frequency) {
    const n = getCompoundingFrequency(frequency);
    return principal * Math.pow((1 + rate / (100 * n)), n * time) - principal;
}

// Helper: Get compounding frequency multiplier
function getCompoundingFrequency(frequency) {
    switch (frequency.toLowerCase()) {
        case 'annual':
            return 1;
        case 'semiannual':
            return 2;
        case 'quarterly':
            return 4;
        case 'monthly':
            return 12;
        default:
            throw new Error('Invalid frequency. Use annual, semiannual, quarterly, or monthly.');
    }
}

module.exports = {
    calculateSimpleInterest,
    calculateCompoundInterest,
};
