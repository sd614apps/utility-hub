import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LoanChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // To store the Chart.js instance

    useEffect(() => {
        if (!data || !chartRef.current) return;

        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create the new chart
        chartInstanceRef.current = new Chart(chartRef.current, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: "Principal Paid",
                        data: data.principalPaid,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                    },
                    {
                        label: "Interest Paid",
                        data: data.interestPaid,
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Months",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Amount (₹)",
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default LoanChart;
