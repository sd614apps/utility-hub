const { calculateAmortization } = require('../utils');

describe('Loan Amortization Utility', () => {
    test('Calculate Amortization Schedule', () => {
        const schedule = calculateAmortization(500000, 5, 10);

        expect(schedule.totalPayments).toBe(120);
        expect(schedule.monthlyPayment).toBeCloseTo(5316.09, 2);
        expect(schedule.totalInterest).toBeCloseTo(137931.03, 2);
        expect(schedule.amortizationSchedule.length).toBe(120);
    });
});
