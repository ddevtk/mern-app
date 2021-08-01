import React from 'react';
import { Link, useParams } from 'react-router-dom';
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
import products from '../products';

const SingleProductPage = () => {
  const { Option } = Select;

  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  return (
    <>
      <Link to='/' className='btn btn-outline-primary my-3'>
        GO BACK
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} className='img-fluid' />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rate
                disabled
                allowHalf
                defaultValue={product.rating}
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
            <ListGroupItem>Price: {product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product.price}</Col>
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
                      <Select style={{ width: 110 }} defaultValue='Quantity'>
                        {Array.from(
                          new Array(product.countInStock),
                          (el, id) => id + 1
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
                >
                  ADD TO CART
                </button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleProductPage;
