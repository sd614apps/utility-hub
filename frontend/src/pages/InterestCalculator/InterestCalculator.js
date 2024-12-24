import React, { useState } from 'react';
import InterestForm from './components/InterestForm';
import Results from './components/Results';
import './InterestCalculator.css';

const InterestCalculator = () => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const calculateInterest = async (formData) => {
        const endpoint = formData.type === 'simple' 
    ? 'http://localhost:5000/api/interest/simple' 
    : 'http://localhost:5000/api/interest/compound';


        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Error calculating interest.');
                return;
            }

            const data = await response.json();
            setResults(data);
            setError('');
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="interest-calculator">
            <h2>Interest Calculator</h2>
            <InterestForm onCalculate={calculateInterest} />
            {error && <p className="error">{error}</p>}
            <Results results={results} />
        </div>
    );
};

export default InterestCalculator;
