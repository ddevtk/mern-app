import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FaInfo } from 'react-icons/fa';
import Spin from '../components/Spin';
import { getMyOrder } from '../redux/actions/order.action';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading, isSuccess, error } = useSelector(
    (state) => state.orderList
  );

  useEffect(() => {
    dispatch(getMyOrder());
  }, []);

  return (
    <>
      {isLoading && <Spin />}
      {error && <h1>{error}</h1>}
      {isSuccess && (
        <Table bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{formatPrice(order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <FaInfo />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderPage;
