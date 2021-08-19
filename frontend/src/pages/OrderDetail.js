import React, { useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getOrderDetail } from '../redux/actions/order.action';
import { formatPrice } from '../utils/formatPrice';
import Spin from '../components/Spin';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import { clearCart } from '../redux/actions/cart.action';

const OrderDetail = ({ match }) => {
  // const history = useHistory();
  // !localStorage.getItem('userInfo') && history.push('/');

  const { order, isLoading, error, isSuccess } = useSelector(
    (state) => state.orderDetail
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    dispatch(getOrderDetail({ id: match.params.id }));
  }, []);

  return (
    <>
      {isLoading && <Spin />}
      {error && <h1>{error}</h1>}
      {isSuccess && (
        <Container>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    Address:{' '}
                    <strong>
                      {order[0].shippingAddress.address},{' '}
                      {order[0].shippingAddress.city}
                    </strong>
                  </p>
                  <p>
                    Name: <strong>{order[0].user.name}</strong>
                  </p>
                  <p>
                    Email: <strong>{order[0].user.email}</strong>
                  </p>
                  {!order[0].isDelivered && (
                    <Alert message='Not Delivered' type='warning' />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment</h2>
                  {!order[0].isPaid && (
                    <Alert message='Not Paid' type='warning' />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <ListGroup variant='flush'>
                    {order[0].orderItems.map((item) => {
                      const { name, image, qty, price, product } = item;
                      return (
                        <ListGroup.Item>
                          <Row>
                            <Col md={2}>
                              <Image src={image} fluid rounded />
                            </Col>
                            <Col>
                              <Link
                                to={`/product/${product}`}
                                className='product-title'
                              >
                                {name}
                              </Link>
                            </Col>
                            <Col md={5}>
                              {qty} x {formatPrice(price)} =
                              {formatPrice(qty * price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>
                        {formatPrice(
                          order[0].orderItems.reduce((acc, cur) => {
                            return acc + cur.price * cur.qty;
                          }, 0)
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>{formatPrice(order[0].shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>{formatPrice(order[0].totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderDetail;
