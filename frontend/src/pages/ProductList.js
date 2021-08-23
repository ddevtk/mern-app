import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Popconfirm } from 'antd';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { FaTimes, FaCheck, FaUserEdit } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

import Spin from '../components/Spin';
import axios from 'axios';
import { getProductPerPage } from '../redux/actions/product.action';

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const { isLoading, error, products } = useSelector(
    (state) => state.productList
  );

  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getProductPerPage(10000, 1));
    } else {
      history.push('/');
    }
  }, []);

  const onConfirm = async (id) => {
    try {
      setDeleteLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`/api/user/${id}`, config);
      setTimeout(() => {
        // dispatch();
      }, 2000);
      setDeleteLoading(false);
      setDeleteSuccess(true);
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
    }
  };

  const key = 'updatable';

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Products</h1>

        <Button className='my-3'>
          <AiOutlinePlus /> Create products
        </Button>
      </div>
      {deleteLoading && message.loading({ content: 'Loading...', key })}
      {deleteSuccess &&
        message.success({
          content: 'Delete successfully',
          key,
          duration: 2,
        }) &&
        setDeleteSuccess(false)}

      {isLoading && <Spin />}
      {error && <h1>{error}</h1>}
      {products.length > 0 && (
        <Table bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>IMAGE</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((el) => (
              <tr key={el._id}>
                <td>{el._id}</td>
                <td>{el.name}</td>
                <td>
                  <Image
                    src={el.image}
                    alt={el.name}
                    className='img-fluid'
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{el.price}</td>
                <td>{el.category}</td>
                <td>{el.brand}</td>
                <td
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Link to={`/product/${el._id}/edit`}>
                    <FaUserEdit />
                  </Link>
                  <Popconfirm
                    title='Are you sure to delete this product'
                    placement='top'
                    onConfirm={() => onConfirm(el._id)}
                  >
                    <AiOutlineUserDelete style={{ cursor: 'pointer' }} />
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductList;
