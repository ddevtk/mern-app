import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout, register } from '../redux/actions/user.action';
import { message } from 'antd';
import 'antd/dist/antd.css';

const RegisterPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [cPwd, setCPwd] = useState();
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.userLogin);

  console.log(isLoading);

  const submitHandler = (e) => {
    e.preventDefault();
    if (pwd !== cPwd) {
      setMsg("Confirm password don't match ");
    } else {
      dispatch(register(name, email, pwd));
    }
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
      dispatch(logout());
    }
  }, [error]);

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Sign up</h1>
          {isLoading && message.loading({ content: 'Loading...', key })}
          {msg !== null &&
            message.error({ content: msg, key, duration: 2 }) &&
            setMsg(null)}
          {error && message.error({ content: error, key, duration: 3 })}
          {user?.name &&
            message.success({
              content: 'Register successfully',
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
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={cPwd}
                  onChange={(e) => setCPwd(e.target.value)}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Sign in
              </Button>
            </Form>
          </Row>
          <Row className='py-3'>
            <span>
              Have account ?
              <Link to='/login' style={{ display: 'inline-block' }}>
                Sign in
              </Link>
            </span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
