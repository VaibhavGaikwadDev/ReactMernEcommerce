
import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../order/orderSlice';
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalNumberOfOrders, setTotalNumberOfOrders] = useState(0);
  const [totalPaymentsReceived, setTotalPaymentsReceived] = useState(0);
  const [todaysOrdersCount, setTodaysOrdersCount] = useState(0);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {
    console.log('handleShow');
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  
  useEffect(() => {
    let revenue = 0;
    orders.forEach(order => {
      revenue += order.totalAmount;
    });
    setTotalRevenue(revenue);
    setTotalNumberOfOrders(orders.length);
  }, [orders]);
  useEffect(() => {
    let revenue = 0;
    let paymentsReceived = 0;
    orders.forEach(order => {
      revenue += order.totalAmount;
      if (order.paymentStatus === 'received') {
        paymentsReceived += order.totalAmount;
      }
    });
    setTotalRevenue(revenue);
    setTotalNumberOfOrders(orders.length);
    setTotalPaymentsReceived(paymentsReceived);
  }, [orders]);
  useEffect(() => {
    // Fetch all orders when the component mounts
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  useEffect(() => {
    // Get today's date in yyyy-mm-dd format
    const today = new Date().toISOString().slice(0, 10);
    // Filter orders received today
    const todaysOrders = orders.filter(order => order.createdAt.slice(0, 10) === today);
    // Set the count of orders received today
    setTodaysOrdersCount(todaysOrders.length);
  }, [orders]);
  return (
    
    <div className="overflow-x-auto">
      <div className="bg-gray-100 font-sans">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {/* Total Orders Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg border-2 border-b-black">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Total Orders</h2>
            <p className="mt-1 text-3xl font-bold text-green-600 text-center">{totalNumberOfOrders}</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className=" overflow-hidden shadow bg-green-200 rounded-lg border-2 border-b-black">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Total Revenue</h2>
            <p className="mt-1 text-3xl font-bold text-blue-600 text-center">₹{totalRevenue}</p>
          </div>
        </div>

        {/* Payments Received Card */}
        <div className=" bg-amber-200 overflow-hidden shadow rounded-lg border-2 border-b-black">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Payments Received</h2>
            <p className="mt-1 text-3xl font-bold text-purple-600 text-center">₹{totalPaymentsReceived}</p>
          </div>
        </div>

        {/* Orders Received Today Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg border-2 border-b-black">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Orders Received Today</h2>
            <p className="mt-1 text-3xl font-bold text-purple-600 text-center">{todaysOrdersCount}</p>
          </div>
        </div>    
      </div>

        <div className="w-full mx-auto">
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table className="w-full whitespace-nowrap table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-5 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: 'id',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    orders{' '}
                    {sort._sort === 'id' && (
                      <span className="ml-1">
                        {sort._order === 'asc' ? (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        )}
                      </span>
                    )}
                  </th>
                  <th className="py-3 px-5 text-left">Items</th>
                  <th
                    className="py-3 px-5 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: 'totalAmount',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Total Amount{' '}
                    {sort._sort === 'totalAmount' && (
                      <span className="ml-1">
                        {sort._order === 'asc' ? (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        )}
                      </span>
                    )}
                  </th>
                  <th className="py-3 px-5 text-center">Shipping Address</th>
                  <th className="py-3 px-5 text-center">Order Status</th>
                  <th className="py-3 px-5 text-center">Payment Method</th>
                  <th className="py-3 px-5 text-center">Payment Status</th>
                  <th
                    className="py-3 px-5 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: 'createdAt',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Order Time{' '}
                    {sort._sort === 'createdAt' && (
                      <span className="ml-1">
                        {sort._order === 'asc' ? (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        )}
                      </span>
                    )}
                  </th>
                  <th
                    className="py-3 px-5 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: 'updatedAt',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Last Updated{' '}
                    {sort._sort === 'updatedAt' && (
                      <span className="ml-1">
                        {sort._order === 'asc' ? (
                          <ArrowUpIcon className="w-4 h-4 inline" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline" />
                        )}
                      </span>
                    )}
                  </th>
                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-750 hover:bg-pink-200"
                  >
                    <td className="py-3 px-5 text-left whitespace-nowrap">
                      <span className="font-medium">{order.id}</span>
                    </td>
                    <td className="py-3 px-10 text-left">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.quantity} - $
                            {item.product.discountPrice}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-5 text-center">${order.totalAmount}</td>
                    <td className="py-3 px-5 text-center">
                      <div>
                        <strong>{order.selectedAddress.name}</strong>,
                        {order.selectedAddress.street},
                        {order.selectedAddress.city},
                        {order.selectedAddress.state},
                        {order.selectedAddress.pinCode},
                        {order.selectedAddress.phone}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderStatus(e, order)}
                          defaultValue={order.status}
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-center">{order.paymentMethod}</td>
                    <td className="py-3 px-5 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderPaymentStatus(e, order)}
                          defaultValue={order.paymentStatus}
                        >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span className={`${chooseColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}>
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-center">{order.createdAt ? new Date(order.createdAt).toLocaleString() : null}</td>
                    <td className="py-3 px-5 text-center">{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}</td>
                    <td className="py-3 px-5 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
}

export default AdminOrders;
