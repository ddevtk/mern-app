import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { refresh, updateProfile } from '../redux/actions/user.action';
import { message } from 'antd';
import 'antd/dist/antd.css';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.userLogin);
  const { isLoading, isSuccess, error } = useSelector(
    (state) => state.updateProfile
  );
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pwd, setPwd] = useState();
  const [cPwd, setCPwd] = useState();
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (pwd !== cPwd) {
      setMsg('Confirm password not matching ');
    } else {
      dispatch(updateProfile({ id: user._id, name, email, password: pwd }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
    if (error) {
      dispatch(refresh());
    }
  }, [isSuccess, dispatch, error]);

  const key = 'updatable';
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>User Profile</h1>
          {isLoading && message.loading({ content: 'Loading...', key })}
          {msg !== null &&
            message.error({ content: msg, key, duration: 2 }) &&
            setMsg(null)}
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
                Update
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
