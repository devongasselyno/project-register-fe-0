import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    let chartInstance = null;

    const createChart = () => {
      // Customize the chart options
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
        scales: {
          x: {
            type: 'linear', // Use linear scale
            display: false, // Hide the x-axis
          },
          y: {
            type: 'linear', // Use linear scale
            display: false, // Hide the y-axis
          },
        },
        elements: {
          line: {
            borderWidth: 1, // Set the line width
            borderColor: 'rgba(75, 192, 192, 1)', // Set the line color
            tension: 0.4,
            fill: false, // Do not fill the area under the line
          },
          point: {
            radius: 3, // Customize the dot size
            hoverRadius: 4,
            backgroundColor: 'rgba(75, 192, 192, 1)', // Set the dot color
            borderColor: 'rgba(75, 192, 192, 1)', // Set the dot border color
            borderWidth: 1, // Set the dot border width
          },
        },
      };

      // Destroy previous chart instance if exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          datasets: [
            {
            data: [78, 81, 80, 45, 40, 32, 43, 85, 61, 35, 21, 92, 47, 87, 89, 75, 80],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              pointRadius: 0, // Hide the dot at each data point
              barPercentage: 0.9,
              // categoryPercentage: 0.5
            },
          ],
        },
        options: options,
      });
    };

    createChart();

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className='h-1/2 w-full'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
