const Results = ({ results }) => {
    if (!results) return null;

    const totalAmount = typeof results.totalAmount === 'number' ? results.totalAmount : parseFloat(results.totalAmount);
    const interest = typeof results.interest === 'number' ? results.interest : parseFloat(results.interest);

    return (
        <div>
            <h3>Calculation Results</h3>
            <p>Interest: ₹{interest.toFixed(2)}</p>
            <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
        </div>
    );
};

export default Results;
