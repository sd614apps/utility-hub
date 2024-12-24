const { calculateSimpleInterest, calculateCompoundInterest } = require('../utils');

describe('Interest Calculation Utility', () => {
    test('Calculate Simple Interest', () => {
        const interest = calculateSimpleInterest(1000, 5, 2);
        expect(interest).toBe(100);
    });

    test('Calculate Compound Interest (Annual)', () => {
        const interest = calculateCompoundInterest(1000, 5, 2, 'annual');
        expect(interest).toBeCloseTo(102.5, 2);
    });

    test('Calculate Compound Interest (Monthly)', () => {
        const interest = calculateCompoundInterest(1000, 5, 1, 'monthly');
        expect(interest).toBeCloseTo(51.16, 2);
    });

    test('Invalid Frequency', () => {
        expect(() => calculateCompoundInterest(1000, 5, 1, 'weekly')).toThrow('Invalid frequency');
    });
});
