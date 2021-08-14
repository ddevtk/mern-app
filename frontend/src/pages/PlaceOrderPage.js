import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { addOrderItems, emptyState } from '../redux/actions/order.action';
import { formatPrice } from '../utils/formatPrice';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { clearCart } from '../redux/actions/cart.action';

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const { order, isSuccess, isLoading, error } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    shippingAddress: { address, city },
    paymentMethod,
    cartItems,
  } = cart;

  cart.itemPrices = cartItems.reduce((acc, cur) => {
    return acc + cur.price * cur.qty;
  }, 0);

  cart.shippingPrice = cart.itemPrices > 1000000 ? 0 : 30000;
  cart.total = cart.itemPrices + cart.shippingPrice;

  const placeOrderHandler = () => {
    dispatch(
      addOrderItems({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod,
        itemPrices: cart.itemPrices,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        history.push(`/order/${order._id}`);
      }, 1000);
    }
  }, [isSuccess]);
  useEffect(() => {
    return () => {
      dispatch(clearCart());
      dispatch(emptyState());
    };
  }, []);
  const key = 'updatable';
  return (
    <Container>
      {isLoading && message.loading({ content: 'Loading...', key })}
      {error && message.error({ content: error, key, duration: 3 })}
      {isSuccess &&
        message.success({
          content: 'Successfully 🎉🎉🎉',
          key,
          duration: 1,
        })}
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address: {address}, {city}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>Method: {paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Link to='/' className='btn btn-primary'>
                  Your cart is empty
                </Link>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item) => {
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
              )}
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
                  <Col>{formatPrice(cart.itemPrices)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{formatPrice(cart.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{formatPrice(cart.total)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                {localStorage.getItem('userInfo') ? (
                  <Link className='btn'>
                    <Button
                      disable={cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place order
                    </Button>
                  </Link>
                ) : (
                  <Link to='/login' className='btn'>
                    <Button disable={cartItems.length === 0}>
                      Login to payment
                    </Button>
                  </Link>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderPage;
