import React from 'react';
import { useSelector } from 'react-redux';
import OrdersGraph from './OrdersGraph'; // Import your graph component

const AdminDashboard = () => {
  const orders = useSelector(state => state.orders); // Assuming you have orders in your Redux store

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {/* Your existing cards */}
      <OrdersGraph orders={orders} />
    </div>
  );
};

export default AdminDashboard;
