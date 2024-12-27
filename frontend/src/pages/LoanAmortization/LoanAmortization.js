import React, { useState } from "react";
import LoanChart from "./LoanChart";
import './LoanAmortization.css';

const LoanAmortization = () => {
    const [loanDetails, setLoanDetails] = useState({
        principal: 500000, // Loan amount (Number)
        annualRate: 5,     // Annual interest rate (Number)
        years: 10,         // Loan term in years (Number)
        startDate: new Date().toISOString().split("T")[0], // Default start date
        emiDay: 1,         // Default EMI day (Number)
    });

    const [schedule, setSchedule] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [summary, setSummary] = useState(null); // For additional details
    const [error, setError] = useState("");

    const fetchAmortizationSchedule = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/loan/amortization", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...loanDetails,
                    principal: parseFloat(loanDetails.principal), // Ensure numeric
                    annualRate: parseFloat(loanDetails.annualRate), // Ensure numeric
                    years: parseInt(loanDetails.years, 10), // Ensure integer
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch amortization schedule");
            }

            const data = await response.json();

            // Ensure `summary` fields are numbers
            setSummary({
                totalPrincipal: parseFloat(loanDetails.principal),
                totalInterest: parseFloat(data.totalInterest),
                totalRepaid: (parseFloat(data.totalInterest) + parseFloat(loanDetails.principal)).toFixed(2),
            });

            // Update schedule and chart data
            const startDate = new Date(loanDetails.startDate);
            const labels = data.amortizationSchedule.map((entry, index) => {
                const date = new Date(startDate);
                date.setMonth(date.getMonth() + index);
                return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
            });

            const principalPaid = data.amortizationSchedule.map((entry) => entry.principalPaid);
            const interestPaid = data.amortizationSchedule.map((entry) => entry.interestPaid);

            setSchedule(
                data.amortizationSchedule.map((entry, index) => ({
                    ...entry,
                    month: labels[index],
                }))
            );

            setChartData({
                labels,
                principalPaid,
                interestPaid,
            });

            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanDetails((prev) => ({
            ...prev,
            [name]: name === "emiDay" ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAmortizationSchedule();
    };

    return (
        <div className="loan-amortization">
            <h2>Loan Amortization Schedule</h2>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Loan Amount: ₹{loanDetails.principal}</label>
                    <input
                        type="range"
                        name="principal"
                        min="100000"
                        max="10000000"
                        step="50000"
                        value={loanDetails.principal}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Annual Interest Rate: {loanDetails.annualRate}%</label>
                    <input
                        type="range"
                        name="annualRate"
                        min="1"
                        max="15"
                        step="0.1"
                        value={loanDetails.annualRate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Loan Term: {loanDetails.years} years</label>
                    <input
                        type="range"
                        name="years"
                        min="1"
                        max="30"
                        step="1"
                        value={loanDetails.years}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Repayment Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={loanDetails.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>EMI Payment Date:</label>
                    <input
                        type="number"
                        name="emiDay"
                        min="1"
                        max="28"
                        value={loanDetails.emiDay}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>

            {/* Display Error */}
            {error && <p className="error">{error}</p>}

            {/* Summary */}
            {summary && (
                <div className="summary">
                    <h3>Summary</h3>
                    <p>Total Principal: ₹{summary.totalPrincipal.toFixed(2)}</p>
                    <p>Total Interest Paid: ₹{summary.totalInterest.toFixed(2)}</p>
                    <p>Total Amount Repaid: ₹{summary.totalRepaid}</p>
                </div>
            )}

            {/* Amortization Table */}
            {schedule.length > 0 && (
                <div>
                    <h3>Amortization Schedule</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Beginning Balance</th>
                                    <th>Monthly Payment</th>
                                    <th>Principal Paid</th>
                                    <th>Interest Paid</th>
                                    <th>Ending Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.month}</td>
                                        <td>₹{entry.beginningBalance.toFixed(2)}</td>
                                        <td>₹{entry.monthlyPayment.toFixed(2)}</td>
                                        <td>₹{entry.principalPaid.toFixed(2)}</td>
                                        <td>₹{entry.interestPaid.toFixed(2)}</td>
                                        <td>₹{entry.endingBalance.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Chart */}
            {chartData && (
                <div>
                    <h3>Principal vs. Interest Paid</h3>
                    <LoanChart data={chartData} />
                </div>
            )}
        </div>
    );
};

export default LoanAmortization;
