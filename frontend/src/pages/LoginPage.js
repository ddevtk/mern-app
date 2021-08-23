import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emptyState, login, logout } from '../redux/actions/user.action';
import { message } from 'antd';
import 'antd/dist/antd.css';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.userLogin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const key = 'updatable';

  useEffect(() => {
    setTimeout(() => {
      if (user?.name) {
        history.push('/');
      }
    }, 1000);
  }, [user]);
  useEffect(() => {
    if (error) {
      dispatch(emptyState());
    }
  }, [error]);

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Sign in</h1>
          {isLoading && message.loading({ content: 'Loading...', key })}
          {error && message.error({ content: error, key, duration: 3 })}
          {user?.name &&
            message.success({
              content: 'Login successfully',
              key,
              duration: 1,
            })}
          <Row>
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Sign in
              </Button>
            </Form>
          </Row>
          <Row className='py-3'>
            <span>
              New customer ?
              <Link to='/register' style={{ display: 'inline-block' }}>
                Register
              </Link>
            </span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
