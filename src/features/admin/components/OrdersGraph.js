import React from 'react';
import { Line } from 'react-chartjs-2';

const OrdersGraph = ({ orders }) => {
  // Prepare data for the chart
  const chartData = {
    labels: orders.map(order => order.createdAt), // Assuming orders have createdAt property
    datasets: [
      {
        label: 'Orders',
        data: orders.map(order => order.totalAmount), // Assuming orders have totalAmount property
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border-2 border-b-black">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 text-center">Orders Chart</h2>
        <div className="mt-4">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default OrdersGraph;
