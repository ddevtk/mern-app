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
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`} className='product-title'>
                    <Tooltip title={`Mail to ${user.email}`}>
                      {user.email}
                    </Tooltip>
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`/user/${user._id}/edit`}>
                    <FaUserEdit />
                  </Link>
                </td>
                {!user.isAdmin && (
                  <td>
                    <Popconfirm
                      title='Are you sure to delete this user'
                      placement='top'
                      onConfirm={() => onConfirm(user._id)}
                    >
                      <AiOutlineUserDelete
                        style={{ cursor: 'pointer' }}
                        // onClick={() => deleteUserHandler(user._id)}
                      />
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
