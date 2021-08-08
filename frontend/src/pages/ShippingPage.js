import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

import { saveShippingAddress } from '../redux/actions/cart.action';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps />
          <h1>Shipping</h1>
          <Row>
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  value={address}
                  placeholder='Enter Address'
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  value={city}
                  placeholder='Enter City'
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  type='text'
                  value={postalCode}
                  placeholder='Enter PostalCode'
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  value={country}
                  placeholder='Enter Country'
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant='primary' type='submit' className='my-4'>
                Continue
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;
