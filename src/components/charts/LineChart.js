import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import { Widgets } from '@material-ui/icons';

Chart.register(...registerables);

const LineChart = () => {
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
            // tension: 0.4,
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
          labels: [0, 1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
                data: [1, 18, 9, 17, 34, 22, 30, 11],
                borderColor: 'white',
                backgroundColor: 'white',
                pointRadius: 0, // Hide the dot at each data point
            },
            {
                data: [1, 18, 9, 17, 34, 22, 30, 11],
                borderWidth: 1, // Set the line width
                borderColor: 'white, 0.8', // Set the line color
                backgroundColor: 'white', // Transparent fill color
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
  }, [])

  return (
    <div style={{ height: '60px' , width: '240px'}}>
      <canvas className='' ref={chartRef}></canvas>
    </div>
  )
}

export default LineChart;
