// FD Calculation
function calculateFD(principal, rate, tenure, frequency) {
    const n = getFrequency(frequency);
    const maturityAmount = principal * Math.pow(1 + rate / (100 * n), n * tenure);
    const interestEarned = maturityAmount - principal;

    return {
        maturityAmount: parseFloat(maturityAmount.toFixed(2)),
        interestEarned: parseFloat(interestEarned.toFixed(2)),
    };
}

// RD Calculation
function calculateRD(monthlyInstallment, rate, tenure, frequency) {
    const n = getFrequency(frequency);
    const totalMonths = tenure * 12;
    const maturityAmount =
        (monthlyInstallment * (Math.pow(1 + rate / (100 * n), n * (totalMonths / 12)) - 1)) /
        (1 - Math.pow(1 + rate / (100 * n), -1 / n));
    const totalDeposited = monthlyInstallment * totalMonths;
    const interestEarned = maturityAmount - totalDeposited;

    return {
        maturityAmount: parseFloat(maturityAmount.toFixed(2)),
        interestEarned: parseFloat(interestEarned.toFixed(2)),
    };
}

// Helper: Determine compounding frequency
function getFrequency(frequency) {
    switch (frequency.toLowerCase()) {
        case 'annual':
            return 1;
        case 'quarterly':
            return 4;
        case 'monthly':
            return 12;
        default:
            throw new Error('Invalid frequency. Use annual, quarterly, or monthly.');
    }
}

module.exports = { calculateFD, calculateRD };
