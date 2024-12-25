import React, { useState } from "react";
import "./FDRDCalculator.css";

const FDRDCalculator = () => {
  const [fdValues, setFDValues] = useState({
    principal: 50000,
    rate: 6.5,
    tenure: 5,
    frequency: "quarterly",
  });

  const [rdValues, setRDValues] = useState({
    monthlyInstallment: 5000,
    rate: 6.5,
    tenure: 5,
    frequency: "quarterly",
  });

  const calculateFD = () => {
    const { principal, rate, tenure, frequency } = fdValues;
    const n = getFrequency(frequency);
    const maturity = principal * Math.pow(1 + rate / (100 * n), n * tenure);
    return {
      maturityAmount: maturity.toFixed(2),
      interestEarned: (maturity - principal).toFixed(2),
    };
  };

  const calculateRD = () => {
    const { monthlyInstallment, rate, tenure, frequency } = rdValues;
    const n = getFrequency(frequency);
    const totalMonths = tenure * 12;
    const maturity =
      (monthlyInstallment *
        (Math.pow(1 + rate / (100 * n), n * (totalMonths / 12)) - 1)) /
      (1 - Math.pow(1 + rate / (100 * n), -1 / n));
    return {
      maturityAmount: maturity.toFixed(2),
      interestEarned: (maturity - monthlyInstallment * totalMonths).toFixed(2),
    };
  };

  const getFrequency = (frequency) => {
    switch (frequency.toLowerCase()) {
      case "annual":
        return 1;
      case "quarterly":
        return 4;
      case "monthly":
        return 12;
      default:
        return 1;
    }
  };

  return (
    <div className="fd-rd-calculator">
      <h2>FD & RD Calculator</h2>

      {/* FD Section */}
      <div className="fd-calculator">
        <h3>Fixed Deposit (FD)</h3>
        <label>Principal Amount: ₹{fdValues.principal}</label>
        <input
          type="range"
          min="10000"
          max="1000000"
          step="1000"
          value={fdValues.principal}
          onChange={(e) => setFDValues({ ...fdValues, principal: +e.target.value })}
        />
        <label>Interest Rate: {fdValues.rate}%</label>
        <input
          type="range"
          min="2.0"
          max="10.0"
          step="0.1"
          value={fdValues.rate}
          onChange={(e) => setFDValues({ ...fdValues, rate: +e.target.value })}
        />
        <label>Tenure (Years): {fdValues.tenure}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={fdValues.tenure}
          onChange={(e) => setFDValues({ ...fdValues, tenure: +e.target.value })}
        />
        <label>Frequency:</label>
        <select
          value={fdValues.frequency}
          onChange={(e) => setFDValues({ ...fdValues, frequency: e.target.value })}
        >
          <option value="annual">Annual</option>
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
        </select>
        <div className="results">
          {fdValues.principal && (
            <>
              <p>Maturity Amount: ₹{calculateFD().maturityAmount}</p>
              <p>Interest Earned: ₹{calculateFD().interestEarned}</p>
            </>
          )}
        </div>
      </div>

      {/* RD Section */}
      <div className="rd-calculator">
        <h3>Recurring Deposit (RD)</h3>
        <label>Monthly Installment: ₹{rdValues.monthlyInstallment}</label>
        <input
          type="range"
          min="500"
          max="100000"
          step="500"
          value={rdValues.monthlyInstallment}
          onChange={(e) =>
            setRDValues({ ...rdValues, monthlyInstallment: +e.target.value })
          }
        />
        <label>Interest Rate: {rdValues.rate}%</label>
        <input
          type="range"
          min="2.0"
          max="10.0"
          step="0.1"
          value={rdValues.rate}
          onChange={(e) => setRDValues({ ...rdValues, rate: +e.target.value })}
        />
        <label>Tenure (Years): {rdValues.tenure}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={rdValues.tenure}
          onChange={(e) => setRDValues({ ...rdValues, tenure: +e.target.value })}
        />
        <label>Frequency:</label>
        <select
          value={rdValues.frequency}
          onChange={(e) => setRDValues({ ...rdValues, frequency: e.target.value })}
        >
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
        </select>
        <div className="results">
          {rdValues.monthlyInstallment && (
            <>
              <p>Maturity Amount: ₹{calculateRD().maturityAmount}</p>
              <p>Interest Earned: ₹{calculateRD().interestEarned}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FDRDCalculator;
