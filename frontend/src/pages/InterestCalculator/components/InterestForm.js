import React, { useState } from "react";

const InterestForm = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        principal: 50000, // Default principal value
        rate: 5,          // Default interest rate
        time: 2,          // Default time in years
        frequency: "annual", // Default frequency
        type: "simple",   // Default interest type
    });

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Principal Amount: ₹{formData.principal}</label>
                <input
                    type="range"
                    name="principal"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={formData.principal}
                    onChange={handleSliderChange}
                />
            </div>

            <div>
                <label>Interest Rate: {formData.rate}%</label>
                <input
                    type="range"
                    name="rate"
                    min="1"
                    max="15"
                    step="0.1"
                    value={formData.rate}
                    onChange={handleSliderChange}
                />
            </div>

            <div>
                <label>Time Period: {formData.time} years</label>
                <input
                    type="range"
                    name="time"
                    min="1"
                    max="30"
                    step="1"
                    value={formData.time}
                    onChange={handleSliderChange}
                />
            </div>

            <div>
                <label>Frequency:</label>
                <select name="frequency" value={formData.frequency} onChange={handleChange}>
                    <option value="annual">Annual</option>
                    <option value="semiannual">Semiannual</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div>
                <label>Interest Type:</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="simple">Simple Interest</option>
                    <option value="compound">Compound Interest</option>
                </select>
            </div>

            <button type="submit">Calculate</button>
        </form>
    );
};

export default InterestForm;
