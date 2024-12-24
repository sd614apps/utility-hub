import React, { useState } from 'react';

const InterestForm = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        principal: '',
        rate: '',
        time: '',
        frequency: 'annual', // Default frequency
        type: 'simple', // Default interest type
    });

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
                <label>Principal:</label>
                <input
                    type="number"
                    name="principal"
                    value={formData.principal}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Rate (%):</label>
                <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Time (years):</label>
                <input
                    type="number"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
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
