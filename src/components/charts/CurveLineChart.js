import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

const CurveLineChart = () => {
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
        type: 'line',
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6],
          datasets: [
            {
            data: [65, 59, 84, 84, 51, 55, 40],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              pointRadius: 0, // Hide the dot at each data point
            },
            {
            data: [65, 59, 84, 84, 51, 55, 40],
              borderWidth: 1, // Set the line width
              borderColor: 'rgba(75, 192, 192, 1)', // Set the line color
              backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent fill color
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
    <div style={{ height: '60px' , width: '240px'}}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CurveLineChart;
