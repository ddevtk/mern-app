import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Rate, Select } from 'antd';
import 'antd/dist/antd.css';
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import Spin from '../components/Spin';
import { getSingleProduct } from '../redux/actions/product.action';
import { formatPrice } from '../utils/formatPrice';

const SingleProductPage = () => {
  const { Option } = Select;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [qty, setQty] = useState(1);

  const { isLoading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Spin />}
      {!isLoading && error !== null && <h2>{error}</h2>}
      {!isLoading && error === null && (
        <>
          <Link to='/' className='btn btn-outline-primary my-3'>
            GO BACK
          </Link>
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                className='img-fluid'
              />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rate
                    disabled
                    defaultValue={product.rating}
                    allowHalf='true'
                    style={{ fontSize: '1.2em' }}
                  />
                  <span
                    style={{
                      margin: '0px 0 0 4px',
                    }}
                  >
                    {product.numReviews} reviews
                  </span>
                </ListGroupItem>
                <ListGroupItem>
                  Price: {formatPrice(product.price)}
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{formatPrice(product.price)}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Select
                            style={{ width: 110 }}
                            defaultValue='1'
                            onChange={(value) => setQty(value)}
                          >
                            {Array.from(
                              new Array(product.countInStock),
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
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <button
                      type='button'
                      className='btn btn-primary'
                      style={{ width: '100%' }}
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleProductPage;
