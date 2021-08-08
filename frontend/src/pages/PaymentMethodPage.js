import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

import { savePaymentMethod } from '../redux/actions/cart.action';

const PaymentMethodPage = () => {
  const dispatch = useDispatch();
  const history = useHistory;
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/place-order');
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps />
          <h1>Payment method</h1>
          <Row>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as='legend'>Select method</Form.Label>
              </Form.Group>
              <Col>
                <Form.Check
                  type='radio'
                  label='Paypal or credit card'
                  id='Paypal'
                  name='paymentMethod'
                  value={paymentMethod}
                  checked
                >
                  {' '}
                </Form.Check>
              </Col>
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

export default PaymentMethodPage;
