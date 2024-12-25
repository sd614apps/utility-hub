const { calculateFD, calculateRD } = require('../utils');

describe('FD/RD Calculator Utility', () => {
    test('Fixed Deposit Calculation (Quarterly)', () => {
        const result = calculateFD(100000, 6.5, 5, 'quarterly');
        expect(result.maturityAmount).toBeCloseTo(137804.08, 2);
        expect(result.interestEarned).toBeCloseTo(37804.08, 2);
    });

    test('Recurring Deposit Calculation (Quarterly)', () => {
        const result = calculateRD(5000, 6.5, 5, 'quarterly');
        expect(result.maturityAmount).toBeCloseTo(372411.18, 2);
        expect(result.interestEarned).toBeCloseTo(72211.18, 2);
    });

    test('Invalid Frequency', () => {
        expect(() => calculateFD(100000, 6.5, 5, 'weekly')).toThrow('Invalid frequency');
    });
});
