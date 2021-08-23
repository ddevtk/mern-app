import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserById,
  refresh,
  updateProfile,
  updateUser,
} from '../redux/actions/user.action';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { useHistory, useParams } from 'react-router-dom';

const EditUser = () => {
  const { user, isSuccess: success } = useSelector((state) => state.user);
  const { isLoading, isSuccess, error } = useSelector(
    (state) => state.updateUser
  );

  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, name, email, isAdmin }));
  };

  useEffect(() => {
    if (success) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
    if (isSuccess) {
      setTimeout(() => {
        history.push('/admin/user-list');
      }, 1000);
    }
    if (error) {
      dispatch(refresh());
    }
  }, [isSuccess, dispatch, error, success, user, history]);

  const key = 'updatable';
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Edit User</h1>
          {isLoading && message.loading({ content: 'Loading...', key })}
          {error && message.error({ content: error, key, duration: 3 })}
          {isSuccess &&
            message.success({
              content: 'Update successfully',
              key,
              duration: 1,
            })}
          <Row>
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Update
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
