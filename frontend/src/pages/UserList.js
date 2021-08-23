import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, message, Popconfirm } from 'antd';
import { Table } from 'react-bootstrap';
import { FaTimes, FaCheck, FaUserEdit } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { getAllUser } from '../redux/actions/user.action';
import { Link, useHistory } from 'react-router-dom';

import Spin from '../components/Spin';
import axios from 'axios';

const UserList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const { isLoading, error, isSuccess, userList } = useSelector(
    (state) => state.userList
  );

  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getAllUser());
    } else {
      history.push('/');
    }
  }, []);

  const onConfirm = async (id) => {
    try {
      console.log(id);
      setDeleteLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`/api/user/${id}`, config);
      setTimeout(() => {
        dispatch(getAllUser());
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
      {isSuccess && (
        <Table bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((el) => (
              <tr key={el._id}>
                <td>{el._id}</td>
                <td>{el.name}</td>
                <td>
                  <a href={`mailto:${el.email}`} className='product-title'>
                    <Tooltip title={`Mail to ${el.email}`}>{el.email}</Tooltip>
                  </a>
                </td>
                <td>
                  {el.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`/user/${el._id}/edit`}>
                    <FaUserEdit />
                  </Link>
                </td>
                {el._id === user._id ? (
                  <td />
                ) : (
                  <td>
                    <Popconfirm
                      title='Are you sure to delete this user'
                      placement='top'
                      onConfirm={() => onConfirm(el._id)}
                    >
                      <AiOutlineUserDelete style={{ cursor: 'pointer' }} />
                    </Popconfirm>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
