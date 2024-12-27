function calculateAmortization(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100; // Convert annual rate to monthly
    const totalPayments = years * 12;

    // EMI formula
    const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    let remainingBalance = principal;
    const amortizationSchedule = [];

    for (let i = 1; i <= totalPayments; i++) {
        const interestPaid = remainingBalance * monthlyRate;
        const principalPaid = emi - interestPaid;
        const endingBalance = remainingBalance - principalPaid;

        amortizationSchedule.push({
            month: i,
            beginningBalance: remainingBalance,
            monthlyPayment: emi,
            principalPaid,
            interestPaid,
            endingBalance: Math.max(endingBalance, 0), // Avoid negative balance
        });

        remainingBalance = endingBalance;
    }

    const totalInterest = amortizationSchedule.reduce((sum, entry) => sum + entry.interestPaid, 0);

    return {
        totalPayments: totalPayments,
        totalInterest: totalInterest.toFixed(2),
        monthlyPayment: emi.toFixed(2),
        amortizationSchedule,
    };
}

module.exports = { calculateAmortization };
