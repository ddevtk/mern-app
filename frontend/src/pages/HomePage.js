import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products';

const HomePage = () => {
  return (
    <>
      <h1>Latest product</h1>
      <Row>
        {products.map((product, idx) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product key={idx} product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
