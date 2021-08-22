import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { FaTimes, FaCheck, FaUserEdit } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { getAllUser } from '../redux/actions/user.action';
import { Link } from 'react-router-dom';

import Spin from '../components/Spin';

const UserList = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isSuccess, userList } = useSelector(
    (state) => state.userList
  );
  useEffect(() => {
    dispatch(getAllUser());
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
                  <a href={`mailto:${user.email}`}>{user.email}</a>
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
                <td>
                  <Link>
                    <AiOutlineUserDelete />
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

export default UserList;
