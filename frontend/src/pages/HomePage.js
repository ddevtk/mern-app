import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest product</h1>
      <Row>
        {products.map((product, idx) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={idx}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
