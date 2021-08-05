import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cart.action';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button as ButtonBs,
} from 'react-bootstrap';
import { Select, Button } from 'antd';
import { FaTrashAlt } from 'react-icons/fa';
import NoProduct from '../components/NoProduct';

const CartPage = ({ location }) => {
  const { Option } = Select;
  const { id } = useParams();

  const qty = location.search.split('=')[1];
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, []);

  const removeItem = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return <NoProduct />;
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <ListGroup variant='flush'>
          {cartItems.map((item) => {
            const { product } = item;
            return (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className='product-title'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Select
                      style={{ width: 110 }}
                      defaultValue='1'
                      onChange={(value) => dispatch(addToCart(id, value))}
                    >
                      {Array.from(
                        new Array(item.countInStock),
                        (_el, id) => id + 1
                      ).map((el, id) => {
                        return (
                          <Option key={id} value={el}>
                            {el}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col md={3}>
                    <Button onClick={() => removeItem(product)}>
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
                items
              </h2>
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <ButtonBs className='btn'>Process to checkout</ButtonBs>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
